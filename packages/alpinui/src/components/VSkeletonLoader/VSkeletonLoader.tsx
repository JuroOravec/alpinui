// Utilities
import { _SkeletonLoader, rootTypes } from './VSkeletonLoader.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSkeletonBones, VSkeletonLoaderSlots, VSkeletonLoaderType } from './VSkeletonLoader.base';

export { makeVSkeletonLoaderProps, VSkeletonLoaderSlots, VSkeletonBones, VSkeletonLoaderType, rootTypes } from './VSkeletonLoader.base';

function genBone(type: string, children: VSkeletonBones = []) {
  return (
    <div
      class={[
        'v-skeleton-loader__bone',
        `v-skeleton-loader__${type}`,
      ]}
    >
      { children }
    </div>
  );
}

function genBones(bone: string) {
  // e.g. 'text@3'
  const [type, length] = bone.split('@') as [VSkeletonLoaderType, number];

  // Generate a length array based upon
  // value after @ in the bone string
  return Array.from({ length }).map(() => genStructure(type));
}

function genStructure(type?: string): VSkeletonBones {
  let children: VSkeletonBones = [];

  if (!type) return children;

  // TODO(Vuetify): figure out a better way to type this
  const bone = (rootTypes as Record<string, string>)[type];

  // End of recursion, do nothing
  /* eslint-disable-next-line no-empty, brace-style */
  if (type === bone) {}
  // Array of values - e.g. 'heading, paragraph, text@2'
  else if (type.includes(',')) return mapBones(type);
  // Array of values - e.g. 'paragraph@4'
  else if (type.includes('@')) return genBones(type);
  // Array of values - e.g. 'card@2'
  else if (bone.includes(',')) children = mapBones(bone);
  // Array of values - e.g. 'list-item@2'
  else if (bone.includes('@')) children = genBones(bone);
  // Single value - e.g. 'card-heading'
  else if (bone) children.push(genStructure(bone));

  return [genBone(type, children)];
}

function mapBones(bones: string) {
  // Remove spaces and return array of structures
  return bones.replace(/\s/g, '').split(',').map(genStructure);
}

export const VSkeletonLoader = genericVueComponent<VSkeletonLoaderSlots>()({
  ..._SkeletonLoader,
  renderHeadless: (
    vm,
    {
      items,
      backgroundColorStyles,
      dimensionStyles,
      rootClasses,
      loadingText,
    },
    { props, slots },
  ) => {
    const isLoading = !slots.default || props.loading;

    const itemVNodes = genStructure(items.value);

    return (
      <div
        class={ rootClasses.value }
        // TODO(Alpinui) - Set this in Django?
        style={[
          backgroundColorStyles.value,
          isLoading ? dimensionStyles.value : {},
        ]}
        aria-busy={ !props.boilerplate ? isLoading : undefined }
        aria-live={ !props.boilerplate ? 'polite' : undefined }
        aria-label={ !props.boilerplate ? loadingText.value : undefined }
        role={ !props.boilerplate ? 'alert' : undefined }
      >
        { isLoading ? itemVNodes : slots.default?.() }
      </div>
    );
  },
});

export type VSkeletonLoader = InstanceType<typeof VSkeletonLoader>;
