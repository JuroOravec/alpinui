from django.apps import AppConfig


class AlpinuiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "django_alpinui"

    # This is the code that gets run when user adds django_alpinui
    # to Django's INSTALLED_APPS
    def ready(self) -> None:
        from django_alpinui.templates import (
            # Internal
            _aoverlays,
            _aif,
            _slot,
            # Custom
            alpinui,
            alpinui_dependencies,
            # Vuetify / Alpinui components
            aalert,
            aalerttitle,
            aapp,
            aappbarnavicon,
            aappbartitle,
            aavatar,
            abadge,
            abannertext,
            acardtitle,
            acode,
            adefaultsprovider,
            adivider,
            akbd,
            alabel,
            alistgroupactivator,
            alistimg,
            alistitemtitle,
            alocaleprovider,
            anossr,
            apickertitle,
            aspacer,
            astepperheader,
            atable,
        )

        # TODO
        from django_alpinui.templatetags.alpinui import register
        print(register.tags)
