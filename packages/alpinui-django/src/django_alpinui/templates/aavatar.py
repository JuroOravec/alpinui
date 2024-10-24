from django_components import types, register

from django_alpinui.gen.alpinui_types import AAvatarAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("AAvatar", registry=alpinui_registry)
class AAvatar(AAvatarAlpineCls):
    template: types.django_html = """
        {% load alpinui %}
    
        {% _ASlot name="avatar" slot="default" id=self.component_id data="{}" %}
            {% slot "default" default / %}
        {% /_ASlot %}
    
        <{{ tag }}
            {% html_attrs attrs
                class="v-avatar"
                x-bind="genAttrs(() => ({
                    class: rootClasses.value,
                    style: rootStyles.value,
                }))"
            %}
        >

          {% if self.is_filled.default %}
            {% ADefaultsProvider
              attrs:key="content-defaults"
              js:defaults="contentDefaults.value"
            %}
              {% _ASlotTarget name="avatar" slot="default" id=self.component_id / %}
            {% /ADefaultsProvider %}
          {% else %}

            {% comment %} This section corresponds to:
              props.image
                ? (<VImg key="image" src={ props.image } alt="" cover />)
                : props.icon
                  ? (<VIcon key="icon" icon={ props.icon } />)
                  : props.text
            {% endcomment %}
            {% _AIf py=True js="$props.image" %}
              {% AImg
                attrs:key="image"
                js:src="$props.image"
                alt=""
                cover=True
              / %}
            {% /_AIf %}

            {% _AIf py=True js="!$props.image && $props.icon" %}
              {% AIcon
                attrs:key="icon"
                js:icon="$props.icon"
              / %}
            {% /_AIf %}

            {% _AIf py=True js="!$props.image && !$props.icon" %}
              <span x-text="$props.text"></span>
            {% /_AIf %}
          {% endif %}

          {% _AOverlays is_clickable=False name="v-alert" / %}
        </{{ tag }}>
    """
