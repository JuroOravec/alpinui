// Composables
import { useLocale } from '@/composables/locale';

// Types
import type { IconValue } from '../VIcon/icons.base';
import type { HeadlessInstance } from '@/engines/types';

type names = 'clear' | 'prepend' | 'append' | 'appendInner' | 'prependInner'

type EventProp<T = (...args: any[]) => any> = T | T[]
type InputIconProps<T extends names> = {
  label?: string | undefined;
} & {
  [K in `${T}Icon`]?: IconValue | undefined
} & {
  [K in `onClick:${T}`]?: EventProp | undefined
}

type Listeners<T extends {}, U = keyof T> = U extends `onClick:${infer V extends names}` ? V : never

const localeKeys = {
  prepend: 'prependAction',
  prependInner: 'prependAction',
  append: 'appendAction',
  appendInner: 'appendAction',
  clear: 'clear',
};

// NOTE(Alpinui): Refactored from JSX to composable that just returns the props
export function useInputIcon<T extends {}, K extends names = Listeners<T>>(
  vm: HeadlessInstance,
  props: T & InputIconProps<K>,
) {
  const { t } = useLocale(vm);

  const getInputIconProps = (name: Extract<names, K>) => {
    const localeKey = localeKeys[name];
    const listener = props[`onClick:${name}`];
    const label = listener && localeKey
      ? t(`$vuetify.input.${localeKey}`, props.label ?? '')
      : undefined;

    return {
      icon: props[`${name}Icon`],
      'aria-label': label,
      onClick: listener,
    };
  };

  return {
    getInputIconProps,
  };
}
