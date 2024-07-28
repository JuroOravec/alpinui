alpine-composition / [Exports](modules.md)

# Alpine composition

_Vue composition API for AlpineJS._

## Usage

### 1. Define the component

```ts
import { defineComponent, registerComponent } from 'alpine-composition';
import { ref, computed, watch, setAlpine } from 'alpine-reactivity';

// If the Alpine package is NOT available globally under
// window.Alpine, set it here
setAlpine(Alpine);

// Define component similarly to defining Vue components
const Button = defineComponent({
  name: 'Button',

  // Props are defined the same way as with Vue
  props: {
    name: {
      type: String,
      required: true,
    },
    startCount: {
      type: Number,
      default: 0,
    },
  },

  // Instead of Alpine's init(), use setup()
  // Props are passed down as reactive props, same as in Vue
  // Second argument is the Alpine component instance.
  setup(props, vm) {
    const { name, startCount } = toRefs(props);

    // Inside setup() you can use reactivity and composables
    const counter = ref(startCount.value);

    const { increaseCounter, disposeCounter } = useCounter(counter);

    const countFormatted = computed(() => {
      return `Clicked button ${name.name} ${counter.value} times!`
    });

    watch(counter, () => {
      // NOTE: `this` is undefined in `setup()`. Instead, use
      // the second argument `vm`
      vm.$dispatch('clicked', counter.value);
    });

    const onClick = () => {
      increaseCounter();
    };

    // Instead of Alpine's `destroy()`, use `$onBeforeUnmount()`.
    // This behaves like Vue's `onBeforeUnmount` - it can be called
    // as many times as necessary.
    // At component's `destroy` event, all callbacks will be evaluated:
    vm.$onBeforeUnmount(() => {
      disposeCounter();
    });

    return {
      counter,
      countFormatted,
      onClick,
    };
  },
});
```

### 2. Register the component

This is where the magic happens. `registerComponent` is a wrapper for `Alpine.data`,
and it's thanks to this function that the component accepts props, has `setup` method,
and more.

```ts
import { registerComponent } from 'alpine-composition';

document.addEventListener('alpine:init', () => {
  registerComponent(Alpine, Button);
});
```

### 3. Use the component in the HTML

```html
<div x-data="{ inputValue: 10 }">

  <!--
    Use our component with `x-data` and pass props
    with `x-props`
  -->
  <div
    x-data="Button"
    x-props="{ startCount: inputValue, name: 'MyButton' }"
  >

    <!--
      Inside of the component, we can access ONLY values
      returned from `setup()`
    -->
    <span x-text="countFormatted"></span>
    <button @click="onClick">Click me!</button>

    <!-- You can even nest components -->
     <div x-data="Button" x-props="{ name: 'InnerButton' }">
      <span x-text="countFormatted"></span>
      <button @click="onClick">Click me too!</button>
     </div>

  </div>
</div>
```

## Installation

### Via CDN

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpine-composition@0.x.x/dist/cdn.min.js"></script>
```

```js
const { defineComponent, registerComponent } = AlpineComposition;

const Button = defineComponent({
  name: 'Button',
  props: { ... },
  setup() { ... },
});
```

### Via NPM

```sh
npm install alpine-composition
```

```js
import { defineComponent, registerComponent } from 'alpine-composition';

const Button = defineComponent({
  name: 'Button',
  props: { ... },
  setup() { ... },
});
```

## Setup context and Magics

Inside of the `setup()` method, you can access the Alpine component instance
as the second argument. This instance has [all Alpine magics](https://alpinejs.dev/magics/el).

`alpine-composition` adds 3 more magics:

- `$name` - Name of the component. Readonly property.

- `$props` - Props passed to the component as reactive object.

- `$attrs` - HTML attributes (as object) of the element where the `x-data` was defined.

- `$options` - Initial component definition.

- `$emitsOptions` - Emits definition.

- `$emit` - Vue-like `emit()` method. Unlike `$dispatch`, `$emit` expects event handlers
to be set as props (e.g. `onClickButton` or `onClickButtonOnce` for event `'clickButton'`).
Thus, handlers for events emitted with `$emit()` must be explicitly defined on the component
that emits that event. In other words, the even does NOT bubble up. And when no event handler
is passed as a prop, the event is NOT sent.

  Similar to Vue, the `$emit` method has the event names and inputs autoamtically inferred from
  the component options when using TypeScript.

- `$onBeforeUnmount` - Equivalent of [Vue's `onBeforeUnmount`](https://vuejs.org/api/composition-api-lifecycle#onbeforeunmount).
Use this instead of Alpine's `destroy` hook.

```ts
import { defineComponent } from 'alpine-composition';
import { ref, computed, watchEffect, setAlpine } from 'alpine-reactivity';

const Button = defineComponent({
  name: 'Button',
  setup(props, vm) {
    const nameEl = vm.$el.querySelector('input[name="name"]');
    
    console.log(vm.$name);

    vm.$onBeforeUnmount(() => {
      doUnregisterSomething();
    });

    const inputVal = ref('');

    watch(inputVal, (newVal, oldVal) => {
      // Send an event that can be captured with
      // `x-on:input` directive
      vm.$dispatch('input', newVal);

      // Send an event that can be captured with
      // `onInput` prop
      vm.$emit('input', newVal);
    }, { immediate: true });
  },
});
```

## Extending

`alpine-composition` comes with a plugin system that allows you to modify the Alpine instance
for each component registered with the respective `registerComponent` function.

The example below is taken from Alpinui. Here, we defined a plugin for new magic
attribute `$aliasName` accessible inside the `setup()` method. `$aliasName` returns
the value of `aliasName` component option.

```ts
import {
  createAlpineComposition,
  defineComponent,
  type Data,
  type PluginFn,
} from 'alpine-composition';

import type { Alpine as AlpineType } from 'alpinejs';
import type { Magics } from 'alpinejs';

export interface CreateAlpinuiOptions {
  components?: Record<string, any>;
}

// Extend the types, so we get type hints for `vm.$aliasName` 
// and can specify `aliasName` on the component definition.
declare module 'alpine-composition' {
  interface AlpineInstance <P extends Data> extends Magics<P> {
    $aliasName?: string;
  }

  interface ComponentOptions <T extends Data, P extends Data> {
    aliasName?: string;
  }
}

// Alpinui adds `$aliasName` to the Alpine components
// Plugins receive the VM as the first arg, and context as second.
const aliasNamePlugin: PluginFn<Data, Data> = (vm, { options }) => {
  const { aliasName } = options;

  Object.defineProperty(vm, '$aliasName', {
    get() {
      return aliasName;
    },
  });
};

/** Register Alpinui components with Alpine */
export function createAlpinui(
  options: CreateAlpinuiOptions = {},
) {
  const { components = {} } = options;

  // We pass the plugins to `createAlpineComposition`.
  // This returns an instance of `registerComponent` function.
  // This behaves the same as the module-level `registerComponent`,
  // except it also calls our plugins.
  const { registerComponent } = createAlpineComposition({
    plugins: [
      aliasNamePlugin,
    ],
  });

  // Alpinui allows users to provide their own instance of Alpine
  // via install()
  const install = (Alpine: AlpineType) => {
    for (const key in components) {
      registerComponent(Alpine, components[key]);
    }
  };

  return {
    install,
    registerComponent,
  };
}
```

After we have created `createAlpinui`, we can register components with it like so:

```ts
import { defineComponent } from 'alpine-composition';

const Button = defineComponent({
  name: 'Button',
  props: { ... },
  setup() { ... },
  aliasName: 'ButtonAlias',
});

const alpinui = createAlpinui({
  components: { ... },
});

// NOTE: We use the newly created `registerComponent`,
// NOT the one from `alpine-composition`
alpinui.registerComponent(Alpine, Button);
```

## Reference

[See the docs](./docs/typedoc/modules.md)
