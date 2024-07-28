[alpine-composition](../README.md) / [Exports](../modules.md) / AlpineInstance

# Interface: AlpineInstance\<T, P, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](../modules.md#data) |
| `P` | extends [`Data`](../modules.md#data) |
| `E` | extends [`EmitsOptions`](../modules.md#emitsoptions) |

## Hierarchy

- `Magics`\<`P`\>

  ↳ **`AlpineInstance`**

## Table of contents

### Properties

- [$attrs](AlpineInstance.md#$attrs)
- [$data](AlpineInstance.md#$data)
- [$dispatch](AlpineInstance.md#$dispatch)
- [$el](AlpineInstance.md#$el)
- [$emit](AlpineInstance.md#$emit)
- [$emitsOptions](AlpineInstance.md#$emitsoptions)
- [$id](AlpineInstance.md#$id)
- [$name](AlpineInstance.md#$name)
- [$nextTick](AlpineInstance.md#$nexttick)
- [$onBeforeUnmount](AlpineInstance.md#$onbeforeunmount)
- [$options](AlpineInstance.md#$options)
- [$props](AlpineInstance.md#$props)
- [$refs](AlpineInstance.md#$refs)
- [$root](AlpineInstance.md#$root)
- [$store](AlpineInstance.md#$store)
- [$watch](AlpineInstance.md#$watch)
- [destroy](AlpineInstance.md#destroy)
- [init](AlpineInstance.md#init)

## Properties

### $attrs

• **$attrs**: `Readonly`\<`Record`\<`string`, `string` \| ``true``\>\>

HTML attributes (as object) of the element where the `x-data` was defined.

#### Defined in

packages/alpine-composition/src/types.ts:26

___

### $data

• **$data**: `InferInterceptors`\<`P`\>

Provides access to the element's current Alpine scope
This is a flattened Proxy object over the datastack
Use to avoid errors from accessing undefined properties

#### Inherited from

Magics.$data

#### Defined in

node_modules/@types/alpinejs/index.d.ts:170

___

### $dispatch

• **$dispatch**: (`event`: `string`, `detail?`: `any`) => `void`

Dispatches a CustomEvent on the current DOM node.
Event automatically bubbles up the DOM tree.

#### Type declaration

▸ (`event`, `detail?`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `string` | the event name |
| `detail?` | `any` | an event-dependent value associated with the event |

##### Returns

`void`

#### Inherited from

Magics.$dispatch

#### Defined in

node_modules/@types/alpinejs/index.d.ts:178

___

### $el

• **$el**: `HTMLElement`

The current HTMLElement that triggered this expression.

#### Inherited from

Magics.$el

#### Defined in

node_modules/@types/alpinejs/index.d.ts:182

___

### $emit

• **$emit**: \<K\>(`name`: `K`, ...`args`: `Parameters`\<`Exclude`\<`EmitsToEmitFns`\<`E`\>[`K`], `undefined`\>\>) => `void`

Vue-like `emit()` method. Unlike `$dispatch`, `$emit` expects event handlers
to be set as props (e.g. `onClickButton` or `onClickButtonOnce` for event
`clickButton`).

Thus, handlers for events emitted with `$emit()` must be explicitly defined
on the component that emits that event. In other words, the even does NOT
bubble up. When no event handler is passed as a prop, the event is NOT sent.

#### Type declaration

▸ \<`K`\>(`name`, `...args`): `void`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `K` |
| `...args` | `Parameters`\<`Exclude`\<`EmitsToEmitFns`\<`E`\>[`K`], `undefined`\>\> |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/types.ts:44

___

### $emitsOptions

• **$emitsOptions**: `Readonly`\<[`ObjectEmitsOptions`](../modules.md#objectemitsoptions)\>

Normalized declaration of custom events emitted by the component.

See https://vuejs.org/api/options-state.html#emits

#### Defined in

packages/alpine-composition/src/types.ts:34

___

### $id

• **$id**: (`name`: `string`, `key?`: ``null`` \| `string` \| `number`) => `string`

Generate a unique ID within the current `x-id` scope.
Name is required to allow reuse in related contexts.

#### Type declaration

▸ (`name`, `key?`): `string`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the id |
| `key?` | ``null`` \| `string` \| `number` | suffix on the end of the generated ID, usually helpful for the purpose of identifying id in a loop |

##### Returns

`string`

#### Inherited from

Magics.$id

#### Defined in

node_modules/@types/alpinejs/index.d.ts:190

___

### $name

• **$name**: `string`

Name of the component.

#### Defined in

packages/alpine-composition/src/types.ts:22

___

### $nextTick

• **$nextTick**: (`callback?`: () => `void`) => `Promise`\<`void`\>

Triggers callback at the beginning of the next event loop.
Use to evaluate AFTER Alpine has made reactive DOM updates.

#### Type declaration

▸ (`callback?`): `Promise`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback?` | () => `void` | a callback that will be fired on next tick |

##### Returns

`Promise`\<`void`\>

#### Inherited from

Magics.$nextTick

#### Defined in

node_modules/@types/alpinejs/index.d.ts:197

___

### $onBeforeUnmount

• **$onBeforeUnmount**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/types.ts:48

___

### $options

• **$options**: `Readonly`\<[`ComponentOptions`](ComponentOptions.md)\<`T`, `P`, `E`\>\>

Initial component definition.

#### Defined in

packages/alpine-composition/src/types.ts:28

___

### $props

• **$props**: `Readonly`\<`P`\>

Props passed to the component as reactive object.

#### Defined in

packages/alpine-composition/src/types.ts:24

___

### $refs

• **$refs**: `Record`\<`string`, `HTMLElement`\>

Record of DOM elements marked with `x-ref` inside the component.

#### Inherited from

Magics.$refs

#### Defined in

node_modules/@types/alpinejs/index.d.ts:201

___

### $root

• **$root**: `ElementWithXAttributes`\<`HTMLElement`\>

The root element of the current component context.
Roots are typically defined by `x-data` directive.

#### Inherited from

Magics.$root

#### Defined in

node_modules/@types/alpinejs/index.d.ts:206

___

### $store

• **$store**: `Stores`

Record of global reactive Alpine stores.

#### Inherited from

Magics.$store

#### Defined in

node_modules/@types/alpinejs/index.d.ts:210

___

### $watch

• **$watch**: \<K, V\>(`property`: `K`, `callback`: (`newValue`: `V`, `oldValue`: `V`) => `void`) => `void`

Evaluate the given callback when the property is changed.
Deeply watches for changes on object and array types.
Property can be a dot notated nested property.

#### Type declaration

▸ \<`K`, `V`\>(`property`, `callback`): `void`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |
| `V` | extends `any` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `property` | `K` | the component property |
| `callback` | (`newValue`: `V`, `oldValue`: `V`) => `void` | a callback that will fire when a given property is changed |

##### Returns

`void`

#### Inherited from

Magics.$watch

#### Defined in

node_modules/@types/alpinejs/index.d.ts:219

___

### destroy

• **destroy**: (`this`: `Magics`\<[`Data`](../modules.md#data)\>) => `void`

#### Type declaration

▸ (`this`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Magics`\<[`Data`](../modules.md#data)\> |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/types.ts:50

___

### init

• **init**: (`this`: `Magics`\<[`Data`](../modules.md#data)\>) => `void`

#### Type declaration

▸ (`this`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `Magics`\<[`Data`](../modules.md#data)\> |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/types.ts:49
