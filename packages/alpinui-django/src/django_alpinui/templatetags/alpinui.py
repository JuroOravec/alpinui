from django.template.library import Library
from django_components import ComponentRegistry, RegistrySettings, ShorthandComponentFormatter

# NOTE: Variable name `register` is required by Django to recognize this as a template tag library
# See https://docs.djangoproject.com/en/dev/howto/custom-template-tags
register = Library()


class AlpinuiTagFormatter(ShorthandComponentFormatter):
    def end_tag(self, name: str) -> str:
        return f"/{name}"


alpinui_tag_formatter = AlpinuiTagFormatter()

# Use with default Library
alpinui_registry = ComponentRegistry(
    library=register,
    settings=RegistrySettings(
        # TODO
        context_behavior="isolated",
        tag_formatter=alpinui_tag_formatter,
        # CONTEXT_BEHAVIOR="isolated",
        # TAG_FORMATTER=alpinui_tag_formatter,
    ),
)
