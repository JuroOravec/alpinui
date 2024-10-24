// Utilities
import { _ClassIcon, _ComponentIcon, _LigatureIcon, _SvgIcon } from './icons.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { JSXComponent } from 'vue';
import type { IconSlots } from './icons.base';

export { makeIconProps, IconSlots, IconValue } from './icons.base';

export const VComponentIcon = genericVueComponent<IconSlots>()({
  ..._ComponentIcon,
  renderHeadless: (vm, _, { props, slots }) => {
    const Icon = props.icon as JSXComponent;
    return (
      <props.tag>
        { props.icon ? <Icon /> : slots.default?.() }
      </props.tag>
    );
  },
});

export type VComponentIcon = InstanceType<typeof VComponentIcon>;

export const VSvgIcon = genericVueComponent<IconSlots>()({
  ..._SvgIcon,
  renderHeadless: (vm, { icon }, { attrs, props }) => {
    return (
      <props.tag { ...attrs } style={ null }>
        <svg
          class="v-icon__svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
        >
          { Array.isArray(icon)
            ? icon.map((path) => (
              Array.isArray(path)
                ? <path d={ path[0] as string } fill-opacity={ path[1] }></path>
                : <path d={ path as string }></path>
            ))
            : <path d={ icon as string }></path>
          }
        </svg>
      </props.tag>
    );
  },
});

export type VSvgIcon = InstanceType<typeof VSvgIcon>;

export const VLigatureIcon = genericVueComponent<IconSlots>()({
  ..._LigatureIcon,
  renderHeadless: (vm, { icon }, { attrs, props }) => {
    return <props.tag>{ icon }</props.tag>;
  },
});

export type VLigatureIcon = InstanceType<typeof VLigatureIcon>;

export const VClassIcon = genericVueComponent<IconSlots>()({
  ..._ClassIcon,
  renderHeadless: (vm, { icon }, { attrs, props }) => {
    return <props.tag class={ icon }></props.tag>;
  },
});

export type VClassIcon = InstanceType<typeof VClassIcon>;
