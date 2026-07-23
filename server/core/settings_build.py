"""Settings used *only* to build the archive snapshot. Never used to serve it.

Creating the snapshot is the one operation that has to write to the database,
which is awkward when the whole point of core/settings.py is that it cannot.
The way out is a separate settings module rather than a flag: production has no
switch to flip, so no environment variable set against a running container can
restore write access. Selecting these settings requires control of
DJANGO_SETTINGS_MODULE at process start, which the container never does.

Used by scripts/build_archive.py. See core/archive.py for the layers this
temporarily steps around, and why that is safe here: this runs on a developer's
machine, against a throwaway file in a temp directory, before the data is
shipped anywhere.
"""

from core.settings import *  # noqa: F401,F403
from core.secrets import secrets

# No ReadOnlyRouter: `migrate` has to be allowed to create the schema.
DATABASE_ROUTERS = []

# A plain path rather than a mode=ro&immutable=1 URI, so the file can be
# created and populated.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": secrets["sql_database"],
    }
}
