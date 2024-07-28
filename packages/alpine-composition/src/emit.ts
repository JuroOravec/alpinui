import type { UnionToIntersection } from '@vue/shared';
import type { AlpineInstance, Data } from './types';

import { callWithAsyncErrorHandling } from './errorHandling';
import { extend, isArray, isFunction, toHandlerKey } from './utils';

export type ObjectEmitsOptions = Record<
  string,
  ((...args: any[]) => any) | null
>

export type EmitsOptions = ObjectEmitsOptions | string[];

export type EmitsToEmitFns<T extends EmitsOptions> = T extends string[]
  ? {
      [K in T[number]]?: (...args: any[]) => any;
    }
  : T extends ObjectEmitsOptions
  ? {
      [K in string & keyof T]?: (
        ...args: T[K] extends (...args: infer P) => any
          ? P
          : T[K] extends null
          ? any[]
          : never
      ) => any
    }
  : {};

export type EmitsToProps<T extends EmitsOptions> = T extends string[]
  ? {
      [K in `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
    }
  : T extends ObjectEmitsOptions
  ? {
      [K in `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
        ? (
            ...args: T[Uncapitalize<C>] extends (...args: infer P) => any
              ? P
              : T[Uncapitalize<C>] extends null
              ? any[]
              : never
          ) => any
        : never;
    }
  : {};

export type EmitKeys<T extends EmitsOptions> = T extends string[]
  ? T[number]
  : keyof T;

export type ShortEmitsToObject<E> = E extends Record<string, any[]>
  ? {
      [K in keyof E]: (...args: E[K]) => any;
    }
  : E;

export type EmitFn<
  Options = ObjectEmitsOptions,
  Event extends keyof Options = keyof Options
> = Options extends Array<infer V>
  ? (event: V, ...args: any[]) => void
  : {} extends Options // if the emit is empty object (usually the default value for emit) should be converted to function
  ? (event: string, ...args: any[]) => void
  : UnionToIntersection<
      {
        [key in Event]: Options[key] extends (...args: infer Args) => any
          ? (event: key, ...args: Args) => void
          : Options[key] extends any[]
          ? (event: key, ...args: Options[key]) => void
          : (event: key, ...args: any[]) => void;
      }[Event]
    >;

export function emit<T extends Data, P extends Data, E extends EmitsOptions>(
  instance: AlpineInstance<T, P, E>,
  event: EmitKeys<E>,
  ...rawArgs: any[]
) {
  const props = instance.$props;
  const emits = instance.$emitsOptions;

  if (!(event in emits)) {
    if (!props || !hasEvent(props, event)) {
      console.warn(
        `[alpine-composition] Component emitted event "${event}" but it is neither ` +
          `declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
      );
    }
  } else {
    const validator = emits[event];
    if (isFunction(validator)) {
      const isValid = validator(...rawArgs);
      if (!isValid) {
        console.warn(
          `[alpine-composition] Invalid event arguments: event validation failed for event "${event}".`
        );
      }
    }
  }

  const handlerName = toHandlerKey(event);
  const handler = props[handlerName];

  if (handler) {
    callWithAsyncErrorHandling(handler, rawArgs);
  }

  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    // @ts-expect-error
    const emitted: Record<string, boolean> = instance._emitted || (instance._emitted = {});
    if (emitted[handlerName]) {
      return;
    }
    emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, rawArgs);
  }
}

export function normalizeEmitsOptions(emits: EmitsOptions | null): ObjectEmitsOptions {
  let normalized: ObjectEmitsOptions = {};

  if (!emits) {
    return normalized;
  }

  if (isArray(emits)) {
    emits.forEach((key) => (normalized[key] = null));
  } else {
    extend(normalized, emits);
  }

  return normalized;
}

// NOTE: This is for checking event handling PROPS, like `onClick`.
// It is different from x-on https://alpinejs.dev/directives/on
export function handlerKeys(name: string) {
  const handlerName = toHandlerKey(name);
  return [handlerName, `${handlerName}Once`];
}

// NOTE: This is for checking event handling PROPS, like `onClick`.
// It is different from x-on https://alpinejs.dev/directives/on
export function hasEvent(props: Record<string, any>, name: string) {
  const handlerNames = handlerKeys(name);
  return handlerNames.some((name) => props[name]);
}
