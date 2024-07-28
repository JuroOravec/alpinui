alpine-reactivity / [Exports](modules.md)

# TODO
# TODO
# TODO - Rebuild (also docs) and remove nexttick
# TODO

# Alpine reactivity

_Vue reactivity for Alpine._

Bring the powerful reactivity system from Vue into your Alpine projects.

What is Vue reactivity system?

- [Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [In depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)

Example:

```ts
import { ref, computed, watch, setAlpine } from 'alpine-reactivity';

// If the Alpine package is NOT available under window.Alpine, set it here
setAlpine(Alpine);

document.addEventListener('alpine:init', () => {
  Alpine.data('button', () => {
    const counter = ref(0);

    const countFormatted = computed(() => `Clicked ${counter.value} times!`);

    watch(counter, () => {
      this.$dispatch('clicked', counter.value);
    });

    const onClick = () => {
      counter.value += 1;
    };

    return {
      counter,
      countFormatted,
      onClick,
    };
  });
});
```

```html
<div x-data="button">
  <span x-text="countFormatted"></span>
  <button @click="onClick">Click me!</button>
</div>
```

## How it works

Alpine is [built on top of Vue's reactivity system](https://alpinejs.dev/advanced/reactivity).

However, Alpine is loosely coupled to Vue. It uses only `reactive`, `effect`, `stop`, and `toRaw`,
and Alpine allows you to [provide your own reactivity system](https://github.com/alpinejs/alpine/blob/6ac97825351623e9251b6a8bb7cbd805b7a9a94c/packages/alpinejs/src/index.js#L41).

Because of this, importing and using Vue reactivity system directly is not advised.

Instead, `alpine-reactive` reimplements the rest of the Vue reactivity methods like `ref` or `computed`
using only the four building blocks.

## Installation

### Via CDN

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpine-reactivity@0.x.x/dist/cdn.min.js"></script>
```

```js
const { ref, computed, watch } = AlpineReactivity;

ref(123);
```

### Via NPM

```sh
npm install alpine-reactivity
```

```js
import { ref, computed, watch } from 'alpine-reactivity';

ref(123);
```

## Reference

[See the docs](./docs/typedoc/modules.md)
