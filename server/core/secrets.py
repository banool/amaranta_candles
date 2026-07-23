import os
import secrets as secrets_module

SQLITE_ENGINE = "django.db.backends.sqlite3"

# Every deployment needs these.
REQUIRED = ["allowed_hosts", "sql_engine", "sql_database"]

# A networked database also needs credentials and an address. SQLite is just a
# file path, so requiring these would mean inventing four fake values -- which
# is exactly what .env.dev_sqlite used to do (sql_user=fake, sql_host=fake...).
REQUIRED_FOR_NETWORKED_DB = ["sql_user", "sql_password", "sql_host", "sql_port"]

sql_engine = os.environ.get("sql_engine")
is_sqlite = sql_engine == SQLITE_ENGINE

secrets = {
    "allowed_hosts": os.environ.get("allowed_hosts"),
    "secret_key": os.environ.get("secret_key"),
    "sql_engine": sql_engine,
    "sql_database": os.environ.get("sql_database"),
    "sql_user": os.environ.get("sql_user"),
    "sql_password": os.environ.get("sql_password"),
    "sql_host": os.environ.get("sql_host"),
    "sql_port": os.environ.get("sql_port"),
}

required = list(REQUIRED)
if not is_sqlite:
    required += REQUIRED_FOR_NETWORKED_DB

missing = [k for k in required if secrets[k] is None]
if missing:
    raise RuntimeError(f"These environment variables weren't set: {missing}")

# SECRET_KEY is deliberately optional. Django only uses it to sign things that
# outlive a single request -- sessions, auth tokens, password-reset links, the
# CSRF cookie -- and the archive has none of those: no sessions, no auth, no
# admin, no cookies, no forms (see INSTALLED_APPS in core/settings.py). Nothing
# signed has to stay valid across a restart, so a per-process random key is
# strictly safer than shipping a real one: this deployment then carries no
# secret at all, and there is nothing to leak, seal, rotate, or accidentally
# commit to this (public) repo.
if not secrets["secret_key"]:
    secrets["secret_key"] = secrets_module.token_urlsafe(64)

secrets["allowed_hosts"] = secrets["allowed_hosts"].split(",")
