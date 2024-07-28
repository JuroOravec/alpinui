// Helper functions taken from @vue/shared
// See https://github.com/vuejs/core/blob/91112520427ff55941a1c759d7d60a0811ff4a61/packages/shared/src/general.ts#L105

const cacheStringFunction = <T extends (str: string) => string>(fn: T): T => {
  const cache: Record<string, string> = Object.create(null);
  return ((str: string) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }) as T;
};

export const capitalize = cacheStringFunction(<T extends string>(str: T) => {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>
})

export const extend = Object.assign;

export const isArray = Array.isArray;
export const isFunction = (val: unknown): val is Function => typeof val === 'function';
export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === 'object';
};
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  )
}

export const toHandlerKey = cacheStringFunction(<T extends string>(str: T) => {
  const s = str ? `on${capitalize(str)}` : ``
  return s as T extends '' ? '' : `on${Capitalize<T>}`
})

export const isInstanceOf = (propTypes: { new (...args: any[]): any }[], value: any) => propTypes.some(
  (propType) => (
    value instanceof propType
    // For primitives like numbers, strings, etc, when we want to check against
    // their classes (Number, String), then the primitives ARE NOT actual instances.
    // Hence we have to check by `typeof`.
    || propType.name.toLowerCase() == typeof value)
);