[alpine-composition](../README.md) / [Exports](../modules.md) / PluginContext

# Interface: PluginContext\<T, P, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](../modules.md#data) = [`Data`](../modules.md#data) |
| `P` | extends [`Data`](../modules.md#data) = [`Data`](../modules.md#data) |
| `E` | extends [`EmitsOptions`](../modules.md#emitsoptions) = [`EmitsOptions`](../modules.md#emitsoptions) |

## Table of contents

### Properties

- [Alpine](PluginContext.md#alpine)
- [args](PluginContext.md#args)
- [name](PluginContext.md#name)
- [options](PluginContext.md#options)
- [vm](PluginContext.md#vm)

## Properties

### Alpine

• **Alpine**: `Alpine`

#### Defined in

packages/alpine-composition/src/composition.ts:15

___

### args

• **args**: `any`[]

#### Defined in

packages/alpine-composition/src/composition.ts:16

___

### name

• **name**: `string`

#### Defined in

packages/alpine-composition/src/composition.ts:17

___

### options

• **options**: [`ComponentOptions`](ComponentOptions.md)\<`T`, `P`, `E`\>

#### Defined in

packages/alpine-composition/src/composition.ts:18

___

### vm

• **vm**: [`AlpineVM`](../modules.md#alpinevm)\<`T`, `P`, `E`\>

#### Defined in

packages/alpine-composition/src/composition.ts:19
