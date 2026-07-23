"""Tests that the archive is actually an archive.

These run against the real database rather than a throwaway test one. That is
normally a bad idea, and here it is the only honest option: the property under
test is "this deployment cannot be written to", so building a *writable* test
database and asserting things about it would exercise a configuration that
never runs. SimpleTestCase + `databases` gives us the real connection, and the
fact that these tests cannot damage it is the very thing being demonstrated.

Run with ./test.sh.
"""

from amaranta_candles.models import Candle, Scent, ScentWithAmount
from core.archive import ArchiveIsReadOnly
from django.db import connection
from django.db.utils import OperationalError
from django.test import SimpleTestCase


class ArchiveIsReadableTest(SimpleTestCase):
    databases = {"default"}

    def test_collection_endpoint_returns_rows(self):
        response = self.client.get("/api/candle")
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.json()), 0)

    def test_recursive_expansion_still_works(self):
        response = self.client.get("/api/candle?recursive=true")
        self.assertEqual(response.status_code, 200)
        # The recursive serializer inlines related objects rather than IDs;
        # this is what the UI's candle pages render from.
        self.assertIsInstance(response.json()[0]["vessel"], dict)

    def test_bad_recursive_value_does_not_500(self):
        # This used to be json.loads() on raw query-string input.
        self.assertEqual(self.client.get("/api/candle?recursive=x").status_code, 200)

    def test_archive_endpoint_declares_itself(self):
        body = self.client.get("/api/archive").json()
        self.assertTrue(body["read_only"])
        self.assertTrue(body["snapshot_date"])


class ArchiveRejectsWritesTest(SimpleTestCase):
    databases = {"default"}

    def test_write_verbs_are_not_routed(self):
        """Layer 1: the writing verbs have no handler, so they 405."""
        for method, path in [
            ("post", "/api/candle"),
            ("put", "/api/candle/5"),
            ("patch", "/api/candle/5"),
            ("delete", "/api/candle/5"),
        ]:
            with self.subTest(method=method, path=path):
                response = getattr(self.client, method)(
                    path, data={"name": "nope"}, content_type="application/json"
                )
                self.assertEqual(response.status_code, 405)

    def test_orm_refuses_to_save(self):
        """Layer 2: the router raises before any SQL is generated."""
        scent = Scent.objects.first()
        scent.name = "tampered"
        with self.assertRaises(ArchiveIsReadOnly):
            scent.save()

    def test_orm_refuses_to_delete(self):
        with self.assertRaises(ArchiveIsReadOnly):
            Candle.objects.first().delete()

    def test_orm_refuses_bulk_create(self):
        # ScentWithAmount rather than Scent: Django rejects bulk_create on
        # multi-table-inherited models before a router is ever consulted, so
        # using Scent here would pass for the wrong reason.
        with self.assertRaises(ArchiveIsReadOnly):
            ScentWithAmount.objects.bulk_create(
                [ScentWithAmount(scent=Scent.objects.first(), amount=1.0)]
            )

    def test_orm_refuses_queryset_update(self):
        with self.assertRaises(ArchiveIsReadOnly):
            Candle.objects.all().update(name="tampered")

    def test_raw_sql_cannot_write(self):
        """Layer 3: SQLite itself rejects writes, which is what bounds the
        blast radius of any SQL injection to reading candle rows."""
        # Scent and friends use multi-table inheritance, so `name` lives on
        # amaranta_candles_base, not on the child table.
        for statement in [
            "UPDATE amaranta_candles_base SET name = 'tampered'",
            "DELETE FROM amaranta_candles_base",
            "DROP TABLE amaranta_candles_scent",
            "CREATE TABLE evil (x int)",
            "ALTER TABLE amaranta_candles_base ADD COLUMN evil int",
        ]:
            with self.subTest(statement=statement):
                with self.assertRaises(OperationalError) as caught:
                    with connection.cursor() as cursor:
                        cursor.execute(statement)
                self.assertIn("readonly", str(caught.exception).lower())

    def test_data_survived_all_of_that(self):
        self.assertFalse(Scent.objects.filter(name="tampered").exists())


class RemovedSurfacesTest(SimpleTestCase):
    databases = {"default"}

    def test_write_surfaces_are_gone(self):
        """The admin, auth views and GraphQL endpoint must not resolve.

        404, not 403: these are absent, not merely forbidden.
        """
        for path in ["/admin/", "/admin/login/", "/accounts/login/", "/api/graphql"]:
            with self.subTest(path=path):
                self.assertEqual(self.client.get(path).status_code, 404)

    def test_no_auth_tables_in_the_archive(self):
        """A SQL injection should find nothing of value: no users, no hashes."""
        with connection.cursor() as cursor:
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = {row[0] for row in cursor.fetchall()}
        leaked = {t for t in tables if t.startswith(("auth_", "django_admin"))}
        self.assertEqual(leaked, set())
