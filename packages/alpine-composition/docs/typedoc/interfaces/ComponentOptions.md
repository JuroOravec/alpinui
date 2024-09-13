[alpine-composition](../README.md) / [Exports](../modules.md) / ComponentOptions

# Interface: ComponentOptions\<T, P, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](../modules.md#data) = [`Data`](../modules.md#data) |
| `P` | extends [`Data`](../modules.md#data) = [`Data`](../modules.md#data) |
| `E` | extends `EmitsOptions` = `EmitsOptions` |

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

[packages/alpine-composition/src/types.ts:79](https://github.com/JuroOravec/alpinui/blob/2690b832ca277df66c6c8e994489b6d157fec859/packages/alpine-composition/src/types.ts#L79)

___

### initKey

• `Optional` **initKey**: `string`

Initial component state can be passed to the component as JSON via `data-x-init` HTML attribute.
Change this option to override which `data-x-` key will be used.

#### Defined in

[packages/alpine-composition/src/types.ts:92](https://github.com/JuroOravec/alpinui/blob/2690b832ca277df66c6c8e994489b6d157fec859/packages/alpine-composition/src/types.ts#L92)

___

### isolated

• `Optional` **isolated**: `boolean`

If `isolated`, the component DOES NOT have access to variables defined in parent components.

#### Defined in

[packages/alpine-composition/src/types.ts:87](https://github.com/JuroOravec/alpinui/blob/2690b832ca277df66c6c8e994489b6d157fec859/packages/alpine-composition/src/types.ts#L87)

___

### name

• **name**: `string`

#### Defined in

[packages/alpine-composition/src/types.ts:72](https://github.com/JuroOravec/alpinui/blob/2690b832ca277df66c6c8e994489b6d157fec859/packages/alpine-composition/src/types.ts#L72)

___

### props

• **props**: `ComponentObjectPropsOptions`\<`P`\>

#### Defined in

[packages/alpine-composition/src/types.ts:73](https://github.com/JuroOravec/alpinui/blob/2690b832ca277df66c6c8e994489b6d157fec859/packages/alpine-composition/src/types.ts#L73)

___

### setup

• **setup**: (`props`: `Readonly`\<`P` & `EmitsToProps`\<`E`\>\>, `vm`: [`AlpineInstance`](AlpineInstance.md)\<`T`, `P`, `E`\>, `reactivity`: [`ReactivityAPI`](ReactivityAPI.md), ...`args`: `any`[]) => `T` \| `Promise`\<`T`\>

#### Type declaration

▸ (`props`, `vm`, `reactivity`, `...args`): `T` \| `Promise`\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Readonly`\<`P` & `EmitsToProps`\<`E`\>\> |
| `vm` | [`AlpineInstance`](AlpineInstance.md)\<`T`, `P`, `E`\> |
| `reactivity` | [`ReactivityAPI`](ReactivityAPI.md) |
| `...args` | `any`[] |

##### Returns

`T` \| `Promise`\<`T`\>

#### Defined in

[packages/alpine-composition/src/types.ts:80](https://github.com/JuroOravec/alpinui/blob/2690b832ca277df66c6c8e994489b6d157fec859/packages/alpine-composition/src/types.ts#L80)
