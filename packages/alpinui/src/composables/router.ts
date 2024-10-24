// Utilities
import { useLink } from './link';
import { IN_BROWSER } from '@/util/globals';
import { deepEqual } from '@/util/helpers';
import { propsFactory } from '@/util/propsFactory';

// Types
import type { ComponentInternalInstance, ComputedRef, PropType, Ref, SetupContext } from 'vue';
import type {
  RouterLink as _RouterLink,
  useLink as _useLink,
  NavigationGuardNext,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
} from 'vue-router';
import type { HeadlessInstance } from '@/engines/types';
import type { EventProp } from '@/util/helpers';

export function useRoute(vm: HeadlessInstance): Ref<RouteLocationNormalizedLoaded | undefined> {
  const { computed } = vm.reactivity;

  return computed(() => {
    if (vm.type === 'vue') {
      return vm.instance<ComponentInternalInstance>().proxy?.$route;
    } else {
      // NOOP for AlpineJS
      return undefined;
    }
  });
}

export function useRouter(vm: HeadlessInstance): Router | undefined {
  if (vm.type === 'vue') {
    return vm.instance<ComponentInternalInstance>().proxy?.$router;
  } else {
    // NOOP for AlpineJS
    return undefined;
  }
}

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

export interface UseRouterLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
  isLink: ComputedRef<boolean>;
  isClickable: ComputedRef<boolean>;
  href: Ref<string | undefined>;
}

export function useRouterLink(
  vm: HeadlessInstance,
  props: LinkProps & LinkListeners,
  attrs: SetupContext['attrs'],
): UseRouterLink {
  const { computed, toRef } = vm.reactivity;

  const RouterLink = vm.resolveDynamicComponent('RouterLink') as typeof _RouterLink | string | null;

  const { isLink, isClickable, href } = useLink(vm, props, attrs);

  if (RouterLink == null || typeof RouterLink === 'string' || !('useLink' in (RouterLink as object))) {
    return {
      isLink,
      isClickable,
      href,
    };
  }
  // vue-router useLink `to` prop needs to be reactive and useLink will crash if undefined
  const linkProps = computed(() => ({
    ...props,
    to: toRef(() => props.to || ''),
  }));

  const routerLink = RouterLink.useLink(linkProps.value);
  // Actual link needs to be undefined when to prop is not used
  const link = computed(() => props.to ? routerLink : undefined);
  const route = useRoute(vm);

  return {
    isLink,
    isClickable,
    route: link.value?.route,
    navigate: link.value?.navigate,
    isActive: computed(() => {
      if (!link.value) return false;
      if (!props.exact) return link.value.isActive?.value ?? false;
      if (!route.value) return link.value.isExactActive?.value ?? false;

      return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query);
    }),
    href: computed(() => props.to ? link.value?.route.value.href : props.href),
  };
}

export const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object] as PropType<RouteLocationRaw>,
  exact: Boolean,
}, 'router');

let inTransition = false;
export function useBackButton(
  vm: HeadlessInstance,
  router: Router | undefined,
  cb: (next: NavigationGuardNext) => void,
) {
  const { nextTick, onBeforeUnmount } = vm.reactivity;

  let popped = false;
  let removeBefore: (() => void) | undefined;
  let removeAfter: (() => void) | undefined;

  if (IN_BROWSER && router) {
    nextTick(() => {
      window.addEventListener('popstate', onPopstate);
      removeBefore = router?.beforeEach((to, from, next) => {
        if (!inTransition) {
          setTimeout(() => popped ? cb(next) : next());
        } else {
          popped ? cb(next) : next();
        }
        inTransition = true;
      });
      removeAfter = router?.afterEach(() => {
        inTransition = false;
      });
    });

    // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
    onBeforeUnmount(() => {
      window.removeEventListener('popstate', onPopstate);
      removeBefore?.();
      removeAfter?.();
    });
  }

  function onPopstate(e: PopStateEvent) {
    if (e.state?.replaced) return;

    popped = true;
    setTimeout(() => (popped = false));
  }
}
