[alpine-reactivity](../README.md) / [Exports](../modules.md) / ComputedRef

# Interface: ComputedRef\<T\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Hierarchy

- [`Ref`](Ref.md)\<`T`\>

  ↳ **`ComputedRef`**

## Table of contents

### Properties

- [[\_refBrand]](ComputedRef.md#[_refbrand])
- [effect](ComputedRef.md#effect)
- [value](ComputedRef.md#value)

## Properties

### [\_refBrand]

• `Readonly` **[\_refBrand]**: ``true``

#### Inherited from

[Ref](Ref.md).[[_refBrand]](Ref.md#[_refbrand])

#### Defined in

[src/reactivity.ts:35](https://github.com/JuroOravec/alpinui/blob/2f3e96d3e71856a771ab608419b61aaa2b54566b/packages/alpine-reactivity/src/reactivity.ts#L35)

___

### effect

• **effect**: ``true``

`effect` is added to be able to differentiate refs from computed properties.

#### Defined in

[src/reactivity.ts:43](https://github.com/JuroOravec/alpinui/blob/2f3e96d3e71856a771ab608419b61aaa2b54566b/packages/alpine-reactivity/src/reactivity.ts#L43)

___

### value

• `Readonly` **value**: `T`

#### Overrides

[Ref](Ref.md).[value](Ref.md#value)

#### Defined in

[src/reactivity.ts:44](https://github.com/JuroOravec/alpinui/blob/2f3e96d3e71856a771ab608419b61aaa2b54566b/packages/alpine-reactivity/src/reactivity.ts#L44)
