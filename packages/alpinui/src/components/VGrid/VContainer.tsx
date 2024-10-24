// Utilities
import { _Container } from './VContainer.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VContainerSlots } from './VContainer.base';

export { makeVContainerProps, VContainerSlots } from './VContainer.base';

export const VContainer = genericVueComponent<VContainerSlots>()({
  ..._Container,
  renderHeadless: (
    vm,
    { rootClasses, rootStyles },
    { props, slots },
  ) => {
    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
        v-slots={ slots }
      />
    );
  },
});

export type VContainer = InstanceType<typeof VContainer>;
