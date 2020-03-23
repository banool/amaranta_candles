import os

secrets = {
    # Base settings
    "allowed_hosts": os.environ.get("allowed_hosts"),
    "secret_key": os.environ.get("secret_key"),
    # MySQL
    "sql_engine": os.environ.get("sql_engine"),
    "sql_database": os.environ.get("sql_database"),
    "sql_user": os.environ.get("sql_user"),
    "sql_password": os.environ.get("sql_password"),
    "sql_host": os.environ.get("sql_host"),
    "sql_port": os.environ.get("sql_port"),
    # Admin user
    "ui_username": os.environ.get("ui_username"),
    "ui_email": os.environ.get("ui_email"),
    "ui_password": os.environ.get("ui_password"),
}

invalid = []
for k, v in secrets.items():
    if v is None:
        invalid.append(k)

if invalid:
    raise RuntimeError(f"These environment variables weren't set: {invalid}")

secrets["allowed_hosts"] = secrets["allowed_hosts"].split(",")
