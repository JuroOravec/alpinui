// Utilities
import { makeLineProps } from './util/line';
import { genPath as _genPath } from './util/path';
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { getPropertyFromItem } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { Ref } from 'vue';

// Types
export type VTrendlineSlots = {
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

export interface Point {
  x: number;
  y: number;
  value: number;
}

export const makeVTrendlineProps = propsFactory({
  fill: Boolean,

  ...makeLineProps(),
}, 'VTrendline');

export const _Trendline = defineComponent({
  name: 'VTrendline',

  props: makeVTrendlineProps(),

  slots: makeSlots<VTrendlineSlots>({
    default: null,
    label: null,
  }),

  setupHeadless(props, vm) {
    const { computed, nextTick, ref, watch } = vm.reactivity;

    const uid = getUid(vm);
    const id = computed(() => props.id || `trendline-${uid}`);
    const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000));

    const lastLength = ref(0);
    const path = ref<SVGPathElement | null>(null);

    function genPoints(
      values: number[],
      boundary: Boundary
    ): Point[] {
      const { minX, maxX, minY, maxY } = boundary;
      const totalValues = values.length;
      const maxValue = props.max != null ? Number(props.max) : Math.max(...values);
      const minValue = props.min != null ? Number(props.min) : Math.min(...values);

      const gridX = (maxX - minX) / (totalValues - 1);
      const gridY = (maxY - minY) / ((maxValue - minValue) || 1);

      return values.map((value, index) => {
        return {
          x: minX + index * gridX,
          y: maxY - (value - minValue) * gridY,
          value,
        };
      });
    }
    const hasLabels = computed(() => {
      return Boolean(
        props.showLabels ||
        props.labels.length > 0 ||
        vm.hasSlots.label
      );
    });
    const lineWidth = computed(() => {
      return parseFloat(props.lineWidth) || 4;
    });
    const totalWidth = computed(() => Number(props.width));

    const boundary = computed<Boundary>(() => {
      const padding = Number(props.padding);

      return {
        minX: padding,
        maxX: totalWidth.value - padding,
        minY: padding,
        maxY: parseInt(props.height, 10) - padding,
      };
    });
    const items = computed(() => props.modelValue.map((item) => getPropertyFromItem(item, props.itemValue, item)));
    const parsedLabels = computed(() => {
      const labels = [];
      const points = genPoints(items.value, boundary.value);
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

    watch(() => props.modelValue, async() => {
      await nextTick();

      if (!props.autoDraw || !path.value) return;

      const pathRef = path.value;
      const length = pathRef.getTotalLength();

      if (!props.fill) {
        // Initial setup to "hide" the line by using the stroke dash array
        pathRef.style.strokeDasharray = `${length}`;
        pathRef.style.strokeDashoffset = `${length}`;

        // Force reflow to ensure the transition starts from this state
        pathRef.getBoundingClientRect();

        // Animate the stroke dash offset to "draw" the line
        pathRef.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
        pathRef.style.strokeDashoffset = '0';
      } else {
        // Your existing logic for filled paths remains the same
        pathRef.style.transformOrigin = 'bottom center';
        pathRef.style.transition = 'none';
        pathRef.style.transform = `scaleY(0)`;
        pathRef.getBoundingClientRect();
        pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
        pathRef.style.transform = `scaleY(1)`;
      }

      lastLength.value = length;
    }, { immediate: true });

    function genPath(fill: boolean) {
      return _genPath(
        genPoints(items.value, boundary.value),
        props.smooth ? 8 : Number(props.smooth),
        fill,
        parseInt(props.height, 10)
      );
    }

    const gradientData = computed(() => !props.gradient.slice().length ? [''] : props.gradient.slice().reverse());
    const strokeWidth = computed(() => parseFloat(props.lineWidth) ?? 4);

    return {
      expose: {},
      renderInput: {
        id,
        gradientData,
        hasLabels,
        lineWidth,
        parsedLabels,
        strokeWidth,
        // NOTE(Alpinui): Type must be set to avoid following TypeScript error:
        // TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize.
        path: path as Ref<SVGPathElement | null>,
        genPath,
      },
    };
  },
  renderHeadless: () => null,
});
