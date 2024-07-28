# Alpine Provide Inject

Adds `$provide` and `$inject` magics. These work similar to Vue's `provide`/`inject`:

```html
<div
  x-data="{
    outerValue: 'Outer Value'
  }"
  x-init="$provide('key', outerValue)"
>
  <div
    x-data="{
      innerValue: 'Inner Value'
    }"
    x-init="$provide('key', innerValue)"
  >
    <div x-data>
      <!-- This will show "Inner Value" -->
      <span x-text="$inject('key')"></span>
    </div>
  </div>
  <div x-data>
    <!-- This will show "Outer Value" -->
    <span x-text="$inject('key')"></span>

    <!--
      Similar to `$inject`, but will return value only
      if the closest component provided the key
     -->
    <span x-text="$injectSelf('key')"></span>
  </div>
</div>
```

## Installation

### Via CDN

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpine-provide-inject@0.x.x/dist/cdn.min.js"></script>
```

### Via NPM

```sh
npm install alpine-provide-inject
```

Then initialize it from your bundle:

```js
import Alpine from 'alpinejs'
import ProvideInject from 'alpine-provide-inject'
 
Alpine.plugin(ProvideInject)

...
```
