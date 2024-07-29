from typing import Dict, Optional

from django_components import component, types

from django_alpinui.templatetags.alpinui import alpine_obj


@component.register("ADividerWrapper")
class ADividerWrapper(component.Component):
    def get_context_data(
        self,
        *args,
        attrs: Optional[Dict] = None,
    ):
        return {
            "attrs": attrs,
        }

    template: types.django_html = """
        <div
          {% html_attrs attrs class="a-divider" %}
          :class="wrapperClasses"
        >
          {% slot "divider" %}{% endslot %}

          <div class="a-divider__content">
            {% slot "default" default %}{% endslot %}
          </div>

          {% slot "divider" %}{% endslot %}
        </div>
    """


@component.register("ADividerRuler")
class ADividerRuler(component.Component):
    def get_context_data(
        self,
        *args,
        attrs: Optional[Dict] = None,
    ):
        return {
            "attrs": attrs,
        }

    template: types.django_html = """
        <hr
            {% html_attrs attrs class="a-divider" %}

            {# AlpineJS binding #}
            :class="hrClasses"
            :style="hrStyles"
            :aria-orientation="hrAriaOrient"
            :role="hrRole"
        />
    """


@component.register("ADivider")
class ADivider(component.Component):
    def get_context_data(
        self,
        *args,
        opacity: Optional[str | float] = None,
        attrs: Optional[Dict] = None,
    ):
        props = alpine_obj({"opacity": opacity})
        attrs = {
            **(attrs or {}),
            "x-data": "ADivider",
            "x-props": props,
        }

        return {
            "attrs": attrs,
        }

    template: types.django_html = """
        {% if component_vars.is_filled.default %}
            {% component "ADividerWrapper" attrs=attrs %}
                {% fill "divider" %}
                    {% component "ADividerRuler" %}
                    {% endcomponent %}
                {% endfill %}
                {% fill "default" %}
                    {% slot "default" default %}{% endslot %}
                {% endfill %}
            {% endcomponent %}

        {% else %}
            {% component "ADividerRuler" attrs=attrs %}
            {% endcomponent %}
        {% endif %}
    """
