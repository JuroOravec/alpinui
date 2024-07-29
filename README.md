# Django Alpinui

Material design UI component library for Django based on AlpineJS and Vuetify.

**🚧🚧 Alpinui is still under development 🚧🚧**

## Demo

Click on the image to watch the video:

<a href="https://www.youtube.com/watch?v=V0tMYsy3RgQ" target="_blank">

![](https://i9.ytimg.com/vi_webp/V0tMYsy3RgQ/sddefault.webp?v=66a78243&sqp=COiDnrUG&rs=AOn4CLATj_kEHlS1Q9WWCqCI8zkv9VXdEQ)

</a>

## Installation

1. Install dependencies
    ```sh
    pip install django_alpinui django_components
    ```

2. Add `django_alpinui` and `django_components` to `INSTALLED_APPS` in your `settings.py`

    ```py
    INSTALLED_APPS = [
        "django_components",
        "django_components.safer_staticfiles",
        "django_alpinui",
        ...
    ]
    ```

3. Follow the installation instructions for [`django_components`](https://github.com/EmilStenstrom/django-components), so you can use its tags from within Django templates.

4. Add Alpinui JS and CSS dependencies

    ```django
    <!DOCTYPE html>
    <html lang="en">
        <head>
            {% component "AlpinuiCss" %}{% endcomponent %}
            {% component "AlpinuiJs" %}{% endcomponent %}
        </head>
        <body>
        </body>
    </html>
    ```

## Usage

```py
from typing import Any, Dict

from django_components import component, types


class AlpinuiDemo(component.Component):
    def get(self, request, *args, **kwargs):
        return self.render_to_response()

    def get_context_data(self, *args, **kwargs) -> Dict[str, Any]:
        return {}

    template: types.django_html = """
        {% component "Alpinui" %}
            {% component "ADivider" opacity=0.3 attrs:style="margin:20px" %}
                My content hello!
            {% endcomponent %}
        {% endcomponent %}
    """
```
