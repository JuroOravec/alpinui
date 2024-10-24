// Utilities
import { describe, expect, it } from '@jest/globals'
import { useLoader } from '../loader'

describe('size', () => {
  it.each([
    [{ loading: true }, { 'a-component--loading': true }],
    [{ loading: false }, { 'a-component--loading': false }],
  ])('should return the correct class given value %p', (props, expected) => {
    const { loaderClasses } = useLoader(props, 'a-component')

    expect(loaderClasses.value).toEqual(expected)
  })
})
