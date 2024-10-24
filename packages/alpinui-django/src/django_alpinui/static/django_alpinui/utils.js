// TODO SCOPE IN SELF-INVOKING FUNCTION
let genAttrId = 0;

// This function makes it possible to bind reactive objects of AlpineReactivity
// via AlpineJS's dynamic attributes (e.g.`:class="myRef"`).
const genAttrs = (attrsGetter) => {
  const attrsKey = "__alpinuiAttrs" + genAttrId;
  genAttrId++;

  // Handle passing a ref or object directly instead of a getter
  const getter = (typeof attrsGetter === 'function') ? attrsGetter : () => attrsGetter;

  // Create computed that resolves any refs and touches all values,
  // so this computed is refreshed whenever any of the refs change.
  const resolvedAttrs = AlpineReactivity.computed(() => {
    // Handle if the whole object passed is a ref
    const attrs = AlpineReactivity.unref(getter());

    return Object.entries(attrs).reduce((acc, [key, value]) => {
      if (key.startsWith('@') || typeof value === 'function') {
        acc[key] = value
        return acc
      }

      // Handle if the value is a ref
      acc[key] = AlpineReactivity.unref(value);

      return acc;
    }, {});
  });

  // Returning a function here is the same as if we defined function inside `x-data`, e.g.
  // `x-data="function() => { ... }"`.
  // We need to do this so we can access the current Alpine component under `this`.
  return function() {
    debugger;
    const vm = this;

    // For Alpine to pick up the changes, there's several conditions:
    // 1. The keys have to be defined as reactive, starting with `:` or `x-`.
    // 2. The values have to be reactive, so functions.
    // 3. Inside the reactive functions, we need to touch the properties of `vm` that we
    //    use to tell Alpine that it needs to track them. (this is the same as Vue's `computed`).
    //    For that we use this `attrsKey`, that.
    // 4. Whenever the reactive `attrs` change, then `watchEffect` makes sure that `vm[attrsKey]`
    // 5. Alpine detects that we've changed `vm[attrsKey]`. And because in step 3. all bound attributes
    //    touch this property, they will be re-calculated.
    vm[attrsKey] = {};

    AlpineReactivity.watchEffect(() => {
      debugger;
      vm[attrsKey] = resolvedAttrs.value;
    });

    return Object.entries(vm[attrsKey]).reduce((acc, [key, value]) => {
      if (key.startsWith('@') || typeof value === 'function') {
        acc[key] = value
        return acc
      }

      // See https://github.com/alpinejs/alpine/discussions/4408#discussioncomment-11001443
      const theKey = key.startsWith(':') || key.startsWith('x-') ? key : `:${key}`
      acc[theKey] = () => vm[attrsKey][key];

      return acc;
    }, {});
  }
}
