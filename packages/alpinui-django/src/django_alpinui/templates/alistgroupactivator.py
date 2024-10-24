from django_alpinui.gen.alpinui_types import AListGroupActivatorAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.renderless import create_simple_renderless


AListGroupActivator = create_simple_renderless(
    name="AListGroupActivator",
    cls=AListGroupActivatorAlpineCls,
    path=__name__,
)

alpinui_registry.register("AListGroupActivator", AListGroupActivator)
