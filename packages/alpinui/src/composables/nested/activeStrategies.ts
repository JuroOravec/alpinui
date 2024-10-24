/* eslint-disable sonarjs/no-identical-functions */
// Utilities
import { wrapInArray } from '@/util/helpers';

// Types
import type { HeadlessInstance } from '@/engines/types';

export type ActiveStrategyFn = (data: {
  id: unknown;
  value: boolean;
  activated: Set<unknown>;
  children: Map<unknown, unknown[]>;
  parents: Map<unknown, unknown>;
  event?: Event;
}) => Set<unknown>

export type ActiveStrategyTransformInFn = (
  v: unknown | undefined,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => Set<unknown>

export type ActiveStrategyTransformOutFn = (
  v: Set<unknown>,
  children: Map<unknown, unknown[]>,
  parents: Map<unknown, unknown>,
) => unknown

export type ActiveStrategy = {
  activate: ActiveStrategyFn;
  in: ActiveStrategyTransformInFn;
  out: ActiveStrategyTransformOutFn;
}

export const independentActiveStrategy = (
  vm: HeadlessInstance,
  mandatory?: boolean,
): ActiveStrategy => {
  const { toRaw } = vm.reactivity;

  const strategy: ActiveStrategy = {
    activate: ({ id, value, activated }) => {
      id = toRaw(id);

      // When mandatory and we're trying to deselect when id
      // is the only currently selected item then do nothing
      if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;

      if (value) {
        activated.add(id);
      } else {
        activated.delete(id);
      }

      return activated;
    },
    in: (v, children, parents) => {
      let set = new Set();

      if (v != null) {
        for (const id of wrapInArray(v)) {
          set = strategy.activate({
            id,
            value: true,
            activated: new Set(set),
            children,
            parents,
          });
        }
      }

      return set;
    },
    out: (v) => {
      return Array.from(v);
    },
  };

  return strategy;
};

export const independentSingleActiveStrategy = (
  vm: HeadlessInstance,
  mandatory?: boolean,
): ActiveStrategy => {
  const { toRaw } = vm.reactivity;

  const parentStrategy = independentActiveStrategy(vm, mandatory);

  const strategy: ActiveStrategy = {
    activate: ({ activated, id, ...rest }) => {
      id = toRaw(id);
      const singleSelected = activated.has(id) ? new Set([id]) : new Set();
      return parentStrategy.activate({ ...rest, id, activated: singleSelected });
    },
    in: (v, children, parents) => {
      let set = new Set();

      if (v != null) {
        const arr = wrapInArray(v);
        if (arr.length) {
          set = parentStrategy.in(arr.slice(0, 1), children, parents);
        }
      }

      return set;
    },
    out: (v, children, parents) => {
      return parentStrategy.out(v, children, parents);
    },
  };

  return strategy;
};

export const leafActiveStrategy = (
  vm: HeadlessInstance,
  mandatory?: boolean,
): ActiveStrategy => {
  const { toRaw } = vm.reactivity;

  const parentStrategy = independentActiveStrategy(vm, mandatory);

  const strategy: ActiveStrategy = {
    activate: ({ id, activated, children, ...rest }) => {
      id = toRaw(id);
      if (children.has(id)) return activated;

      return parentStrategy.activate({ id, activated, children, ...rest });
    },
    in: parentStrategy.in,
    out: parentStrategy.out,
  };

  return strategy;
};

export const leafSingleActiveStrategy = (
  vm: HeadlessInstance,
  mandatory?: boolean,
): ActiveStrategy => {
  const { toRaw } = vm.reactivity;

  const parentStrategy = independentSingleActiveStrategy(vm, mandatory);

  const strategy: ActiveStrategy = {
    activate: ({ id, activated, children, ...rest }) => {
      id = toRaw(id);
      if (children.has(id)) return activated;

      return parentStrategy.activate({ id, activated, children, ...rest });
    },
    in: parentStrategy.in,
    out: parentStrategy.out,
  };

  return strategy;
};
