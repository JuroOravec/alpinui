// Utilities
import { makeLineProps } from './util/line';
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { getPropertyFromItem } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
export type VBarlineSlots = {
  default: void;
  label: { index: number, value: string };
}

export type SparklineItem = number | { value: number }

export type SparklineText = {
  x: number;
  value: string;
}

export interface Boundary {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export interface Bar {
  x: number;
  y: number;
  height: number;
  value: number;
}

export const makeVBarlineProps = propsFactory({
  autoLineWidth: Boolean,

  ...makeLineProps(),
}, 'VBarline');

export const _Barline = defineComponent({
  name: 'VBarline',

  props: makeVBarlineProps(),

  slots: makeSlots<VBarlineSlots>({
    default: null,
    label: null,
  }),

  setupHeadless(props, vm) {
    const { computed } = vm.reactivity;

    const uid = getUid(vm);
    const id = computed(() => props.id || `barline-${uid}`);
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || 500);

    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        vm.hasSlots.label
      );
    });

    const lineWidth = computed(() => parseFloat(props.lineWidth) || 4);

    const totalWidth = computed(() => Math.max(props.modelValue.length * lineWidth.value, Number(props.width)));

    const boundary = computed<Boundary>(() => {
      return {
        minX: 0,
        maxX: totalWidth.value,
        minY: 0,
        maxY: parseInt(props.height, 10),
      };
    });
    const items = computed(() => props.modelValue.map((item) => getPropertyFromItem(item, props.itemValue, item)));

    function genBars(
      values: number[],
      boundary: Boundary
    ): Bar[] {
      const { minX, maxX, minY, maxY } = boundary;
      const totalValues = values.length;
      let maxValue = props.max != null ? Number(props.max) : Math.max(...values);
      let minValue = props.min != null ? Number(props.min) : Math.min(...values);

      if (minValue > 0 && props.min == null) minValue = 0;
      if (maxValue < 0 && props.max == null) maxValue = 0;

      const gridX = maxX / totalValues;
      const gridY = (maxY - minY) / ((maxValue - minValue) || 1);
      const horizonY = maxY - Math.abs(minValue * gridY);

      return values.map((value, index) => {
        const height = Math.abs(gridY * value);

        return {
          x: minX + index * gridX,
          y: horizonY - height +
            +(value < 0) * height,
          height,
          value,
        };
      });
    }

    const parsedLabels = computed(() => {
      const labels = [];
      const points = genBars(items.value, boundary.value);
      const len = points.length;

      for (let i = 0; labels.length < len; i++) {
        const item = points[i];
        let value = props.labels[i];

        if (!value) {
          value = typeof item === 'object'
            ? item.value
            : item;
        }

        labels.push({
          x: item.x,
          value: String(value),
        });
      }

      return labels;
    });

    const bars = computed(() => genBars(items.value, boundary.value));
    const offsetX = computed(() => (Math.abs(bars.value[0].x - bars.value[1].x) - lineWidth.value) / 2);
    const duration = computed(() => `${autoDrawDuration.value}ms`);

    const gradientData = computed(() => !props.gradient.slice().length ? [''] : props.gradient.slice().reverse());

    return {
      expose: {},
      renderInput: {
        bars,
        parsedLabels,
        gradientData,
        id,
        offsetX,
        lineWidth,
        duration,
        hasLabels,
      },
    };
  },
  renderHeadless: () => null,
});
