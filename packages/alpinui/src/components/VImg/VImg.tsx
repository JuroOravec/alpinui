// Components
import { MaybeTransition } from '@/components/MaybeTransition/MaybeTransition';
import { VResponsive } from '@/components/VResponsive/VResponsive';

// Directives
import { Intersect } from '@/directives/intersect';

// Utilities
import { vShow, withDirectives } from 'vue';
import { _Img } from './VImg.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VImgSlots } from './VImg.base';

export { makeVImgProps, VImgSlots } from './VImg.base';

export const VImg = genericVueComponent<VImgSlots>()({
  ..._Img,

  directives: { Intersect },

  renderHeadless: (
    vm,
    {
      aspectRatio,
      containClasses,
      image,
      normalisedSrc,
      responsiveProps,
      rootClasses,
      rootStyles,
      state,
      init,
      onError,
      onLoad,
    },
    { props, slots },
  ) => {
    const __image = () => {
      if (!normalisedSrc.value.src || state.value === 'idle') return null;

      const img = (
        <img
          class={['v-img__img', containClasses.value]}
          style={{ objectPosition: props.position }}
          src={ normalisedSrc.value.src }
          srcset={ normalisedSrc.value.srcset }
          alt={ props.alt }
          crossorigin={ props.crossorigin }
          referrerpolicy={ props.referrerpolicy }
          draggable={ props.draggable }
          sizes={ props.sizes }
          ref={ image }
          onLoad={ onLoad }
          onError={ onError }
        />
      );

      const sources = slots.sources?.();

      return (
        <MaybeTransition transition={ props.transition } appear>
          {
            withDirectives(
              sources
                ? <picture class="v-img__picture">{ sources }{ img }</picture>
                : img,
              [[vShow, state.value === 'loaded']]
            )
          }
        </MaybeTransition>
      );
    };

    const __preloadImage = () => (
      <MaybeTransition transition={ props.transition }>
        { normalisedSrc.value.lazySrc && state.value !== 'loaded' && (
          <img
            class={['v-img__img', 'v-img__img--preload', containClasses.value]}
            style={{ objectPosition: props.position }}
            src={ normalisedSrc.value.lazySrc }
            alt={ props.alt }
            crossorigin={ props.crossorigin }
            referrerpolicy={ props.referrerpolicy }
            draggable={ props.draggable }
          />
        )}
      </MaybeTransition>
    );

    const __placeholder = () => {
      if (!slots.placeholder) return null;

      return (
        <MaybeTransition transition={ props.transition } appear>
          { (state.value === 'loading' || (state.value === 'error' && !slots.error)) &&
          <div class="v-img__placeholder">{ slots.placeholder() }</div>
          }
        </MaybeTransition>
      );
    };

    const __error = () => {
      if (!slots.error) return null;

      return (
        <MaybeTransition transition={ props.transition } appear>
          { state.value === 'error' &&
            <div class="v-img__error">{ slots.error() }</div>
          }
        </MaybeTransition>
      );
    };

    const __gradient = () => {
      if (!props.gradient) return null;

      return <div class="v-img__gradient" style={{ backgroundImage: `linear-gradient(${props.gradient})` }} />;
    };

    return (
      <VResponsive
        class={ rootClasses.value }
        style={ rootStyles.value }
        { ...responsiveProps.value }
        aspectRatio={ aspectRatio.value }
        aria-label={ props.alt }
        role={ props.alt ? 'img' : undefined }
        v-intersect={[{
          handler: init,
          options: props.options,
        }, null, ['once']]}
      >{{
        additional: () => (
          <>
            <__image />
            <__preloadImage />
            <__gradient />
            <__placeholder />
            <__error />
          </>
        ),
        default: slots.default,
      }}</VResponsive>
    );
  },
});

export type VImg = InstanceType<typeof VImg>;
