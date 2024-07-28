[alpine-composition](README.md) / Exports

# alpine-composition

## Table of contents

### Interfaces

- [AlpineInstance](interfaces/AlpineInstance.md)
- [ComponentOptions](interfaces/ComponentOptions.md)
- [CompositionOptions](interfaces/CompositionOptions.md)
- [PluginContext](interfaces/PluginContext.md)

### Type Aliases

- [AlpineType](modules.md#alpinetype)
- [AlpineVM](modules.md#alpinevm)
- [ComponentFactoryFn](modules.md#componentfactoryfn)
- [Data](modules.md#data)
- [EmitsOptions](modules.md#emitsoptions)
- [ObjectEmitsOptions](modules.md#objectemitsoptions)
- [PluginFn](modules.md#pluginfn)
- [RegisterComponentFn](modules.md#registercomponentfn)

### Functions

- [createAlpineComposition](modules.md#createalpinecomposition)
- [defineComponent](modules.md#definecomponent)
- [hasEvent](modules.md#hasevent)
- [registerComponent](modules.md#registercomponent)
- [registerComponentFactory](modules.md#registercomponentfactory)

## Type Aliases

### AlpineType

Ƭ **AlpineType**: `_AlpineType`

#### Defined in

packages/alpine-composition/src/types.ts:12

___

### AlpineVM

Ƭ **AlpineVM**\<`T`, `P`, `E`\>: `Pick`\<[`AlpineInstance`](interfaces/AlpineInstance.md)\<`T`, `P`, `E`\>, ``"$name"`` \| ``"$props"`` \| ``"$attrs"`` \| ``"$emit"`` \| ``"$options"`` \| ``"$emitsOptions"`` \| ``"$onBeforeUnmount"`` \| ``"init"`` \| ``"destroy"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) |

#### Defined in

packages/alpine-composition/src/component.ts:12

___

### ComponentFactoryFn

Ƭ **ComponentFactoryFn**\<`T`, `P`, `E`\>: (...`args`: `any`[]) => [`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) |

#### Type declaration

▸ (`...args`): [`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

[`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>

#### Defined in

packages/alpine-composition/src/component.ts:219

___

### Data

Ƭ **Data**: `Record`\<`string`, `any`\>

#### Defined in

packages/alpine-composition/src/types.ts:14

___

### EmitsOptions

Ƭ **EmitsOptions**: [`ObjectEmitsOptions`](modules.md#objectemitsoptions) \| `string`[]

#### Defined in

packages/alpine-composition/src/emit.ts:12

___

### ObjectEmitsOptions

Ƭ **ObjectEmitsOptions**: `Record`\<`string`, (...`args`: `any`[]) => `any` \| ``null``\>

#### Defined in

packages/alpine-composition/src/emit.ts:7

___

### PluginFn

Ƭ **PluginFn**\<`T`, `P`, `E`\>: (`vm`: `AlpineComponent`\<[`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>\>, `ctx`: [`PluginContext`](interfaces/PluginContext.md)\<`T`, `P`, `E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) = [`EmitsOptions`](modules.md#emitsoptions) |

#### Type declaration

▸ (`vm`, `ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | `AlpineComponent`\<[`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>\> |
| `ctx` | [`PluginContext`](interfaces/PluginContext.md)\<`T`, `P`, `E`\> |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/composition.ts:22

___

### RegisterComponentFn

Ƭ **RegisterComponentFn**\<`T`, `P`, `E`\>: (`Alpine`: [`AlpineType`](modules.md#alpinetype), `options`: [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>, `name`: `string`, `factoryFn`: [`ComponentFactoryFn`](modules.md#componentfactoryfn)\<`T`, `P`, `E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) |

#### Type declaration

▸ (`Alpine`, `options`, `name`, `factoryFn`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `Alpine` | [`AlpineType`](modules.md#alpinetype) |
| `options` | [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\> |
| `name` | `string` |
| `factoryFn` | [`ComponentFactoryFn`](modules.md#componentfactoryfn)\<`T`, `P`, `E`\> |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/component.ts:212

## Functions

### createAlpineComposition

▸ **createAlpineComposition**\<`T`, `P`, `E`\>(`options`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) = [`EmitsOptions`](modules.md#emitsoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`CompositionOptions`](interfaces/CompositionOptions.md)\<`T`, `P`, `E`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `registerComponent` | (`Alpine`: `Alpine`, `options`: [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>) => `void` |

#### Defined in

packages/alpine-composition/src/composition.ts:39

___

### defineComponent

▸ **defineComponent**\<`T`, `P`, `E`\>(`options`): [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\> |

#### Returns

[`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>

#### Defined in

packages/alpine-composition/src/component.ts:206

___

### hasEvent

▸ **hasEvent**(`props`, `name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Record`\<`string`, `any`\> |
| `name` | `string` |

#### Returns

`boolean`

#### Defined in

packages/alpine-composition/src/emit.ts:146

___

### registerComponent

▸ **registerComponent**(`Alpine`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Alpine` | `Alpine` |
| `options` | [`ComponentOptions`](interfaces/ComponentOptions.md)\<[`Data`](modules.md#data), [`Data`](modules.md#data), [`EmitsOptions`](modules.md#emitsoptions)\> |

#### Returns

`void`

#### Defined in

packages/alpine-composition/src/component.ts:288

___

### registerComponentFactory

▸ **registerComponentFactory**\<`T`, `P`, `E`\>(`registerFn`): (`Alpine`: `Alpine`, `options`: [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends [`EmitsOptions`](modules.md#emitsoptions) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `registerFn` | [`RegisterComponentFn`](modules.md#registercomponentfn)\<`T`, `P`, `E`\> |

#### Returns

`fn`

▸ (`Alpine`, `options`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `Alpine` | `Alpine` |
| `options` | [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\> |

##### Returns

`void`

#### Defined in

packages/alpine-composition/src/component.ts:223