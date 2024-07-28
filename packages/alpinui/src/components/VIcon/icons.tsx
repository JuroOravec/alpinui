// Utilities
import { defineComponent } from 'alpine-composition';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { JSXComponent, PropType } from 'vue';

export type IconValue =
  | string
  | (string | [path: string, opacity: number])[]
  | JSXComponent
export const IconValue = [String, Function, Object, Array] as PropType<IconValue>;

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

export const VComponentIcon = defineComponent({
  name: 'VComponentIcon',

  props: makeIconProps(),

  setup(props, vm) {
    const slots = {} as any; // TODO

    return () => {
      const Icon = props.icon as JSXComponent;
      return (
        <props.tag>
          { props.icon ? <Icon /> : slots.default?.() }
        </props.tag>
      );
    };
  },
});
export type VComponentIcon = typeof VComponentIcon;

export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',

  inheritAttrs: false,

  props: makeIconProps(),

  setup(props, vm) {
    const attrs = {} as any; // TODO

    return () => {
      return (
        <props.tag { ...attrs } style={ null }>
          <svg
            class="v-icon__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            { Array.isArray(props.icon)
              ? props.icon.map((path) => (
                Array.isArray(path)
                  ? <path d={ path[0] as string } fill-opacity={ path[1] }></path>
                  : <path d={ path as string }></path>
              ))
              : <path d={ props.icon as string }></path>
            }
          </svg>
        </props.tag>
      );
    };
  },
});
export type VSvgIcon = typeof VSvgIcon;

export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',

  props: makeIconProps(),

  setup(props, vm) {
    return () => {
      return <props.tag>{ props.icon }</props.tag>;
    };
  },
});
export type VLigatureIcon = typeof VLigatureIcon;

export const VClassIcon = defineComponent({
  name: 'VClassIcon',

  props: makeIconProps(),

  setup(props) {
    return () => {
      return <props.tag class={ props.icon }></props.tag>;
    };
  },
});
export type VClassIcon = typeof VClassIcon;
