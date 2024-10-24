// Icons
import { aliases } from '@/iconsets/mdi/mdi.base';

// Utilities
import { consoleWarn } from '@/util/console';
import { mergeDeep } from '@/util/helpers';

// Types
import type { InjectionKey, JSXComponent, Ref } from 'vue';
import type { IconValue } from '@/components/VIcon/icons.base';
import type { HeadlessInstance } from '@/engines/types';

export interface IconAliases {
  [name: string]: IconValue;
  complete: IconValue;
  cancel: IconValue;
  close: IconValue;
  delete: IconValue;
  clear: IconValue;
  success: IconValue;
  info: IconValue;
  warning: IconValue;
  error: IconValue;
  prev: IconValue;
  next: IconValue;
  checkboxOn: IconValue;
  checkboxOff: IconValue;
  checkboxIndeterminate: IconValue;
  delimiter: IconValue;
  sortAsc: IconValue;
  sortDesc: IconValue;
  expand: IconValue;
  menu: IconValue;
  subgroup: IconValue;
  dropdown: IconValue;
  radioOn: IconValue;
  radioOff: IconValue;
  edit: IconValue;
  ratingEmpty: IconValue;
  ratingFull: IconValue;
  ratingHalf: IconValue;
  loading: IconValue;
  first: IconValue;
  last: IconValue;
  unfold: IconValue;
  file: IconValue;
  plus: IconValue;
  minus: IconValue;
  calendar: IconValue;
}

export interface IconProps {
  tag: string;
  icon?: IconValue;
  disabled?: Boolean;
}

export type IconComponent = JSXComponent<IconProps> | string

export interface IconSet {
  component: IconComponent;
}

export type InternalIconOptions = {
  defaultSet: string;
  aliases: Partial<IconAliases>;
  sets: Record<string, IconSet>;
}

export type IconOptions = Partial<InternalIconOptions>

type IconInstance = {
  component: IconComponent;
  icon?: IconValue;
}

export const IconSymbol: InjectionKey<InternalIconOptions> = Symbol.for('vuetify:icons');

function genDefaults(vm: HeadlessInstance): Record<string, IconSet> {
  return {
    svg: {
      component: vm.icons.svg,
    },
    class: {
      component: vm.icons.class,
    },
  };
}

// Composables
export function createIcons(vm: HeadlessInstance, options?: IconOptions) {
  const sets = genDefaults(vm);

  // NOTE(Alpinui): In original Vuetify, Vue components are used for rendering icons.
  // However, in AlpineJS, we don't want to render the HTML, and we instead pass
  // around the component names that can be passed to `x-data`. Because of that,
  // the fallback icon set is defined for each implementation separately, and that's
  // why it's accessed via `vm.iconFallbackSet`.
  const { name: falllbackSetName, iconset: falllbackSet } = vm.iconFallbackSet;
  const defaultSet = options?.defaultSet ?? falllbackSetName;

  if (defaultSet === falllbackSetName && !(falllbackSetName in sets)) {
    sets[falllbackSetName] = falllbackSet;
  }

  return mergeDeep({
    defaultSet,
    sets,
    aliases: {
      ...aliases,
      /* eslint-disable max-len */
      vuetify: [
        'M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z',
        ['M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z', 0.6],
      ],
      'vuetify-outline': 'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z',
      'vuetify-play': [
        'm6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z',
        ['M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z', 0.6],
      ],
      /* eslint-enable max-len */
    },
  }, options) as InternalIconOptions;
}

export const useIcon = (vm: HeadlessInstance, props: Ref<IconValue | undefined>) => {
  const { computed, inject, unref } = vm.reactivity;

  const icons = inject(IconSymbol);

  if (!icons) throw new Error('Missing Vuetify Icons provide!');

  const iconData = computed<IconInstance>(() => {
    const iconAlias = unref(props);

    if (!iconAlias) return { component: vm.icons.component };

    let icon: IconValue | undefined = iconAlias;

    if (typeof icon === 'string') {
      icon = icon.trim();

      if (icon.startsWith('$')) {
        icon = icons.aliases?.[icon.slice(1)];
      }
    }

    if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`);

    if (Array.isArray(icon)) {
      return {
        component: vm.icons.svg,
        icon,
      };
    } else if (typeof icon !== 'string') {
      return {
        component: vm.icons.component,
        icon,
      };
    }

    const iconSetName = Object.keys(icons.sets).find(
      (setName) => typeof icon === 'string' && icon.startsWith(`${setName}:`)
    );

    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName ?? icons.defaultSet];

    return {
      component: iconSet.component,
      icon: iconName,
    };
  });

  return { iconData };
};
