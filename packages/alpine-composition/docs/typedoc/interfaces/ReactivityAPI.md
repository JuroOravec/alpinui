[alpine-composition](../README.md) / [Exports](../modules.md) / ReactivityAPI

# Interface: ReactivityAPI

Public API of vue-reactivity that's fulfilled by alpine-composition

## Table of contents

### Properties

- [computed](ReactivityAPI.md#computed)
- [inject](ReactivityAPI.md#inject)
- [isRef](ReactivityAPI.md#isref)
- [mergeProps](ReactivityAPI.md#mergeprops)
- [nextTick](ReactivityAPI.md#nexttick)
- [onActivated](ReactivityAPI.md#onactivated)
- [onBeforeMount](ReactivityAPI.md#onbeforemount)
- [onBeforeUnmount](ReactivityAPI.md#onbeforeunmount)
- [onBeforeUpdate](ReactivityAPI.md#onbeforeupdate)
- [onDeactivated](ReactivityAPI.md#ondeactivated)
- [onMounted](ReactivityAPI.md#onmounted)
- [onUnmounted](ReactivityAPI.md#onunmounted)
- [onUpdated](ReactivityAPI.md#onupdated)
- [provide](ReactivityAPI.md#provide)
- [reactive](ReactivityAPI.md#reactive)
- [readonly](ReactivityAPI.md#readonly)
- [ref](ReactivityAPI.md#ref)
- [shallowRef](ReactivityAPI.md#shallowref)
- [toRaw](ReactivityAPI.md#toraw)
- [toRef](ReactivityAPI.md#toref)
- [toRefs](ReactivityAPI.md#torefs)
- [unref](ReactivityAPI.md#unref)
- [watch](ReactivityAPI.md#watch)
- [watchEffect](ReactivityAPI.md#watcheffect)

## Properties

### computed

• **computed**: \<T\>(`getter`: `ComputedGetter`\<`T`\>, `debugOptions?`: `DebuggerOptions`) => `ComputedRef`\<`T`\>\<T\>(`options`: `WritableComputedOptions`\<`T`\>, `debugOptions?`: `DebuggerOptions`) => `WritableComputedRef`\<`T`\>

#### Type declaration

▸ \<`T`\>(`getter`, `debugOptions?`): `ComputedRef`\<`T`\>

Takes a getter function and returns a readonly reactive ref object for the
returned value from the getter. It can also take an object with get and set
functions to create a writable ref object.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `getter` | `ComputedGetter`\<`T`\> | Function that produces the next value. |
| `debugOptions?` | `DebuggerOptions` | For debugging. See [https://vuejs.org/guide/extras/reactivity-in-depth.html#computed-debugging](https://vuejs.org/guide/extras/reactivity-in-depth.html#computed-debugging). |

##### Returns

`ComputedRef`\<`T`\>

**`Example`**

```js
// Creating a readonly computed ref:
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2
plusOne.value++ // error
```

```js
// Creating a writable computed ref:
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

**`See`**

[https://vuejs.org/api/reactivity-core.html#computed](https://vuejs.org/api/reactivity-core.html#computed)

▸ \<`T`\>(`options`, `debugOptions?`): `WritableComputedRef`\<`T`\>

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `WritableComputedOptions`\<`T`\> |
| `debugOptions?` | `DebuggerOptions` |

##### Returns

`WritableComputedRef`\<`T`\>

#### Defined in

[packages/alpine-composition/src/reactivity.ts:43](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L43)

___

### inject

• **inject**: \<T\>(`key`: `string` \| `InjectionKey`\<`T`\>) => `T` \| `undefined`\<T\>(`key`: `string` \| `InjectionKey`\<`T`\>, `defaultValue`: `T`, `treatDefaultAsFactory?`: ``false``) => `T`\<T\>(`key`: `string` \| `InjectionKey`\<`T`\>, `defaultValue`: `T` \| () => `T`, `treatDefaultAsFactory`: ``true``) => `T`

#### Type declaration

▸ \<`T`\>(`key`): `T` \| `undefined`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `InjectionKey`\<`T`\> |

##### Returns

`T` \| `undefined`

▸ \<`T`\>(`key`, `defaultValue`, `treatDefaultAsFactory?`): `T`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `InjectionKey`\<`T`\> |
| `defaultValue` | `T` |
| `treatDefaultAsFactory?` | ``false`` |

##### Returns

`T`

▸ \<`T`\>(`key`, `defaultValue`, `treatDefaultAsFactory`): `T`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `InjectionKey`\<`T`\> |
| `defaultValue` | `T` \| () => `T` |
| `treatDefaultAsFactory` | ``true`` |

##### Returns

`T`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:44](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L44)

___

### isRef

• **isRef**: \<T\>(`r`: `unknown`) => r is Ref\<T\>

#### Type declaration

▸ \<`T`\>(`r`): r is Ref\<T\>

Checks if a value is a ref object.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `r` | `unknown` | The value to inspect. |

##### Returns

r is Ref\<T\>

**`See`**

[https://vuejs.org/api/reactivity-utilities.html#isref](https://vuejs.org/api/reactivity-utilities.html#isref)

#### Defined in

[packages/alpine-composition/src/reactivity.ts:45](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L45)

___

### mergeProps

• **mergeProps**: (...`args`: `Data` & `VNodeProps`[]) => `Data`

#### Type declaration

▸ (`...args`): `Data`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Data` & `VNodeProps`[] |

##### Returns

`Data`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:46](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L46)

___

### nextTick

• **nextTick**: \<T, R\>(`this`: `T`, `fn?`: (`this`: `T`) => `R`) => `Promise`\<`Awaited`\<`R`\>\>

#### Type declaration

▸ \<`T`, `R`\>(`this`, `fn?`): `Promise`\<`Awaited`\<`R`\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `void` |
| `R` | `void` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `T` |
| `fn?` | (`this`: `T`) => `R` |

##### Returns

`Promise`\<`Awaited`\<`R`\>\>

#### Defined in

[packages/alpine-composition/src/reactivity.ts:47](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L47)

___

### onActivated

• **onActivated**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:68](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L68)

___

### onBeforeMount

• **onBeforeMount**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:62](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L62)

___

### onBeforeUnmount

• **onBeforeUnmount**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:64](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L64)

___

### onBeforeUpdate

• **onBeforeUpdate**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:66](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L66)

___

### onDeactivated

• **onDeactivated**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:69](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L69)

___

### onMounted

• **onMounted**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:63](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L63)

___

### onUnmounted

• **onUnmounted**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:65](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L65)

___

### onUpdated

• **onUpdated**: (`cb`: () => `void`) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | () => `void` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:67](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L67)

___

### provide

• **provide**: \<T, K\>(`key`: `K`, `value`: `K` extends `InjectionKey`\<`V`\> ? `V` : `T`) => `void`

#### Type declaration

▸ \<`T`, `K`\>(`key`, `value`): `void`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | `string` \| `number` \| `InjectionKey`\<`T`\> |

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |
| `value` | `K` extends `InjectionKey`\<`V`\> ? `V` : `T` |

##### Returns

`void`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:48](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L48)

___

### reactive

• **reactive**: \<T\>(`target`: `T`) => `Reactive`\<`T`\>

#### Type declaration

▸ \<`T`\>(`target`): `Reactive`\<`T`\>

Returns a reactive proxy of the object.

The reactive conversion is "deep": it affects all nested properties. A
reactive object also deeply unwraps any properties that are refs while
maintaining reactivity.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | The source object. |

##### Returns

`Reactive`\<`T`\>

**`Example`**

```js
const obj = reactive({ count: 0 })
```

**`See`**

[https://vuejs.org/api/reactivity-core.html#reactive](https://vuejs.org/api/reactivity-core.html#reactive)

#### Defined in

[packages/alpine-composition/src/reactivity.ts:49](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L49)

___

### readonly

• **readonly**: \<T\>(`target`: `T`) => `DeepReadonly`\<`UnwrapNestedRefs`\<`T`\>\>

#### Type declaration

▸ \<`T`\>(`target`): `DeepReadonly`\<`UnwrapNestedRefs`\<`T`\>\>

Takes an object (reactive or plain) or a ref and returns a readonly proxy to
the original.

A readonly proxy is deep: any nested property accessed will be readonly as
well. It also has the same ref-unwrapping behavior as [()](ReactivityAPI.md#__type),
except the unwrapped values will also be made readonly.

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | The source object. |

##### Returns

`DeepReadonly`\<`UnwrapNestedRefs`\<`T`\>\>

**`Example`**

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // works for reactivity tracking
  console.log(copy.count)
})

// mutating original will trigger watchers relying on the copy
original.count++

// mutating the copy will fail and result in a warning
copy.count++ // warning!
```

**`See`**

[https://vuejs.org/api/reactivity-core.html#readonly](https://vuejs.org/api/reactivity-core.html#readonly)

#### Defined in

[packages/alpine-composition/src/reactivity.ts:50](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L50)

___

### ref

• **ref**: \<T\>(`value`: `T`) => `Ref`\<`UnwrapRef`\<`T`\>\>\<T\>() => `Ref`\<`T` \| `undefined`\>

#### Type declaration

▸ \<`T`\>(`value`): `Ref`\<`UnwrapRef`\<`T`\>\>

Takes an inner value and returns a reactive and mutable ref object, which
has a single property `.value` that points to the inner value.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The object to wrap in the ref. |

##### Returns

`Ref`\<`UnwrapRef`\<`T`\>\>

**`See`**

[https://vuejs.org/api/reactivity-core.html#ref](https://vuejs.org/api/reactivity-core.html#ref)

▸ \<`T`\>(): `Ref`\<`T` \| `undefined`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

##### Returns

`Ref`\<`T` \| `undefined`\>

#### Defined in

[packages/alpine-composition/src/reactivity.ts:51](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L51)

___

### shallowRef

• **shallowRef**: \<T\>(`value`: `T`) => `Ref` extends `T` ? `T` extends `Ref` ? `IfAny`\<`T`, `ShallowRef`\<`T`\>, `T`\> : `ShallowRef`\<`T`\> : `ShallowRef`\<`T`\>\<T\>() => `ShallowRef`\<`T` \| `undefined`\>

#### Type declaration

▸ \<`T`\>(`value`): `Ref` extends `T` ? `T` extends `Ref` ? `IfAny`\<`T`, `ShallowRef`\<`T`\>, `T`\> : `ShallowRef`\<`T`\> : `ShallowRef`\<`T`\>

Shallow version of [()](ReactivityAPI.md#__type).

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The "inner value" for the shallow ref. |

##### Returns

`Ref` extends `T` ? `T` extends `Ref` ? `IfAny`\<`T`, `ShallowRef`\<`T`\>, `T`\> : `ShallowRef`\<`T`\> : `ShallowRef`\<`T`\>

**`Example`**

```js
const state = shallowRef({ count: 1 })

// does NOT trigger change
state.value.count = 2

// does trigger change
state.value = { count: 2 }
```

**`See`**

[https://vuejs.org/api/reactivity-advanced.html#shallowref](https://vuejs.org/api/reactivity-advanced.html#shallowref)

▸ \<`T`\>(): `ShallowRef`\<`T` \| `undefined`\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

##### Returns

`ShallowRef`\<`T` \| `undefined`\>

#### Defined in

[packages/alpine-composition/src/reactivity.ts:52](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L52)

___

### toRaw

• **toRaw**: \<T\>(`observed`: `T`) => `T`

#### Type declaration

▸ \<`T`\>(`observed`): `T`

Returns the raw, original object of a Vue-created proxy.

`toRaw()` can return the original object from proxies created by
[()](ReactivityAPI.md#__type), [()](ReactivityAPI.md#__type), shallowReactive() or
shallowReadonly().

This is an escape hatch that can be used to temporarily read without
incurring proxy access / tracking overhead or write without triggering
changes. It is **not** recommended to hold a persistent reference to the
original object. Use with caution.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observed` | `T` | The object for which the "raw" value is requested. |

##### Returns

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

[packages/alpine-composition/src/reactivity.ts:53](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L53)

___

### toRef

• **toRef**: \<T\>(`value`: `T`) => `T` extends () => infer R ? `Readonly`\<`Ref`\<`R`\>\> : `T` extends `Ref` ? `T` : `Ref`\<`UnwrapRef`\<`T`\>\>\<T, K\>(`object`: `T`, `key`: `K`) => `ToRef`\<`T`[`K`]\>\<T, K\>(`object`: `T`, `key`: `K`, `defaultValue`: `T`[`K`]) => `ToRef`\<`Exclude`\<`T`[`K`], `undefined`\>\>

#### Type declaration

▸ \<`T`\>(`value`): `T` extends () => infer R ? `Readonly`\<`Ref`\<`R`\>\> : `T` extends `Ref` ? `T` : `Ref`\<`UnwrapRef`\<`T`\>\>

Used to normalize values / refs / getters into refs.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`T` extends () => infer R ? `Readonly`\<`Ref`\<`R`\>\> : `T` extends `Ref` ? `T` : `Ref`\<`UnwrapRef`\<`T`\>\>

**`Example`**

```js
// returns existing refs as-is
toRef(existingRef)

// creates a ref that calls the getter on .value access
toRef(() => props.foo)

// creates normal refs from non-function values
// equivalent to ref(1)
toRef(1)
```

Can also be used to create a ref for a property on a source reactive object.
The created ref is synced with its source property: mutating the source
property will update the ref, and vice-versa.

**`Example`**

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// mutating the ref updates the original
fooRef.value++
console.log(state.foo) // 2

// mutating the original also updates the ref
state.foo++
console.log(fooRef.value) // 3
```

**`See`**

[https://vuejs.org/api/reactivity-utilities.html#toref](https://vuejs.org/api/reactivity-utilities.html#toref)

▸ \<`T`, `K`\>(`object`, `key`): `ToRef`\<`T`[`K`]\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `key` | `K` |

##### Returns

`ToRef`\<`T`[`K`]\>

▸ \<`T`, `K`\>(`object`, `key`, `defaultValue`): `ToRef`\<`Exclude`\<`T`[`K`], `undefined`\>\>

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `T` |
| `key` | `K` |
| `defaultValue` | `T`[`K`] |

##### Returns

`ToRef`\<`Exclude`\<`T`[`K`], `undefined`\>\>

#### Defined in

[packages/alpine-composition/src/reactivity.ts:54](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L54)

___

### toRefs

• **toRefs**: \<T\>(`object`: `T`) => `ToRefs`\<`T`\>

#### Type declaration

▸ \<`T`\>(`object`): `ToRefs`\<`T`\>

Converts a reactive object to a plain object where each property of the
resulting object is a ref pointing to the corresponding property of the
original object. Each individual ref is created using [()](ReactivityAPI.md#__type).

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `T` | Reactive object to be made into an object of linked refs. |

##### Returns

`ToRefs`\<`T`\>

**`See`**

[https://vuejs.org/api/reactivity-utilities.html#torefs](https://vuejs.org/api/reactivity-utilities.html#torefs)

#### Defined in

[packages/alpine-composition/src/reactivity.ts:55](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L55)

___

### unref

• **unref**: \<T\>(`ref`: `MaybeRef`\<`T`\> \| `ComputedRef`\<`T`\> \| `ShallowRef`\<`T`\>) => `T`

#### Type declaration

▸ \<`T`\>(`ref`): `T`

Returns the inner value if the argument is a ref, otherwise return the
argument itself. This is a sugar function for
`val = isRef(val) ? val.value : val`.

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ref` | `MaybeRef`\<`T`\> \| `ComputedRef`\<`T`\> \| `ShallowRef`\<`T`\> | Ref or plain value to be converted into the plain value. |

##### Returns

`T`

**`Example`**

```js
function useFoo(x: number | Ref<number>) {
  const unwrapped = unref(x)
  // unwrapped is guaranteed to be number now
}
```

**`See`**

[https://vuejs.org/api/reactivity-utilities.html#unref](https://vuejs.org/api/reactivity-utilities.html#unref)

#### Defined in

[packages/alpine-composition/src/reactivity.ts:56](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L56)

___

### watch

• **watch**: \<T, Immediate\>(`source`: `WatchSource`\<`T`\>, `cb`: `WatchCallback`\<`T`, `MaybeUndefined`\<`T`, `Immediate`\>\>, `options?`: `WatchOptions`\<`Immediate`\>) => `WatchStopHandle`\<T, Immediate\>(`sources`: `T` \| readonly [`T`], `cb`: [`T`] extends [`ReactiveMarker`] ? `WatchCallback`\<`T`\<`T`\>, `MaybeUndefined`\<`T`\<`T`\>, `Immediate`\>\> : `WatchCallback`\<`MapSources`\<`T`, ``false``\>, `MapSources`\<`T`, `Immediate`\>\>, `options?`: `WatchOptions`\<`Immediate`\>) => `WatchStopHandle`\<T, Immediate\>(`sources`: [...T[]], `cb`: `WatchCallback`\<`MapSources`\<`T`, ``false``\>, `MapSources`\<`T`, `Immediate`\>\>, `options?`: `WatchOptions`\<`Immediate`\>) => `WatchStopHandle`\<T, Immediate\>(`source`: `T`, `cb`: `WatchCallback`\<`T`, `MaybeUndefined`\<`T`, `Immediate`\>\>, `options?`: `WatchOptions`\<`Immediate`\>) => `WatchStopHandle`

#### Type declaration

▸ \<`T`, `Immediate`\>(`source`, `cb`, `options?`): `WatchStopHandle`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Immediate` | extends `Readonly`\<`boolean`\> = ``false`` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `WatchSource`\<`T`\> |
| `cb` | `WatchCallback`\<`T`, `MaybeUndefined`\<`T`, `Immediate`\>\> |
| `options?` | `WatchOptions`\<`Immediate`\> |

##### Returns

`WatchStopHandle`

▸ \<`T`, `Immediate`\>(`sources`, `cb`, `options?`): `WatchStopHandle`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends readonly (`object` \| `WatchSource`\<`unknown`\>)[] |
| `Immediate` | extends `Readonly`\<`boolean`\> = ``false`` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | `T` \| readonly [`T`] |
| `cb` | [`T`] extends [`ReactiveMarker`] ? `WatchCallback`\<`T`\<`T`\>, `MaybeUndefined`\<`T`\<`T`\>, `Immediate`\>\> : `WatchCallback`\<`MapSources`\<`T`, ``false``\>, `MapSources`\<`T`, `Immediate`\>\> |
| `options?` | `WatchOptions`\<`Immediate`\> |

##### Returns

`WatchStopHandle`

▸ \<`T`, `Immediate`\>(`sources`, `cb`, `options?`): `WatchStopHandle`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `MultiWatchSources` |
| `Immediate` | extends `Readonly`\<`boolean`\> = ``false`` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `sources` | [...T[]] |
| `cb` | `WatchCallback`\<`MapSources`\<`T`, ``false``\>, `MapSources`\<`T`, `Immediate`\>\> |
| `options?` | `WatchOptions`\<`Immediate`\> |

##### Returns

`WatchStopHandle`

▸ \<`T`, `Immediate`\>(`source`, `cb`, `options?`): `WatchStopHandle`

##### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `Immediate` | extends `Readonly`\<`boolean`\> = ``false`` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `T` |
| `cb` | `WatchCallback`\<`T`, `MaybeUndefined`\<`T`, `Immediate`\>\> |
| `options?` | `WatchOptions`\<`Immediate`\> |

##### Returns

`WatchStopHandle`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:57](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L57)

___

### watchEffect

• **watchEffect**: (`effect`: `WatchEffect`, `options?`: `WatchOptionsBase`) => `WatchStopHandle`

#### Type declaration

▸ (`effect`, `options?`): `WatchStopHandle`

##### Parameters

| Name | Type |
| :------ | :------ |
| `effect` | `WatchEffect` |
| `options?` | `WatchOptionsBase` |

##### Returns

`WatchStopHandle`

#### Defined in

[packages/alpine-composition/src/reactivity.ts:58](https://github.com/JuroOravec/alpinui/blob/dbaa7294ea2259343e9b76d833f7d350eead1b5a/packages/alpine-composition/src/reactivity.ts#L58)
