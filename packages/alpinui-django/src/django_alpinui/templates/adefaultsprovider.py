from django_alpinui.gen.alpinui_types import ADefaultsProviderAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.renderless import create_simple_renderless


ADefaultsProvider = create_simple_renderless(
    name="ADefaultsProvider",
    cls=ADefaultsProviderAlpineCls,
    path=__name__,
)

alpinui_registry.register("ADefaultsProvider", ADefaultsProvider)
