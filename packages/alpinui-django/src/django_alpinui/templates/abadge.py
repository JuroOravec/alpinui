from django_components import types, register

from django_alpinui.gen.alpinui_types import ABadgeAlpineCls
from django_alpinui.templatetags.alpinui import alpinui_registry


@register("ABadge", registry=alpinui_registry)
class ABadge(ABadgeAlpineCls):
    template: types.django_html = """
      {% load alpinui %}
  
      {% _ASlot name="badge" slot="default" id=self.component_id data="{}" %}
          {% slot "default" default / %}
      {% /_ASlot %}
      {% _ASlot name="badge" slot="badge" id=self.component_id data="{}" %}
          {% slot "badge" / %}
      {% /_ASlot %}

      <{{ tag }}
        {% html_attrs attrs
          class="v-badge"
          x-bind="genAttrs(() => ({
            class: rootClasses.value,
            style: styles.value,
            ...getBadgeAtts().attrs,
          }))"
        %}
      >
        <div class="v-badge__wrapper">
          {% _ASlotTarget name="badge" slot="default" id=self.component_id / %}

          <span
            class="v-badge__badge"
            aria-atomic="true"
            aria-live="polite"
            role="status"
            x-bind="genAttrs(() => ({
              'x-show': $props.modelValue,
              'aria-label': badgeAriaLabel.value,
              class: badgeClasses.value,
              style: badgeStyles.value,
              ...getBadgeAtts().badgeAttrs,
            }))"
          >
            {% comment %} Next section corresponds to:
            const theContent = props.dot
              ? undefined
              : slots.badge
                ? slots.badge?.()
                : props.icon
                  ? <VIcon icon={ props.icon } />
                  : content.value;
            {% endcomment %}
            {% if self.is_filled.badge %}
              {% _AIf py=True js="!$props.dot" %}
                {% _ASlotTarget name="badge" slot="badge" id=self.component_id / %}
              {% /_AIf %}
            {% else %}
              {% _AIf py=True js="!$props.dot && $props.icon" %}
                {% VIcon js:icon="$props.icon" / %}
              {% /_AIf %}
              {% _AIf py=True js="!$props.dot && !$props.icon" %}
                <span x-text="content.value"></span>
              {% /_AIf %}
            {% endif %}
          </span>
        </div>
      </{{ tag }}>
    """
