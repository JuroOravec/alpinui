// Components
import { _ClassIcon } from '@/components/VIcon/icons.base';

// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import type { IconSet } from '@/composables/icons';
import { defineAlpineComponent } from '@/engines/alpine';

export { aliases } from './fa4.base';

export const AFa4Icon = defineAlpineComponent({
  ..._ClassIcon,
  setupHeadless(props, vm) {
    const result = _ClassIcon.setupHeadless(props, vm);

    return {
      expose: result.expose,
      renderInput: {
        ...result.renderInput,
        // Add `fa` class
        icon: `${result.renderInput.icon} fa`,
      },
    };
  },
  name: 'AFa4Icon',
});

export type AFa4Icon = AlpineInstanceFromOptions<typeof AFa4Icon>;

export const fa: IconSet = {
  component: AFa4Icon.name,
};
