// Styles
import './VSkeletonLoader.sass';

// Composables
import { useBackgroundColor } from '@/composables/color';
import { makeDimensionProps, useDimension } from '@/composables/dimensions';
import { makeElevationProps, useElevation } from '@/composables/elevation';
import { useLocale } from '@/composables/locale';
import { makeThemeProps, provideTheme } from '@/composables/theme';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, wrapInArray } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType, VNode } from 'vue';
import type { RawSlots } from '@/engines/types';

type VSkeletonBone<T> = T | VSkeletonBone<T>[]

export type VSkeletonBones = VSkeletonBone<VNode>
export type VSkeletonLoaderType = keyof typeof rootTypes

export const rootTypes = {
  actions: 'button@2',
  article: 'heading, paragraph',
  avatar: 'avatar',
  button: 'button',
  card: 'image, heading',
  'card-avatar': 'image, list-item-avatar',
  chip: 'chip',
  'date-picker': 'list-item, heading, divider, date-picker-options, date-picker-days, actions',
  'date-picker-options': 'text, avatar@2',
  'date-picker-days': 'avatar@28',
  divider: 'divider',
  heading: 'heading',
  image: 'image',
  'list-item': 'text',
  'list-item-avatar': 'avatar, text',
  'list-item-two-line': 'sentences',
  'list-item-avatar-two-line': 'avatar, sentences',
  'list-item-three-line': 'paragraph',
  'list-item-avatar-three-line': 'avatar, paragraph',
  ossein: 'ossein',
  paragraph: 'text@3',
  sentences: 'text@2',
  subtitle: 'text',
  table: 'table-heading, table-thead, table-tbody, table-tfoot',
  'table-heading': 'chip, text',
  'table-thead': 'heading@6',
  'table-tbody': 'table-row-divider@6',
  'table-row-divider': 'table-row, divider',
  'table-row': 'text@6',
  'table-tfoot': 'text@2, avatar@2',
  text: 'text',
} as const;

export const makeVSkeletonLoaderProps = propsFactory({
  boilerplate: Boolean,
  color: String,
  loading: Boolean,
  loadingText: {
    type: String,
    default: '$vuetify.loading',
  },
  type: {
    type: [String, Array] as PropType<
      | VSkeletonLoaderType | (string & {})
      | ReadonlyArray<VSkeletonLoaderType | (string & {})>
    >,
    default: 'ossein',
  },

  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeThemeProps(),
}, 'VSkeletonLoader');

export interface VSkeletonLoaderSlots extends RawSlots {
  default: never;
}

export const _SkeletonLoader = defineComponent({
  name: 'VSkeletonLoader',

  props: makeVSkeletonLoaderProps(),

  slots: makeSlots<VSkeletonLoaderSlots>({
    default: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(vm, toRef(props, 'color'));
    const { dimensionStyles } = useDimension(vm, props);
    const { elevationClasses } = useElevation(vm, props);
    const { themeClasses } = provideTheme(vm, props);
    const { t } = useLocale(vm);

    const items = computed(() => wrapInArray(props.type).join(','));

    const rootClasses = computed(() => normalizeClass([
      'v-skeleton-loader',
      {
        'v-skeleton-loader--boilerplate': props.boilerplate,
      },
      themeClasses.value,
      backgroundColorClasses.value,
      elevationClasses.value,
    ]));

    const loadingText = computed(() => t(props.loadingText));

    return {
      expose: {},
      renderInput: {
        items,
        backgroundColorStyles,
        dimensionStyles,
        rootClasses,
        loadingText,
      },
    };
  },
  renderHeadless: () => null,
});
