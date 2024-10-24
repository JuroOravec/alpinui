// NOTE: Refactored out from composables/router.tsx

// Utilities
import { hasEvent } from 'alpine-composition';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { ComputedRef, PropType, Ref, SetupContext } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import type { HeadlessInstance } from '@/engines/types';
import type { EventProp } from '@/util/helpers';

export interface LinkProps {
  href?: string | undefined;
  replace?: boolean | undefined;
  to?: RouteLocationRaw | undefined;
  exact?: boolean | undefined;
}

export interface LinkListeners {
  onClick?: EventProp | undefined;
  onClickOnce?: EventProp | undefined;
}

export interface UseLink {
  isLink: ComputedRef<boolean>;
  isClickable: ComputedRef<boolean>;
  href: Ref<string | undefined>;
}

export const makeLinkProps = propsFactory(
  {
    href: String,
    replace: Boolean,
    to: [String, Object] as PropType<RouteLocationRaw>,
  },
  'link',
);

export function useLink(
  vm: HeadlessInstance,
  props: LinkProps & LinkListeners,
  attrs: SetupContext['attrs'],
): UseLink {
  const { computed, toRef } = vm.reactivity;

  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (
      isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click')
    );
  });

  return {
    isLink,
    isClickable,
    href: toRef(props, 'href'),
  };
}
