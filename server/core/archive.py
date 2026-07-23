"""Archive mode: the site is a frozen, point-in-time copy of the candle data.

Amaranta Candles stopped being updated years ago, so the site no longer needs
to accept writes -- and since it is served on the public internet, the safest
thing it can be is a thing that *cannot* write. "Read-only" here is not a
feature flag that a bug could flip; it is enforced independently at four
layers, so defeating any one of them still leaves the data intact:

  1. There is no write code. The GraphQL mutations, the Django admin, the
     auth/session machinery and the writable REST verbs were deleted outright,
     not disabled. You cannot re-enable what isn't there. (core/urls.py,
     amaranta_candles/views.py, core/settings.py)

  2. The ORM refuses. ReadOnlyRouter below raises on every write Django
     attempts, so even a code path we missed -- or one added later by accident
     -- fails loudly instead of writing.

  3. SQLite refuses. The database is opened through a URI with `mode=ro` and
     `immutable=1`, so the driver itself rejects writes before any SQL reaches
     the file. This is the layer that also contains SQL injection: an attacker
     who somehow gets arbitrary SQL executed still cannot INSERT, UPDATE,
     DELETE, DROP or ATTACH, because the connection has no write capability.

  4. The filesystem refuses. In production the database file lives on a
     read-only container filesystem (readOnlyRootFilesystem in the k8s
     deployment), so a write would fail at the syscall even if it somehow got
     that far.

Blast radius is bounded by construction as well as by permission: the entire
dataset is one SQLite file containing nothing but candle tables. There is no
database server to pivot to, no other schema, no other tenant's data, and no
credentials in the process. The auth tables (password hashes, email addresses)
were dropped when the snapshot was built -- see scripts/build_archive.py.
"""

SNAPSHOT_DATE = "2026-07-23"


class ArchiveIsReadOnly(Exception):
    """Raised when anything tries to write to the frozen archive."""


class ReadOnlyRouter:
    """Database router that permits reads and raises on every write.

    Django consults `db_for_write` for save(), delete(), bulk ops and related
    manager mutations. Returning None here would merely fall through to the
    default database, so we raise instead: a write attempt is a bug worth
    surfacing as a 500 rather than silently letting SQLite reject it later.
    """

    def db_for_read(self, model, **hints):
        return "default"

    def db_for_write(self, model, **hints):
        raise ArchiveIsReadOnly(
            f"{model.__name__} is part of a frozen archive (snapshot "
            f"{SNAPSHOT_DATE}) and cannot be written to."
        )

    def allow_relation(self, obj1, obj2, **hints):
        return True

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        # Nothing may migrate: the schema is as frozen as the rows. This also
        # means `manage.py migrate` is a no-op rather than an error, so the
        # container never needs to run it.
        return False
