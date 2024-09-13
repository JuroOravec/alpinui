import { isArray, isFunction, isPromise } from './utils';

export function callWithErrorHandling(
  compName: string,
  fn: Function,
  args?: unknown[],
) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    const errMsg = (err as any).message;
    if (errMsg != null) {
      (err as any).message = `[alpine-composition] ${compName}: ${errMsg}`;
    }

    logError(err);
  }
}

export function callWithAsyncErrorHandling(
  compName: string,
  fn: Function | Function[],
  args?: unknown[],
): any {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(compName, fn, args);
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
      values.push(callWithAsyncErrorHandling(compName, fn[i], args));
    }
    return values;
  } else {
    console.warn(
      `[alpine-composition] ${compName}: Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
    );
  }
}

function logError(err: unknown) {
  // recover in prod to reduce the impact on end-user
  console.error(err);
}
