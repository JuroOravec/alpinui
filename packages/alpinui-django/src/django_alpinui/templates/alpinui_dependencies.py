from django_components import component, types

ALPINUI_VERSION = "0.0.x"
ALPINE_VERSION = "3.x.x"

ALPINUI_JS_FILES = [
    "https://cdn.jsdelivr.net/npm/alpine-provide-inject@0.2.x/dist/cdn.min.js",
    "https://cdn.jsdelivr.net/npm/alpine-reactivity@0.1.x/dist/cdn.min.js",
    "https://cdn.jsdelivr.net/npm/alpine-composition@0.1.x/dist/cdn.min.js",
    "https://cdn.jsdelivr.net/npm/alpinui@{version}/dist/alpinui.min.js",
]

ALPINUI_CSS_FILES = [
    "https://cdn.jsdelivr.net/npm/alpinui@{version}/dist/alpinui.min.css",
]

ALPINE_JS_FILES = [
    "https://cdn.jsdelivr.net/npm/alpinejs@{version}/dist/cdn.min.js",
]


@component.register("AlpinuiJs")
class AlpinuiJs(component.Component):
    def get_context_data(
        self,
        *args,
        defer: bool = True,
        minified: bool = True,
        version: str = ALPINUI_VERSION,
        alpine_version: str = ALPINE_VERSION,
    ):
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

        {% if component_vars.is_filled.init %}
            <script {{ defer }}>
                document.addEventListener('alpine:init', () => {
                    {% slot "init_js" default %}
                        Alpinui.createAlpinui().install(Alpine);
                    {% endslot %}
                });
            </script>
        {% endif %}

        {% for script in alpine_scripts %}
            <script {{ defer }} src="{{ script }}"></script>
        {% endfor %}
    """


@component.register("AlpinuiCss")
class AlpinuiCss(component.Component):
    def get_context_data(
        self,
        *args,
        minified: bool = True,
        version: str = ALPINUI_VERSION,
    ):
        links = [s.format(version=version) for s in ALPINUI_CSS_FILES]
        if not minified:
            links = [s.replace(".min.css", ".css") for s in links]

        return {
            "links": links,
        }

    template: types.django_html = """
        {% for links in links %}
            <link rel="stylesheet" href="{{ link }}">
        {% endfor %}
    """
