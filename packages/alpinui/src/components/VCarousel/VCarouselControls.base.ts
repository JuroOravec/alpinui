// Composables
import { useLocale } from '@/composables/locale';
import { useProxiedModel } from '@/composables/proxiedModel';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { normalizeClass, normalizeStyle } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';
import { IconValue } from '../VIcon/icons.base';
import type { GroupProvide, GroupProvideItem } from '@/composables/group';

export const makeVCarouselControlsProps = propsFactory({
  color: String,
  delimiterIcon: {
    type: IconValue,
    default: '$delimiter',
  },
  group: {
    type: Object as PropType<GroupProvide>,
    required: true,
  },
  hideDelimiters: Boolean,
  modelValue: null,
  progress: [Boolean, String],
  verticalDelimiters: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
}, 'VCarouselControls');

export type VCarouselControlsSlots = {
  item: {
    props: Record<string, any>;
    item: {
      id: number;
      value: unknown;
      disabled: boolean | undefined;
    };
  };
}

export const _CarouselControls = defineComponent({
  name: 'VCarouselControls',

  props: makeVCarouselControlsProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  slots: makeSlots<VCarouselControlsSlots>({
    item: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const model = useProxiedModel(vm, props, 'modelValue');
    const { t } = useLocale(vm);

    const itemsLength = computed(() => props.group.items.value.length);

    const genControlsItemProps = (item: GroupProvideItem, index: number) => ({
      id: `carousel-item-${item.id}`,
      'aria-label': t('$vuetify.carousel.ariaLabel.delimiter', index + 1, itemsLength.value),
      class: normalizeClass({
        'v-carousel__controls__item': true,
        'v-btn--active': props.group.isSelected(item.id),
      }),
      onClick: () => props.group.select(item.id, true),
    });

    // ////////////////////////////
    // Rendering variables
    // ////////////////////////////

    const controlsStyles = computed(() => normalizeStyle({
      left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
      right: props.verticalDelimiters === 'right' ? 0 : 'auto',
    }));

    const itemDefaults = computed(() => ({
      VBtn: {
        color: props.color,
        icon: props.delimiterIcon,
        size: 'x-small',
        variant: 'text',
      },
    }));

    const progressColor = computed(() => typeof props.progress === 'string' ? props.progress : undefined);
    const progressValue = computed(() => (props.group.getItemIndex(model.value) + 1) / itemsLength.value * 100);

    return {
      expose: {},
      renderInput: {
        controlsStyles,
        itemDefaults,
        itemsLength,
        genControlsItemProps,
        progressColor,
        progressValue,
      },
    };
  },
  renderHeadless: () => null,
});
