// Utilities
import { Comment, Fragment, isVNode } from 'vue';

// Types
import type { VNode, VNodeArrayChildren } from 'vue';

export function ensureValidVNode(vnodes: VNodeArrayChildren): VNodeArrayChildren | null {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    return child.type !== Fragment ||
      ensureValidVNode(child.children as VNodeArrayChildren);
  })
    ? vnodes
    : null;
}

export function flattenFragments(nodes: VNode[]): VNode[] {
  return nodes.map((node) => {
    if (node.type === Fragment) {
      return flattenFragments(node.children as VNode[]);
    } else {
      return node;
    }
  }).flat();
}
