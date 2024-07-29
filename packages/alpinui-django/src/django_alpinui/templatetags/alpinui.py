from typing import Dict

import django.template
from django.template.defaultfilters import escape


# NOTE: Variable name `register` is required by Django to recognize this as a template tag library
# See https://docs.djangoproject.com/en/dev/howto/custom-template-tags
register = django.template.Library()


@register.filter(name="alpine_obj")
def alpine_obj(data: Dict):
    """
    Format a dict of JS expressions so it can be inlined as an HTML attribute.

    This is primarily meant for defining objects for AlpineJS bindings.

    ```py
    data = {"date": "new Date()", "sum": "1 + 1", "text": "'abc'"}
    \"\"\"
    <div x-bind="{{ data|alpine_obj }}" >
    \"\"\"
    # <div x-bind="{ date: new Date(), sum: 1 + 1, text: &#39;abc&#39; }" >
 
    ```
    """
    key_val_pairs = ", ".join(
        f"{key}: {val}" for key, val in data.items()
    )

    return escape("{ " + key_val_pairs + " }")
