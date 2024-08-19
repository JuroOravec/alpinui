from django.apps import AppConfig


class DjangoExprConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "django_expr"

    # This is the code that gets run when user adds django_expr
    # to Django's INSTALLED_APPS
    def ready(self) -> None:
        pass
