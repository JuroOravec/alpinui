from typing import Dict

from django.templatetags.static import static
from django_components import component, types

from django_alpinui.templatetags.alpinui import alpinui_registry

ALPINUI_VERSION = "0.0.x"
ALPINE_VERSION = "3.x.x"

ALPINUI_JS_FILES = [
    "https://cdn.jsdelivr.net/npm/alpine-alpine@0.1.x/dist/cdn.min.js",
    "https://cdn.jsdelivr.net/npm/alpine-provide-inject@0.3.x/dist/cdn.min.js",
    # "https://cdn.jsdelivr.net/npm/alpine-reactivity@0.1.x/dist/cdn.min.js",
    "https://cdn.jsdelivr.net/npm/alpine-reactivity@0.1.x/dist/cdn.js",
    # "https://cdn.jsdelivr.net/npm/alpine-composition@0.1.28/dist/cdn.min.js",
    "https://cdn.jsdelivr.net/npm/alpine-composition@0.1.28/dist/cdn.js",
    # "https://cdn.jsdelivr.net/npm/alpinui@{version}/dist/alpinui.min.js", # TODO
    static("alpinui/alpinui.js"),
    static("django_alpinui/utils.js"),
]

ALPINUI_CSS_FILES = [
    # "https://cdn.jsdelivr.net/npm/alpinui@{version}/dist/alpinui.min.css", # TODO
    static("alpinui/alpinui.css"),
]

ALPINE_JS_FILES = [
    "https://cdn.jsdelivr.net/npm/alpinejs@{version}/dist/cdn.js",
]


@component.register("AlpinuiJs", registry=alpinui_registry)
class AlpinuiJs(component.Component):
    def get_context_data(
        self,
        /,
        defer: bool = True,
        minified: bool = True,
        version: str = ALPINUI_VERSION,
        alpine_version: str = ALPINE_VERSION,
    ) -> Dict:
        scripts = [s.format(version=version) for s in ALPINUI_JS_FILES]
        if not minified:
            scripts = [s.replace(".min.js", ".js") for s in scripts]

        alpine_scripts = [s.format(version=alpine_version) for s in ALPINE_JS_FILES]
        if not minified:
            alpine_scripts = [s.replace(".min.js", ".js") for s in alpine_scripts]

        return {
            "defer": "defer" if defer else "",
            "scripts": scripts,
            "alpine_scripts": alpine_scripts,
        }

    template: types.django_html = """
        {% for script in scripts %}
            <script {{ defer }} src="{{ script }}"></script>
        {% endfor %}

        <script {{ defer }}>
            document.addEventListener('alpine:init', () => {
                {% slot "init_js" default %}
                    Alpinui.createAlpinui().install(Alpine);
                {% endslot %}
            });
        </script>

        {% for script in alpine_scripts %}
            <script {{ defer }} src="{{ script }}"></script>
        {% endfor %}
    """


# TODO - The CSS and JS could be simply defined as Media.js/css, so the place where
#        they'd be rendered would be decided by django-components.
@component.register("AlpinuiCss", registry=alpinui_registry)
class AlpinuiCss(component.Component):
    def get_context_data(
        self,
        /,
        minified: bool = True,
        version: str = ALPINUI_VERSION,
    ) -> Dict:
        links = [s.format(version=version) for s in ALPINUI_CSS_FILES]
        if not minified:
            links = [s.replace(".min.css", ".css") for s in links]

        return {
            "links": links,
        }

    template: types.django_html = """
        {% for link in links %}
            <link rel="stylesheet" href="{{ link }}" >
        {% endfor %}
    """
