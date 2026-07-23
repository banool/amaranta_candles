"""Root URL configuration.

Deliberately short. What is *absent* here is most of the point:

  - No `admin/`. The Django admin is a complete CRUD interface over every
    model; on a public archive it is the single largest write surface, so the
    app is uninstalled entirely rather than merely unrouted.
  - No `accounts/`. `django.contrib.auth`'s login, logout and password-reset
    views have no meaning without users, and every one of them is an
    unauthenticated POST endpoint.
  - No `graphql`. The GraphQL schema shipped eleven mutations, none of which
    checked anything at all, plus an interactive GraphiQL console. The whole
    module is deleted; the REST API already serves everything the UI reads.

The UI is served by WhiteNoise from the web root (see WHITENOISE_ROOT in
core/settings.py), so "/" is handled before Django's URL resolver sees it.
"""

from django.urls import include, path

urlpatterns = [
    path("api/", include("amaranta_candles.urls")),
]
