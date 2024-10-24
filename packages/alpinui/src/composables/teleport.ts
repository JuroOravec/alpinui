// Utilities
import { consoleWarn } from '@/util/console';
import { IN_BROWSER } from '@/util/globals';

// Types
import type { HeadlessInstance } from '@/engines/types';

export function useTeleport(
  vm: HeadlessInstance,
  target: () => (boolean | string | ParentNode),
) {
  const { computed } = vm.reactivity;

  const teleportTarget = computed(() => {
    const _target = target();

    if (_target === true || !IN_BROWSER) return undefined;

    const targetElement =
      _target === false ? document.body
      : typeof _target === 'string' ? document.querySelector(_target)
      : _target;

    if (targetElement == null) {
      consoleWarn(`Unable to locate target ${_target}`);
      return undefined;
    }

    let container = targetElement.querySelector(':scope > .v-overlay-container');

    if (!container) {
      container = document.createElement('div');
      container.className = 'v-overlay-container';
      targetElement.appendChild(container);
    }

    return container;
  });

  return { teleportTarget };
}
