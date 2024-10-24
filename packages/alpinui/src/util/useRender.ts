// Types
import type { ComponentInternalInstance, VNode } from 'vue';

export function useRender(
  vm: ComponentInternalInstance,
  render: () => VNode | VNode[] | null,
): void {
  (vm as any).render = render;
}
