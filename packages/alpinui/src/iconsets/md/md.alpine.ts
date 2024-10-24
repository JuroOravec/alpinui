// Components
import { _LigatureIcon } from '@/components/VIcon/icons.base';

// Types
import type { AlpineInstanceFromOptions } from 'alpine-composition';
import type { IconSet } from '@/composables/icons';
import { defineAlpineComponent } from '@/engines/alpine';

export { aliases } from './md.base';

export const AMdIcon = defineAlpineComponent({
  ..._LigatureIcon,
  setupHeadless(props, vm) {
    const result = _LigatureIcon.setupHeadless(props, vm);

    return {
      expose: result.expose,
      renderInput: {
        ...result.renderInput,
        // Add `fa` class
        icon: `${result.renderInput.icon} fa`,
        // TODO(Alpinui): This needs to be added in the template
        class: 'material-icons',
      },
    };
  },
  name: 'AMdIcon',
});

export type AMdIcon = AlpineInstanceFromOptions<typeof AMdIcon>;

export const md: IconSet = {
  component: AMdIcon.name,
};
