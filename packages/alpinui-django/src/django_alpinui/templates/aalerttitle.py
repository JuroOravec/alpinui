from django_alpinui.gen.alpinui_types import AAlertTitleAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

AAlertTitle = create_simple_functional(
    name="AAlertTitle",
    cls=AAlertTitleAlpineCls,
    path=__name__,
    slot_name="alert-title",
    css_class="v-alert-title",
    tag="div",
)

alpinui_registry.register("AAlertTitle", AAlertTitle)
