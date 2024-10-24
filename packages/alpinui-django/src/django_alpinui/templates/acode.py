from django_alpinui.gen.alpinui_types import ACodeAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

ACode = create_simple_functional(
    name="ACode",
    cls=ACodeAlpineCls,
    path=__name__,
    slot_name="code",
    css_class="v-code",
    tag="div",
)

alpinui_registry.register("ACode", ACode)
