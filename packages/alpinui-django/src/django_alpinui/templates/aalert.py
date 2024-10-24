from django_components import types, register

from django_alpinui.gen.alpinui_types import AAlertAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("AAlert", registry=alpinui_registry)
class AAlert(AAlertAlpineCls):
    template: types.django_html = """
      {% load alpinui %}
          
      {% _ASlot name="alert" slot="prepend" id=self.component_id data="{}" %}
        {% slot "prepend" / %}
      {% /_ASlot %}
      {% _ASlot name="alert" slot="title" id=self.component_id data="{}" %}
        {% slot "title" / %}
      {% /_ASlot %}
      {% _ASlot name="alert" slot="text" id=self.component_id data="{}" %}
        {% slot "text" / %}
      {% /_ASlot %}
      {% _ASlot name="alert" slot="default" id=self.component_id data="{}" %}
        {% slot "default" default / %}
      {% /_ASlot %}
      {% _ASlot name="alert" slot="append" id=self.component_id data="{}" %}
        {% slot "append" / %}
      {% /_ASlot %}
      {% _ASlot name="alert" slot="close" id=self.component_id data="{ props: closeProps.value }" %}
        {% slot "close" / %}
      {% /_ASlot %}


      {% _AIf py=True js="isActive.value" %}
        <{{ tag }}
            {% html_attrs attrs
                role="alert"
                class="v-alert"
                x-bind="genAttrs(() => ({
                  class: rootClasses.value,
                  style: rootStyles.value,
                }))"
            %}
        >
          {% _AOverlays is_clickable=False name="v-alert" / %}

          {% _AIf py=True js="$props.border" %}
            <div
              key="border"
              class="v-alert__border"
              x-bind="genAttrs(() => ({
                class: borderClasses.value,
                style: textColorStyles.value,
              }))"
            />
          {% /_AIf %}        

          {# if hasPrepend #}
          {% _AIf py=True js="$initState.slots.prepend || icon.value" %}
            <div key="prepend" class="v-alert__prepend">
              {% if self.is_filled.prepend %}
                {% ADefaultsProvider
                  attrs:key="prepend-defaults"
                  js:disabled="!icon.value"
                  js:defaults="prependDefaults.value"
                %}
                  {% _ASlotTarget name="alert" slot="prepend" id=self.component_id / %}
                {% /ADefaultsProvider %}
              {% else %}
                {% AIcon
                    attrs:key="prepend-icon"
                    js:density="$props.density"
                    js:icon="icon.value"
                    js:size="iconSize.value"
                / %}
              {% endif %}
            </div>
          {% /_AIf %}

          <div class="v-alert__content">
            {# if hasTitle #}
            {% _AIf py=True js="$initState.slots.title || $props.title" %}
              {% AAlertTitle attrs:key="title" %}
                {# AKA `slots.title?.() ?? props.title` #}
                {% if self.is_filled.title %}
                  {% _ASlotTarget name="alert" slot="title" id=self.component_id / %}
                {% else %}
                  <span x-text="$props.title"></span>
                {% endif %}
              {% /AAlertTitle %}
            {% /_AIf %}

            {# AKA `slots.text?.() ?? props.text` #}
            {% if self.is_filled.text %}
              {% _ASlotTarget name="alert" slot="text" id=self.component_id / %}
            {% else %}
              <span x-text="$props.text"></span>
            {% endif %}

            {% _ASlotTarget name="alert" slot="default" id=self.component_id / %}
          </div>

          {% if self.is_filled.append %}
            <div key="append" class="v-alert__append">
              {% _ASlotTarget name="alert" slot="append" id=self.component_id / %}
            </div>
          {% endif %}

          {# if hasClose #}
          {% _AIf py=True js="$initState.slots.close || $props.closable" %}
            <div key="close" class="v-alert__close">
              {% if self.is_filled.close %}
                {% ADefaultsProvider
                  js:defaults="closeDefaults.value"
                  attrs:key="close-defaults"
                %}
                  {% _ASlotTarget name="alert" slot="close" id=self.component_id / %}
                {% /ADefaultsProvider %}
              {% else %}
                {% VBtn
                  size="x-small"
                  variant="text"
                  js:icon="$props.closeIcon"
                  js:spread="closeProps.value"
                  attrs:key="close-btn"
                / %}
              {% endif %}
            </div>
          {% /_AIf %}
        </{{ tag }}>
      {% /_AIf %}
    """
