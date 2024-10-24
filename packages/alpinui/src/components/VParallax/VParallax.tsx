// Components
import { VImg } from '@/components/VImg';

// Utilities
import { _Parallax } from './VParallax.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VParallaxSlots } from './VParallax.base';

export { makeVParallaxProps, VParallaxSlots } from './VParallax.base';

export const VParallax = genericVueComponent<VParallaxSlots>()({
  ..._Parallax,
  renderHeadless: (
    vm,
    {
      root,
      rootClasses,
      rootStyles,
      onScroll,
    },
    { slots },
  ) => {
    return (
      <VImg
        class={ rootClasses.value }
        style={ rootStyles.value }
        ref={ root }
        cover
        onLoadstart={ onScroll }
        onLoad={ onScroll }
        v-slots={ slots }
      />
    );
  },
});

export type VParallax = InstanceType<typeof VParallax>;
