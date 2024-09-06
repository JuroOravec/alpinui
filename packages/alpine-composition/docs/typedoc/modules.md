[alpine-composition](README.md) / Exports

# alpine-composition

## Table of contents

### Interfaces

- [AlpineInstance](interfaces/AlpineInstance.md)
- [ComponentOptions](interfaces/ComponentOptions.md)
- [CompositionOptions](interfaces/CompositionOptions.md)
- [PluginContext](interfaces/PluginContext.md)
- [ReactivityAPI](interfaces/ReactivityAPI.md)

### Type Aliases

- [AlpineInstanceFromOptions](modules.md#alpineinstancefromoptions)
- [AlpineType](modules.md#alpinetype)
- [AlpineVM](modules.md#alpinevm)
- [ComponentFactoryFn](modules.md#componentfactoryfn)
- [Data](modules.md#data)
- [PluginFn](modules.md#pluginfn)
- [RegisterComponentFn](modules.md#registercomponentfn)

### Functions

- [createAlpineComposition](modules.md#createalpinecomposition)
- [createReactivityAPI](modules.md#createreactivityapi)
- [defineComponent](modules.md#definecomponent)
- [hasEvent](modules.md#hasevent)
- [registerComponent](modules.md#registercomponent)
- [registerComponentFactory](modules.md#registercomponentfactory)

## Type Aliases

### AlpineInstanceFromOptions

Ƭ **AlpineInstanceFromOptions**\<`T`\>: `T` extends [`ComponentOptions`](interfaces/ComponentOptions.md)\<infer U, infer V, infer W\> ? [`AlpineInstance`](interfaces/AlpineInstance.md)\<`U`, `V`, `W`\> : `never`

Convert ComponentOptions to AlpineInstance

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ComponentOptions`](interfaces/ComponentOptions.md)\<`any`, `any`, `any`\> |

#### Defined in

[packages/alpine-composition/src/types.ts:96](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/types.ts#L96)

___

### AlpineType

Ƭ **AlpineType**: `_AlpineType`

#### Defined in

[packages/alpine-composition/src/types.ts:25](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/types.ts#L25)

___

### AlpineVM

Ƭ **AlpineVM**\<`T`, `P`, `E`\>: `Pick`\<[`AlpineInstance`](interfaces/AlpineInstance.md)\<`T`, `P`, `E`\>, ``"$name"`` \| ``"$props"`` \| ``"$attrs"`` \| ``"$emit"`` \| ``"$options"`` \| ``"$emitsOptions"`` \| ``"$onBeforeUnmount"`` \| ``"init"`` \| ``"destroy"``\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` = `EmitsOptions` |

#### Defined in

[packages/alpine-composition/src/component.ts:13](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/component.ts#L13)

___

### ComponentFactoryFn

Ƭ **ComponentFactoryFn**\<`T`, `P`, `E`\>: (...`args`: `any`[]) => [`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` |

#### Type declaration

▸ (`...args`): [`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

[`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>

#### Defined in

[packages/alpine-composition/src/component.ts:197](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/component.ts#L197)

___

### Data

Ƭ **Data**: `Record`\<`string`, `any`\>

#### Defined in

[packages/alpine-composition/src/types.ts:27](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/types.ts#L27)

___

### PluginFn

Ƭ **PluginFn**\<`T`, `P`, `E`\>: (`vm`: `AlpineComponent`\<[`AlpineVM`](modules.md#alpinevm)\<`T`, `P`, `E`\>\>, `ctx`: [`PluginContext`](interfaces/PluginContext.md)\<`T`, `P`, `E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` = `EmitsOptions` |

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

[packages/alpine-composition/src/composition.ts:22](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/composition.ts#L22)

___

### RegisterComponentFn

Ƭ **RegisterComponentFn**\<`T`, `P`, `E`\>: (`Alpine`: [`AlpineType`](modules.md#alpinetype), `options`: [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>, `name`: `string`, `factoryFn`: [`ComponentFactoryFn`](modules.md#componentfactoryfn)\<`T`, `P`, `E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` |

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

[packages/alpine-composition/src/component.ts:190](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/component.ts#L190)

## Functions

### createAlpineComposition

▸ **createAlpineComposition**\<`T`, `P`, `E`\>(`options`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) = [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` = `EmitsOptions` |

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

[packages/alpine-composition/src/composition.ts:39](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/composition.ts#L39)

___

### createReactivityAPI

▸ **createReactivityAPI**(`instance`): [`ReactivityAPI`](interfaces/ReactivityAPI.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | [`AlpineInstance`](interfaces/AlpineInstance.md)\<`any`, `any`, `any`\> |

#### Returns

[`ReactivityAPI`](interfaces/ReactivityAPI.md)

#### Defined in

[packages/alpine-composition/src/reactivity.ts:72](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L72)

___

### defineComponent

▸ **defineComponent**\<`T`, `P`, `E`\>(`options`): [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\> |

#### Returns

[`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>

#### Defined in

[packages/alpine-composition/src/component.ts:184](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/component.ts#L184)

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

[packages/alpine-composition/src/emit.ts:140](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/emit.ts#L140)

___

### registerComponent

▸ **registerComponent**(`Alpine`, `options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Alpine` | `Alpine` |
| `options` | [`ComponentOptions`](interfaces/ComponentOptions.md)\<[`Data`](modules.md#data), [`Data`](modules.md#data), `EmitsOptions`\> |

#### Returns

`void`

#### Defined in

[packages/alpine-composition/src/component.ts:298](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/component.ts#L298)

___

### registerComponentFactory

▸ **registerComponentFactory**\<`T`, `P`, `E`\>(`registerFn`): (`Alpine`: `Alpine`, `options`: [`ComponentOptions`](interfaces/ComponentOptions.md)\<`T`, `P`, `E`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Data`](modules.md#data) |
| `P` | extends [`Data`](modules.md#data) |
| `E` | extends `EmitsOptions` |

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

[packages/alpine-composition/src/component.ts:201](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/component.ts#L201)
