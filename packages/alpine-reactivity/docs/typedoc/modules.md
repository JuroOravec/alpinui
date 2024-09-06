[alpine-reactivity](README.md) / Exports

# alpine-reactivity

## Table of contents

### Interfaces

- [ComputedRef](interfaces/ComputedRef.md)
- [Ref](interfaces/Ref.md)
- [WatchOptions](interfaces/WatchOptions.md)

### Type Aliases

- [DeepReadonly](modules.md#deepreadonly)
- [MaybeRef](modules.md#mayberef)
- [ToRefs](modules.md#torefs)
- [UnwrapRef](modules.md#unwrapref)
- [UnwrapRefSimple](modules.md#unwraprefsimple)
- [WatchCallback](modules.md#watchcallback)
- [WatchEffect](modules.md#watcheffect)
- [WatchSource](modules.md#watchsource)
- [WatchStopHandle](modules.md#watchstophandle)

### Functions

- [computed](modules.md#computed)
- [getAlpine](modules.md#getalpine)
- [isComputed](modules.md#iscomputed)
- [isRef](modules.md#isref)
- [reactive](modules.md#reactive)
- [readonly](modules.md#readonly)
- [ref](modules.md#ref)
- [setAlpine](modules.md#setalpine)
- [shallowRef](modules.md#shallowref)
- [stop](modules.md#stop)
- [toRaw](modules.md#toraw)
- [toRef](modules.md#toref)
- [toRefs](modules.md#torefs-1)
- [unref](modules.md#unref)
- [watch](modules.md#watch)
- [watchEffect](modules.md#watcheffect-1)
- [writableComputed](modules.md#writablecomputed)

## Type Aliases

### DeepReadonly

Ƭ **DeepReadonly**\<`T`\>: `T` extends `Builtin` ? `T` : `T` extends `Map`\<infer K, infer V\> ? `ReadonlyMap`\<[`DeepReadonly`](modules.md#deepreadonly)\<`K`\>, [`DeepReadonly`](modules.md#deepreadonly)\<`V`\>\> : `T` extends `ReadonlyMap`\<infer K, infer V\> ? `ReadonlyMap`\<[`DeepReadonly`](modules.md#deepreadonly)\<`K`\>, [`DeepReadonly`](modules.md#deepreadonly)\<`V`\>\> : `T` extends `WeakMap`\<infer K, infer V\> ? `WeakMap`\<[`DeepReadonly`](modules.md#deepreadonly)\<`K`\>, [`DeepReadonly`](modules.md#deepreadonly)\<`V`\>\> : `T` extends `Set`\<infer U\> ? `ReadonlySet`\<[`DeepReadonly`](modules.md#deepreadonly)\<`U`\>\> : `T` extends `ReadonlySet`\<infer U\> ? `ReadonlySet`\<[`DeepReadonly`](modules.md#deepreadonly)\<`U`\>\> : `T` extends `WeakSet`\<infer U\> ? `WeakSet`\<[`DeepReadonly`](modules.md#deepreadonly)\<`U`\>\> : `T` extends `Promise`\<infer U\> ? `Promise`\<[`DeepReadonly`](modules.md#deepreadonly)\<`U`\>\> : `T` extends [`Ref`](interfaces/Ref.md)\<infer U\> ? `Readonly`\<[`Ref`](interfaces/Ref.md)\<...\>\> : `T` extends {} ? \{ readonly [K in (...)]: (...) } : `Readonly`\<...\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/reactivity.ts:223](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L223)

___

### MaybeRef

Ƭ **MaybeRef**\<`T`\>: `T` \| [`Ref`](interfaces/Ref.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/reactivity.ts:39](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L39)

___

### ToRefs

Ƭ **ToRefs**\<`T`\>: \{ [K in keyof T]: Ref\<UnwrapRef\<T[K]\>\> }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[src/reactivity.ts:47](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L47)

___

### UnwrapRef

Ƭ **UnwrapRef**\<`T`\>: `T` extends [`Ref`](interfaces/Ref.md)\<infer V\> ? [`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`V`\> : `T` extends [`ComputedRef`](interfaces/ComputedRef.md)\<infer V\> ? [`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`V`\> : [`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/reactivity.ts:159](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L159)

___

### UnwrapRefSimple

Ƭ **UnwrapRefSimple**\<`T`\>: `T` extends [`Ref`](interfaces/Ref.md) ? `T` : `T` extends `Map`\<infer K, infer V\> ? `Map`\<`K`, [`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`V`\>\> & [`UnwrapRef`](modules.md#unwrapref)\<`Omit`\<`T`, keyof `Map`\<`any`, `any`\>\>\> : `T` extends `WeakMap`\<infer K, infer V\> ? `WeakMap`\<`K`, [`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`V`\>\> & [`UnwrapRef`](modules.md#unwrapref)\<`Omit`\<`T`, keyof `WeakMap`\<`any`, `any`\>\>\> : `T` extends `Set`\<infer V\> ? `Set`\<[`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`V`\>\> & [`UnwrapRef`](modules.md#unwrapref)\<`Omit`\<`T`, keyof `Set`\<`any`\>\>\> : `T` extends `WeakSet`\<infer V\> ? `WeakSet`\<[`UnwrapRefSimple`](modules.md#unwraprefsimple)\<`V`\>\> & [`UnwrapRef`](modules.md#unwrapref)\<`Omit`\<`T`, keyof `WeakSet`\<`any`\>\>\> : `T` extends `ReadonlyArray`\<`any`\> ? \{ [K in keyof T]: UnwrapRefSimple\<T[K]\> } : `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/reactivity.ts:165](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L165)

___

### WatchCallback

Ƭ **WatchCallback**\<`V`, `OV`\>: (`value`: `V`, `oldValue`: `OV`) => `any`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | `any` |
| `OV` | `any` |

#### Type declaration

▸ (`value`, `oldValue`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |
| `oldValue` | `OV` |

##### Returns

`any`

#### Defined in

[src/reactivity.ts:263](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L263)

___

### WatchEffect

Ƭ **WatchEffect**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/reactivity.ts:259](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L259)

___

### WatchSource

Ƭ **WatchSource**\<`T`\>: [`Ref`](interfaces/Ref.md)\<`T`\> \| [`ComputedRef`](interfaces/ComputedRef.md)\<`T`\> \| () => `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Defined in

[src/reactivity.ts:261](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L261)

___

### WatchStopHandle

Ƭ **WatchStopHandle**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/reactivity.ts:265](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L265)

## Functions

### computed

▸ **computed**\<`T`\>(`cb`): [`ComputedRef`](interfaces/ComputedRef.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `T` |

#### Returns

[`ComputedRef`](interfaces/ComputedRef.md)\<`T`\>

#### Defined in

[src/reactivity.ts:49](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L49)

___

### getAlpine

▸ **getAlpine**(): `Alpine`

#### Returns

`Alpine`

#### Defined in

[src/reactivity.ts:24](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L24)

___

### isComputed

▸ **isComputed**\<`T`\>(`value`): value is ComputedRef\<T\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is ComputedRef\<T\>

#### Defined in

[src/reactivity.ts:107](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L107)

___

### isRef

▸ **isRef**\<`T`\>(`value`): value is Ref\<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

value is Ref\<T\>

#### Defined in

[src/reactivity.ts:101](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L101)

___

### reactive

▸ **reactive**\<`T`\>(`val`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `T` |

#### Returns

`T`

#### Defined in

[src/reactivity.ts:70](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L70)

___

### readonly

▸ **readonly**\<`T`\>(`target`): `any`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |

#### Returns

`any`

**`Example`**

```ts
const state = readonly({
  count: 1,
  nested: {
    value: 10,
  },
});

console.log(state.count); // Output: 1
state.count = 2;          // Warning: Cannot set property count on a readonly object
console.log(state.count); // Output: 1
delete state.count;       // Warning: Cannot delete property count on a readonly object

console.log(state.nested.value); // Output: 10
state.nested.value = 20;         // Warning: Cannot set property value on a readonly object
console.log(state.nested.value); // Output: 10
```

#### Defined in

[src/reactivity.ts:198](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L198)

___

### ref

▸ **ref**\<`T`\>(`value?`): `T` extends [`Ref`](interfaces/Ref.md)\<`any`\> ? `T`\<`T`\> : [`Ref`](interfaces/Ref.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `undefined` \| `T` | `undefined` |

#### Returns

`T` extends [`Ref`](interfaces/Ref.md)\<`any`\> ? `T`\<`T`\> : [`Ref`](interfaces/Ref.md)\<`T`\>

#### Defined in

[src/reactivity.ts:72](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L72)

___

### setAlpine

▸ **setAlpine**(`instance`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | `Alpine` |

#### Returns

`void`

#### Defined in

[src/reactivity.ts:20](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L20)

___

### shallowRef

▸ **shallowRef**\<`T`\>(`initialValue?`): [`Ref`](interfaces/Ref.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `initialValue` | `undefined` \| `T` | `undefined` |

#### Returns

[`Ref`](interfaces/Ref.md)\<`T`\>

#### Defined in

[src/reactivity.ts:117](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L117)

___

### stop

▸ **stop**(`runner`): `void`

Stops the effect associated with the given runner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `runner` | `ReactiveEffectRunner`\<`any`\> | Association with the effect to stop tracking. |

#### Returns

`void`

#### Defined in

[src/reactivity.ts:157](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L157)

___

### toRaw

▸ **toRaw**\<`T`\>(`observed`): `T`

Returns the raw, original object of a Vue-created proxy.

`toRaw()` can return the original object from proxies created by
[()](modules.md#reactive), [()](modules.md#readonly), shallowReactive() or
shallowReadonly().

This is an escape hatch that can be used to temporarily read without
incurring proxy access / tracking overhead or write without triggering
changes. It is **not** recommended to hold a persistent reference to the
original object. Use with caution.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observed` | `T` | The object for which the "raw" value is requested. |

#### Returns

`T`

**`Example`**

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

**`See`**

[https://vuejs.org/api/reactivity-advanced.html#toraw](https://vuejs.org/api/reactivity-advanced.html#toraw)

#### Defined in

[src/reactivity.ts:153](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L153)

___

### toRef

▸ **toRef**\<`T`, `K`\>(`object`, `key`): [`Ref`](interfaces/Ref.md)\<`T`[`K`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `key` | `K` |

#### Returns

[`Ref`](interfaces/Ref.md)\<`T`[`K`]\>

#### Defined in

[src/reactivity.ts:129](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L129)

___

### toRefs

▸ **toRefs**\<`T`\>(`object`): [`ToRefs`](modules.md#torefs)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |

#### Returns

[`ToRefs`](modules.md#torefs)\<`T`\>

#### Defined in

[src/reactivity.ts:138](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L138)

___

### unref

▸ **unref**\<`T`\>(`ref`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ref` | `T` \| [`Ref`](interfaces/Ref.md)\<`T`\> |

#### Returns

`T`

#### Defined in

[src/reactivity.ts:113](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L113)

___

### watch

▸ **watch**\<`T`, `Immediate`\>(`sources`, `cb`, `options?`): [`WatchStopHandle`](modules.md#watchstophandle)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends readonly [`WatchSource`](modules.md#watchsource)\<`unknown`\>[] |
| `Immediate` | extends `Readonly`\<`boolean`\> = ``false`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | `T` |
| `cb` | [`WatchCallback`](modules.md#watchcallback)\<`MapSources`\<`T`\>, `MapOldSources`\<`T`, `Immediate`\>\> |
| `options?` | [`WatchOptions`](interfaces/WatchOptions.md)\<`Immediate`\> |

#### Returns

[`WatchStopHandle`](modules.md#watchstophandle)

#### Defined in

[src/reactivity.ts:309](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L309)

▸ **watch**\<`T`, `Immediate`\>(`source`, `cb`, `options?`): [`WatchStopHandle`](modules.md#watchstophandle)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Immediate` | extends `Readonly`\<`boolean`\> = ``false`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`WatchSource`](modules.md#watchsource)\<`T`\> |
| `cb` | [`WatchCallback`](modules.md#watchcallback)\<`T`, `Immediate` extends ``true`` ? `undefined` \| `T` : `T`\> |
| `options?` | [`WatchOptions`](interfaces/WatchOptions.md)\<`Immediate`\> |

#### Returns

[`WatchStopHandle`](modules.md#watchstophandle)

#### Defined in

[src/reactivity.ts:319](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L319)

___

### watchEffect

▸ **watchEffect**(`effect`): [`WatchStopHandle`](modules.md#watchstophandle)

#### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | () => `unknown` |

#### Returns

[`WatchStopHandle`](modules.md#watchstophandle)

#### Defined in

[src/reactivity.ts:300](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L300)

___

### writableComputed

▸ **writableComputed**\<`T`\>(`options`): [`Ref`](interfaces/Ref.md)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.get` | () => `T` |
| `options.set` | (`newVal`: `T`) => `void` |

#### Returns

[`Ref`](interfaces/Ref.md)\<`T`\>

#### Defined in

[src/reactivity.ts:84](https://github.com/JuroOravec/alpinui/blob/944eb15eb2224c1c04c2f37d909b6bb641070811/packages/alpine-reactivity/src/reactivity.ts#L84)
