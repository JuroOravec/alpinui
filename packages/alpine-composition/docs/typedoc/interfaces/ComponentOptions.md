[alpine-composition](../README.md) / [Exports](../modules.md) / ComponentOptions

# Interface: ComponentOptions\<T, P, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](../modules.md#data) = [`Data`](../modules.md#data) |
| `P` | extends [`Data`](../modules.md#data) = [`Data`](../modules.md#data) |
| `E` | extends [`EmitsOptions`](../modules.md#emitsoptions) = [`EmitsOptions`](../modules.md#emitsoptions) |

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [emits](ComponentOptions.md#emits)
- [initKey](ComponentOptions.md#initkey)
- [isolated](ComponentOptions.md#isolated)
- [name](ComponentOptions.md#name)
- [props](ComponentOptions.md#props)
- [setup](ComponentOptions.md#setup)

## Properties

### emits

• `Optional` **emits**: `E`

Declare the custom events emitted by the component.

See https://vuejs.org/api/options-state.html#emits

#### Defined in

[packages/alpine-composition/src/types.ts:62](https://github.com/JuroOravec/alpinui/blob/cb53256743337b271d8be16749ed81c26fe394c6/packages/alpine-composition/src/types.ts#L62)

___

### initKey

• `Optional` **initKey**: `string`

Initial component state can be passed to the component as JSON via `data-x-init` HTML attribute.
Change this option to override which `data-x-` key will be used.

#### Defined in

[packages/alpine-composition/src/types.ts:70](https://github.com/JuroOravec/alpinui/blob/cb53256743337b271d8be16749ed81c26fe394c6/packages/alpine-composition/src/types.ts#L70)

___

### isolated

• `Optional` **isolated**: `boolean`

If `isolated`, the component DOES NOT have access to variables defined in parent components.

#### Defined in

[packages/alpine-composition/src/types.ts:65](https://github.com/JuroOravec/alpinui/blob/cb53256743337b271d8be16749ed81c26fe394c6/packages/alpine-composition/src/types.ts#L65)

___

### name

• **name**: `string`

#### Defined in

[packages/alpine-composition/src/types.ts:55](https://github.com/JuroOravec/alpinui/blob/cb53256743337b271d8be16749ed81c26fe394c6/packages/alpine-composition/src/types.ts#L55)

___

### props

• **props**: `ComponentObjectPropsOptions`\<`P`\>

#### Defined in

[packages/alpine-composition/src/types.ts:56](https://github.com/JuroOravec/alpinui/blob/cb53256743337b271d8be16749ed81c26fe394c6/packages/alpine-composition/src/types.ts#L56)

___

### setup

• **setup**: (`props`: `Readonly`\<`P` & `EmitsToProps`\<`E`\>\>, `vm`: [`AlpineInstance`](AlpineInstance.md)\<`T`, `P`, `E`\>, ...`args`: `any`[]) => `T` \| `Promise`\<`T`\>

#### Type declaration

▸ (`props`, `vm`, `...args`): `T` \| `Promise`\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Readonly`\<`P` & `EmitsToProps`\<`E`\>\> |
| `vm` | [`AlpineInstance`](AlpineInstance.md)\<`T`, `P`, `E`\> |
| `...args` | `any`[] |

##### Returns

`T` \| `Promise`\<`T`\>

#### Defined in

[packages/alpine-composition/src/types.ts:63](https://github.com/JuroOravec/alpinui/blob/cb53256743337b271d8be16749ed81c26fe394c6/packages/alpine-composition/src/types.ts#L63)
