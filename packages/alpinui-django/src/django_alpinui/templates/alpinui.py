from django_components import types, register

from django_alpinui.gen.alpinui_types import AlpinuiAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


# TODO
# class AlpinuiOptions(TypedDict):
#     blueprint?: Blueprint
#     date?: DateOptions
#     defaults?: DefaultsOptions
#     display?: DisplayOptions
#     goTo?: GoToOptions
#     theme?: ThemeOptions
#     icons?: IconOptions
#     locale?: LocaleOptions & RtlOptions
#     ssr?: SSROptions


@register("Alpinui", registry=alpinui_registry)
class Alpinui(AlpinuiAlpineCls):
    template: types.django_html = """
        <div {% html_attrs attrs %} class="v-alpinui">
            {% slot "default" default / %}
        </div>
    """
