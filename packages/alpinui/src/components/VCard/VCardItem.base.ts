// Composables
import { makeComponentProps, useComponent } from '@/composables/component';
import { makeDensityProps } from '@/composables/density';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import { IconValue } from '../VIcon/icons.base';

export type VCardItemSlots = {
  default: never;
  prepend: never;
  append: never;
  title: never;
  subtitle: never;
}

export const makeVCardItemProps = propsFactory({
  appendAvatar: String,
  appendIcon: IconValue,
  prependAvatar: String,
  prependIcon: IconValue,
  subtitle: [String, Number],
  title: [String, Number],

  ...makeComponentProps(),
  ...makeDensityProps(),
}, 'VCardItem');

export const _CardItem = defineComponent({
  name: 'VCardItem',

  props: makeVCardItemProps(),

  slots: makeSlots<VCardItemSlots>({
    default: null,
    prepend: null,
    append: null,
    title: null,
    subtitle: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);

    const rootClasses = computed(() => normalizeClass([
      'v-card-item',
      classes.value,
    ]));

    const prependDefaults = computed(() => ({
      VAvatar: {
        density: props.density,
        image: props.prependAvatar,
      },
      VIcon: {
        density: props.density,
        icon: props.prependIcon,
      },
    }));
    const appendDefaults = computed(() => ({
      VAvatar: {
        density: props.density,
        image: props.appendAvatar,
      },
      VIcon: {
        density: props.density,
        icon: props.appendIcon,
      },
    }));

    return {
      expose: {},
      renderInput: {
        rootClasses,
        rootStyles: styles,
        prependDefaults,
        appendDefaults,
      },
    };
  },
  renderHeadless: () => null,
});
