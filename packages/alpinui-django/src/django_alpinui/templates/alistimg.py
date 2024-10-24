from django_alpinui.gen.alpinui_types import AListImgAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

AListImg = create_simple_functional(
    name="AListImg",
    cls=AListImgAlpineCls,
    path=__name__,
    slot_name="list-img",
    css_class="v-list-img",
    tag="div",
)

alpinui_registry.register("AListImg", AListImg)
