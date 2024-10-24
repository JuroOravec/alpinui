// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { RawSlots } from '@/engines/types';

export const makeVListItemSubtitleProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VListItemSubtitle');

export interface VListItemSubtitleSlots extends RawSlots {
  default: never;
}

export const _ListItemSubtitle = defineComponent({
  name: 'VListItemSubtitle',

  props: makeVListItemSubtitleProps(),

  slots: makeSlots<VListItemSubtitleSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-list-item-subtitle',
      classes.value,
    ]));

    const rootStyles = computed(() => normalizeStyle([
      { '--v-list-item-subtitle-opacity': props.opacity },
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
