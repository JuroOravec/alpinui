// Types
import type { Slots } from '@/engines/types';

/**
 * Helper for defining slots on Components as runtime objects.
 *
 * These slot definitions are used for generating Python bindings.
 */
export const makeSlots = <T extends Record<string, any>>(
  slots: {} extends RemoveIndex<T>
    // Use `null` if NO slots, because TS allows any fields in that case
    ? null
    : {
      [Key in keyof RemoveIndex<T>]: null;
    },
): Slots<T> => (slots ?? {}) as any as Slots<T>;

// See https://stackoverflow.com/a/51956054/9788634
type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K];
};
