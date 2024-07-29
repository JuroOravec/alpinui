from django.apps import AppConfig


class AlpinuiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "django_alpinui"

    # This is the code that gets run when user adds django_alpinui
    # to Django's INSTALLED_APPS
    def ready(self) -> None:
        from django_alpinui.templates import (
            adivider,
            alpinui,
            alpinui_dependencies,
        )
