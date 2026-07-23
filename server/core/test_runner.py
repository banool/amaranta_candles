from django.test.runner import DiscoverRunner


class ArchiveTestRunner(DiscoverRunner):
    """Test runner that does not create (or destroy) a test database.

    Django's default runner builds a fresh test database before the suite runs,
    whatever the test cases are -- `SimpleTestCase.databases` only controls
    whether queries are *permitted*, not whether a database is created. For this
    suite that is exactly wrong: the point is to assert things about the real,
    read-only archive, and running against an empty generated database instead
    would make "you cannot write to it" trivially and misleadingly pass.

    Skipping setup leaves `connection` pointed at the archive named by
    sql_database. That is safe for the obvious reason: the connection is
    read-only, so the suite cannot damage what it is inspecting.
    """

    def setup_databases(self, **kwargs):
        return []

    def teardown_databases(self, old_config, **kwargs):
        pass
