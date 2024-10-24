// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeRouterProps, useRouterLink } from '@/composables/router';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVBreadcrumbsItemProps = propsFactory({
  active: Boolean,
  activeClass: String,
  activeColor: String,
  color: String,
  disabled: Boolean,
  title: String,

  ...makeComponentProps(),
  ...makeRouterProps(),
  ...makeTagProps({ tag: 'li' }),
}, 'VBreadcrumbsItem');

export interface VBreadcrumbsItemSlots extends RawSlots {
  default: never;
}

export const _BreadcrumbsItem = defineComponent({
  name: 'VBreadcrumbsItem',

  props: makeVBreadcrumbsItemProps(),

  slots: makeSlots<VBreadcrumbsItemSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const link = useRouterLink(vm, props, vm.attrs);
    const isActive = computed(() => props.active || link.isActive?.value);
    const color = computed(() => isActive.value ? props.activeColor : props.color);

    const { textColorClasses, textColorStyles } = useTextColor(vm, color);

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-breadcrumbs-item',
      {
        'v-breadcrumbs-item--active': !!isActive.value,
        'v-breadcrumbs-item--disabled': props.disabled,
        [`${props.activeClass}`]: !!(isActive.value && props.activeClass),
      },
      textColorClasses.value,
      classes.value,
    ]));
    const rootStyles = computed(() => normalizeStyle([
      textColorStyles.value,
      styles.value,
    ]));

    return {
      expose: {},
      renderInput: {
        isActive,
        link,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
