// Styles
import './VTooltip.sass';

// Components
import { _Overlay, makeVOverlayProps } from '@/components/VOverlay/VOverlay.base';

// Composables
import { useComponent } from '@/composables/component';
import { forwardRefs } from '@/composables/forwardRefs';
import { useProxiedModel } from '@/composables/proxiedModel';
import { useScopeId } from '@/composables/scopeId';

// Utilities
import { defineComponent } from '@/util/defineComponent';
import { getUid } from '@/util/getCurrentInstance';
import { normalizeClass, omit } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';
import { makeSlots } from '@/util/slots';

// Types
import type { StrategyProps } from '@/components/VOverlay/locationStrategies';
import type { VOverlay, VOverlaySlots } from '@/components/VOverlay/VOverlay';

export const makeVTooltipProps = propsFactory({
  id: String,
  text: String,

  ...omit(makeVOverlayProps({
    closeOnBack: false,
    location: 'end' as const,
    locationStrategy: 'connected' as const,
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: 'auto' as const,
    scrim: false,
    scrollStrategy: 'reposition' as const,
    transition: false,
  }), [
    'absolute',
    'persistent',
  ]),
}, 'VTooltip');

export type VTooltipSlots = VOverlaySlots;

export const _Tooltip = defineComponent({
  name: 'VTooltip',

  props: makeVTooltipProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  slots: makeSlots<VTooltipSlots>({
    default: null,
    activator: null,
  }),

  setupHeadless(props, vm) {
    const { computed, mergeProps, ref } = vm.reactivity;

    const { classes, styles } = useComponent(vm, props);
    const isActive = useProxiedModel(vm, props, 'modelValue');
    const { scopeId } = useScopeId(vm);

    const uid = getUid(vm);
    const id = computed(() => props.id || `v-tooltip-${uid}`);

    const overlay = ref<VOverlay>();

    const location = computed(() => {
      return props.location.split(' ').length > 1
        ? props.location
        : props.location + ' center' as StrategyProps['location'];
    });

    const origin = computed(() => {
      return (
        props.origin === 'auto' ||
        props.origin === 'overlap' ||
        props.origin.split(' ').length > 1 ||
        props.location.split(' ').length > 1
      ) ? props.origin
        : props.origin + ' center' as StrategyProps['origin'];
    });

    const transition = computed(() => {
      if (props.transition) return props.transition;
      return isActive.value ? 'scale-transition' : 'fade-transition';
    });

    const activatorProps = computed(() =>
      mergeProps({
        'aria-describedby': id.value,
      }, props.activatorProps)
    );

    const overlayProps = computed(() => _Overlay.filterProps(props));

    const rootClasses = computed(() => normalizeClass([
      'v-tooltip',
      classes.value,
    ]));

    return {
      expose: forwardRefs({}, overlay),
      renderInput: {
        id,
        isActive,
        location,
        origin,
        scopeId,
        transition,
        activatorProps,
        overlay,
        overlayProps,
        rootClasses,
        rootStyles: styles,
      },
    };
  },
  renderHeadless: () => null,
});
