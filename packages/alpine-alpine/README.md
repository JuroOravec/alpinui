# Alpine Alpine plugin

Adds `$Alpine` magic - a reference to the `Alpine` object that was used
for registering the magics, directives, and components.

```html
<div x-data x-init="console.log($Alpine)">
</div>
```

## Installation

### Via CDN

```html
<script defer src="https://cdn.jsdelivr.net/npm/alpine-alpine@0.x.x/dist/cdn.min.js"></script>
```

### Via NPM

```sh
npm install alpine-alpine
```

Then initialize it from your bundle:

```js
import Alpine from 'alpinejs'
import AlpinePlugin from 'alpine-alpine'
 
Alpine.plugin(AlpinePlugin)

...
```
