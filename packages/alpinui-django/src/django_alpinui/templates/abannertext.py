from django_alpinui.gen.alpinui_types import ABannerTextAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry
from django_alpinui.utils.simplefunctional import create_simple_functional

ABannerText = create_simple_functional(
    name="ABannerText",
    cls=ABannerTextAlpineCls,
    path=__name__,
    slot_name="banner-text",
    css_class="v-banner-text",
    tag="div",
)

alpinui_registry.register("ABannerText", ABannerText)
