import { isArray, isFunction, isPromise } from './utils';

export function callWithErrorHandling(fn: Function, args?: unknown[]) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    logError(err);
  }
}

export function callWithAsyncErrorHandling(fn: Function | Function[], args?: unknown[]): any {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        logError(err);
      });
    }
    return res;
  }

  if (isArray(fn)) {
    const values: any[] = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], args));
    }
    return values;
  } else {
    console.warn(
      `[alpine-composition] Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
    );
  }
}

function logError(err: unknown) {
  // recover in prod to reduce the impact on end-user
  console.error(err);
}
