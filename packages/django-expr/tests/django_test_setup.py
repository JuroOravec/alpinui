from pathlib import Path

import django
from django.conf import settings


def setup_test_config():
    if settings.configured:
        return

    settings.configure(
        BASE_DIR=Path(__file__).resolve().parent,
        INSTALLED_APPS=("django_expr",),
        TEMPLATES=[
            {
                "BACKEND": "django.template.backends.django.DjangoTemplates",
            }
        ],
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": ":memory:",
            }
        },
        EXPR_ALLOW_FUNC_CALLS=True,
    )

    django.setup()
