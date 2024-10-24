// Components
import { VToolbarTitle } from './VToolbarTitle';
import { VExpandTransition } from '@/components/transitions';
import { VDefaultsProvider } from '@/components/VDefaultsProvider';
import { VImg } from '@/components/VImg';

// Utilities
import { _Toolbar } from './VToolbar.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VToolbarSlots } from './VToolbar.base';

export { makeVToolbarProps, VToolbarSlots } from './VToolbar.base';

export const VToolbar = genericVueComponent<VToolbarSlots>()({
  ..._Toolbar,
  renderHeadless: (
    vm,
    {
      isExtended,
      defaults,
      imageDefaults,
      extensionDefaults,
      extensionStyles,
      contentStyles,
      rootClasses,
      rootStyles,
    },
    { props, slots },
  ) => {
    const hasTitle = !!(props.title || slots.title);
    const hasImage = !!(slots.image || props.image);

    const extension = slots.extension?.();
    isExtended.value = !!(props.extended || extension);

    return (
      <props.tag
        class={ rootClasses.value }
        style={ rootStyles.value }
      >
        { hasImage && (
          <div key="image" class="v-toolbar__image">
            { !slots.image ? (
              <VImg
                key="image-img"
                cover
                src={ props.image }
              />
            ) : (
              <VDefaultsProvider
                key="image-defaults"
                disabled={ !props.image }
                defaults={ imageDefaults.value }
                v-slots:default={ slots.image }
              />
            )}
          </div>
        )}

        <VDefaultsProvider
          defaults={ defaults.value }
        >
          <div
            class="v-toolbar__content"
            style={ contentStyles.value }
          >
            { slots.prepend && (
              <div class="v-toolbar__prepend">
                { slots.prepend?.() }
              </div>
            )}

            { hasTitle && (
              <VToolbarTitle key="title" text={ props.title }>
                {{ text: slots.title }}
              </VToolbarTitle>
            )}

            { slots.default?.() }

            { slots.append && (
              <div class="v-toolbar__append">
                { slots.append?.() }
              </div>
            )}
          </div>
        </VDefaultsProvider>

        <VDefaultsProvider
          defaults={ extensionDefaults.value }
        >
          <VExpandTransition>
            { isExtended.value && (
              <div
                class="v-toolbar__extension"
                style={ extensionStyles.value }
              >
                { extension }
              </div>
            )}
          </VExpandTransition>
        </VDefaultsProvider>
      </props.tag>
    );
  },
});

export type VToolbar = InstanceType<typeof VToolbar>;
