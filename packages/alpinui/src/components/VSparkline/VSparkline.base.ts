// Components
import { _Barline, makeVBarlineProps } from './VBarline.base';
import { _Trendline, makeVTrendlineProps } from './VTrendline.base';

// Composables
import { useTextColor } from '@/composables/color';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { PropType } from 'vue';

export const makeVSparklineProps = propsFactory({
  type: {
    type: String as PropType<'trend' | 'bar'>,
    default: 'trend',
  },

  ...makeVBarlineProps(),
  ...makeVTrendlineProps(),
}, 'VSparkline');

export type VSparklineSlots = {
  default: void;
  label: { index: number, value: string };
}

export const _Sparkline = defineComponent({
  name: 'VSparkline',

  props: makeVSparklineProps(),

  slots: makeSlots<VSparklineSlots>({
    default: null,
    label: null,
  }),

  setupHeadless(props, vm) {
    const { computed, toRef } = vm.reactivity;

    const { textColorClasses, textColorStyles } = useTextColor(vm, toRef(props, 'color'));
    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        vm.hasSlots?.label
      );
    });
    const totalHeight = computed(() => {
      let height = parseInt(props.height, 10);

      if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5;

      return height;
    });

    const viewBox = computed(() => `0 0 ${props.width} ${parseInt(totalHeight.value, 10)}`);
    const lineProps = computed(() => props.type === 'trend'
      ? _Trendline.filterProps(props)
      : _Barline.filterProps(props)
    );

    return {
      expose: {},
      renderInput: {
        lineProps,
        textColorClasses,
        textColorStyles,
        viewBox,
      },
    };
  },
  renderHeadless: () => null,
});
