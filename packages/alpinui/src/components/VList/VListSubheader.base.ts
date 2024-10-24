// Composables
import { useTextColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVListSubheaderProps = propsFactory({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListSubheader');

export interface VListSubheaderSlots extends RawSlots {
  default: never;
}

export const _ListSubheader = defineComponent({
  name: 'VListSubheader',

  props: makeVListSubheaderProps(),

  slots: makeSlots<VListSubheaderSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { textColorClasses, textColorStyles } = useTextColor(vm, toRef(props, 'color'));

    const rootClasses = computed(() => normalizeClass([
      'v-list-subheader',
      {
        'v-list-subheader--inset': props.inset,
        'v-list-subheader--sticky': props.sticky,
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
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
