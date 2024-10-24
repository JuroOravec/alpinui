// Components
import { _ClassIcon } from '@/components/VIcon/icons.base';

// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import type { IconSet } from '@/composables/icons';
import { defineAlpineComponent } from '@/engines/alpine';

export { aliases } from './mdi.base';

export const AMdiIcon = defineAlpineComponent({
  ..._ClassIcon,
  setupHeadless(props, vm) {
    const result = _ClassIcon.setupHeadless(props, vm);

    return {
      expose: result.expose,
      renderInput: {
        ...result.renderInput,
        // Add `mdi` class
        icon: `${result.renderInput.icon} mdi`,
      },
    };
  },
  name: 'AMdiIcon',
});

export type AMdiIcon = AlpineInstanceFromOptions<typeof AMdiIcon>;

export const mdi: IconSet = {
  component: AMdiIcon.name,
};
