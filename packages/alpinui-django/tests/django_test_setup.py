from pathlib import Path

import django
from django.conf import settings


def setup_test_config():
    if settings.configured:
        return

    settings.configure(
        BASE_DIR=Path(__file__).resolve().parent,
        INSTALLED_APPS=(
            "django_components",
            "django_alpinui",
        ),
        TEMPLATES=[
            {
                "BACKEND": "django.template.backends.django.DjangoTemplates",
                "DIRS": [
                    "tests/templates/",
                    "tests/components/",  # Required for template relative imports in tests
                ],
            }
        ],
        COMPONENTS={
            "template_cache_size": 128,
            "autodiscover": False,
        },
        MIDDLEWARE=["django_components.middleware.ComponentDependencyMiddleware"],
        DATABASES={
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": ":memory:",
            }
        },
    )

    django.setup()
