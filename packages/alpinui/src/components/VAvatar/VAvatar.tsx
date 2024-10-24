// Components
import { genOverlays } from '@/components/_Overlay';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VIcon } from '@/components/VIcon';
import { VImg } from '@/components/VImg';

// Types
import type { VAvatarSlots } from './VAvatar.base';
import { _Avatar } from './VAvatar.base';
import { genericVueComponent } from '@/engines/vue';

export { makeVAvatarProps, VAvatarSlots } from './VAvatar.base';

export const VAvatar = genericVueComponent<VAvatarSlots>()({
  ..._Avatar,
  renderHeadless: (vm, { contentDefaults, rootClasses, rootStyles }, { slots, props }) => (
    <props.tag
      class={ rootClasses.value }
      style={ rootStyles.value }
    >
      { !slots.default ? (
        props.image
          ? (<VImg key="image" src={ props.image } alt="" cover />)
          : props.icon
            ? (<VIcon key="icon" icon={ props.icon } />)
            : props.text
      ) : (
        <VDefaultsProvider
          key="content-defaults"
          defaults={ contentDefaults.value }
        >
          { slots.default() }
        </VDefaultsProvider>
      )}

      { genOverlays(false, 'v-avatar') }
    </props.tag>
  ),
});

export type VAvatar = InstanceType<typeof VAvatar>;
