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

export const makeVCardSubtitleProps = propsFactory({
  opacity: [Number, String],

  ...makeComponentProps(),
  ...makeTagProps(),
}, 'VCardSubtitle');

export interface VCardSubtitleSlots extends RawSlots {
  default: never;
}

export const _CardSubtitle = defineComponent({
  name: 'VCardSubtitle',

  props: makeVCardSubtitleProps(),

  slots: makeSlots<VCardSubtitleSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-card-subtitle',
      classes.value,
    ]));
    const rootStyles = computed(() => normalizeStyle([
      { '--v-card-subtitle-opacity': props.opacity },
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
