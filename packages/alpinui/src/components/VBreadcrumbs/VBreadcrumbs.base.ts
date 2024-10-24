// Styles
import './VBreadcrumbs.sass';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeComponentProps, useComponent } from '@/composables/component';
import { provideDefaults } from '@/composables/defaults';
import { makeDensityProps, useDensity } from '@/composables/density';
import { makeRoundedProps, useRounded } from '@/composables/rounded';
import { makeTagProps } from '@/composables/tag';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { LinkProps } from '@/composables/router';
import type { RawSlots } from '@/engines/types';

export type InternalBreadcrumbItem = Partial<LinkProps> & {
  title: string;
  disabled?: boolean;
}

export type BreadcrumbItem = string | InternalBreadcrumbItem

export const makeVBreadcrumbsProps = propsFactory({
  activeClass: String,
  activeColor: String,
  bgColor: String,
  color: String,
  disabled: Boolean,
  divider: {
    type: String,
    default: '/',
  },
  icon: IconValue,
  items: {
    type: Array as PropType<readonly BreadcrumbItem[]>,
    default: () => ([]),
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'ul' }),
}, 'VBreadcrumbs');

export interface VBreadcrumbsSlots<T extends BreadcrumbItem> extends RawSlots {
  prepend: never;
  title: { item: InternalBreadcrumbItem, index: number };
  divider: { item: T, index: number };
  item: { item: InternalBreadcrumbItem, index: number };
  default: never;
}

export const _Breadcrumbs = defineComponent({
  name: 'VBreadcrumbs',

  props: makeVBreadcrumbsProps(),

  slots: makeSlots<VBreadcrumbsSlots<any>>({
    prepend: null,
    title: null,
    divider: null,
    item: null,
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'bgColor'));
    const { densityClasses } = useDensity(vm, props);
    const { roundedClasses } = useRounded(vm, props);

    provideDefaults(vm, {
      VBreadcrumbsDivider: {
        divider: toRef(props, 'divider'),
      },
      VBreadcrumbsItem: {
        activeClass: toRef(props, 'activeClass'),
        activeColor: toRef(props, 'activeColor'),
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
      },
    });

    const items = computed(() => props.items.map((item) => {
      return typeof item === 'string' ? { item: { title: item }, raw: item } : { item, raw: item };
    }));

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const rootClasses = computed(() => normalizeClass([
      'v-breadcrumbs',
      backgroundColorClasses.value,
      densityClasses.value,
      roundedClasses.value,
      classes.value,
    ]));
    const rootStyles = computed(() => normalizeStyle([
      backgroundColorStyles.value,
      styles.value,
    ]));

    const prependDefaults = computed(() => ({
      VIcon: {
        icon: props.icon,
        start: true,
      },
    }));

    return {
      expose: {},
      renderInput: {
        items,
        prependDefaults,
        rootClasses,
        rootStyles,
      },
    };
  },
  renderHeadless: () => null,
});
