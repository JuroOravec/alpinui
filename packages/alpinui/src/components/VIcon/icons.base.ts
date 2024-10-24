// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { JSXComponent, PropType } from 'vue';
import type { RawSlots } from '@/engines/types';

export type IconValue =
  | string
  | (string | [path: string, opacity: number])[]
  | JSXComponent
export const IconValue = [String, Function, Object, Array] as PropType<IconValue>;

export interface IconSlots extends RawSlots {
  default: never;
}

export const makeIconProps = propsFactory({
  icon: {
    type: IconValue,
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true,
  },
}, 'icon');

export const _ComponentIcon = defineComponent({
  name: 'VComponentIcon',

  props: makeIconProps(),

  slots: makeSlots<IconSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    return {
      expose: {},
      renderInput: {},
    };
  },
  renderHeadless: () => null,
});

export const _SvgIcon = defineComponent({
  name: 'VSvgIcon',

  inheritAttrs: false,

  props: makeIconProps(),

  slots: makeSlots<IconSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    return {
      expose: {},
      renderInput: {
        icon: props.icon,
      },
    };
  },
  renderHeadless: () => null,
});

export const _LigatureIcon = defineComponent({
  name: 'VLigatureIcon',

  props: makeIconProps(),

  slots: makeSlots<IconSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    return {
      expose: {},
      renderInput: {
        icon: props.icon,
      },
    };
  },
  renderHeadless: () => null,
});

export const _ClassIcon = defineComponent({
  name: 'VClassIcon',

  props: makeIconProps(),

  slots: makeSlots<IconSlots>({
    default: null,
  }),

  setupHeadless(props) {
    return {
      expose: {},
      renderInput: {
        icon: props.icon,
      },
    };
  },
  renderHeadless: () => null,
});
