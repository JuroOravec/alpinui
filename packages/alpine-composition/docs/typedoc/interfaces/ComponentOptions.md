[alpine-composition](../README.md) / [Exports](../modules.md) / ComponentOptions

# Interface: ComponentOptions\<T, P, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](../modules.md#data) |
| `P` | extends [`Data`](../modules.md#data) |
| `E` | extends [`EmitsOptions`](../modules.md#emitsoptions) |

## Indexable

▪ [key: `string`]: `any`

## Table of contents

### Properties

- [emits](ComponentOptions.md#emits)
- [name](ComponentOptions.md#name)
- [props](ComponentOptions.md#props)
- [setup](ComponentOptions.md#setup)

## Properties

### emits

• `Optional` **emits**: `E`

Declare the custom events emitted by the component.

See https://vuejs.org/api/options-state.html#emits

#### Defined in

packages/alpine-composition/src/types.ts:66

___

### name

• **name**: `string`

#### Defined in

packages/alpine-composition/src/types.ts:59

___

### props

• **props**: `RequiredNotNull`\<`ComponentObjectPropsOptions`\<`P`\>\>

#### Defined in

packages/alpine-composition/src/types.ts:60

___

### setup

• **setup**: (`props`: `Readonly`\<`P` & `EmitsToProps`\<`E`\>\>, `vm`: [`AlpineInstance`](AlpineInstance.md)\<`T`, `P`, `E`\>, ...`args`: `any`[]) => `T`

#### Type declaration

▸ (`props`, `vm`, `...args`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Readonly`\<`P` & `EmitsToProps`\<`E`\>\> |
| `vm` | [`AlpineInstance`](AlpineInstance.md)\<`T`, `P`, `E`\> |
| `...args` | `any`[] |

##### Returns

`T`

#### Defined in

packages/alpine-composition/src/types.ts:67
