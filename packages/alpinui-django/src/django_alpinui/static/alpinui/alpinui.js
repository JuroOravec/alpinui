/*!
* Alpinui v0.0.1
* Forged by John Leider and Juro Oravec
* Released under the MIT License.
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('alpine-reactivity'), require('alpine-composition')) :
  typeof define === 'function' && define.amd ? define(['exports', 'alpine-reactivity', 'alpine-composition'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Alpinui = {}, global.AlpineReactivity, global.AlpineComposition));
})(this, (function (exports, alpineReactivity, alpineComposition) { 'use strict';

  const IN_BROWSER = typeof window !== 'undefined';
  const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
  const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
  const SUPPORTS_EYE_DROPPER = IN_BROWSER && 'EyeDropper' in window;

  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
  function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
  function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

  // Types

  // See https://github.com/vuejs/core/blob/91112520427ff55941a1c759d7d60a0811ff4a61/packages/shared/src/general.ts#L93
  const cacheStringFunction = fn => {
    const cache = Object.create(null);
    return str => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };

  // See https://github.com/vuejs/core/blob/91112520427ff55941a1c759d7d60a0811ff4a61/packages/shared/src/general.ts#L120
  const capitalize = cacheStringFunction(str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // See https://github.com/vuejs/core/blob/7e75de002f08076a02c9361a58fa1d0af1772964/packages/shared/src/general.ts#L101
  const camelizeRE = /-(\w)/g;
  /**
   * @private
   */
  const camelize = cacheStringFunction(str => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
  });
  function getNestedValue(obj, path, fallback) {
    const last = path.length - 1;
    if (last < 0) return obj === undefined ? fallback : obj;
    for (let i = 0; i < last; i++) {
      if (obj == null) {
        return fallback;
      }
      obj = obj[path[i]];
    }
    if (obj == null) return fallback;
    return obj[path[last]] === undefined ? fallback : obj[path[last]];
  }
  function deepEqual(a, b) {
    if (a === b) return true;
    if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
      // If the values are Date, compare them as timestamps
      return false;
    }
    if (a !== Object(a) || b !== Object(b)) {
      // If the values aren't objects, they were already checked for equality
      return false;
    }
    const props = Object.keys(a);
    if (props.length !== Object.keys(b).length) {
      // Different number of props, don't bother to check
      return false;
    }
    return props.every(p => deepEqual(a[p], b[p]));
  }
  function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (obj == null || !path || typeof path !== 'string') return fallback;
    if (obj[path] !== undefined) return obj[path];
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
  }
  function getPropertyFromItem(item, property, fallback) {
    if (property === true) return item === undefined ? fallback : item;
    if (property == null || typeof property === 'boolean') return fallback;
    if (item !== Object(item)) {
      if (typeof property !== 'function') return fallback;
      const value = property(item, fallback);
      return typeof value === 'undefined' ? fallback : value;
    }
    if (typeof property === 'string') return getObjectValueByPath(item, property, fallback);
    if (Array.isArray(property)) return getNestedValue(item, property, fallback);
    if (typeof property !== 'function') return fallback;
    const value = property(item, fallback);
    return typeof value === 'undefined' ? fallback : value;
  }
  function createRange(length) {
    let start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return Array.from({
      length
    }, (v, k) => start + k);
  }
  function convertToUnit(str) {
    let unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';
    if (str == null || str === '') {
      return undefined;
    } else if (isNaN(+str)) {
      return String(str);
    } else if (!isFinite(+str)) {
      return undefined;
    } else {
      return `${Number(str)}${unit}`;
    }
  }
  function isObject(obj) {
    return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
  }
  function refElement(obj) {
    if (obj && '$el' in obj) {
      const el = obj.$el;
      if (el?.nodeType === Node.TEXT_NODE) {
        // Multi-root component, use the first element
        return el.nextElementSibling;
      }
      return el;
    }
    return obj;
  }

  // KeyboardEvent.keyCode aliases
  const keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
    shift: 16
  });
  const keyValues = Object.freeze({
    enter: 'Enter',
    tab: 'Tab',
    delete: 'Delete',
    esc: 'Escape',
    space: 'Space',
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    end: 'End',
    home: 'Home',
    del: 'Delete',
    backspace: 'Backspace',
    insert: 'Insert',
    pageup: 'PageUp',
    pagedown: 'PageDown',
    shift: 'Shift'
  });
  function keys(o) {
    return Object.keys(o);
  }
  function has(obj, key) {
    return key.every(k => obj.hasOwnProperty(k));
  }
  // Array of keys
  function pick(obj, paths) {
    const found = {};
    const keys = new Set(Object.keys(obj));
    for (const path of paths) {
      if (keys.has(path)) {
        found[path] = obj[path];
      }
    }
    return found;
  }

  // Array of keys

  // Array of keys or RegExp to test keys against

  function pickWithRest(obj, paths, exclude) {
    const found = Object.create(null);
    const rest = Object.create(null);
    for (const key in obj) {
      if (paths.some(path => path instanceof RegExp ? path.test(key) : path === key) && !exclude?.some(path => path === key)) {
        found[key] = obj[key];
      } else {
        rest[key] = obj[key];
      }
    }
    return [found, rest];
  }
  function omit(obj, exclude) {
    const clone = {
      ...obj
    };
    exclude.forEach(prop => delete clone[prop]);
    return clone;
  }
  function only(obj, include) {
    const clone = {};
    include.forEach(prop => clone[prop] = obj[prop]);
    return clone;
  }
  const onRE = /^on[^a-z]/;
  const isOn = key => onRE.test(key);
  const bubblingEvents = ['onAfterscriptexecute', 'onAnimationcancel', 'onAnimationend', 'onAnimationiteration', 'onAnimationstart', 'onAuxclick', 'onBeforeinput', 'onBeforescriptexecute', 'onChange', 'onClick', 'onCompositionend', 'onCompositionstart', 'onCompositionupdate', 'onContextmenu', 'onCopy', 'onCut', 'onDblclick', 'onFocusin', 'onFocusout', 'onFullscreenchange', 'onFullscreenerror', 'onGesturechange', 'onGestureend', 'onGesturestart', 'onGotpointercapture', 'onInput', 'onKeydown', 'onKeypress', 'onKeyup', 'onLostpointercapture', 'onMousedown', 'onMousemove', 'onMouseout', 'onMouseover', 'onMouseup', 'onMousewheel', 'onPaste', 'onPointercancel', 'onPointerdown', 'onPointerenter', 'onPointerleave', 'onPointermove', 'onPointerout', 'onPointerover', 'onPointerup', 'onReset', 'onSelect', 'onSubmit', 'onTouchcancel', 'onTouchend', 'onTouchmove', 'onTouchstart', 'onTransitioncancel', 'onTransitionend', 'onTransitionrun', 'onTransitionstart', 'onWheel'];
  const compositionIgnoreKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Enter', 'Escape', 'Tab', ' '];
  function isComposingIgnoreKey(e) {
    return e.isComposing && compositionIgnoreKeys.includes(e.key);
  }

  /**
   * Filter attributes that should be applied to
   * the root element of an input component. Remaining
   * attributes should be passed to the <input> element inside.
   */
  function filterInputAttrs(attrs) {
    const [events, props] = pickWithRest(attrs, [onRE]);
    const inputEvents = omit(events, bubblingEvents);
    const [rootAttrs, inputAttrs] = pickWithRest(props, ['class', 'style', 'id', /^data-/]);
    Object.assign(rootAttrs, events);
    Object.assign(inputAttrs, inputEvents);
    return [rootAttrs, inputAttrs];
  }
  function wrapInArray(v) {
    return v == null ? [] : Array.isArray(v) ? v : [v];
  }
  function debounce(vm, fn, delay) {
    const {
      unref
    } = vm.reactivity;
    let timeoutId = 0;
    const wrap = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), unref(delay));
    };
    wrap.clear = () => {
      clearTimeout(timeoutId);
    };
    wrap.immediate = fn;
    return wrap;
  }
  function clamp(value) {
    let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
  }
  function getDecimals(value) {
    const trimmedStr = value.toString().trim();
    return trimmedStr.includes('.') ? trimmedStr.length - trimmedStr.indexOf('.') - 1 : 0;
  }
  function padEnd(str, length) {
    let char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
    return str + char.repeat(Math.max(0, length - str.length));
  }
  function padStart(str, length) {
    let char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
    return char.repeat(Math.max(0, length - str.length)) + str;
  }
  function chunk(str) {
    let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    const chunked = [];
    let index = 0;
    while (index < str.length) {
      chunked.push(str.substr(index, size));
      index += size;
    }
    return chunked;
  }
  function humanReadableFileSize(bytes) {
    let base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
    if (bytes < base) {
      return `${bytes} B`;
    }
    const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G'];
    let unit = -1;
    while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
      bytes /= base;
      ++unit;
    }
    return `${bytes.toFixed(1)} ${prefix[unit]}B`;
  }
  function mergeDeep() {
    let source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let arrayFn = arguments.length > 2 ? arguments[2] : undefined;
    const out = {};
    for (const key in source) {
      out[key] = source[key];
    }
    for (const key in target) {
      const sourceProperty = source[key];
      const targetProperty = target[key];

      // Only continue deep merging if
      // both properties are objects
      if (isObject(sourceProperty) && isObject(targetProperty)) {
        out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn);
        continue;
      }
      if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
        out[key] = arrayFn(sourceProperty, targetProperty);
        continue;
      }
      out[key] = targetProperty;
    }
    return out;
  }
  function toKebabCase() {
    let str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str);
    const kebab = str.replace(/[^a-z]/gi, '-').replace(/\B([A-Z])/g, '-$1').toLowerCase();
    toKebabCase.cache.set(str, kebab);
    return kebab;
  }
  toKebabCase.cache = new Map();
  function findIndexOfChildrenWithProvide(groupVm, itemVm, key) {
    if (groupVm.type === 'vue') {
      const children = findChildrenWithProvideVue(key, groupVm.instance()?.vnode);
      return children.indexOf(itemVm.instance());
    } else if (groupVm.type === 'alpine') {
      const children = findChildrenWithProvideAlpine(groupVm.instance(), key, groupVm.el);
      return children.indexOf(itemVm.el);
    } else {
      throw Error(`Unknown instance type ${groupVm.type}`);
    }
  }
  function findChildrenWithProvideAlpine(vm, key, el) {
    if (!el || typeof el !== 'object') return [];
    const provides = el._provides || {};
    if (Object.getOwnPropertySymbols(provides).includes(key)) {
      return [el];
    } else {
      return [...el.children].map(c => findChildrenWithProvideAlpine(vm, key, c)).flat(1);
    }
  }
  function findChildrenWithProvideVue(key, vnode) {
    if (!vnode || typeof vnode !== 'object') return [];
    if (Array.isArray(vnode)) {
      return vnode.map(child => findChildrenWithProvideVue(key, child)).flat(1);
    } else if (vnode.suspense) {
      return findChildrenWithProvideVue(key, vnode.ssContent);
    } else if (Array.isArray(vnode.children)) {
      return vnode.children.map(child => findChildrenWithProvideVue(key, child)).flat(1);
    } else if (vnode.component) {
      if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key)) {
        return [vnode.component];
      } else if (vnode.component.subTree) {
        return findChildrenWithProvideVue(key, vnode.component.subTree).flat(1);
      }
    }
    return [];
  }
  var _arr = /*#__PURE__*/new WeakMap();
  var _pointer = /*#__PURE__*/new WeakMap();
  class CircularBuffer {
    constructor(size) {
      _classPrivateFieldInitSpec(this, _arr, []);
      _classPrivateFieldInitSpec(this, _pointer, 0);
      this.size = size;
    }
    push(val) {
      _classPrivateFieldGet(_arr, this)[_classPrivateFieldGet(_pointer, this)] = val;
      _classPrivateFieldSet(_pointer, this, (_classPrivateFieldGet(_pointer, this) + 1) % this.size);
    }
    values() {
      return _classPrivateFieldGet(_arr, this).slice(_classPrivateFieldGet(_pointer, this)).concat(_classPrivateFieldGet(_arr, this).slice(0, _classPrivateFieldGet(_pointer, this)));
    }
  }
  function getEventCoordinates(e) {
    if ('touches' in e) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY
      };
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY
    };
  }

  // Only allow a single return type

  /**
   * Convert a computed ref to a record of refs.
   * The getter function must always return an object with the same keys.
   */

  function destructComputed(vm, getter) {
    const {
      computed,
      reactive,
      toRefs,
      watchEffect
    } = vm.reactivity;
    const refs = reactive({});
    const base = computed(getter);
    watchEffect(() => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    }, {
      flush: 'sync'
    });
    return toRefs(refs);
  }

  /** Array.includes but value can be any type */
  function includes(arr, val) {
    return arr.includes(val);
  }
  function eventName(propName) {
    return propName[2].toLowerCase() + propName.slice(3);
  }
  const EventProp = () => [Function, Array];
  function callEvent(handler) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (Array.isArray(handler)) {
      for (const h of handler) {
        h(...args);
      }
    } else if (typeof handler === 'function') {
      handler(...args);
    }
  }
  function focusableChildren(el) {
    let filterByTabIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', '[tabindex]'].map(s => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ''}:not([disabled])`).join(', ');
    return [...el.querySelectorAll(targets)];
  }
  function getNextElement(elements, location, condition) {
    let _el;
    let idx = elements.indexOf(document.activeElement);
    const inc = location === 'next' ? 1 : -1;
    do {
      idx += inc;
      _el = elements[idx];
    } while ((!_el || _el.offsetParent == null || !(condition?.(_el) ?? true)) && idx < elements.length && idx >= 0);
    return _el;
  }
  function focusChild(el, location) {
    const focusable = focusableChildren(el);
    if (!location) {
      if (el === document.activeElement || !el.contains(document.activeElement)) {
        focusable[0]?.focus();
      }
    } else if (location === 'first') {
      focusable[0]?.focus();
    } else if (location === 'last') {
      focusable.at(-1)?.focus();
    } else if (typeof location === 'number') {
      focusable[location]?.focus();
    } else {
      const _el = getNextElement(focusable, location);
      if (_el) _el.focus();else focusChild(el, location === 'next' ? 'first' : 'last');
    }
  }
  function isEmpty(val) {
    return val === null || val === undefined || typeof val === 'string' && val.trim() === '';
  }
  function noop() {}

  /** Returns null if the selector is not supported or we can't check */
  function matchesSelector(el, selector) {
    const supportsSelector = IN_BROWSER && typeof CSS !== 'undefined' && typeof CSS.supports !== 'undefined' && CSS.supports(`selector(${selector})`);
    if (!supportsSelector) return null;
    try {
      return !!el && el.matches(selector);
    } catch (err) {
      return null;
    }
  }
  function defer(timeout, cb) {
    if (!IN_BROWSER || timeout === 0) {
      cb();
      return () => {};
    }
    const timeoutId = window.setTimeout(cb, timeout);
    return () => window.clearTimeout(timeoutId);
  }
  function eagerComputed(vm, fn) {
    const {
      readonly,
      shallowRef,
      watchEffect
    } = vm.reactivity;
    const result = shallowRef();
    watchEffect(() => {
      result.value = fn();
    }, {
      flush: 'sync'
    });
    return readonly(result);
  }
  function isClickInsideElement(event, targetDiv) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const divRect = targetDiv.getBoundingClientRect();
    const divLeft = divRect.left;
    const divTop = divRect.top;
    const divRight = divRect.right;
    const divBottom = divRect.bottom;
    return mouseX >= divLeft && mouseX <= divRight && mouseY >= divTop && mouseY <= divBottom;
  }
  function templateRef(vm) {
    const {
      shallowRef
    } = vm.reactivity;
    const el = shallowRef();
    const fn = target => {
      el.value = target;
    };
    Object.defineProperty(fn, 'value', {
      enumerable: true,
      get: () => el.value,
      set: val => el.value = val
    });
    Object.defineProperty(fn, 'el', {
      enumerable: true,
      get: () => refElement(el.value)
    });
    return fn;
  }
  const isString = val => typeof val === 'string';
  const isArray = Array.isArray;
  const isFunction = val => typeof val === 'function';
  function mergeProps() {
    const ret = {};
    for (let i = 0; i < arguments.length; i++) {
      const toMerge = i < 0 || arguments.length <= i ? undefined : arguments[i];
      for (const key in toMerge) {
        if (key === 'class') {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === 'style') {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== '') {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function normalizeClass(value) {
    let res = '';
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + ' ';
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + ' ';
        }
      }
    }
    return res.trim();
  }
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    } else {
      return undefined;
    }
  }
  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, '').split(listDelimiterRE).forEach(item => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  const isPromise = val => val && typeof val.then === 'function';

  // Types

  function injectSelf(vm, key) {
    const {
      provides
    } = vm;
    if (provides && key in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    }
    return undefined;
  }

  // Utilities

  // Types

  const DefaultsSymbol = Symbol.for('vuetify:defaults');
  function createDefaults(vm, options) {
    const {
      ref
    } = vm.reactivity;
    return ref(options);
  }
  function injectDefaults(vm) {
    const {
      inject
    } = vm.reactivity;
    const defaults = inject(DefaultsSymbol);
    if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
    return defaults;
  }
  function provideDefaults(vm, defaults, options) {
    const {
      computed,
      provide,
      ref,
      unref
    } = vm.reactivity;
    const injectedDefaults = injectDefaults(vm);
    const providedDefaults = ref(defaults);
    const newDefaults = computed(() => {
      const disabled = unref(options?.disabled);
      if (disabled) return injectedDefaults.value;
      const scoped = unref(options?.scoped);
      const reset = unref(options?.reset);
      const root = unref(options?.root);
      if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value;
      let properties = mergeDeep(providedDefaults.value, {
        prev: injectedDefaults.value
      });
      if (scoped) return properties;
      if (reset || root) {
        const len = Number(reset || Infinity);
        for (let i = 0; i <= len; i++) {
          if (!properties || !('prev' in properties)) {
            break;
          }
          properties = properties.prev;
        }
        if (properties && typeof root === 'string' && root in properties) {
          properties = mergeDeep(mergeDeep(properties, {
            prev: properties
          }), properties[root]);
        }
        return properties;
      }
      return properties.prev ? mergeDeep(properties.prev, properties) : properties;
    });
    provide(DefaultsSymbol, newDefaults);
    return newDefaults;
  }
  function internalUseDefaults(vm) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let name = arguments.length > 2 ? arguments[2] : undefined;
    let defaults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : injectDefaults(vm);
    const {
      computed,
      provide,
      shallowRef,
      watchEffect
    } = vm.reactivity;

    // NOTE(Alpinui): Changed how name is obtained
    name = name ?? vm.name;
    if (!name) {
      throw new Error('[Vuetify] Could not determine component name');
    }
    const componentDefaults = computed(() => defaults.value?.[props._as ?? name]);
    const _props = new Proxy(props, {
      get(target, prop) {
        const propValue = Reflect.get(target, prop);
        if (prop === 'class' || prop === 'style') {
          return [componentDefaults.value?.[prop], propValue].filter(v => v != null);
        } else if (typeof prop === 'string' && !vm.propIsDefined(prop)) {
          return componentDefaults.value?.[prop] !== undefined ? componentDefaults.value?.[prop] : defaults.value?.global?.[prop] !== undefined ? defaults.value?.global?.[prop] : propValue;
        }
        return propValue;
      }
    });
    const _subcomponentDefaults = shallowRef();
    watchEffect(() => {
      if (componentDefaults.value) {
        const subComponents = Object.entries(componentDefaults.value).filter(_ref => {
          let [key] = _ref;
          return key.startsWith(key[0].toUpperCase());
        });
        _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : undefined;
      } else {
        _subcomponentDefaults.value = undefined;
      }
    });
    function provideSubDefaults() {
      const injected = injectSelf(vm, DefaultsSymbol);
      provide(DefaultsSymbol, computed(() => {
        return _subcomponentDefaults.value ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value;
      }));
    }
    return {
      props: _props,
      provideSubDefaults
    };
  }
  function useDefaults$1(vm) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let name = arguments.length > 2 ? arguments[2] : undefined;
    const {
      props: _props,
      provideSubDefaults
    } = internalUseDefaults(vm, props, name);
    provideSubDefaults();
    return _props;
  }

  /* eslint-disable no-console */

  const warn = msg => console.warn(msg);
  function consoleWarn(message) {
    warn(`Vuetify: ${message}`);
  }
  function consoleError(message) {
    warn(`Vuetify error: ${message}`);
  }

  // Types
  // eslint-disable-line vue/prefer-import-from-vue

  /**
   * Creates a factory function for props definitions.
   * This is used to define props in a composable then override
   * default values in an implementing component.
   *
   * @example Simplified signature
   * (props: Props) => (defaults?: Record<keyof props, any>) => Props
   *
   * @example Usage
   * const makeProps = propsFactory({
   *   foo: String,
   * })
   *
   * defineComponent({
   *   props: {
   *     ...makeProps({
   *       foo: 'a',
   *     }),
   *   },
   *   setup (props) {
   *     // would be "string | undefined", now "string" because a default has been provided
   *     props.foo
   *   },
   * }
   */

  function propsFactory(props, source) {
    return defaults => {
      return Object.keys(props).reduce((obj, prop) => {
        const isObjectDefinition = typeof props[prop] === 'object' && props[prop] != null && !Array.isArray(props[prop]);
        const definition = isObjectDefinition ? props[prop] : {
          type: props[prop]
        };
        if (defaults && prop in defaults) {
          obj[prop] = {
            ...definition,
            default: defaults[prop]
          };
        } else {
          obj[prop] = definition;
        }
        if (source && !obj[prop].source) {
          obj[prop].source = source;
        }
        return obj;
      }, {});
    };
  }

  /**
   * Like `Partial<T>` but doesn't care what the value is
   */

  // Copied from Vue

  // Composables

  // Types

  // Implementation
  function defineComponent(options) {
    if (!options.name) {
      consoleWarn('The component is missing an explicit name, unable to generate default prop value');
      return options;
    }
    const {
      exposeDefaults = true
    } = options;
    if (!exposeDefaults) return options;
    options._setupHeadless = options._setupHeadless ?? options.setupHeadless;
    if (options._setupHeadless) {
      options.props = propsFactory(options.props ?? {}, options.name)();
      const propKeys = Object.keys(options.props).filter(key => key !== 'class' && key !== 'style');
      options.filterProps = function filterProps(props) {
        return pick(props, propKeys);
      };
      options.props._as = String;
      options.setupHeadless = (props, vm) => {
        const defaults = injectDefaults(vm);
        const setupFn = options._setupHeadless;

        // Skip props proxy if defaults are not provided
        if (!defaults.value) return setupFn(props, vm);
        const {
          props: _props,
          provideSubDefaults
        } = internalUseDefaults(vm, props, props._as ?? options.name, defaults);
        const setupBindings = setupFn(_props, vm);
        provideSubDefaults();
        return setupBindings;
      };
    }
    return options;
  }

  // Adds a filterProps method to the component options

  // https://github.com/vuejs/core/pull/10557

  // not a vue Component

  // Types

  /**
   * Helper for defining slots on Components as runtime objects.
   *
   * These slot definitions are used for generating Python bindings.
   */
  const makeSlots = slots => slots ?? {};

  // See https://stackoverflow.com/a/51956054/9788634

  // Utilities

  // Types

  const IconValue = [String, Function, Object, Array];
  const makeIconProps = propsFactory({
    icon: {
      type: IconValue
    },
    // Could not remove this and use makeTagProps, types complained because it is not required
    tag: {
      type: String,
      required: true
    }
  }, 'icon');
  const _ComponentIcon = defineComponent({
    name: 'VComponentIcon',
    props: makeIconProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });
  const _SvgIcon = defineComponent({
    name: 'VSvgIcon',
    inheritAttrs: false,
    props: makeIconProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {
          icon: props.icon
        }
      };
    },
    renderHeadless: () => null
  });
  const _LigatureIcon = defineComponent({
    name: 'VLigatureIcon',
    props: makeIconProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {
          icon: props.icon
        }
      };
    },
    renderHeadless: () => null
  });
  const _ClassIcon = defineComponent({
    name: 'VClassIcon',
    props: makeIconProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props) {
      return {
        expose: {},
        renderInput: {
          icon: props.icon
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  let icons = null;
  let fallbackIconset = null;
  const setIcons = _ref => {
    let {
      icons: newIcons,
      fallbackIconset: newFallback
    } = _ref;
    icons = newIcons;
    fallbackIconset = newFallback;
  };
  const getIcons = () => ({
    icons,
    fallbackIconset
  });

  // Utilities
  const createAlpineReactivity = instance => {
    const reactives = [];
    const effects = [];
    const watches = [];
    const onBeforeUpdatedCallbacks = [];
    const onUpdatedCallbacks = [];
    let stopUpdateWatcher = null;
    let isUpdateWatcherInit = false;
    const createUpdateWatcher = () => {
      // Stop previous watcher
      stopUpdateWatcher?.();
      isUpdateWatcherInit = true;

      // And create new one, which watches ALL reactives
      stopUpdateWatcher = alpineReactivity.watchEffect(() => {
        for (const reactive of reactives) {
          // "touch" each variable
          alpineReactivity.unref(reactive);
        }

        // Also touch all props
        for (const propKey of Object.keys(instance.$props)) {
          // "touch" each variable
          instance.$props[propKey]; /* eslint-disable-line no-unused-expressions */
        }

        // Since we touch ALL reactive variables, when this function
        // is re-run, we know that it's because a) new variable was added,
        // or b) the values actually changed.
        if (isUpdateWatcherInit) {
          isUpdateWatcherInit = false;
          return;
        }

        // So if we got here, some values changed, so trigger the hooks
        onBeforeUpdatedCallbacks.forEach(cb => cb());
        instance.$nextTick(() => {
          onUpdatedCallbacks.forEach(cb => cb());
        });
      });
    };
    const trackRef = r => {
      reactives.push(r);
      createUpdateWatcher();
    };

    // Cleanup
    instance.$onBeforeUnmount(() => {
      // Wait a tick, so normal execution of AlpineJS' `destroy` hook proceeds
      // normally (assuming it's synchronous).
      setTimeout(() => {
        effects.forEach(eff => alpineReactivity.stop(eff));
        watches.forEach(stopWatch => stopWatch());
        stopUpdateWatcher?.();
      });
    });
    return {
      computed: getterOrOptions => {
        const onlyGetter = isFunction(getterOrOptions);
        const val = onlyGetter ? alpineReactivity.computed(getterOrOptions) : alpineReactivity.writableComputed(getterOrOptions);
        trackRef(val);
        // @ts-expect-error
        effects.push(val.effect);
        return val;
      },
      inject: function () {
        // @ts-expect-error
        return instance.$inject(...arguments);
      },
      // @ts-expect-error
      isRef: function (r) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        // @ts-expect-error
        return alpineReactivity.isRef(r, ...args);
      },
      // NOTE: mergeProps does NOT use any reactivity API
      mergeProps: function () {
        return mergeProps(...arguments);
      },
      nextTick: function () {
        return instance.$nextTick(...arguments);
      },
      provide: (key, val) => {
        return instance.$provide(key, val);
      },
      reactive: val => {
        const reactiveVal = alpineReactivity.reactive(val);
        const refs = alpineReactivity.toRefs(reactiveVal);
        Object.values(refs).forEach(refVal => {
          trackRef(refVal);
        });
        return reactiveVal;
      },
      readonly: val => {
        return alpineReactivity.readonly(val);
      },
      ref: function () {
        const val = alpineReactivity.ref(...arguments);
        trackRef(val);
        return val;
      },
      shallowRef: function () {
        const val = alpineReactivity.shallowRef(...arguments);
        trackRef(val);
        return val;
      },
      toRaw: val => {
        return alpineReactivity.toRaw(val);
      },
      toRef: function () {
        // @ts-expect-error
        const val = alpineReactivity.toRef(...arguments);
        trackRef(val);
        return val;
      },
      toRefs: val => {
        const refs = alpineReactivity.toRefs(val);
        Object.values(refs).forEach(refVal => {
          trackRef(refVal);
        });
        return refs;
      },
      unref: val => {
        return alpineReactivity.unref(val);
      },
      watch: function () {
        // @ts-expect-error
        const stopHandle = alpineReactivity.watch(...arguments);
        watches.push(stopHandle);
        return stopHandle;
      },
      watchEffect: function () {
        // @ts-expect-error
        const stopHandle = alpineReactivity.watchEffect(...arguments);
        watches.push(stopHandle);
        return stopHandle;
      },
      onBeforeMount: cb => cb(),
      // Run the callback immediately
      onMounted: cb => cb(),
      // Run the callback immediately
      onBeforeUnmount: instance.$onBeforeUnmount,
      onUnmounted: instance.$onBeforeUnmount,
      onBeforeUpdate: cb => onBeforeUpdatedCallbacks.push(cb),
      onUpdated: cb => onUpdatedCallbacks.push(cb),
      onActivated: () => {},
      // NOOP
      onDeactivated: () => {} // NOOP
    };
  };
  const createAlpineHeadlessInstance = instance => {
    // NOTE: All of our AlpineJS components instances should be given an info
    // on which slots have been filled and which not. Since we have to pass that
    // info ourselves, we validate it.
    if (!instance.$initState.slots) {
      /* eslint-disable-next-line */
      console.warn('[Alpinui]: AlpineJS component is missing slots metadata');
    }
    let isUnmounted = false;
    instance.$onBeforeUnmount(() => {
      isUnmounted = true;
    });
    return {
      type: 'alpine',
      get name() {
        return instance.$name;
      },
      get aliasName() {
        return instance.$aliasName;
      },
      get props() {
        return instance.$props;
      },
      get attrs() {
        return instance.$attrs;
      },
      get refs() {
        return instance.$refs;
      },
      get el() {
        return instance.$el;
      },
      get provides() {
        // @ts-expect-error
        return instance.$el._provides;
      },
      get isUnmounted() {
        return alpineReactivity.readonly(isUnmounted);
      },
      get hasSlots() {
        return {
          ...instance.$initState.slots
        };
      },
      get icons() {
        return {
          ...getIcons().icons
        };
      },
      get iconFallbackSet() {
        return {
          ...getIcons().fallbackIconset
        };
      },
      propIsDefined: prop => {
        return prop in instance.$props;
      },
      resolveDynamicComponent: comp => {
        return null;
      },
      emit: instance.$emit,
      instance: () => instance,
      reactivity: createAlpineReactivity(instance)
    };
  };
  function defineAlpineComponent(_ref) {
    let {
      setupHeadless,
      // NOTE: render FN is ignored in AlpineJS
      renderHeadless,
      ...options
    } = _ref;
    return {
      ...options,
      setup(props, instance) {
        const headless = createAlpineHeadlessInstance(instance);
        const {
          expose,
          renderInput
        } = setupHeadless(props, headless);
        if (isPromise(expose)) {
          return expose.then(d => ({
            ...renderInput,
            ...d
          }));
        }
        return {
          ...renderInput,
          ...expose
        };
      }
    };
  }
  const createAlpineDirective = _ref2 => {
    let {
      mounted,
      updated,
      unmounted
    } = _ref2;
    const alpineDirective = (el, directive, utils) => {
      const modifiers = directive.modifiers.reduce((agg, key) => ({
        ...agg,
        key: true
      }), {});
      const getOptions = utils.Alpine.evaluateLater(el, directive.expression);
      let oldValue;
      let wasEnabled = false;
      const withState = cb => {
        getOptions(value => {
          // NOTE: Vue and AlpineJS have slightly different naming conventions
          //   - Vue's value     == Alpine's expression
          //   - Vue's arg       == Alpine's value
          //   - Vue's modifiers == Alpine's modifiers
          // See https://alpinejs.dev/advanced/extending#method-signature
          const state = {
            value,
            oldValue,
            modifiers,
            arg: directive.value
          };
          return cb(state);
        });
      };
      utils.effect(() => {
        withState(state => {
          if (!wasEnabled) {
            mounted(el, state);
            wasEnabled = true;
          } else {
            updated?.(el, state);
          }
          oldValue = state.value;
        });
      });
      utils.cleanup(() => {
        withState(state => {
          unmounted(el, state);
        });
      });
    };
    return alpineDirective;
  };
  const createAlpineComposable = fn => {
    return function (vm) {
      const headless = createAlpineHeadlessInstance(vm);
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return fn(headless, ...args);
    };
  };

  // Types

  const AComponentIcon = defineAlpineComponent({
    ..._ComponentIcon,
    name: 'AComponentIcon'
  });
  const ASvgIcon = defineAlpineComponent({
    ..._SvgIcon,
    name: 'ASvgIcon'
  });
  const ALigatureIcon = defineAlpineComponent({
    ..._LigatureIcon,
    name: 'ALigatureIcon'
  });
  const AClassIcon = defineAlpineComponent({
    ..._ClassIcon,
    name: 'AClassIcon'
  });

  // Types

  const aliases = {
    collapse: 'mdi-chevron-up',
    complete: 'mdi-check',
    cancel: 'mdi-close-circle',
    close: 'mdi-close',
    delete: 'mdi-close-circle',
    // delete (e.g. a-chip close)
    clear: 'mdi-close-circle',
    success: 'mdi-check-circle',
    info: 'mdi-information',
    warning: 'mdi-alert-circle',
    error: 'mdi-close-circle',
    prev: 'mdi-chevron-left',
    next: 'mdi-chevron-right',
    checkboxOn: 'mdi-checkbox-marked',
    checkboxOff: 'mdi-checkbox-blank-outline',
    checkboxIndeterminate: 'mdi-minus-box',
    delimiter: 'mdi-circle',
    // for carousel
    sortAsc: 'mdi-arrow-up',
    sortDesc: 'mdi-arrow-down',
    expand: 'mdi-chevron-down',
    menu: 'mdi-menu',
    subgroup: 'mdi-menu-down',
    dropdown: 'mdi-menu-down',
    radioOn: 'mdi-radiobox-marked',
    radioOff: 'mdi-radiobox-blank',
    edit: 'mdi-pencil',
    ratingEmpty: 'mdi-star-outline',
    ratingFull: 'mdi-star',
    ratingHalf: 'mdi-star-half-full',
    loading: 'mdi-cached',
    first: 'mdi-page-first',
    last: 'mdi-page-last',
    unfold: 'mdi-unfold-more-horizontal',
    file: 'mdi-paperclip',
    plus: 'mdi-plus',
    minus: 'mdi-minus',
    calendar: 'mdi-calendar',
    treeviewCollapse: 'mdi-menu-down',
    treeviewExpand: 'mdi-menu-right',
    eyeDropper: 'mdi-eyedropper'
  };

  // Components
  const AMdiIcon = defineAlpineComponent({
    ..._ClassIcon,
    setupHeadless(props, vm) {
      const result = _ClassIcon.setupHeadless(props, vm);
      return {
        expose: result.expose,
        renderInput: {
          ...result.renderInput,
          // Add `mdi` class
          icon: `${result.renderInput.icon} mdi`
        }
      };
    },
    name: 'AMdiIcon'
  });
  const mdi = {
    component: AMdiIcon.name
  };

  // Types

  const _md1 = {
    defaults: {
      global: {
        rounded: 'sm'
      },
      VAvatar: {
        rounded: 'circle'
      },
      VAutocomplete: {
        variant: 'underlined'
      },
      VBanner: {
        color: 'primary'
      },
      VBtn: {
        color: 'primary',
        rounded: 0
      },
      VCheckbox: {
        color: 'secondary'
      },
      VCombobox: {
        variant: 'underlined'
      },
      VSelect: {
        variant: 'underlined'
      },
      VSlider: {
        color: 'primary'
      },
      VTabs: {
        color: 'primary'
      },
      VTextarea: {
        variant: 'underlined'
      },
      VTextField: {
        variant: 'underlined'
      },
      VToolbar: {
        VBtn: {
          color: null
        }
      }
    },
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#3F51B5',
            'primary-darken-1': '#303F9F',
            'primary-lighten-1': '#C5CAE9',
            secondary: '#FF4081',
            'secondary-darken-1': '#F50057',
            'secondary-lighten-1': '#FF80AB',
            accent: '#009688'
          }
        }
      }
    }
  };

  // Icons
  const md1 = {
    ..._md1,
    // Alpine-specific config
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi
      }
    }
  };

  // Types

  const _md2 = {
    defaults: {
      global: {
        rounded: 'md'
      },
      VAvatar: {
        rounded: 'circle'
      },
      VAutocomplete: {
        variant: 'filled'
      },
      VBanner: {
        color: 'primary'
      },
      VBtn: {
        color: 'primary'
      },
      VCheckbox: {
        color: 'secondary'
      },
      VCombobox: {
        variant: 'filled'
      },
      VSelect: {
        variant: 'filled'
      },
      VSlider: {
        color: 'primary'
      },
      VTabs: {
        color: 'primary'
      },
      VTextarea: {
        variant: 'filled'
      },
      VTextField: {
        variant: 'filled'
      },
      VToolbar: {
        VBtn: {
          color: null
        }
      }
    },
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#6200EE',
            'primary-darken-1': '#3700B3',
            secondary: '#03DAC6',
            'secondary-darken-1': '#018786',
            error: '#B00020'
          }
        }
      }
    }
  };

  // Icons
  const md2 = {
    ..._md2,
    // Alpine-specific config
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi
      }
    }
  };

  // Types

  const _md3 = {
    defaults: {
      VAppBar: {
        flat: true
      },
      VAutocomplete: {
        variant: 'filled'
      },
      VBanner: {
        color: 'primary'
      },
      VBottomSheet: {
        contentClass: 'rounded-t-xl overflow-hidden'
      },
      VBtn: {
        color: 'primary',
        rounded: 'xl'
      },
      VBtnGroup: {
        rounded: 'xl',
        VBtn: {
          rounded: null
        }
      },
      VCard: {
        rounded: 'lg'
      },
      VCheckbox: {
        color: 'secondary',
        inset: true
      },
      VChip: {
        rounded: 'sm'
      },
      VCombobox: {
        variant: 'filled'
      },
      VNavigationDrawer: {
        // VList: {
        //   nav: true,
        //   VListItem: {
        //     rounded: 'xl',
        //   },
        // },
      },
      VSelect: {
        variant: 'filled'
      },
      VSlider: {
        color: 'primary'
      },
      VTabs: {
        color: 'primary'
      },
      VTextarea: {
        variant: 'filled'
      },
      VTextField: {
        variant: 'filled'
      },
      VToolbar: {
        VBtn: {
          color: null
        }
      }
    },
    theme: {
      themes: {
        light: {
          colors: {
            primary: '#6750a4',
            secondary: '#b4b0bb',
            tertiary: '#7d5260',
            error: '#b3261e',
            surface: '#fffbfe'
          }
        }
      }
    }
  };

  // Icons
  const md3 = {
    ..._md3,
    // Alpine-specific config
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi
      }
    }
  };

  var blueprints = /*#__PURE__*/Object.freeze({
    __proto__: null,
    md1: md1,
    md2: md2,
    md3: md3
  });

  // TODO(Alpinui)
  // TODO
  // TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
  //        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
  // TODO
  // TODO


  // Types

  // Composables
  function useProxiedModel(vm, props, prop, defaultValue) {
    let transformIn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
    let transformOut = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : v => v;
    const {
      computed,
      ref,
      toRaw,
      watch
    } = vm.reactivity;
    const internal = ref(props[prop] !== undefined ? props[prop] : defaultValue);
    const isControlled = useIsControlled(vm, props, prop);

    // NOTE(Alpinui): Refactored from `useToggleScope`
    watch([() => !isControlled.value, () => props[prop]], _ref => {
      let [_, val] = _ref;
      if (isControlled.value) return;
      internal.value = val;
    });
    const model = computed({
      get() {
        const externalValue = props[prop];
        return transformIn(isControlled.value ? externalValue : internal.value);
      },
      set(internalValue) {
        const newValue = transformOut(internalValue);
        const value = toRaw(isControlled.value ? props[prop] : internal.value);
        if (value === newValue || transformIn(value) === internalValue) {
          return;
        }
        internal.value = newValue;
        vm?.emit(`update:${prop}`, newValue);
      }
    });
    Object.defineProperty(model, 'externalValue', {
      get: () => isControlled.value ? props[prop] : internal.value
    });
    return model;
  }
  function useIsControlled(vm, props, prop) {
    const {
      computed
    } = vm.reactivity;
    const kebabProp = toKebabCase(prop);
    const checkKebab = kebabProp !== prop;

    // Orig Vue implementation - we check both kebab and normal prop names
    if (vm.type === 'vue') {
      const vnode = vm.instance().vnode;
      return checkKebab ? computed(() => {
        void props[prop];
        return !!((vnode.props?.hasOwnProperty(prop) || vnode.props?.hasOwnProperty(kebabProp)) && (vnode.props?.hasOwnProperty(`onUpdate:${prop}`) || vnode.props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
      }) : computed(() => {
        void props[prop];
        return !!(vnode.props?.hasOwnProperty(prop) && vnode.props?.hasOwnProperty(`onUpdate:${prop}`));
      });
    } else if (vm.type === 'alpine') {
      // AlpineJS implementation - we check both kebab and normal prop names
      return computed(() => {
        void props[prop];
        return !!(vm.props?.hasOwnProperty(prop) && vm.props?.hasOwnProperty(`onUpdate:${prop}`));
      });
    } else {
      throw Error(`Unknown instance type ${vm.type}`);
    }
  }

  var en = {
    badge: 'Badge',
    open: 'Open',
    close: 'Close',
    dismiss: 'Dismiss',
    confirmEdit: {
      ok: 'OK',
      cancel: 'Cancel'
    },
    dataIterator: {
      noResultsText: 'No matching records found',
      loadingText: 'Loading items...'
    },
    dataTable: {
      itemsPerPageText: 'Rows per page:',
      ariaLabel: {
        sortDescending: 'Sorted descending.',
        sortAscending: 'Sorted ascending.',
        sortNone: 'Not sorted.',
        activateNone: 'Activate to remove sorting.',
        activateDescending: 'Activate to sort descending.',
        activateAscending: 'Activate to sort ascending.'
      },
      sortBy: 'Sort by'
    },
    dataFooter: {
      itemsPerPageText: 'Items per page:',
      itemsPerPageAll: 'All',
      nextPage: 'Next page',
      prevPage: 'Previous page',
      firstPage: 'First page',
      lastPage: 'Last page',
      pageText: '{0}-{1} of {2}'
    },
    dateRangeInput: {
      divider: 'to'
    },
    datePicker: {
      itemsSelected: '{0} selected',
      range: {
        title: 'Select dates',
        header: 'Enter dates'
      },
      title: 'Select date',
      header: 'Enter date',
      input: {
        placeholder: 'Enter date'
      }
    },
    noDataText: 'No data available',
    carousel: {
      prev: 'Previous visual',
      next: 'Next visual',
      ariaLabel: {
        delimiter: 'Carousel slide {0} of {1}'
      }
    },
    calendar: {
      moreEvents: '{0} more',
      today: 'Today'
    },
    input: {
      clear: 'Clear {0}',
      prependAction: '{0} prepended action',
      appendAction: '{0} appended action',
      otp: 'Please enter OTP character {0}'
    },
    fileInput: {
      counter: '{0} files',
      counterSize: '{0} files ({1} in total)'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM',
      title: 'Select Time'
    },
    pagination: {
      ariaLabel: {
        root: 'Pagination Navigation',
        next: 'Next page',
        previous: 'Previous page',
        page: 'Go to page {0}',
        currentPage: 'Page {0}, Current page',
        first: 'First page',
        last: 'Last page'
      }
    },
    stepper: {
      next: 'Next',
      prev: 'Previous'
    },
    rating: {
      ariaLabel: {
        item: 'Rating {0} of {1}'
      }
    },
    loading: 'Loading...',
    infiniteScroll: {
      loadMore: 'Load more',
      empty: 'No more'
    }
  };

  // Composables

  // Types

  const LANG_PREFIX = '$vuetify.';
  const replace = (str, params) => {
    return str.replace(/\{(\d+)\}/g, (match, index) => {
      return String(params[+index]);
    });
  };
  const createTranslateFunction = (current, fallback, messages) => {
    return function (key) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      if (!key.startsWith(LANG_PREFIX)) {
        return replace(key, params);
      }
      const shortKey = key.replace(LANG_PREFIX, '');
      const currentLocale = current.value && messages.value[current.value];
      const fallbackLocale = fallback.value && messages.value[fallback.value];
      let str = getObjectValueByPath(currentLocale, shortKey, null);
      if (!str) {
        consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
        str = getObjectValueByPath(fallbackLocale, shortKey, null);
      }
      if (!str) {
        consoleError(`Translation key "${key}" not found in fallback`);
        str = key;
      }
      if (typeof str !== 'string') {
        consoleError(`Translation key "${key}" has a non-string value`);
        str = key;
      }
      return replace(str, params);
    };
  };
  function createNumberFunction(current, fallback) {
    return (value, options) => {
      const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
      return numberFormat.format(value);
    };
  }
  function useProvided(vm, props, prop, provided) {
    const {
      watch
    } = vm.reactivity;
    const internal = useProxiedModel(vm, props, prop, props[prop] ?? provided.value);

    // TODO(Vuetify): Remove when defaultValue works
    internal.value = props[prop] ?? provided.value;
    watch(provided, v => {
      if (props[prop] == null) {
        internal.value = provided.value;
      }
    });
    return internal;
  }
  function createProvideFunction(state) {
    return (vm, props) => {
      const current = useProvided(vm, props, 'locale', state.current);
      const fallback = useProvided(vm, props, 'fallback', state.fallback);
      const messages = useProvided(vm, props, 'messages', state.messages);
      return {
        name: 'alpinui',
        current,
        fallback,
        messages,
        t: createTranslateFunction(current, fallback, messages),
        n: createNumberFunction(current, fallback),
        provide: createProvideFunction({
          current,
          fallback,
          messages
        })
      };
    };
  }
  function createVuetifyAdapter(vm, options) {
    const {
      ref,
      shallowRef
    } = vm.reactivity;
    const messages = ref({
      en,
      ...options?.messages
    });
    const current = shallowRef(options?.locale ?? 'en');
    const fallback = shallowRef(options?.fallback ?? 'en');
    return {
      name: 'vuetify',
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback),
      provide: createProvideFunction({
        current,
        fallback,
        messages
      })
    };
  }

  // Utilities

  // Types

  const LocaleSymbol = Symbol.for('vuetify:locale');
  function isLocaleInstance(obj) {
    return obj.name != null;
  }
  function createLocale(vm, options) {
    const i18n = options?.adapter && isLocaleInstance(options?.adapter) ? options?.adapter : createVuetifyAdapter(vm, options);
    const rtl = createRtl(vm, i18n, options);
    return {
      ...i18n,
      ...rtl
    };
  }
  function useLocale$1(vm) {
    const locale = vm.reactivity.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
    return locale;
  }
  function provideLocale(vm, props) {
    const locale = vm.reactivity.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');
    const i18n = locale.provide(vm, props);
    const rtl = provideRtl(vm, i18n, locale.rtl, props);
    const data = {
      ...i18n,
      ...rtl
    };
    vm.reactivity.provide(LocaleSymbol, data);
    return data;
  }
  function genDefaults$3() {
    return {
      af: false,
      ar: true,
      bg: false,
      ca: false,
      ckb: false,
      cs: false,
      de: false,
      el: false,
      en: false,
      es: false,
      et: false,
      fa: true,
      fi: false,
      fr: false,
      hr: false,
      hu: false,
      he: true,
      id: false,
      it: false,
      ja: false,
      km: false,
      ko: false,
      lv: false,
      lt: false,
      nl: false,
      no: false,
      pl: false,
      pt: false,
      ro: false,
      ru: false,
      sk: false,
      sl: false,
      srCyrl: false,
      srLatn: false,
      sv: false,
      th: false,
      tr: false,
      az: false,
      uk: false,
      vi: false,
      zhHans: false,
      zhHant: false
    };
  }
  function createRtl(vm, i18n, options) {
    const {
      computed,
      ref
    } = vm.reactivity;
    const rtl = ref(options?.rtl ?? genDefaults$3());
    const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);
    return {
      isRtl,
      rtl,
      rtlClasses: computed(() => {
        const rtlValue = isRtl.value ? 'rtl' : 'ltr';
        return {
          [`v-locale--is-${rtlValue}`]: true
        };
      })
    };
  }
  function provideRtl(vm, locale, rtl, props) {
    const {
      computed
    } = vm.reactivity;
    const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);
    return {
      isRtl,
      rtl,
      rtlClasses: computed(() => {
        const rtlValue = isRtl.value ? 'rtl' : 'ltr';
        return {
          [`v-locale--is-${rtlValue}`]: true
        };
      })
    };
  }
  function useRtl$1(vm) {
    const locale = vm.reactivity.inject(LocaleSymbol);
    if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance');
    return {
      isRtl: locale.isRtl,
      rtlClasses: locale.rtlClasses
    };
  }

  // Utilities

  // Types

  const firstDay = {
    '001': 1,
    AD: 1,
    AE: 6,
    AF: 6,
    AG: 0,
    AI: 1,
    AL: 1,
    AM: 1,
    AN: 1,
    AR: 1,
    AS: 0,
    AT: 1,
    AU: 1,
    AX: 1,
    AZ: 1,
    BA: 1,
    BD: 0,
    BE: 1,
    BG: 1,
    BH: 6,
    BM: 1,
    BN: 1,
    BR: 0,
    BS: 0,
    BT: 0,
    BW: 0,
    BY: 1,
    BZ: 0,
    CA: 0,
    CH: 1,
    CL: 1,
    CM: 1,
    CN: 1,
    CO: 0,
    CR: 1,
    CY: 1,
    CZ: 1,
    DE: 1,
    DJ: 6,
    DK: 1,
    DM: 0,
    DO: 0,
    DZ: 6,
    EC: 1,
    EE: 1,
    EG: 6,
    ES: 1,
    ET: 0,
    FI: 1,
    FJ: 1,
    FO: 1,
    FR: 1,
    GB: 1,
    'GB-alt-variant': 0,
    GE: 1,
    GF: 1,
    GP: 1,
    GR: 1,
    GT: 0,
    GU: 0,
    HK: 0,
    HN: 0,
    HR: 1,
    HU: 1,
    ID: 0,
    IE: 1,
    IL: 0,
    IN: 0,
    IQ: 6,
    IR: 6,
    IS: 1,
    IT: 1,
    JM: 0,
    JO: 6,
    JP: 0,
    KE: 0,
    KG: 1,
    KH: 0,
    KR: 0,
    KW: 6,
    KZ: 1,
    LA: 0,
    LB: 1,
    LI: 1,
    LK: 1,
    LT: 1,
    LU: 1,
    LV: 1,
    LY: 6,
    MC: 1,
    MD: 1,
    ME: 1,
    MH: 0,
    MK: 1,
    MM: 0,
    MN: 1,
    MO: 0,
    MQ: 1,
    MT: 0,
    MV: 5,
    MX: 0,
    MY: 1,
    MZ: 0,
    NI: 0,
    NL: 1,
    NO: 1,
    NP: 0,
    NZ: 1,
    OM: 6,
    PA: 0,
    PE: 0,
    PH: 0,
    PK: 0,
    PL: 1,
    PR: 0,
    PT: 0,
    PY: 0,
    QA: 6,
    RE: 1,
    RO: 1,
    RS: 1,
    RU: 1,
    SA: 0,
    SD: 6,
    SE: 1,
    SG: 0,
    SI: 1,
    SK: 1,
    SM: 1,
    SV: 0,
    SY: 6,
    TH: 0,
    TJ: 1,
    TM: 1,
    TR: 1,
    TT: 0,
    TW: 0,
    UA: 1,
    UM: 0,
    US: 0,
    UY: 1,
    UZ: 1,
    VA: 1,
    VE: 0,
    VI: 0,
    VN: 1,
    WS: 0,
    XK: 1,
    YE: 0,
    ZA: 0,
    ZW: 0
  };
  function getWeekArray(date, locale, firstDayOfWeek) {
    const weeks = [];
    let currentWeek = [];
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const first = firstDayOfWeek ?? firstDay[locale.slice(-2).toUpperCase()] ?? 0;
    const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7;
    const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7;
    for (let i = 0; i < firstDayWeekIndex; i++) {
      const adjacentDay = new Date(firstDayOfMonth);
      adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i));
      currentWeek.push(adjacentDay);
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = new Date(date.getFullYear(), date.getMonth(), i);

      // Add the day to the current week
      currentWeek.push(day);

      // If the current week has 7 days, add it to the weeks array and start a new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
      const adjacentDay = new Date(lastDayOfMonth);
      adjacentDay.setDate(adjacentDay.getDate() + i);
      currentWeek.push(adjacentDay);
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    return weeks;
  }
  function startOfWeek(date, locale, firstDayOfWeek) {
    const day = firstDayOfWeek ?? firstDay[locale.slice(-2).toUpperCase()] ?? 0;
    const d = new Date(date);
    while (d.getDay() !== day) {
      d.setDate(d.getDate() - 1);
    }
    return d;
  }
  function endOfWeek(date, locale) {
    const d = new Date(date);
    const lastDay = ((firstDay[locale.slice(-2).toUpperCase()] ?? 0) + 6) % 7;
    while (d.getDay() !== lastDay) {
      d.setDate(d.getDate() + 1);
    }
    return d;
  }
  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  function parseLocalDate(value) {
    const parts = value.split('-').map(Number);

    // new Date() uses local time zone when passing individual date component values
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  const _YYYMMDD = /^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;
  function date(value) {
    if (value == null) return new Date();
    if (value instanceof Date) return value;
    if (typeof value === 'string') {
      let parsed;
      if (_YYYMMDD.test(value)) {
        return parseLocalDate(value);
      } else {
        parsed = Date.parse(value);
      }
      if (!isNaN(parsed)) return new Date(parsed);
    }
    return null;
  }
  const sundayJanuarySecond2000 = new Date(2000, 0, 2);
  function getWeekdays(locale, firstDayOfWeek) {
    const daysFromSunday = firstDayOfWeek ?? firstDay[locale.slice(-2).toUpperCase()] ?? 0;
    return createRange(7).map(i => {
      const weekday = new Date(sundayJanuarySecond2000);
      weekday.setDate(sundayJanuarySecond2000.getDate() + daysFromSunday + i);
      return new Intl.DateTimeFormat(locale, {
        weekday: 'narrow'
      }).format(weekday);
    });
  }
  function format(value, formatString, locale, formats) {
    const newDate = date(value) ?? new Date();
    const customFormat = formats?.[formatString];
    if (typeof customFormat === 'function') {
      return customFormat(newDate, formatString, locale);
    }
    let options = {};
    switch (formatString) {
      case 'fullDate':
        options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        break;
      case 'fullDateWithWeekday':
        options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        break;
      case 'normalDate':
        const day = newDate.getDate();
        const month = new Intl.DateTimeFormat(locale, {
          month: 'long'
        }).format(newDate);
        return `${day} ${month}`;
      case 'normalDateWithWeekday':
        options = {
          weekday: 'short',
          day: 'numeric',
          month: 'short'
        };
        break;
      case 'shortDate':
        options = {
          month: 'short',
          day: 'numeric'
        };
        break;
      case 'year':
        options = {
          year: 'numeric'
        };
        break;
      case 'month':
        options = {
          month: 'long'
        };
        break;
      case 'monthShort':
        options = {
          month: 'short'
        };
        break;
      case 'monthAndYear':
        options = {
          month: 'long',
          year: 'numeric'
        };
        break;
      case 'monthAndDate':
        options = {
          month: 'long',
          day: 'numeric'
        };
        break;
      case 'weekday':
        options = {
          weekday: 'long'
        };
        break;
      case 'weekdayShort':
        options = {
          weekday: 'short'
        };
        break;
      case 'dayOfMonth':
        return new Intl.NumberFormat(locale).format(newDate.getDate());
      case 'hours12h':
        options = {
          hour: 'numeric',
          hour12: true
        };
        break;
      case 'hours24h':
        options = {
          hour: 'numeric',
          hour12: false
        };
        break;
      case 'minutes':
        options = {
          minute: 'numeric'
        };
        break;
      case 'seconds':
        options = {
          second: 'numeric'
        };
        break;
      case 'fullTime':
        options = {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };
        break;
      case 'fullTime12h':
        options = {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };
        break;
      case 'fullTime24h':
        options = {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        };
        break;
      case 'fullDateTime':
        options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };
        break;
      case 'fullDateTime12h':
        options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };
        break;
      case 'fullDateTime24h':
        options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        };
        break;
      case 'keyboardDate':
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        };
        break;
      case 'keyboardDateTime':
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        };
        break;
      case 'keyboardDateTime12h':
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        };
        break;
      case 'keyboardDateTime24h':
        options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: false
        };
        break;
      default:
        options = customFormat ?? {
          timeZone: 'UTC',
          timeZoneName: 'short'
        };
    }
    return new Intl.DateTimeFormat(locale, options).format(newDate);
  }
  function toISO(adapter, value) {
    const date = adapter.toJsDate(value);
    const year = date.getFullYear();
    const month = padStart(String(date.getMonth() + 1), 2, '0');
    const day = padStart(String(date.getDate()), 2, '0');
    return `${year}-${month}-${day}`;
  }
  function parseISO(value) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  function addMinutes(date, amount) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + amount);
    return d;
  }
  function addHours(date, amount) {
    const d = new Date(date);
    d.setHours(d.getHours() + amount);
    return d;
  }
  function addDays(date, amount) {
    const d = new Date(date);
    d.setDate(d.getDate() + amount);
    return d;
  }
  function addWeeks(date, amount) {
    const d = new Date(date);
    d.setDate(d.getDate() + amount * 7);
    return d;
  }
  function addMonths(date, amount) {
    const d = new Date(date);
    d.setDate(1);
    d.setMonth(d.getMonth() + amount);
    return d;
  }
  function getYear(date) {
    return date.getFullYear();
  }
  function getMonth(date) {
    return date.getMonth();
  }
  function getDate(date) {
    return date.getDate();
  }
  function getNextMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
  function getPreviousMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }
  function getHours(date) {
    return date.getHours();
  }
  function getMinutes(date) {
    return date.getMinutes();
  }
  function startOfYear(date) {
    return new Date(date.getFullYear(), 0, 1);
  }
  function endOfYear(date) {
    return new Date(date.getFullYear(), 11, 31);
  }
  function isWithinRange(date, range) {
    return isAfter(date, range[0]) && isBefore(date, range[1]);
  }
  function isValid(date) {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  }
  function isAfter(date, comparing) {
    return date.getTime() > comparing.getTime();
  }
  function isAfterDay(date, comparing) {
    return isAfter(startOfDay(date), startOfDay(comparing));
  }
  function isBefore(date, comparing) {
    return date.getTime() < comparing.getTime();
  }
  function isEqual(date, comparing) {
    return date.getTime() === comparing.getTime();
  }
  function isSameDay(date, comparing) {
    return date.getDate() === comparing.getDate() && date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
  }
  function isSameMonth(date, comparing) {
    return date.getMonth() === comparing.getMonth() && date.getFullYear() === comparing.getFullYear();
  }
  function isSameYear(date, comparing) {
    return date.getFullYear() === comparing.getFullYear();
  }
  function getDiff(date, comparing, unit) {
    const d = new Date(date);
    const c = new Date(comparing);
    switch (unit) {
      case 'years':
        return d.getFullYear() - c.getFullYear();
      case 'quarters':
        return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4);
      case 'months':
        return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12;
      case 'weeks':
        return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24 * 7));
      case 'days':
        return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24));
      case 'hours':
        return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60));
      case 'minutes':
        return Math.floor((d.getTime() - c.getTime()) / (1000 * 60));
      case 'seconds':
        return Math.floor((d.getTime() - c.getTime()) / 1000);
      default:
        {
          return d.getTime() - c.getTime();
        }
    }
  }
  function setHours(date, count) {
    const d = new Date(date);
    d.setHours(count);
    return d;
  }
  function setMinutes(date, count) {
    const d = new Date(date);
    d.setMinutes(count);
    return d;
  }
  function setMonth(date, count) {
    const d = new Date(date);
    d.setMonth(count);
    return d;
  }
  function setDate(date, day) {
    const d = new Date(date);
    d.setDate(day);
    return d;
  }
  function setYear(date, year) {
    const d = new Date(date);
    d.setFullYear(year);
    return d;
  }
  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }
  function endOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }
  class VuetifyDateAdapter {
    constructor(options) {
      this.locale = options.locale;
      this.formats = options.formats;
    }
    date(value) {
      return date(value);
    }
    toJsDate(date) {
      return date;
    }
    toISO(date) {
      return toISO(this, date);
    }
    parseISO(date) {
      return parseISO(date);
    }
    addMinutes(date, amount) {
      return addMinutes(date, amount);
    }
    addHours(date, amount) {
      return addHours(date, amount);
    }
    addDays(date, amount) {
      return addDays(date, amount);
    }
    addWeeks(date, amount) {
      return addWeeks(date, amount);
    }
    addMonths(date, amount) {
      return addMonths(date, amount);
    }
    getWeekArray(date, firstDayOfWeek) {
      return getWeekArray(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined);
    }
    startOfWeek(date, firstDayOfWeek) {
      return startOfWeek(date, this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined);
    }
    endOfWeek(date) {
      return endOfWeek(date, this.locale);
    }
    startOfMonth(date) {
      return startOfMonth(date);
    }
    endOfMonth(date) {
      return endOfMonth(date);
    }
    format(date, formatString) {
      return format(date, formatString, this.locale, this.formats);
    }
    isEqual(date, comparing) {
      return isEqual(date, comparing);
    }
    isValid(date) {
      return isValid(date);
    }
    isWithinRange(date, range) {
      return isWithinRange(date, range);
    }
    isAfter(date, comparing) {
      return isAfter(date, comparing);
    }
    isAfterDay(date, comparing) {
      return isAfterDay(date, comparing);
    }
    isBefore(date, comparing) {
      return !isAfter(date, comparing) && !isEqual(date, comparing);
    }
    isSameDay(date, comparing) {
      return isSameDay(date, comparing);
    }
    isSameMonth(date, comparing) {
      return isSameMonth(date, comparing);
    }
    isSameYear(date, comparing) {
      return isSameYear(date, comparing);
    }
    setMinutes(date, count) {
      return setMinutes(date, count);
    }
    setHours(date, count) {
      return setHours(date, count);
    }
    setMonth(date, count) {
      return setMonth(date, count);
    }
    setDate(date, day) {
      return setDate(date, day);
    }
    setYear(date, year) {
      return setYear(date, year);
    }
    getDiff(date, comparing, unit) {
      return getDiff(date, comparing, unit);
    }
    getWeekdays(firstDayOfWeek) {
      return getWeekdays(this.locale, firstDayOfWeek ? Number(firstDayOfWeek) : undefined);
    }
    getYear(date) {
      return getYear(date);
    }
    getMonth(date) {
      return getMonth(date);
    }
    getDate(date) {
      return getDate(date);
    }
    getNextMonth(date) {
      return getNextMonth(date);
    }
    getPreviousMonth(date) {
      return getPreviousMonth(date);
    }
    getHours(date) {
      return getHours(date);
    }
    getMinutes(date) {
      return getMinutes(date);
    }
    startOfDay(date) {
      return startOfDay(date);
    }
    endOfDay(date) {
      return endOfDay(date);
    }
    startOfYear(date) {
      return startOfYear(date);
    }
    endOfYear(date) {
      return endOfYear(date);
    }
  }

  // Composables
  const DateOptionsSymbol = Symbol.for('vuetify:date-options');
  const DateAdapterSymbol = Symbol.for('vuetify:date-adapter');
  function createDate(vm, options, locale) {
    const _options = mergeDeep({
      adapter: VuetifyDateAdapter,
      locale: {
        af: 'af-ZA',
        // ar: '', # not the same value for all variants
        bg: 'bg-BG',
        ca: 'ca-ES',
        ckb: '',
        cs: 'cs-CZ',
        de: 'de-DE',
        el: 'el-GR',
        en: 'en-US',
        // es: '', # not the same value for all variants
        et: 'et-EE',
        fa: 'fa-IR',
        fi: 'fi-FI',
        // fr: '', #not the same value for all variants
        hr: 'hr-HR',
        hu: 'hu-HU',
        he: 'he-IL',
        id: 'id-ID',
        it: 'it-IT',
        ja: 'ja-JP',
        ko: 'ko-KR',
        lv: 'lv-LV',
        lt: 'lt-LT',
        nl: 'nl-NL',
        no: 'no-NO',
        pl: 'pl-PL',
        pt: 'pt-PT',
        ro: 'ro-RO',
        ru: 'ru-RU',
        sk: 'sk-SK',
        sl: 'sl-SI',
        srCyrl: 'sr-SP',
        srLatn: 'sr-SP',
        sv: 'sv-SE',
        th: 'th-TH',
        tr: 'tr-TR',
        az: 'az-AZ',
        uk: 'uk-UA',
        vi: 'vi-VN',
        zhHans: 'zh-CN',
        zhHant: 'zh-TW'
      }
    }, options);
    return {
      options: _options,
      instance: createInstance(vm, _options, locale)
    };
  }
  function createInstance(vm, options, locale) {
    const {
      reactive,
      watch
    } = vm.reactivity;
    const instance = reactive(typeof options.adapter === 'function'
    // eslint-disable-next-line new-cap
    ? new options.adapter({
      locale: options.locale[locale.current.value] ?? locale.current.value,
      formats: options.formats
    }) : options.adapter);
    watch(locale.current, value => {
      instance.locale = options.locale[value] ?? value ?? instance.locale;
    });
    return instance;
  }
  function useDate$1(vm) {
    const {
      inject
    } = vm.reactivity;
    const options = inject(DateOptionsSymbol);
    if (!options) throw new Error('[Vuetify] Could not find injected date options');
    const locale = useLocale$1(vm);
    return createInstance(vm, options, locale);
  }

  // https://stackoverflow.com/questions/274861/how-do-i-calculate-the-week-number-given-a-date/275024#275024
  function getWeek(adapter, value) {
    const date = adapter.toJsDate(value);
    let year = date.getFullYear();
    let d1w1 = new Date(year, 0, 1);
    if (date < d1w1) {
      year = year - 1;
      d1w1 = new Date(year, 0, 1);
    } else {
      const tv = new Date(year + 1, 0, 1);
      if (date >= tv) {
        year = year + 1;
        d1w1 = tv;
      }
    }
    const diffTime = Math.abs(date.getTime() - d1w1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.floor(diffDays / 7) + 1;
  }

  // Utilities

  // Types

  function getCurrentInstanceName(vm) {
    return toKebabCase(vm.aliasName || vm.name);
  }
  let _uid = 0;
  let _map = new WeakMap();
  function getUid(vm) {
    const key = vmUid(vm);
    if (_map.has(key)) return _map.get(key);else {
      const uid = _uid++;
      _map.set(key, uid);
      return uid;
    }
  }
  getUid.reset = () => {
    _uid = 0;
    _map = new WeakMap();
  };
  function vmUid(vm) {
    if (vm.type === 'vue') return vm.instance();else if (vm.type === 'alpine') return vm.el;else throw Error(`Invalid instance type ${vm.type}`);
  }

  // Utilities

  // Types

  const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']; // no xs

  const DisplaySymbol = Symbol.for('vuetify:display');
  const defaultDisplayOptions = {
    mobileBreakpoint: 'lg',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560
    }
  };
  const parseDisplayOptions = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDisplayOptions;
    return mergeDeep(defaultDisplayOptions, options);
  };
  function getClientWidth(ssr) {
    return IN_BROWSER && !ssr ? window.innerWidth : typeof ssr === 'object' && ssr.clientWidth || 0;
  }
  function getClientHeight(ssr) {
    return IN_BROWSER && !ssr ? window.innerHeight : typeof ssr === 'object' && ssr.clientHeight || 0;
  }
  function getPlatform(ssr) {
    const userAgent = IN_BROWSER && !ssr ? window.navigator.userAgent : 'ssr';
    function match(regexp) {
      return Boolean(userAgent.match(regexp));
    }
    const android = match(/android/i);
    const ios = match(/iphone|ipad|ipod/i);
    const cordova = match(/cordova/i);
    const electron = match(/electron/i);
    const chrome = match(/chrome/i);
    const edge = match(/edge/i);
    const firefox = match(/firefox/i);
    const opera = match(/opera/i);
    const win = match(/win/i);
    const mac = match(/mac/i);
    const linux = match(/linux/i);
    return {
      android,
      ios,
      cordova,
      electron,
      chrome,
      edge,
      firefox,
      opera,
      win,
      mac,
      linux,
      touch: SUPPORTS_TOUCH,
      ssr: userAgent === 'ssr'
    };
  }
  function createDisplay(vm, options, ssr) {
    const {
      reactive,
      shallowRef,
      toRefs,
      watchEffect
    } = vm.reactivity;
    const {
      thresholds,
      mobileBreakpoint
    } = parseDisplayOptions(options);
    const height = shallowRef(getClientHeight(ssr));
    const platform = shallowRef(getPlatform(ssr));
    const state = reactive({});
    const width = shallowRef(getClientWidth(ssr));
    function updateSize() {
      height.value = getClientHeight();
      width.value = getClientWidth();
    }
    function update() {
      updateSize();
      platform.value = getPlatform();
    }

    // eslint-disable-next-line max-statements
    watchEffect(() => {
      const xs = width.value < thresholds.sm;
      const sm = width.value < thresholds.md && !xs;
      const md = width.value < thresholds.lg && !(sm || xs);
      const lg = width.value < thresholds.xl && !(md || sm || xs);
      const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
      const xxl = width.value >= thresholds.xxl;
      const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xxl';
      const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint];
      const mobile = width.value < breakpointValue;
      state.xs = xs;
      state.sm = sm;
      state.md = md;
      state.lg = lg;
      state.xl = xl;
      state.xxl = xxl;
      state.smAndUp = !xs;
      state.mdAndUp = !(xs || sm);
      state.lgAndUp = !(xs || sm || md);
      state.xlAndUp = !(xs || sm || md || lg);
      state.smAndDown = !(md || lg || xl || xxl);
      state.mdAndDown = !(lg || xl || xxl);
      state.lgAndDown = !(xl || xxl);
      state.xlAndDown = !xxl;
      state.name = name;
      state.height = height.value;
      state.width = width.value;
      state.mobile = mobile;
      state.mobileBreakpoint = mobileBreakpoint;
      state.platform = platform.value;
      state.thresholds = thresholds;
    });
    if (IN_BROWSER) {
      window.addEventListener('resize', updateSize, {
        passive: true
      });
    }
    return {
      ...toRefs(state),
      update,
      ssr: !!ssr
    };
  }
  const makeDisplayProps = propsFactory({
    mobile: {
      type: Boolean,
      default: false
    },
    mobileBreakpoint: [Number, String]
  }, 'display');
  function useDisplay$1(vm) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed,
      inject
    } = vm.reactivity;
    const display = inject(DisplaySymbol);
    if (!display) throw new Error('Could not find Vuetify display injection');
    const mobile = computed(() => {
      if (props.mobile != null) return props.mobile;
      if (!props.mobileBreakpoint) return display.mobile.value;
      const breakpointValue = typeof props.mobileBreakpoint === 'number' ? props.mobileBreakpoint : display.thresholds.value[props.mobileBreakpoint];
      return display.width.value < breakpointValue;
    });
    const displayClasses = computed(() => {
      if (!name) return {};
      return {
        [`${name}--mobile`]: mobile.value
      };
    });
    return {
      ...display,
      displayClasses,
      mobile
    };
  }

  // Utilities

  // Types

  const GoToSymbol = Symbol.for('vuetify:goto');
  function genDefaults$2() {
    return {
      container: undefined,
      duration: 300,
      layout: false,
      offset: 0,
      easing: 'easeInOutCubic',
      patterns: {
        linear: t => t,
        easeInQuad: t => t ** 2,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t ** 3,
        easeOutCubic: t => --t ** 3 + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeInQuart: t => t ** 4,
        easeOutQuart: t => 1 - --t ** 4,
        easeInOutQuart: t => t < 0.5 ? 8 * t ** 4 : 1 - 8 * --t ** 4,
        easeInQuint: t => t ** 5,
        easeOutQuint: t => 1 + --t ** 5,
        easeInOutQuint: t => t < 0.5 ? 16 * t ** 5 : 1 + 16 * --t ** 5
      }
    };
  }
  function getContainer(el) {
    return getTarget$1(el) ?? (document.scrollingElement || document.body);
  }
  function getTarget$1(el) {
    return typeof el === 'string' ? document.querySelector(el) : refElement(el);
  }
  function getOffset$2(target, horizontal, rtl) {
    if (typeof target === 'number') return horizontal && rtl ? -target : target;
    let el = getTarget$1(target);
    let totalOffset = 0;
    while (el) {
      totalOffset += horizontal ? el.offsetLeft : el.offsetTop;
      el = el.offsetParent;
    }
    return totalOffset;
  }
  function createGoTo(options, locale) {
    return {
      rtl: locale.isRtl,
      options: mergeDeep(genDefaults$2(), options)
    };
  }
  async function scrollTo(_target, _options, horizontal, goTo) {
    const property = horizontal ? 'scrollLeft' : 'scrollTop';
    const options = mergeDeep(goTo?.options ?? genDefaults$2(), _options);
    const rtl = goTo?.rtl.value;
    const target = (typeof _target === 'number' ? _target : getTarget$1(_target)) ?? 0;
    const container = options.container === 'parent' && target instanceof HTMLElement ? target.parentElement : getContainer(options.container);
    const ease = typeof options.easing === 'function' ? options.easing : options.patterns[options.easing];
    if (!ease) {
      throw new TypeError(`Easing function '${options.easing}' not found.`);
    }
    let targetLocation;
    if (typeof target === 'number') {
      targetLocation = getOffset$2(target, horizontal, rtl);
    } else {
      targetLocation = getOffset$2(target, horizontal, rtl) - getOffset$2(container, horizontal, rtl);
      if (options.layout) {
        const styles = window.getComputedStyle(target);
        const layoutOffset = styles.getPropertyValue('--v-layout-top');
        if (layoutOffset) targetLocation -= parseInt(layoutOffset, 10);
      }
    }
    targetLocation += options.offset;
    targetLocation = clampTarget(container, targetLocation, !!rtl, !!horizontal);
    const startLocation = container[property] ?? 0;
    if (targetLocation === startLocation) return Promise.resolve(targetLocation);
    const startTime = performance.now();
    return new Promise(resolve => requestAnimationFrame(function step(currentTime) {
      const timeElapsed = currentTime - startTime;
      const progress = timeElapsed / options.duration;
      const location = Math.floor(startLocation + (targetLocation - startLocation) * ease(clamp(progress, 0, 1)));
      container[property] = location;

      // Allow for some jitter if target time has elapsed
      if (progress >= 1 && Math.abs(location - container[property]) < 10) {
        return resolve(targetLocation);
      } else if (progress > 2) {
        // The target might not be reachable
        consoleWarn('Scroll target is not reachable');
        return resolve(container[property]);
      }
      requestAnimationFrame(step);
    }));
  }
  function useGoTo$1(vm) {
    let _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      computed,
      inject
    } = vm.reactivity;
    const goToInstance = inject(GoToSymbol);
    const {
      isRtl
    } = useRtl$1(vm);
    if (!goToInstance) {
      throw new Error('[Vuetify] Could not find injected goto instance');
    }
    const goTo = {
      ...goToInstance,
      // can be set via VLocaleProvider
      rtl: computed(() => goToInstance.rtl.value || isRtl.value)
    };
    async function go(target, options) {
      return scrollTo(target, mergeDeep(_options, options), false, goTo);
    }
    go.horizontal = async (target, options) => {
      return scrollTo(target, mergeDeep(_options, options), true, goTo);
    };
    return go;
  }

  /**
   * Clamp target value to achieve a smooth scroll animation
   * when the value goes outside the scroll container size
   */
  function clampTarget(container, value, rtl, horizontal) {
    const {
      scrollWidth,
      scrollHeight
    } = container;
    const [containerWidth, containerHeight] = container === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [container.offsetWidth, container.offsetHeight];
    let min;
    let max;
    if (horizontal) {
      if (rtl) {
        min = -(scrollWidth - containerWidth);
        max = 0;
      } else {
        min = 0;
        max = scrollWidth - containerWidth;
      }
    } else {
      min = 0;
      max = scrollHeight + -containerHeight;
    }
    return Math.max(Math.min(value, max), min);
  }

  // Icons

  // Types

  const IconSymbol = Symbol.for('vuetify:icons');
  function genDefaults$1(vm) {
    return {
      svg: {
        component: vm.icons.svg
      },
      class: {
        component: vm.icons.class
      }
    };
  }

  // Composables
  function createIcons(vm, options) {
    const sets = genDefaults$1(vm);

    // NOTE(Alpinui): In original Vuetify, Vue components are used for rendering icons.
    // However, in AlpineJS, we don't want to render the HTML, and we instead pass
    // around the component names that can be passed to `x-data`. Because of that,
    // the fallback icon set is defined for each implementation separately, and that's
    // why it's accessed via `vm.iconFallbackSet`.
    const {
      name: falllbackSetName,
      iconset: falllbackSet
    } = vm.iconFallbackSet;
    const defaultSet = options?.defaultSet ?? falllbackSetName;
    if (defaultSet === falllbackSetName && !(falllbackSetName in sets)) {
      sets[falllbackSetName] = falllbackSet;
    }
    return mergeDeep({
      defaultSet,
      sets,
      aliases: {
        ...aliases,
        /* eslint-disable max-len */
        vuetify: ['M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z', ['M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z', 0.6]],
        'vuetify-outline': 'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z',
        'vuetify-play': ['m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z', ['M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z', 0.6]]
        /* eslint-enable max-len */
      }
    }, options);
  }
  const useIcon = (vm, props) => {
    const {
      computed,
      inject,
      unref
    } = vm.reactivity;
    const icons = inject(IconSymbol);
    if (!icons) throw new Error('Missing Vuetify Icons provide!');
    const iconData = computed(() => {
      const iconAlias = unref(props);
      if (!iconAlias) return {
        component: vm.icons.component
      };
      let icon = iconAlias;
      if (typeof icon === 'string') {
        icon = icon.trim();
        if (icon.startsWith('$')) {
          icon = icons.aliases?.[icon.slice(1)];
        }
      }
      if (!icon) consoleWarn(`Could not find aliased icon "${iconAlias}"`);
      if (Array.isArray(icon)) {
        return {
          component: vm.icons.svg,
          icon
        };
      } else if (typeof icon !== 'string') {
        return {
          component: vm.icons.component,
          icon
        };
      }
      const iconSetName = Object.keys(icons.sets).find(setName => typeof icon === 'string' && icon.startsWith(`${setName}:`));
      const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
      const iconSet = icons.sets[iconSetName ?? icons.defaultSet];
      return {
        component: iconSet.component,
        icon: iconName
      };
    });
    return {
      iconData
    };
  };

  /**
   * WCAG 3.0 APCA perceptual contrast algorithm from https://github.com/Myndex/SAPC-APCA
   * @licence https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
   * @see https://www.w3.org/WAI/GL/task-forces/silver/wiki/Visual_Contrast_of_Text_Subgroup
   */
  // Types

  // MAGICAL NUMBERS

  // sRGB Conversion to Relative Luminance (Y)

  // Transfer Curve (aka "Gamma") for sRGB linearization
  // Simple power curve vs piecewise described in docs
  // Essentially, 2.4 best models actual display
  // characteristics in combination with the total method
  const mainTRC = 2.4;
  const Rco = 0.2126729; // sRGB Red Coefficient (from matrix)
  const Gco = 0.7151522; // sRGB Green Coefficient (from matrix)
  const Bco = 0.0721750; // sRGB Blue Coefficient (from matrix)

  // For Finding Raw SAPC Contrast from Relative Luminance (Y)

  // Constants for SAPC Power Curve Exponents
  // One pair for normal text, and one for reverse
  // These are the "beating heart" of SAPC
  const normBG = 0.55;
  const normTXT = 0.58;
  const revTXT = 0.57;
  const revBG = 0.62;

  // For Clamping and Scaling Values

  const blkThrs = 0.03; // Level that triggers the soft black clamp
  const blkClmp = 1.45; // Exponent for the soft black clamp curve
  const deltaYmin = 0.0005; // Lint trap
  const scaleBoW = 1.25; // Scaling for dark text on light
  const scaleWoB = 1.25; // Scaling for light text on dark
  const loConThresh = 0.078; // Threshold for new simple offset scale
  const loConFactor = 12.82051282051282; // = 1/0.078,
  const loConOffset = 0.06; // The simple offset
  const loClip = 0.001; // Output clip (lint trap #2)

  function APCAcontrast(text, background) {
    // Linearize sRGB
    const Rtxt = (text.r / 255) ** mainTRC;
    const Gtxt = (text.g / 255) ** mainTRC;
    const Btxt = (text.b / 255) ** mainTRC;
    const Rbg = (background.r / 255) ** mainTRC;
    const Gbg = (background.g / 255) ** mainTRC;
    const Bbg = (background.b / 255) ** mainTRC;

    // Apply the standard coefficients and sum to Y
    let Ytxt = Rtxt * Rco + Gtxt * Gco + Btxt * Bco;
    let Ybg = Rbg * Rco + Gbg * Gco + Bbg * Bco;

    // Soft clamp Y when near black.
    // Now clamping all colors to prevent crossover errors
    if (Ytxt <= blkThrs) Ytxt += (blkThrs - Ytxt) ** blkClmp;
    if (Ybg <= blkThrs) Ybg += (blkThrs - Ybg) ** blkClmp;

    // Return 0 Early for extremely low ∆Y (lint trap #1)
    if (Math.abs(Ybg - Ytxt) < deltaYmin) return 0.0;

    // SAPC CONTRAST

    let outputContrast; // For weighted final values
    if (Ybg > Ytxt) {
      // For normal polarity, black text on white
      // Calculate the SAPC contrast value and scale

      const SAPC = (Ybg ** normBG - Ytxt ** normTXT) * scaleBoW;

      // NEW! SAPC SmoothScale™
      // Low Contrast Smooth Scale Rollout to prevent polarity reversal
      // and also a low clip for very low contrasts (lint trap #2)
      // much of this is for very low contrasts, less than 10
      // therefore for most reversing needs, only loConOffset is important
      outputContrast = SAPC < loClip ? 0.0 : SAPC < loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC - loConOffset;
    } else {
      // For reverse polarity, light text on dark
      // WoB should always return negative value.

      const SAPC = (Ybg ** revBG - Ytxt ** revTXT) * scaleWoB;
      outputContrast = SAPC > -loClip ? 0.0 : SAPC > -loConThresh ? SAPC - SAPC * loConFactor * loConOffset : SAPC + loConOffset;
    }
    return outputContrast * 100;
  }

  // Types

  const delta = 0.20689655172413793; // 6÷29

  const cielabForwardTransform = t => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
  const cielabReverseTransform = t => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
  function fromXYZ$1(xyz) {
    const transform = cielabForwardTransform;
    const transformedY = transform(xyz[1]);
    return [116 * transformedY - 16, 500 * (transform(xyz[0] / 0.95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883))];
  }
  function toXYZ$1(lab) {
    const transform = cielabReverseTransform;
    const Ln = (lab[0] + 16) / 116;
    return [transform(Ln + lab[1] / 500) * 0.95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883];
  }

  // Utilities

  // Types

  // For converting XYZ to sRGB
  const srgbForwardMatrix = [[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]];

  // Forward gamma adjust
  const srgbForwardTransform = C => C <= 0.0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - 0.055;

  // For converting sRGB to XYZ
  const srgbReverseMatrix = [[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]];

  // Reverse gamma adjust
  const srgbReverseTransform = C => C <= 0.04045 ? C / 12.92 : ((C + 0.055) / 1.055) ** 2.4;
  function fromXYZ(xyz) {
    const rgb = Array(3);
    const transform = srgbForwardTransform;
    const matrix = srgbForwardMatrix;

    // Matrix transform, then gamma adjustment
    for (let i = 0; i < 3; ++i) {
      // Rescale back to [0, 255]
      rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
    }
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2]
    };
  }
  function toXYZ(_ref) {
    let {
      r,
      g,
      b
    } = _ref;
    const xyz = [0, 0, 0];
    const transform = srgbReverseTransform;
    const matrix = srgbReverseMatrix;

    // Rescale from [0, 255] to [0, 1] then adjust sRGB gamma to linear RGB
    r = transform(r / 255);
    g = transform(g / 255);
    b = transform(b / 255);

    // Matrix color space transform
    for (let i = 0; i < 3; ++i) {
      xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
    }
    return xyz;
  }

  // Utilities

  // Types

  function isCssColor(color) {
    return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color);
  }
  function isParsableColor(color) {
    return isCssColor(color) && !/^((rgb|hsl)a?\()?var\(--/.test(color);
  }
  const cssColorRe = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/;
  const mappers = {
    rgb: (r, g, b, a) => ({
      r,
      g,
      b,
      a
    }),
    rgba: (r, g, b, a) => ({
      r,
      g,
      b,
      a
    }),
    hsl: (h, s, l, a) => HSLtoRGB({
      h,
      s,
      l,
      a
    }),
    hsla: (h, s, l, a) => HSLtoRGB({
      h,
      s,
      l,
      a
    }),
    hsv: (h, s, v, a) => HSVtoRGB({
      h,
      s,
      v,
      a
    }),
    hsva: (h, s, v, a) => HSVtoRGB({
      h,
      s,
      v,
      a
    })
  };
  function parseColor(color) {
    if (typeof color === 'number') {
      if (isNaN(color) || color < 0 || color > 0xFFFFFF) {
        // int can't have opacity
        consoleWarn(`'${color}' is not a valid hex color`);
      }
      return {
        r: (color & 0xFF0000) >> 16,
        g: (color & 0xFF00) >> 8,
        b: color & 0xFF
      };
    } else if (typeof color === 'string' && cssColorRe.test(color)) {
      const {
        groups
      } = color.match(cssColorRe);
      const {
        fn,
        values
      } = groups;
      const realValues = values.split(/,\s*/).map(v => {
        if (v.endsWith('%') && ['hsl', 'hsla', 'hsv', 'hsva'].includes(fn)) {
          return parseFloat(v) / 100;
        } else {
          return parseFloat(v);
        }
      });
      return mappers[fn](...realValues);
    } else if (typeof color === 'string') {
      let hex = color.startsWith('#') ? color.slice(1) : color;
      if ([3, 4].includes(hex.length)) {
        hex = hex.split('').map(char => char + char).join('');
      } else if (![6, 8].includes(hex.length)) {
        consoleWarn(`'${color}' is not a valid hex(a) color`);
      }
      const int = parseInt(hex, 16);
      if (isNaN(int) || int < 0 || int > 0xFFFFFFFF) {
        consoleWarn(`'${color}' is not a valid hex(a) color`);
      }
      return HexToRGB(hex);
    } else if (typeof color === 'object') {
      if (has(color, ['r', 'g', 'b'])) {
        return color;
      } else if (has(color, ['h', 's', 'l'])) {
        return HSVtoRGB(HSLtoHSV(color));
      } else if (has(color, ['h', 's', 'v'])) {
        return HSVtoRGB(color);
      }
    }
    throw new TypeError(`Invalid color: ${color == null ? color : String(color) || color.constructor.name}\nExpected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
  }

  /** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
  function HSVtoRGB(hsva) {
    const {
      h,
      s,
      v,
      a
    } = hsva;
    const f = n => {
      const k = (n + h / 60) % 6;
      return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      a
    };
  }
  function HSLtoRGB(hsla) {
    return HSVtoRGB(HSLtoHSV(hsla));
  }

  /** Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
  function RGBtoHSV(rgba) {
    if (!rgba) return {
      h: 0,
      s: 1,
      v: 1,
      a: 1
    };
    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
      if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
      } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
      } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
      }
    }
    if (h < 0) h = h + 360;
    const s = max === 0 ? 0 : (max - min) / max;
    const hsv = [h, s, max];
    return {
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: rgba.a
    };
  }
  function HSVtoHSL(hsva) {
    const {
      h,
      s,
      v,
      a
    } = hsva;
    const l = v - v * s / 2;
    const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
    return {
      h,
      s: sprime,
      l,
      a
    };
  }
  function HSLtoHSV(hsl) {
    const {
      h,
      s,
      l,
      a
    } = hsl;
    const v = l + s * Math.min(l, 1 - l);
    const sprime = v === 0 ? 0 : 2 - 2 * l / v;
    return {
      h,
      s: sprime,
      v,
      a
    };
  }
  function RGBtoCSS(_ref) {
    let {
      r,
      g,
      b,
      a
    } = _ref;
    return a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  function HSVtoCSS(hsva) {
    return RGBtoCSS(HSVtoRGB(hsva));
  }
  function toHex(v) {
    const h = Math.round(v).toString(16);
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase();
  }
  function RGBtoHex(_ref2) {
    let {
      r,
      g,
      b,
      a
    } = _ref2;
    return `#${[toHex(r), toHex(g), toHex(b), a !== undefined ? toHex(Math.round(a * 255)) : ''].join('')}`;
  }
  function HexToRGB(hex) {
    hex = parseHex(hex);
    let [r, g, b, a] = chunk(hex, 2).map(c => parseInt(c, 16));
    a = a === undefined ? a : a / 255;
    return {
      r,
      g,
      b,
      a
    };
  }
  function HexToHSV(hex) {
    const rgb = HexToRGB(hex);
    return RGBtoHSV(rgb);
  }
  function HSVtoHex(hsva) {
    return RGBtoHex(HSVtoRGB(hsva));
  }
  function parseHex(hex) {
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }
    hex = hex.replace(/([^0-9a-f])/gi, 'F');
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split('').map(x => x + x).join('');
    }
    if (hex.length !== 6) {
      hex = padEnd(padEnd(hex, 6), 8, 'F');
    }
    return hex;
  }
  function lighten(value, amount) {
    const lab = fromXYZ$1(toXYZ(value));
    lab[0] = lab[0] + amount * 10;
    return fromXYZ(toXYZ$1(lab));
  }
  function darken(value, amount) {
    const lab = fromXYZ$1(toXYZ(value));
    lab[0] = lab[0] - amount * 10;
    return fromXYZ(toXYZ$1(lab));
  }

  /**
   * Calculate the relative luminance of a given color
   * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
   */
  function getLuma(color) {
    const rgb = parseColor(color);
    return toXYZ(rgb)[1];
  }
  function getForeground(color) {
    const blackContrast = Math.abs(APCAcontrast(parseColor(0), parseColor(color)));
    const whiteContrast = Math.abs(APCAcontrast(parseColor(0xffffff), parseColor(color)));

    // TODO(Vuetify): warn about poor color selections
    // const contrastAsText = Math.abs(APCAcontrast(colorVal, colorToInt(theme.colors.background)))
    // const minContrast = Math.max(blackContrast, whiteContrast)
    // if (minContrast < 60) {
    //   consoleInfo(`${key} theme color ${color} has poor contrast (${minContrast.toFixed()}%)`)
    // } else if (contrastAsText < 60 && !['background', 'surface'].includes(color)) {
    //   consoleInfo(`${key} theme color ${color} has poor contrast as text (${contrastAsText.toFixed()}%)`)
    // }

    // Prefer white text if both have an acceptable contrast ratio
    return whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';
  }

  // Utilities

  // Types

  const ThemeSymbol = Symbol.for('vuetify:theme');
  const makeThemeProps = propsFactory({
    theme: String
  }, 'theme');
  function genDefaults() {
    return {
      defaultTheme: 'light',
      variations: {
        colors: [],
        lighten: 0,
        darken: 0
      },
      themes: {
        light: {
          dark: false,
          colors: {
            background: '#FFFFFF',
            surface: '#FFFFFF',
            'surface-bright': '#FFFFFF',
            'surface-light': '#EEEEEE',
            'surface-variant': '#424242',
            'on-surface-variant': '#EEEEEE',
            primary: '#1867C0',
            'primary-darken-1': '#1F5592',
            secondary: '#48A9A6',
            'secondary-darken-1': '#018786',
            error: '#B00020',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00'
          },
          variables: {
            'border-color': '#000000',
            'border-opacity': 0.12,
            'high-emphasis-opacity': 0.87,
            'medium-emphasis-opacity': 0.60,
            'disabled-opacity': 0.38,
            'idle-opacity': 0.04,
            'hover-opacity': 0.04,
            'focus-opacity': 0.12,
            'selected-opacity': 0.08,
            'activated-opacity': 0.12,
            'pressed-opacity': 0.12,
            'dragged-opacity': 0.08,
            'theme-kbd': '#212529',
            'theme-on-kbd': '#FFFFFF',
            'theme-code': '#F5F5F5',
            'theme-on-code': '#000000'
          }
        },
        dark: {
          dark: true,
          colors: {
            background: '#121212',
            surface: '#212121',
            'surface-bright': '#ccbfd6',
            'surface-light': '#424242',
            'surface-variant': '#a3a3a3',
            'on-surface-variant': '#424242',
            primary: '#2196F3',
            'primary-darken-1': '#277CC1',
            secondary: '#54B6B2',
            'secondary-darken-1': '#48A9A6',
            error: '#CF6679',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00'
          },
          variables: {
            'border-color': '#FFFFFF',
            'border-opacity': 0.12,
            'high-emphasis-opacity': 1,
            'medium-emphasis-opacity': 0.70,
            'disabled-opacity': 0.50,
            'idle-opacity': 0.10,
            'hover-opacity': 0.04,
            'focus-opacity': 0.12,
            'selected-opacity': 0.08,
            'activated-opacity': 0.12,
            'pressed-opacity': 0.16,
            'dragged-opacity': 0.08,
            'theme-kbd': '#212529',
            'theme-on-kbd': '#FFFFFF',
            'theme-code': '#343434',
            'theme-on-code': '#CCCCCC'
          }
        }
      }
    };
  }
  function parseThemeOptions() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : genDefaults();
    const defaults = genDefaults();
    if (!options) return {
      ...defaults,
      isDisabled: true
    };
    const themes = {};
    for (const [key, theme] of Object.entries(options.themes ?? {})) {
      const defaultTheme = theme.dark || key === 'dark' ? defaults.themes?.dark : defaults.themes?.light;
      themes[key] = mergeDeep(defaultTheme, theme);
    }
    return mergeDeep(defaults, {
      ...options,
      themes
    });
  }

  // Composables
  function createTheme(vm, options) {
    const {
      computed,
      ref,
      watch,
      watchEffect
    } = vm.reactivity;
    const parsedOptions = parseThemeOptions(options);
    const name = ref(parsedOptions.defaultTheme);
    const themes = ref(parsedOptions.themes);
    const computedThemes = computed(() => {
      const acc = {};
      for (const [name, original] of Object.entries(themes.value)) {
        const theme = acc[name] = {
          ...original,
          colors: {
            ...original.colors
          }
        };
        if (parsedOptions.variations) {
          for (const name of parsedOptions.variations.colors) {
            const color = theme.colors[name];
            if (!color) continue;
            for (const variation of ['lighten', 'darken']) {
              const fn = variation === 'lighten' ? lighten : darken;
              for (const amount of createRange(parsedOptions.variations[variation], 1)) {
                theme.colors[`${name}-${variation}-${amount}`] = RGBtoHex(fn(parseColor(color), amount));
              }
            }
          }
        }
        for (const color of Object.keys(theme.colors)) {
          if (/^on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue;
          const onColor = `on-${color}`;
          const colorVal = parseColor(theme.colors[color]);
          theme.colors[onColor] = getForeground(colorVal);
        }
      }
      return acc;
    });
    const current = computed(() => computedThemes.value[name.value]);
    const styles = computed(() => {
      const lines = [];
      if (current.value?.dark) {
        createCssClass(lines, ':root', ['color-scheme: dark']);
      }
      createCssClass(lines, ':root', genCssVariables(current.value));
      for (const [themeName, theme] of Object.entries(computedThemes.value)) {
        createCssClass(lines, `.v-theme--${themeName}`, [`color-scheme: ${theme.dark ? 'dark' : 'normal'}`, ...genCssVariables(theme)]);
      }
      const bgLines = [];
      const fgLines = [];
      const colors = new Set(Object.values(computedThemes.value).flatMap(theme => Object.keys(theme.colors)));
      for (const key of colors) {
        if (/^on-[a-z]/.test(key)) {
          createCssClass(fgLines, `.${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
        } else {
          createCssClass(bgLines, `.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background-color: rgb(var(--v-theme-${key})) !important`, `color: rgb(var(--v-theme-on-${key})) !important`]);
          createCssClass(fgLines, `.text-${key}`, [`color: rgb(var(--v-theme-${key})) !important`]);
          createCssClass(fgLines, `.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]);
        }
      }
      lines.push(...bgLines, ...fgLines);
      return lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
    });
    function getHead() {
      return {
        style: [{
          children: styles.value,
          id: 'vuetify-theme-stylesheet',
          nonce: parsedOptions.cspNonce || false
        }]
      };
    }
    function install(app) {
      if (parsedOptions.isDisabled) return;
      const head = app._context.provides.usehead;
      return installHead(head);
    }
    function installHead(head) {
      if (parsedOptions.isDisabled) return;

      // TODO(Alpinui) - Check if this works?
      if (head) {
        if (head.push) {
          const entry = head.push(getHead());
          if (IN_BROWSER) {
            watch(styles, () => {
              entry.patch(getHead());
            });
          }
        } else {
          if (IN_BROWSER) {
            head.addHeadObjs(getHead());
            watchEffect(() => head.updateDOM());
          } else {
            head.addHeadObjs(getHead());
          }
        }
      } else {
        let styleEl = IN_BROWSER ? document.getElementById('vuetify-theme-stylesheet') : null;
        if (IN_BROWSER) {
          watch(styles, updateStyles, {
            immediate: true
          });
        } else {
          updateStyles();
        }
        function updateStyles() {
          if (typeof document !== 'undefined' && !styleEl) {
            const el = document.createElement('style');
            el.type = 'text/css';
            el.id = 'vuetify-theme-stylesheet';
            if (parsedOptions.cspNonce) el.setAttribute('nonce', parsedOptions.cspNonce);
            styleEl = el;
            document.head.appendChild(styleEl);
          }
          if (styleEl) styleEl.innerHTML = styles.value;
        }
      }
    }
    const themeClasses = computed(() => ({
      [`v-theme--${name.value}`]: !parsedOptions.isDisabled
    }));
    const nameReadonly = computed(() => name.value);
    return {
      install,
      installHead,
      isDisabled: parsedOptions.isDisabled,
      name: nameReadonly,
      themes,
      current,
      computedThemes,
      themeClasses,
      styles,
      global: {
        name: nameReadonly,
        current
      }
    };
  }
  function provideTheme(vm, props) {
    const {
      computed,
      inject,
      provide
    } = vm.reactivity;
    const theme = inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Vuetify theme injection');
    const name = computed(() => {
      return props.theme ?? theme.name.value;
    });
    const current = computed(() => theme.themes.value[name.value]);
    const themeClasses = computed(() => ({
      [`v-theme--${name.value}`]: !theme.isDisabled
    }));
    const newTheme = {
      ...theme,
      name,
      current,
      themeClasses
    };
    provide(ThemeSymbol, newTheme);
    return newTheme;
  }
  function useTheme$1(vm) {
    const {
      inject
    } = vm.reactivity;
    const theme = inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Vuetify theme injection');
    return theme;
  }
  function createCssClass(lines, selector, content) {
    lines.push(`${selector} {\n`, ...content.map(line => `  ${line};\n`), '}\n');
  }
  function genCssVariables(theme) {
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];
    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = parseColor(value);
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);
      if (!key.startsWith('on-')) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
      }
    }
    for (const [key, value] of Object.entries(theme.variables)) {
      const color = typeof value === 'string' && value.startsWith('#') ? parseColor(value) : undefined;
      const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
      variables.push(`--v-${key}: ${rgb ?? value}`);
    }
    return variables;
  }

  // Composables

  // Types

  // NOTE(Alpinui) - Unlike Vuetify `createVuetify()`, in Alpine this is instead
  // a top-level component:
  // `<div x-data="Alpinui" ></div>`
  //
  // NOTE(Alpinui): The entrypoint is that, at 'alpine:init' event, we define this Alpineui
  // component. And then, when user uses it, user can tweak what components it uses,
  // and those will be registered afterwards.
  // `document.addEventListener('alpine:init', () => {})`
  const _Alpinui = defineComponent({
    /* eslint-disable-next-line vue/multi-word-component-names */
    name: 'Alpinui',
    // NOTE(Alpinui): MUST be false. If true, injects defaults. But this component
    // cannot inject, as it's the one that provides the values.
    exposeDefaults: false,
    props: {
      options: {
        type: Object,
        default: () => ({})
      }
    },
    emits: {
      hello: data => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless: (props, vm) => {
      const {
        provide
      } = vm.reactivity;
      const {
        blueprint,
        ...rest
      } = props.options;
      const options = mergeDeep(blueprint, rest);
      const defaults = createDefaults(vm, options.defaults);
      const display = createDisplay(vm, options.display, options.ssr);
      const theme = createTheme(vm, options.theme);
      const icons = createIcons(vm, options.icons);
      const locale = createLocale(vm, options.locale);
      const date = createDate(vm, options.date, locale);
      const goTo = createGoTo(options.goTo, locale);

      // @ts-expect-error
      const head = globalThis.unhead.createHead();
      theme.installHead(head);
      provide(DefaultsSymbol, defaults);
      provide(DisplaySymbol, display);
      provide(ThemeSymbol, theme);
      provide(IconSymbol, icons);
      provide(LocaleSymbol, locale);
      provide(DateOptionsSymbol, date.options);
      provide(DateAdapterSymbol, date.instance);
      provide(GoToSymbol, goTo);

      // TODO - Is this needed?
      // import { IN_BROWSER } from '@/util/globals';
      // if (IN_BROWSER && options.ssr) {
      //   const { mount } = app;
      //   app.mount = (...args) => {
      //     // const vm = mount(...args);
      //     vm.$nextTick(() => display.update());
      //     app.mount = mount;
      //     return vm;
      //   };
      // }

      // TODO
      const hello = 'world';
      const triggerEmit = () => {
        vm.emit('hello', {
          a: 1
        });
      };
      return {
        expose: {
          defaults,
          display,
          theme,
          icons,
          locale,
          date,
          goTo,
          hello,
          // TODO
          triggerEmit // TODO
        },
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  const Alpinui = defineAlpineComponent({
    ..._Alpinui,
    name: 'Alpinui'
  });

  // Utilities

  // Types

  // Composables
  const makeComponentProps = propsFactory({
    class: [String, Array, Object],
    style: {
      type: [String, Array, Object],
      default: null
    }
  }, 'component');

  // TODO(Alpinui) - USE THIS IN ALL COMPONENTS!
  function useComponent(vm, props) {
    const {
      computed
    } = vm.reactivity;
    const classes = computed(() => normalizeClass(props.class));
    const styles = computed(() => normalizeStyle(props.style));
    return {
      classes,
      styles
    };
  }

  // Utilities

  // Types

  function useResizeObserver(vm, callback) {
    let box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'content';
    const {
      onBeforeUnmount,
      readonly,
      ref,
      watch
    } = vm.reactivity;
    const resizeRef = templateRef(vm);
    const contentRect = ref();
    if (IN_BROWSER) {
      const observer = new ResizeObserver(entries => {
        callback?.(entries, observer);
        if (!entries.length) return;
        if (box === 'content') {
          contentRect.value = entries[0].contentRect;
        } else {
          contentRect.value = entries[0].target.getBoundingClientRect();
        }
      });
      onBeforeUnmount(() => {
        observer.disconnect();
      });
      watch(() => resizeRef.el, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          contentRect.value = undefined;
        }
        if (newValue) observer.observe(newValue);
      }, {
        flush: 'post'
      });
    }
    return {
      resizeRef,
      contentRect: readonly(contentRect)
    };
  }

  // Composables

  // Types

  const VuetifyLayoutKey = Symbol.for('vuetify:layout');
  const VuetifyLayoutItemKey = Symbol.for('vuetify:layout-item');
  const ROOT_ZINDEX = 1000;
  const makeLayoutProps = propsFactory({
    overlaps: {
      type: Array,
      default: () => []
    },
    fullHeight: Boolean
  }, 'layout');

  // Composables
  const makeLayoutItemProps = propsFactory({
    name: {
      type: String
    },
    order: {
      type: [Number, String],
      default: 0
    },
    absolute: Boolean
  }, 'layout-item');
  function useLayout$1(vm) {
    const {
      inject,
      nextTick
    } = vm.reactivity;
    const layout = inject(VuetifyLayoutKey);
    if (!layout) throw new Error('[Vuetify] Could not find injected layout');
    const layoutIsReady = nextTick();
    return {
      layoutIsReady,
      getLayoutItem: layout.getLayoutItem,
      mainRect: layout.mainRect,
      mainStyles: layout.mainStyles
    };
  }
  function useLayoutItem(vm, options) {
    const {
      inject,
      provide,
      shallowRef,
      nextTick,
      computed,
      onBeforeUnmount,
      onDeactivated,
      onActivated
    } = vm.reactivity;
    const layout = inject(VuetifyLayoutKey);
    if (!layout) throw new Error('[Vuetify] Could not find injected layout');
    const id = options.id ?? `layout-item-${getUid(vm)}`;
    provide(VuetifyLayoutItemKey, {
      id
    });
    const isKeptAlive = shallowRef(false);

    // NOTE: KeepAlive not applicable for Alpinui
    onDeactivated(() => isKeptAlive.value = true);
    onActivated(() => isKeptAlive.value = false);
    const layoutIsReady = nextTick();
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = layout.register(vm, {
      ...options,
      active: computed(() => isKeptAlive.value ? false : options.active.value),
      id
    });
    onBeforeUnmount(() => layout.unregister(id));
    return {
      layoutItemStyles,
      layoutRect: layout.layoutRect,
      layoutItemScrimStyles,
      layoutIsReady
    };
  }
  const generateLayers = (layout, positions, layoutSizes, activeItems) => {
    let previousLayer = {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };
    const layers = [{
      id: '',
      layer: {
        ...previousLayer
      }
    }];
    for (const id of layout) {
      const position = positions.get(id);
      const amount = layoutSizes.get(id);
      const active = activeItems.get(id);
      if (!position || !amount || !active) continue;
      const layer = {
        ...previousLayer,
        [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0)
      };
      layers.push({
        id,
        layer
      });
      previousLayer = layer;
    }
    return layers;
  };
  function createLayout(vm, props) {
    const {
      computed,
      reactive,
      ref,
      inject,
      nextTick,
      provide
    } = vm.reactivity;
    const parentLayout = inject(VuetifyLayoutKey, null);
    const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX);
    const registered = ref([]);
    const positions = reactive(new Map());
    const layoutSizes = reactive(new Map());
    const priorities = reactive(new Map());
    const activeItems = reactive(new Map());
    const disabledTransitions = reactive(new Map());
    const {
      resizeRef,
      contentRect: layoutRect
    } = useResizeObserver(vm);
    const layers = eagerComputed(vm, () => {
      const uniquePriorities = [...new Set([...priorities.values()].map(p => p.value))].sort((a, b) => a - b);
      const layout = [];
      for (const p of uniquePriorities) {
        const items = registered.value.filter(id => priorities.get(id)?.value === p);
        layout.push(...items);
      }
      return generateLayers(layout, positions, layoutSizes, activeItems);
    });
    const transitionsEnabled = computed(() => {
      return !Array.from(disabledTransitions.values()).some(ref => ref.value);
    });
    const mainRect = computed(() => {
      return layers.value[layers.value.length - 1].layer;
    });
    const mainStyles = computed(() => {
      return {
        '--v-layout-left': convertToUnit(mainRect.value.left),
        '--v-layout-right': convertToUnit(mainRect.value.right),
        '--v-layout-top': convertToUnit(mainRect.value.top),
        '--v-layout-bottom': convertToUnit(mainRect.value.bottom),
        ...(transitionsEnabled.value ? undefined : {
          transition: 'none'
        })
      };
    });
    const items = eagerComputed(vm, () => {
      return layers.value.slice(1).map((_ref, index) => {
        let {
          id
        } = _ref;
        const {
          layer
        } = layers.value[index];
        const size = layoutSizes.get(id);
        const position = positions.get(id);
        return {
          id,
          ...layer,
          size: Number(size.value),
          position: position.value
        };
      });
    });
    const getLayoutItem = id => {
      return items.value.find(item => item.id === id);
    };
    const layoutIsReady = nextTick();
    const rootVm = vm;
    provide(VuetifyLayoutKey, {
      register: (vm, _ref2) => {
        let {
          id,
          order,
          position,
          layoutSize,
          elementSize,
          active,
          disableTransitions,
          absolute
        } = _ref2;
        priorities.set(id, order);
        positions.set(id, position);
        layoutSizes.set(id, layoutSize);
        activeItems.set(id, active);
        disableTransitions && disabledTransitions.set(id, disableTransitions);
        const instanceIndex = findIndexOfChildrenWithProvide(rootVm, vm, VuetifyLayoutItemKey);
        if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id);else registered.value.push(id);
        const index = computed(() => items.value.findIndex(i => i.id === id));
        const zIndex = computed(() => rootZIndex.value + layers.value.length * 2 - index.value * 2);
        const layoutItemStyles = computed(() => {
          const isHorizontal = position.value === 'left' || position.value === 'right';
          const isOppositeHorizontal = position.value === 'right';
          const isOppositeVertical = position.value === 'bottom';
          const size = elementSize.value ?? layoutSize.value;
          const unit = size === 0 ? '%' : 'px';
          const styles = {
            [position.value]: 0,
            zIndex: zIndex.value,
            transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -(size === 0 ? 100 : size)) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}${unit})`,
            position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
            ...(transitionsEnabled.value ? undefined : {
              transition: 'none'
            })
          };
          if (index.value < 0) throw new Error(`Layout item "${id}" is missing`);
          const item = items.value[index.value];
          if (!item) throw new Error(`[Vuetify] Could not find layout item "${id}"`);
          return {
            ...styles,
            height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : undefined,
            left: isOppositeHorizontal ? undefined : `${item.left}px`,
            right: isOppositeHorizontal ? `${item.right}px` : undefined,
            top: position.value !== 'bottom' ? `${item.top}px` : undefined,
            bottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
            width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : undefined
          };
        });
        const layoutItemScrimStyles = computed(() => ({
          zIndex: zIndex.value - 1
        }));
        return {
          layoutItemStyles,
          layoutItemScrimStyles,
          zIndex
        };
      },
      unregister: id => {
        priorities.delete(id);
        positions.delete(id);
        layoutSizes.delete(id);
        activeItems.delete(id);
        disabledTransitions.delete(id);
        registered.value = registered.value.filter(v => v !== id);
      },
      mainRect,
      mainStyles,
      getLayoutItem,
      items,
      layoutRect,
      rootZIndex,
      layoutIsReady
    });
    const layoutClasses = computed(() => ({
      'v-layout': true,
      'v-layout--full-height': !!props.fullHeight
    }));
    const layoutStyles = computed(() => ({
      zIndex: parentLayout ? rootZIndex.value : undefined,
      position: parentLayout ? 'relative' : undefined,
      overflow: parentLayout ? 'hidden' : undefined
    }));
    return {
      layoutClasses,
      layoutStyles,
      getLayoutItem,
      items,
      layoutRect,
      layoutIsReady,
      layoutRef: resizeRef
    };
  }

  // Styles

  // Types

  const makeVAppProps = propsFactory({
    ...makeComponentProps(),
    ...makeLayoutProps({
      fullHeight: true
    }),
    ...makeThemeProps()
  }, 'VApp');
  const _App = defineComponent({
    name: 'VApp',
    props: makeVAppProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const theme = provideTheme(vm, props);
      const {
        layoutClasses,
        getLayoutItem,
        items,
        layoutRef
      } = createLayout(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);
      const {
        classes,
        styles
      } = useComponent(vm, props);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass([{
        'v-application': true
      }, theme.themeClasses.value, layoutClasses.value, rtlClasses.value, classes.value]));
      return {
        expose: {
          getLayoutItem,
          items,
          theme
        },
        renderInput: {
          layoutRef,
          rootClasses,
          styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AApp = defineAlpineComponent({
    ..._App,
    name: 'AApp'
  });

  // Utilities

  // Types

  // Types

  // Composables
  const makeBorderProps = propsFactory({
    border: [Boolean, Number, String]
  }, 'border');
  function useBorder(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed,
      isRef
    } = vm.reactivity;
    const borderClasses = computed(() => {
      const border = isRef(props) ? props.value : props.border;
      const classes = {};
      if (border === true || border === '') {
        classes[`${name}--border`] = true;
      } else if (typeof border === 'string' || border === 0) {
        for (const value of String(border).split(' ')) {
          classes[`border-${value}`] = true;
        }
      }
      return classes;
    });
    return {
      borderClasses
    };
  }

  // Utilities

  // Types

  // Composables
  function useColor(vm, colors) {
    return destructComputed(vm, () => {
      const classes = [];
      const styles = {};
      if (colors.value.background) {
        if (isCssColor(colors.value.background)) {
          styles.backgroundColor = colors.value.background;
          if (!colors.value.text && isParsableColor(colors.value.background)) {
            const backgroundColor = parseColor(colors.value.background);
            if (backgroundColor.a == null || backgroundColor.a === 1) {
              const textColor = getForeground(backgroundColor);
              styles.color = textColor;
              styles.caretColor = textColor;
            }
          }
        } else {
          classes.push(`bg-${colors.value.background}`);
        }
      }
      if (colors.value.text) {
        if (isCssColor(colors.value.text)) {
          styles.color = colors.value.text;
          styles.caretColor = colors.value.text;
        } else {
          classes.push(`text-${colors.value.text}`);
        }
      }
      return {
        colorClasses: classes,
        colorStyles: styles
      };
    });
  }
  function useTextColor(vm, props, name) {
    const {
      computed,
      isRef
    } = vm.reactivity;
    const colors = computed(() => ({
      text: isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: textColorClasses,
      colorStyles: textColorStyles
    } = useColor(vm, colors);
    return {
      textColorClasses,
      textColorStyles
    };
  }
  function useBackgroundColor(vm, props, name) {
    const {
      computed,
      isRef
    } = vm.reactivity;
    const colors = computed(() => ({
      background: isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: backgroundColorClasses,
      colorStyles: backgroundColorStyles
    } = useColor(vm, colors);
    return {
      backgroundColorClasses,
      backgroundColorStyles
    };
  }

  // Utilities

  // Types

  // Composables
  const makeElevationProps = propsFactory({
    elevation: {
      type: [Number, String],
      validator(v) {
        const value = parseInt(v);
        return !isNaN(value) && value >= 0 &&
        // Material Design has a maximum elevation of 24
        // https://material.io/design/environment/elevation.html#default-elevations
        value <= 24;
      }
    }
  }, 'elevation');
  function useElevation(vm, props) {
    const {
      computed,
      isRef
    } = vm.reactivity;
    const elevationClasses = computed(() => {
      const elevation = isRef(props) ? props.value : props.elevation;
      const classes = {};
      if (elevation == null) return classes;
      classes[`elevation-${elevation}`] = true;
      return classes;
    });
    return {
      elevationClasses
    };
  }

  // Utilities

  // Types

  // Composables
  const makeRoundedProps = propsFactory({
    rounded: {
      type: [Boolean, Number, String],
      default: undefined
    },
    tile: Boolean
  }, 'rounded');
  function useRounded(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed,
      isRef
    } = vm.reactivity;
    const roundedClasses = computed(() => {
      const rounded = isRef(props) ? props.value : props.rounded;
      const tile = isRef(props) ? props.value : props.tile;
      const classes = {};
      if (rounded === true || rounded === '') {
        classes[`${name}--rounded`] = true;
      } else if (typeof rounded === 'string' || rounded === 0) {
        for (const value of String(rounded).split(' ')) {
          classes[`rounded-${value}`] = true;
        }
      } else if (tile || rounded === false) {
        classes['rounded-0'] = true;
      }
      return classes;
    });
    return {
      roundedClasses
    };
  }

  // Utilities

  // Types

  // Composables
  const makeTagProps = propsFactory({
    tag: {
      type: String,
      default: 'div'
    }
  }, 'tag');

  // Styles

  // Types

  const allowedDensities$1 = [null, 'prominent', 'default', 'comfortable', 'compact'];
  const makeVToolbarProps = propsFactory({
    absolute: Boolean,
    collapse: Boolean,
    color: String,
    density: {
      type: String,
      default: 'default',
      validator: v => allowedDensities$1.includes(v)
    },
    extended: Boolean,
    extensionHeight: {
      type: [Number, String],
      default: 48
    },
    flat: Boolean,
    floating: Boolean,
    height: {
      type: [Number, String],
      default: 64
    },
    image: String,
    title: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'header'
    }),
    ...makeThemeProps()
  }, 'VToolbar');
  const _Toolbar = defineComponent({
    name: 'VToolbar',
    props: makeVToolbarProps(),
    slots: makeSlots({
      default: null,
      image: null,
      prepend: null,
      append: null,
      title: null,
      extension: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        shallowRef,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);

      // NOTE(Alpinui): In AlpineJS, we don't check for slot content, but only
      // if slot was provided
      const extensionSlot = vm.type === 'vue' ? vm.instance().slots.extension?.() : vm.hasSlots.extension;
      const isExtended = shallowRef(!!(props.extended || extensionSlot));
      const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === 'prominent' ? Number(props.height) : 0) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0), 10));
      const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === 'prominent' ? Number(props.extensionHeight) : 0) - (props.density === 'comfortable' ? 4 : 0) - (props.density === 'compact' ? 8 : 0), 10) : 0);
      provideDefaults(vm, {
        VBtn: {
          variant: 'text'
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-toolbar', {
        'v-toolbar--absolute': props.absolute,
        'v-toolbar--collapse': props.collapse,
        'v-toolbar--flat': props.flat,
        'v-toolbar--floating': props.floating,
        [`v-toolbar--density-${props.density}`]: true
      }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, styles.value]));
      const contentStyles = computed(() => normalizeStyle([{
        height: convertToUnit(contentHeight.value)
      }]));
      const extensionStyles = computed(() => normalizeStyle([{
        height: convertToUnit(extensionHeight.value)
      }]));
      const extensionDefaults = computed(() => ({
        VTabs: {
          height: convertToUnit(extensionHeight.value)
        }
      }));
      const imageDefaults = computed(() => ({
        VImg: {
          cover: true,
          src: props.image
        }
      }));
      const defaults = computed(() => ({
        VTabs: {
          height: convertToUnit(contentHeight.value)
        }
      }));
      return {
        expose: {
          contentHeight,
          extensionHeight
        },
        renderInput: {
          isExtended,
          defaults,
          imageDefaults,
          extensionDefaults,
          extensionStyles,
          contentStyles,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities

  // Types

  // Composables
  const makeScrollProps = propsFactory({
    scrollTarget: {
      type: String
    },
    scrollThreshold: {
      type: [String, Number],
      default: 300
    }
  }, 'scroll');
  function useScroll(vm, props) {
    let args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      computed,
      onBeforeUnmount,
      onMounted,
      ref,
      shallowRef,
      watch
    } = vm.reactivity;
    const {
      canScroll
    } = args;
    let previousScroll = 0;
    let previousScrollHeight = 0;
    const target = ref(null);
    const currentScroll = shallowRef(0);
    const savedScroll = shallowRef(0);
    const currentThreshold = shallowRef(0);
    const isScrollActive = shallowRef(false);
    const isScrollingUp = shallowRef(false);
    const scrollThreshold = computed(() => {
      return Number(props.scrollThreshold);
    });

    /**
     * 1: at top
     * 0: at threshold
     */
    const scrollRatio = computed(() => {
      return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
    });
    const onScroll = () => {
      const targetEl = target.value;
      if (!targetEl || canScroll && !canScroll.value) return;
      previousScroll = currentScroll.value;
      currentScroll.value = 'window' in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
      const currentScrollHeight = targetEl instanceof Window ? document.documentElement.scrollHeight
      // @ts-expect-error
      : targetEl.scrollHeight;
      if (previousScrollHeight !== currentScrollHeight) {
        previousScrollHeight = currentScrollHeight;
        return;
      }
      isScrollingUp.value = currentScroll.value < previousScroll;
      currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
    };
    watch(isScrollingUp, () => {
      savedScroll.value = savedScroll.value || currentScroll.value;
    });
    watch(isScrollActive, () => {
      savedScroll.value = 0;
    });
    onMounted(() => {
      watch(() => props.scrollTarget, scrollTarget => {
        const newTarget = scrollTarget ? document.querySelector(scrollTarget) : window;
        if (!newTarget) {
          consoleWarn(`Unable to locate element with identifier ${scrollTarget}`);
          return;
        }
        if (newTarget === target.value) return;
        target.value?.removeEventListener('scroll', onScroll);
        target.value = newTarget;
        target.value.addEventListener('scroll', onScroll, {
          passive: true
        });
      }, {
        immediate: true
      });
    });
    onBeforeUnmount(() => {
      target.value?.removeEventListener('scroll', onScroll);
    });

    // Do we need this? If yes - seems that
    // there's no need to expose onScroll
    canScroll && watch(canScroll, onScroll, {
      immediate: true
    });
    return {
      scrollThreshold,
      currentScroll,
      currentThreshold,
      isScrollActive,
      scrollRatio,
      // required only for testing
      // probably can be removed
      // later (2 chars chlng)
      isScrollingUp,
      savedScroll
    };
  }

  // Types

  const useSsrBoot = vm => {
    const {
      computed,
      readonly,
      shallowRef,
      onMounted
    } = vm.reactivity;
    const isBooted = shallowRef(false);
    onMounted(() => {
      window.requestAnimationFrame(() => {
        isBooted.value = true;
      });
    });
    const ssrBootStyles = computed(() => !isBooted.value ? {
      transition: 'none !important'
    } : {});
    return {
      ssrBootStyles,
      isBooted: readonly(isBooted)
    };
  };

  // Styles

  // Types

  const makeVAppBarProps = propsFactory({
    scrollBehavior: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    location: {
      type: String,
      default: 'top',
      validator: value => ['top', 'bottom'].includes(value)
    },
    ...makeComponentProps(),
    ...makeVToolbarProps(),
    ...makeLayoutItemProps(),
    ...makeScrollProps(),
    height: {
      type: [Number, String],
      default: 64
    }
  }, 'VAppBar');
  const _AppBar = defineComponent({
    name: 'VAppBar',
    props: makeVAppBarProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      image: null,
      prepend: null,
      append: null,
      title: null,
      extension: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        shallowRef,
        toRef,
        watchEffect
      } = vm.reactivity;
      const vToolbarRef = ref();
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const scrollBehavior = computed(() => {
        const behavior = new Set(props.scrollBehavior?.split(' ') ?? []);
        return {
          hide: behavior.has('hide'),
          fullyHide: behavior.has('fully-hide'),
          inverted: behavior.has('inverted'),
          collapse: behavior.has('collapse'),
          elevate: behavior.has('elevate'),
          fadeImage: behavior.has('fade-image')
          // shrink: behavior.has('shrink'),
        };
      });
      const canScroll = computed(() => {
        const behavior = scrollBehavior.value;
        return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage ||
        // behavior.shrink ||
        !isActive.value;
      });
      const {
        currentScroll,
        scrollThreshold,
        isScrollingUp,
        scrollRatio
      } = useScroll(vm, props, {
        canScroll
      });
      const canHide = computed(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
      const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
      const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
      const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : undefined);
      const height = computed(() => {
        const height = Number(vToolbarRef.value?.contentHeight ?? props.height);
        const extensionHeight = Number(vToolbarRef.value?.extensionHeight ?? 0);
        if (!canHide.value) return height + extensionHeight;
        return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height + extensionHeight : height;
      });

      // NOTE(Alpinui): Refactored from useToggleScope
      watchEffect(() => {
        // Touch
        /* eslint-disable no-unused-expressions */
        canHide.value;
        currentScroll.value;
        isActive.value;
        isScrollingUp.value;
        scrollBehavior.value;
        scrollThreshold.value;
        /* eslint-enable no-unused-expressions */

        if (!props.scrollBehavior) return;
        if (canHide.value) {
          if (scrollBehavior.value.inverted) {
            isActive.value = currentScroll.value > scrollThreshold.value;
          } else {
            isActive.value = isScrollingUp.value || currentScroll.value < scrollThreshold.value;
          }
        } else {
          isActive.value = true;
        }
      });
      const {
        ssrBootStyles
      } = useSsrBoot(vm);
      const {
        layoutItemStyles,
        layoutIsReady
      } = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(props, 'location'),
        layoutSize: height,
        elementSize: shallowRef(undefined),
        active: isActive,
        absolute: toRef(props, 'absolute')
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const toolbarClasses = computed(() => normalizeClass([{
        'v-app-bar': true,
        'v-app-bar--bottom': props.location === 'bottom'
      }, classes.value]));
      const toolbarStyles = computed(() => normalizeStyle([layoutItemStyles.value, {
        '--v-toolbar-image-opacity': opacity.value,
        height: undefined
      }, ssrBootStyles.value, styles.value]));
      const toolbarProps = computed(() => _Toolbar.filterProps(props));
      return {
        expose: layoutIsReady,
        renderInput: {
          isCollapsed,
          isFlat,
          toolbarClasses,
          toolbarStyles,
          vToolbarRef,
          toolbarProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AAppBar = defineAlpineComponent({
    ..._AppBar,
    name: 'AAppBar'
  });

  // Utilities

  // Types

  const allowedDensities = [null, 'default', 'comfortable', 'compact'];

  // typeof allowedDensities[number] evalutes to any
  // when generating api types for whatever reason.

  // Composables
  const makeDensityProps = propsFactory({
    density: {
      type: String,
      default: 'default',
      validator: v => allowedDensities.includes(v)
    }
  }, 'density');
  function useDensity(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed
    } = vm.reactivity;
    const densityClasses = computed(() => ({
      [`${name}--density-${props.density}`]: true
    }));
    return {
      densityClasses
    };
  }

  // Composables

  // Types

  const allowedVariants$2 = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'];
  const makeVariantProps = propsFactory({
    color: String,
    variant: {
      type: String,
      default: 'elevated',
      validator: v => allowedVariants$2.includes(v)
    }
  }, 'variant');
  function useVariant(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed,
      unref
    } = vm.reactivity;
    const variantClasses = computed(() => {
      const {
        variant
      } = unref(props);
      return {
        [`${name}--variant-${variant}`]: true
      };
    });
    const {
      colorClasses,
      colorStyles
    } = useColor(vm, computed(() => {
      const {
        variant,
        color
      } = unref(props);
      return {
        [['elevated', 'flat'].includes(variant) ? 'background' : 'text']: color
      };
    }));
    return {
      colorClasses,
      colorStyles,
      variantClasses
    };
  }

  // Styles

  // Types

  const makeVBtnGroupProps = propsFactory({
    baseColor: String,
    divided: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  }, 'VBtnGroup');
  const _BtnGroup = defineComponent({
    name: 'VBtnGroup',
    props: makeVBtnGroupProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      provideDefaults(vm, {
        VBtn: {
          height: 'auto',
          baseColor: toRef(props, 'baseColor'),
          color: toRef(props, 'color'),
          density: toRef(props, 'density'),
          flat: true,
          variant: toRef(props, 'variant')
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-btn-group', {
        'v-btn-group--divided': props.divided
      }, themeClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Composables

  // Types

  const makeGroupProps = propsFactory({
    modelValue: {
      type: null,
      default: undefined
    },
    multiple: Boolean,
    mandatory: [Boolean, String],
    max: Number,
    selectedClass: String,
    disabled: Boolean
  }, 'group');
  const makeGroupItemProps = propsFactory({
    value: null,
    disabled: Boolean,
    selectedClass: String
  }, 'group-item');

  // Composables

  function useGroupItem(vm, props, injectKey) {
    let required = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (!vm) {
      throw new Error('[Vuetify] useGroupItem composable must be used inside a component setup function');
    }
    const {
      computed,
      inject,
      onBeforeUnmount,
      provide,
      toRef,
      watch
    } = vm.reactivity;
    const id = getUid(vm);
    provide(Symbol.for(`${injectKey.description}:id`), id);
    const group = inject(injectKey, null);
    if (!group) {
      if (!required) return group;
      throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`);
    }
    const value = toRef(props, 'value');
    const disabled = computed(() => !!(group.disabled.value || props.disabled));
    group.register({
      id,
      value,
      disabled
    }, vm);
    onBeforeUnmount(() => {
      group.unregister(id);
    });
    const isSelected = computed(() => {
      return group.isSelected(id);
    });
    const isFirst = computed(() => {
      return group.items.value[0].id === id;
    });
    const isLast = computed(() => {
      return group.items.value[group.items.value.length - 1].id === id;
    });
    const selectedClass = computed(() => {
      if (!isSelected.value) return undefined;
      return normalizeClass([group.selectedClass.value, props.selectedClass]);
    });
    watch(isSelected, value => {
      vm.emit('group:selected', {
        value
      });
    }, {
      flush: 'sync'
    });
    return {
      id,
      isSelected,
      isFirst,
      isLast,
      toggle: () => group.select(id, !isSelected.value),
      select: value => group.select(id, value),
      selectedClass,
      value,
      disabled,
      group
    };
  }
  function useGroup(groupVm, props, injectKey) {
    const {
      reactive,
      unref,
      onBeforeUnmount,
      onMounted,
      onUpdated,
      toRef,
      computed,
      provide
    } = groupVm.reactivity;
    let isUnmounted = false;
    const items = reactive([]);
    const selected = useProxiedModel(groupVm, props, 'modelValue', [], v => {
      if (v == null) return [];
      return getIds(items, wrapInArray(v));
    }, v => {
      const arr = getValues(items, v);
      return props.multiple ? arr : arr[0];
    });
    function register(item, vm) {
      // Is there a better way to fix this typing?
      const unwrapped = item;
      const key = Symbol.for(`${injectKey.description}:id`);
      const index = findIndexOfChildrenWithProvide(groupVm, vm, key);
      if (unref(unwrapped.value) == null) {
        unwrapped.value = index;
        unwrapped.useIndexAsValue = true;
      }
      if (index > -1) {
        items.splice(index, 0, unwrapped);
      } else {
        items.push(unwrapped);
      }
    }
    function unregister(id) {
      if (isUnmounted) return;

      // TODO(Vuetify): re-evaluate this line's importance in the future
      // should we only modify the model if mandatory is set.
      // selected.value = selected.value.filter(v => v !== id)

      forceMandatoryValue();
      const index = items.findIndex(item => item.id === id);
      items.splice(index, 1);
    }

    // If mandatory and nothing is selected, then select first non-disabled item
    function forceMandatoryValue() {
      const item = items.find(item => !item.disabled);
      if (item && props.mandatory === 'force' && !selected.value.length) {
        selected.value = [item.id];
      }
    }
    onMounted(() => {
      forceMandatoryValue();
    });
    onBeforeUnmount(() => {
      isUnmounted = true;
    });
    onUpdated(() => {
      // #19655 update the items that use the index as the value.
      for (let i = 0; i < items.length; i++) {
        if (items[i].useIndexAsValue) {
          items[i].value = i;
        }
      }
    });
    function select(id, value) {
      const item = items.find(item => item.id === id);
      if (value && item?.disabled) return;
      if (props.multiple) {
        const internalValue = selected.value.slice();
        const index = internalValue.findIndex(v => v === id);
        const isSelected = ~index;
        value = value ?? !isSelected;

        // We can't remove value if group is mandatory,
        // value already exists, and it is the only value
        if (isSelected && props.mandatory && internalValue.length <= 1) return;

        // We can't add value if it would cause max limit
        // to be exceeded
        if (!isSelected && props.max != null && internalValue.length + 1 > props.max) return;
        if (index < 0 && value) internalValue.push(id);else if (index >= 0 && !value) internalValue.splice(index, 1);
        selected.value = internalValue;
      } else {
        const isSelected = selected.value.includes(id);
        if (props.mandatory && isSelected) return;
        selected.value = value ?? !isSelected ? [id] : [];
      }
    }
    function step(offset) {
      // getting an offset from selected value obviously won't work with multiple values
      if (props.multiple) consoleWarn('This method is not supported when using "multiple" prop');
      if (!selected.value.length) {
        const item = items.find(item => !item.disabled);
        item && (selected.value = [item.id]);
      } else {
        const currentId = selected.value[0];
        const currentIndex = items.findIndex(i => i.id === currentId);
        let newIndex = (currentIndex + offset) % items.length;
        let newItem = items[newIndex];
        while (newItem.disabled && newIndex !== currentIndex) {
          newIndex = (newIndex + offset) % items.length;
          newItem = items[newIndex];
        }
        if (newItem.disabled) return;
        selected.value = [items[newIndex].id];
      }
    }
    const state = {
      register,
      unregister,
      selected,
      select,
      disabled: toRef(props, 'disabled'),
      prev: () => step(items.length - 1),
      next: () => step(1),
      isSelected: id => selected.value.includes(id),
      selectedClass: computed(() => props.selectedClass),
      items: computed(() => items),
      getItemIndex: value => getItemIndex(items, value)
    };
    provide(injectKey, state);
    return state;
  }
  function getItemIndex(items, value) {
    const ids = getIds(items, [value]);
    if (!ids.length) return -1;
    return items.findIndex(item => item.id === ids[0]);
  }
  function getIds(items, modelValue) {
    const ids = [];
    modelValue.forEach(value => {
      const item = items.find(item => deepEqual(value, item.value));
      const itemByIndex = items[value];
      if (item?.value != null) {
        ids.push(item.id);
      } else if (itemByIndex != null) {
        ids.push(itemByIndex.id);
      }
    });
    return ids;
  }
  function getValues(items, ids) {
    const values = [];
    ids.forEach(id => {
      const itemIndex = items.findIndex(item => item.id === id);
      if (~itemIndex) {
        const item = items[itemIndex];
        values.push(item.value != null ? item.value : itemIndex);
      }
    });
    return values;
  }

  // Styles

  // Types

  const VBtnToggleSymbol = Symbol.for('vuetify:v-btn-toggle');
  const makeVBtnToggleProps = propsFactory({
    ...makeVBtnGroupProps(),
    ...makeGroupProps()
  }, 'VBtnToggle');
  const _BtnToggle = defineComponent({
    name: 'VBtnToggle',
    props: makeVBtnToggleProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isSelected,
        next,
        prev,
        select,
        selected
      } = useGroup(vm, props, VBtnToggleSymbol);
      const btnGroupProps = computed(() => _BtnGroup.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-btn-toggle', classes.value]));
      return {
        expose: {
          next,
          prev,
          select
        },
        renderInput: {
          btnGroupProps,
          rootClasses,
          rootStyles: styles,
          isSelected,
          next,
          prev,
          select,
          selected
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities

  // Types

  // Types

  // Composables
  const makeDimensionProps = propsFactory({
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String]
  }, 'dimension');
  function useDimension(vm, props) {
    const {
      computed
    } = vm.reactivity;
    const dimensionStyles = computed(() => {
      const styles = {};
      const height = convertToUnit(props.height);
      const maxHeight = convertToUnit(props.maxHeight);
      const maxWidth = convertToUnit(props.maxWidth);
      const minHeight = convertToUnit(props.minHeight);
      const minWidth = convertToUnit(props.minWidth);
      const width = convertToUnit(props.width);
      if (height != null) styles.height = height;
      if (maxHeight != null) styles.maxHeight = maxHeight;
      if (maxWidth != null) styles.maxWidth = maxWidth;
      if (minHeight != null) styles.minHeight = minHeight;
      if (minWidth != null) styles.minWidth = minWidth;
      if (width != null) styles.width = width;
      return styles;
    });
    return {
      dimensionStyles
    };
  }

  // Utilities

  // Types

  // Composables
  const makeLoaderProps = propsFactory({
    loading: [Boolean, String]
  }, 'loader');
  function useLoader(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed
    } = vm.reactivity;
    const loaderClasses = computed(() => ({
      [`${name}--loading`]: !!props.loading
    }));
    return {
      loaderClasses
    };
  }

  // Utilities
  const block = ['top', 'bottom'];
  const inline = ['start', 'end', 'left', 'right'];
  /** Parse a raw anchor string into an object */
  function parseAnchor(anchor, isRtl) {
    let [side, align] = anchor.split(' ');
    if (!align) {
      align = includes(block, side) ? 'start' : includes(inline, side) ? 'top' : 'center';
    }
    return {
      side: toPhysical(side, isRtl),
      align: toPhysical(align, isRtl)
    };
  }
  function toPhysical(str, isRtl) {
    if (str === 'start') return isRtl ? 'right' : 'left';
    if (str === 'end') return isRtl ? 'left' : 'right';
    return str;
  }
  function flipSide(anchor) {
    return {
      side: {
        center: 'center',
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }[anchor.side],
      align: anchor.align
    };
  }
  function flipAlign(anchor) {
    return {
      side: anchor.side,
      align: {
        center: 'center',
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      }[anchor.align]
    };
  }
  function flipCorner(anchor) {
    return {
      side: anchor.align,
      align: anchor.side
    };
  }
  function getAxis(anchor) {
    return includes(block, anchor.side) ? 'y' : 'x';
  }

  // Composables

  // Types

  const oppositeMap = {
    center: 'center',
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
  };
  const makeLocationProps = propsFactory({
    location: String
  }, 'location');
  function useLocation(vm, props) {
    let opposite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let offset = arguments.length > 3 ? arguments[3] : undefined;
    const {
      computed
    } = vm.reactivity;
    const {
      isRtl
    } = useRtl$1(vm);
    const locationStyles = computed(() => {
      if (!props.location) return {};
      const {
        side,
        align
      } = parseAnchor(props.location.split(' ').length > 1 ? props.location : `${props.location} center`, isRtl.value);
      function getOffset(side) {
        return offset ? offset(side) : 0;
      }
      const styles = {};
      if (side !== 'center') {
        if (opposite) styles[oppositeMap[side]] = `calc(100% - ${getOffset(side)}px)`;else styles[side] = 0;
      }
      if (align !== 'center') {
        if (opposite) styles[oppositeMap[align]] = `calc(100% - ${getOffset(align)}px)`;else styles[align] = 0;
      } else {
        if (side === 'center') styles.top = styles.left = '50%';else {
          styles[{
            top: 'left',
            bottom: 'left',
            left: 'top',
            right: 'top'
          }[side]] = '50%';
        }
        styles.transform = {
          top: 'translateX(-50%)',
          bottom: 'translateX(-50%)',
          left: 'translateY(-50%)',
          right: 'translateY(-50%)',
          center: 'translate(-50%, -50%)'
        }[side];
      }
      return styles;
    });
    return {
      locationStyles
    };
  }

  // Utilities

  // Types

  const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
  // Composables
  const makePositionProps = propsFactory({
    position: {
      type: String,
      validator: /* istanbul ignore next */v => positionValues.includes(v)
    }
  }, 'position');
  function usePosition(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed
    } = vm.reactivity;
    const positionClasses = computed(() => ({
      [`${name}--${props.position}`]: !!props.position
    }));
    return {
      positionClasses
    };
  }

  // NOTE: Refactored out from composables/router.tsx

  function useLink(vm, props, attrs) {
    const {
      computed,
      toRef
    } = vm.reactivity;
    const isLink = computed(() => !!(props.href || props.to));
    const isClickable = computed(() => {
      return isLink?.value || alpineComposition.hasEvent(attrs, 'click') || alpineComposition.hasEvent(props, 'click');
    });
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href')
    };
  }

  // Utilities

  // Types

  function useRoute(vm) {
    const {
      computed
    } = vm.reactivity;
    return computed(() => {
      if (vm.type === 'vue') {
        return vm.instance().proxy?.$route;
      } else {
        // NOOP for AlpineJS
        return undefined;
      }
    });
  }
  function useRouter(vm) {
    if (vm.type === 'vue') {
      return vm.instance().proxy?.$router;
    } else {
      // NOOP for AlpineJS
      return undefined;
    }
  }
  function useRouterLink(vm, props, attrs) {
    const {
      computed,
      toRef
    } = vm.reactivity;
    const RouterLink = vm.resolveDynamicComponent('RouterLink');
    const {
      isLink,
      isClickable,
      href
    } = useLink(vm, props, attrs);
    if (RouterLink == null || typeof RouterLink === 'string' || !('useLink' in RouterLink)) {
      return {
        isLink,
        isClickable,
        href
      };
    }
    // vue-router useLink `to` prop needs to be reactive and useLink will crash if undefined
    const linkProps = computed(() => ({
      ...props,
      to: toRef(() => props.to || '')
    }));
    const routerLink = RouterLink.useLink(linkProps.value);
    // Actual link needs to be undefined when to prop is not used
    const link = computed(() => props.to ? routerLink : undefined);
    const route = useRoute(vm);
    return {
      isLink,
      isClickable,
      route: link.value?.route,
      navigate: link.value?.navigate,
      isActive: computed(() => {
        if (!link.value) return false;
        if (!props.exact) return link.value.isActive?.value ?? false;
        if (!route.value) return link.value.isExactActive?.value ?? false;
        return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query);
      }),
      href: computed(() => props.to ? link.value?.route.value.href : props.href)
    };
  }
  const makeRouterProps = propsFactory({
    href: String,
    replace: Boolean,
    to: [String, Object],
    exact: Boolean
  }, 'router');
  let inTransition = false;
  function useBackButton(vm, router, cb) {
    const {
      nextTick,
      onBeforeUnmount
    } = vm.reactivity;
    let popped = false;
    let removeBefore;
    let removeAfter;
    if (IN_BROWSER && router) {
      nextTick(() => {
        window.addEventListener('popstate', onPopstate);
        removeBefore = router?.beforeEach((to, from, next) => {
          if (!inTransition) {
            setTimeout(() => popped ? cb(next) : next());
          } else {
            popped ? cb(next) : next();
          }
          inTransition = true;
        });
        removeAfter = router?.afterEach(() => {
          inTransition = false;
        });
      });

      // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
      onBeforeUnmount(() => {
        window.removeEventListener('popstate', onPopstate);
        removeBefore?.();
        removeAfter?.();
      });
    }
    function onPopstate(e) {
      if (e.state?.replaced) return;
      popped = true;
      setTimeout(() => popped = false);
    }
  }

  // Types

  function useSelectLink(vm, link, select) {
    const {
      nextTick,
      watch
    } = vm.reactivity;
    watch(() => link.isActive?.value, isActive => {
      if (link.isLink.value && isActive && select) {
        nextTick(() => {
          select(true);
        });
      }
    }, {
      immediate: true
    });
  }

  // Utilities

  // Types

  // Types
  const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];
  // Composables
  const makeSizeProps = propsFactory({
    size: {
      type: [String, Number],
      default: 'default'
    }
  }, 'size');
  function useSize(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    return destructComputed(vm, () => {
      const sizeClasses = {};
      let sizeStyles = {};
      if (includes(predefinedSizes, props.size)) {
        sizeClasses[`${name}--size-${props.size}`] = true;
      } else if (props.size) {
        sizeStyles = {
          width: convertToUnit(props.size),
          height: convertToUnit(props.size)
        };
      }
      return {
        sizeClasses,
        sizeStyles
      };
    });
  }

  // Styles
  const makeVBtnProps = propsFactory({
    active: {
      type: Boolean,
      default: undefined
    },
    baseColor: String,
    symbol: {
      type: null,
      default: VBtnToggleSymbol
    },
    flat: Boolean,
    icon: [Boolean, String, Function, Object],
    prependIcon: IconValue,
    appendIcon: IconValue,
    block: Boolean,
    readonly: Boolean,
    slim: Boolean,
    stacked: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    text: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'button'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'elevated'
    })
  }, 'VBtn');
  const _Btn = defineComponent({
    name: 'VBtn',
    props: makeVBtnProps(),
    emits: {
      'group:selected': val => true
    },
    // TODO
    slots: {
      default: () => {},
      // prepend: () => {},
      append: () => {},
      loader: () => {}
    },
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        loaderClasses
      } = useLoader(vm, props);
      const {
        locationStyles
      } = useLocation(vm, props);
      const {
        positionClasses
      } = usePosition(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(vm, props);
      const group = useGroupItem(vm, props, props.symbol, false);
      const link = useRouterLink(vm, props, vm.attrs);
      const isActive = computed(() => {
        if (props.active !== undefined) {
          return props.active;
        }
        if (link.isLink.value) {
          return link.isActive?.value;
        }
        return group?.isSelected.value;
      });
      const variantProps = computed(() => {
        const showColor = group?.isSelected.value && (!link.isLink.value || link.isActive?.value) || !group || link.isActive?.value;
        return {
          color: showColor ? props.color ?? props.baseColor : props.baseColor,
          variant: props.variant
        };
      });
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, variantProps);
      const isDisabled = computed(() => group?.disabled.value || props.disabled);
      const isElevated = computed(() => {
        return props.variant === 'elevated' && !(props.disabled || props.flat || props.border);
      });
      const valueAttr = computed(() => {
        if (props.value === undefined || typeof props.value === 'symbol') return undefined;
        return Object(props.value) === props.value ? JSON.stringify(props.value, null, 0) : props.value;
      });
      function onClick(e) {
        if (isDisabled.value || link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || vm.attrs.target === '_blank')) return;
        link.navigate?.(e);
        group?.toggle();
      }
      useSelectLink(vm, link, group?.select);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-btn', group?.selectedClass.value, {
        'v-btn--active': !!isActive.value,
        'v-btn--block': props.block,
        'v-btn--disabled': isDisabled.value,
        'v-btn--elevated': isElevated.value,
        'v-btn--flat': props.flat,
        'v-btn--icon': !!props.icon,
        'v-btn--loading': !!props.loading,
        'v-btn--readonly': props.readonly,
        'v-btn--slim': props.slim,
        'v-btn--stacked': props.stacked
      }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, sizeStyles.value, styles.value]));
      const rootTabindex = computed(() => props.loading || props.readonly ? -1 : undefined);
      const prependDefaults = computed(() => ({
        VIcon: {
          icon: props.prependIcon
        }
      }));
      const contentDefaults = computed(() => ({
        VIcon: {
          icon: props.icon
        }
      }));
      const appendDefaults = computed(() => ({
        VIcon: {
          icon: props.appendIcon
        }
      }));
      const progressColor = computed(() => typeof props.loading === 'boolean' ? undefined : props.loading);
      return {
        expose: {
          group
        },
        renderInput: {
          appendDefaults,
          contentDefaults,
          isDisabled,
          link,
          onClick,
          prependDefaults,
          progressColor,
          rootClasses,
          rootStyles,
          rootTabindex,
          valueAttr
        }
      };
    },
    renderHeadless: () => null
  });

  // Components

  // Types

  const makeVAppBarNavIconProps = propsFactory({
    ...makeVBtnProps({
      icon: '$menu',
      variant: 'text'
    })
  }, 'VAppBarNavIcon');
  const _AppBarNavIcon = defineComponent({
    name: 'VAppBarNavIcon',
    props: makeVAppBarNavIconProps(),
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      loader: null
    }),
    setupHeadless(props) {
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AAppBarNavIcon = defineAlpineComponent({
    ..._AppBarNavIcon,
    name: 'AAppBarNavIcon'
  });

  // Composables
  const makeVToolbarTitleProps = propsFactory({
    text: String,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VToolbarTitle');
  const _ToolbarTitle = defineComponent({
    name: 'VToolbarTitle',
    props: makeVToolbarTitleProps(),
    slots: makeSlots({
      default: null,
      text: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-toolbar-title', classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Components

  // Types

  const makeVAppBarTitleProps = makeVToolbarTitleProps;
  const _AppBarTitle = defineComponent({
    name: 'VAppBarTitle',
    props: makeVAppBarTitleProps(),
    slots: makeSlots({
      default: null,
      text: null
    }),
    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AAppBarTitle = defineAlpineComponent({
    ..._AppBarTitle,
    name: 'AAppBarTitle'
  });

  // Styles
  const allowedTypes = ['success', 'info', 'warning', 'error'];
  const makeVAlertProps = propsFactory({
    border: {
      type: [Boolean, String],
      validator: val => {
        return typeof val === 'boolean' || ['top', 'end', 'bottom', 'start'].includes(val);
      }
    },
    borderColor: String,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: '$close'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    icon: {
      type: [Boolean, String, Function, Object],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    title: String,
    text: String,
    type: {
      type: String,
      validator: val => allowedTypes.includes(val)
    },
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'flat'
    })
  }, 'VAlert');
  const _Alert = defineComponent({
    name: 'VAlert',
    props: makeVAlertProps(),
    emits: {
      'click:close': e => true,
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      prepend: null,
      title: null,
      text: null,
      append: null,
      close: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const icon = computed(() => {
        if (props.icon === false) return undefined;
        if (!props.type) return props.icon;
        return props.icon ?? `$${props.type}`;
      });
      const variantProps = computed(() => ({
        color: props.color ?? props.type,
        variant: props.variant
      }));
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, variantProps);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        locationStyles
      } = useLocation(vm, props);
      const {
        positionClasses
      } = usePosition(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'borderColor'));
      const {
        t
      } = useLocale$1(vm);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const closeDefaults = computed(() => ({
        VBtn: {
          icon: props.closeIcon,
          size: 'x-small',
          variant: 'text'
        }
      }));
      const closeProps = computed(() => ({
        'aria-label': t(props.closeLabel),
        onClick(e) {
          isActive.value = false;
          vm.emit('click:close', e);
        }
      }));
      const rootClasses = computed(() => normalizeClass([{
        'v-alert': true,
        'v-alert--border': !!props.border,
        [`v-alert--border-${props.border === true ? 'start' : props.border}`]: !!props.border,
        'v-alert--prominent': props.prominent
      }, themeClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, styles.value]));
      const borderClasses = computed(() => normalizeClass([{
        'v-alert__border': true
      }, textColorClasses.value]));
      const iconSize = computed(() => props.prominent ? 44 : 28);
      const prependDefaults = computed(() => ({
        VIcon: {
          density: props.density,
          icon: icon.value,
          size: iconSize.value
        }
      }));
      return {
        expose: {},
        renderInput: {
          borderClasses,
          closeDefaults,
          closeProps,
          icon,
          iconSize,
          isActive,
          prependDefaults,
          rootClasses,
          rootStyles,
          textColorStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AAlert = defineAlpineComponent({
    ..._Alert,
    name: 'AAlert'
  });

  // Composables

  // Types

  function createSimpleFunctionalHeadless(klass) {
    let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    let name = arguments.length > 2 ? arguments[2] : undefined;
    return defineComponent({
      name: name ?? capitalize(camelize(klass.replace(/__/g, '-'))),
      props: {
        tag: {
          type: String,
          default: tag
        },
        ...makeComponentProps()
      },
      slots: {
        default: {}
      },
      setupHeadless: (props, vm) => {
        const {
          classes,
          styles
        } = useComponent(vm, props);
        return {
          expose: {},
          renderInput: {
            classes,
            styles
          }
        };
      },
      renderHeadless: () => null
    });
  }

  // Composables

  // Types

  const klass$7 = 'v-alert-title';
  const _AlertTitle = createSimpleFunctionalHeadless(klass$7);

  // Types

  const AAlertTitle = defineAlpineComponent({
    ..._AlertTitle,
    name: 'AAlertTitle'
  });

  // Utilities

  // Types

  const makeTransitionProps = propsFactory({
    transition: {
      type: [Boolean, String, Object],
      default: 'fade-transition',
      validator: val => val !== true
    },
    disabled: Boolean,
    group: Boolean
  }, 'transition');
  defineComponent({
    name: 'MaybeTransition',
    props: makeTransitionProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  function useScrolling(vm, listRef, textFieldRef) {
    const {
      shallowRef,
      watch
    } = vm.reactivity;
    const isScrolling = shallowRef(false);
    let scrollTimeout;
    function onListScroll(e) {
      cancelAnimationFrame(scrollTimeout);
      isScrolling.value = true;
      scrollTimeout = requestAnimationFrame(() => {
        scrollTimeout = requestAnimationFrame(() => {
          isScrolling.value = false;
        });
      });
    }
    async function finishScrolling() {
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => {
        if (isScrolling.value) {
          const stop = watch(isScrolling, () => {
            stop();
            resolve();
          });
        } else resolve();
      });
    }
    async function onListKeydown(e) {
      if (e.key === 'Tab') {
        textFieldRef.value?.focus();
      }
      if (!['PageDown', 'PageUp', 'Home', 'End'].includes(e.key)) return;
      const el = listRef.value?.$el;
      if (!el) return;
      if (e.key === 'Home' || e.key === 'End') {
        el.scrollTo({
          top: e.key === 'Home' ? 0 : el.scrollHeight,
          behavior: 'smooth'
        });
      }
      await finishScrolling();
      const children = el.querySelectorAll(':scope > :not(.v-virtual-scroll__spacer)');
      if (e.key === 'PageDown' || e.key === 'Home') {
        const top = el.getBoundingClientRect().top;
        for (const child of children) {
          if (child.getBoundingClientRect().top >= top) {
            child.focus();
            break;
          }
        }
      } else {
        const bottom = el.getBoundingClientRect().bottom;
        for (const child of [...children].reverse()) {
          if (child.getBoundingClientRect().bottom <= bottom) {
            child.focus();
            break;
          }
        }
      }
    }
    return {
      onListScroll,
      onListKeydown
    };
  }

  // Composables

  // Types

  const localeKeys = {
    prepend: 'prependAction',
    prependInner: 'prependAction',
    append: 'appendAction',
    appendInner: 'appendAction',
    clear: 'clear'
  };

  // NOTE(Alpinui): Refactored from JSX to composable that just returns the props
  function useInputIcon(vm, props) {
    const {
      t
    } = useLocale$1(vm);
    const getInputIconProps = name => {
      const localeKey = localeKeys[name];
      const listener = props[`onClick:${name}`];
      const label = listener && localeKey ? t(`$vuetify.input.${localeKey}`, props.label ?? '') : undefined;
      return {
        icon: props[`${name}Icon`],
        'aria-label': label,
        onClick: listener
      };
    };
    return {
      getInputIconProps
    };
  }

  // Composables

  // Types

  // Types

  // Composables
  const makeFocusProps = propsFactory({
    focused: Boolean,
    'onUpdate:focused': EventProp()
  }, 'focus');

  // TODO(Alpinui)
  // TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
  //        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
  // TODO
  function useFocus(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const {
      computed
    } = vm.reactivity;
    const isFocused = useProxiedModel(vm, props, 'focused');
    const focusClasses = computed(() => {
      return {
        [`${name}--focused`]: isFocused.value
      };
    });
    function focus() {
      isFocused.value = true;
    }
    function blur() {
      isFocused.value = false;
    }
    return {
      focusClasses,
      isFocused,
      focus,
      blur
    };
  }

  class Box {
    constructor(_ref) {
      let {
        x,
        y,
        width,
        height
      } = _ref;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
    get top() {
      return this.y;
    }
    get bottom() {
      return this.y + this.height;
    }
    get left() {
      return this.x;
    }
    get right() {
      return this.x + this.width;
    }
  }
  function getOverflow(a, b) {
    return {
      x: {
        before: Math.max(0, b.left - a.left),
        after: Math.max(0, a.right - b.right)
      },
      y: {
        before: Math.max(0, b.top - a.top),
        after: Math.max(0, a.bottom - b.bottom)
      }
    };
  }
  function getTargetBox(target) {
    if (Array.isArray(target)) {
      return new Box({
        x: target[0],
        y: target[1],
        width: 0,
        height: 0
      });
    } else {
      return target.getBoundingClientRect();
    }
  }

  // Utilities

  /** @see https://stackoverflow.com/a/57876601/2074736 */
  function nullifyTransforms(el) {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const tx = style.transform;
    if (tx) {
      let ta, sx, sy, dx, dy;
      if (tx.startsWith('matrix3d(')) {
        ta = tx.slice(9, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[5];
        dx = +ta[12];
        dy = +ta[13];
      } else if (tx.startsWith('matrix(')) {
        ta = tx.slice(7, -1).split(/, /);
        sx = +ta[0];
        sy = +ta[3];
        dx = +ta[4];
        dy = +ta[5];
      } else {
        return new Box(rect);
      }
      const to = style.transformOrigin;
      const x = rect.x - dx - (1 - sx) * parseFloat(to);
      const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
      const w = sx ? rect.width / sx : el.offsetWidth + 1;
      const h = sy ? rect.height / sy : el.offsetHeight + 1;
      return new Box({
        x,
        y,
        width: w,
        height: h
      });
    } else {
      return new Box(rect);
    }
  }
  function animate(el, keyframes, options) {
    if (typeof el.animate === 'undefined') return {
      finished: Promise.resolve()
    };
    let animation;
    try {
      animation = el.animate(keyframes, options);
    } catch (err) {
      return {
        finished: Promise.resolve()
      };
    }
    if (typeof animation.finished === 'undefined') {
      animation.finished = new Promise(resolve => {
        animation.onfinish = () => {
          resolve(animation);
        };
      });
    }
    return animation;
  }

  const standardEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';
   // Leaving

  // Styles

  // Types

  const allowedVariants$1 = ['underlined', 'outlined', 'filled', 'solo', 'solo-inverted', 'solo-filled', 'plain'];
  const makeVFieldProps = propsFactory({
    appendInnerIcon: IconValue,
    bgColor: String,
    clearable: Boolean,
    clearIcon: {
      type: IconValue,
      default: '$clear'
    },
    active: Boolean,
    centerAffix: Boolean,
    color: String,
    baseColor: String,
    dirty: Boolean,
    disabled: {
      type: Boolean,
      default: null
    },
    error: Boolean,
    flat: Boolean,
    label: String,
    persistentClear: Boolean,
    prependInnerIcon: IconValue,
    reverse: Boolean,
    singleLine: Boolean,
    variant: {
      type: String,
      default: 'filled',
      validator: v => allowedVariants$1.includes(v)
    },
    'onClick:clear': EventProp(),
    'onClick:appendInner': EventProp(),
    'onClick:prependInner': EventProp(),
    ...makeComponentProps(),
    ...makeLoaderProps(),
    ...makeRoundedProps(),
    ...makeThemeProps()
  }, 'VField');
  // export const VField = genericComponent<new <T>(
  //   props: {
  //     modelValue?: T;
  //     'onUpdate:modelValue'?: (value: T) => void;
  //   },
  //   slots: VFieldSlots
  // ) => GenericProps<typeof props, typeof slots>>()({
  const _Field = defineComponent({
    name: 'VField',
    inheritAttrs: false,
    props: {
      id: String,
      ...makeFocusProps(),
      ...makeVFieldProps()
    },
    emits: {
      'update:focused': focused => true,
      'update:modelValue': value => true
    },
    slots: makeSlots({
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null,
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        toRef,
        watch
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        loaderClasses
      } = useLoader(vm, props);
      const {
        focusClasses,
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const {
        getInputIconProps
      } = useInputIcon(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);
      const isSingleLine = computed(() => props.singleLine || props.centerAffix);
      const isActive = computed(() => props.dirty || props.active);
      const hasLabel = computed(() => !isSingleLine.value && !!(props.label || vm.hasSlots.label));
      const uid = getUid(vm);
      const id = computed(() => props.id || `input-${uid}`);
      const messagesId = computed(() => `${id.value}-messages`);
      const labelRef = ref();
      const floatingLabelRef = ref();
      const controlRef = ref();
      const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'bgColor'));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, computed(() => {
        return props.error || props.disabled ? undefined : isActive.value && isFocused.value ? props.color : props.baseColor;
      }));
      watch(isActive, val => {
        if (hasLabel.value) {
          const el = labelRef.value.$el;
          const targetEl = floatingLabelRef.value.$el;
          requestAnimationFrame(() => {
            const rect = nullifyTransforms(el);
            const targetRect = targetEl.getBoundingClientRect();
            const x = targetRect.x - rect.x;
            const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
            const targetWidth = targetRect.width / 0.75;
            const width = Math.abs(targetWidth - rect.width) > 1 ? {
              maxWidth: convertToUnit(targetWidth)
            } : undefined;
            const style = getComputedStyle(el);
            const targetStyle = getComputedStyle(targetEl);
            const duration = parseFloat(style.transitionDuration) * 1000 || 150;
            const scale = parseFloat(targetStyle.getPropertyValue('--v-field-label-scale'));
            const color = targetStyle.getPropertyValue('color');
            el.style.visibility = 'visible';
            targetEl.style.visibility = 'hidden';
            animate(el, {
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              color,
              ...width
            }, {
              duration,
              easing: standardEasing,
              direction: val ? 'normal' : 'reverse'
            }).finished.then(() => {
              el.style.removeProperty('visibility');
              targetEl.style.removeProperty('visibility');
            });
          });
        }
      }, {
        flush: 'post'
      });
      const slotProps = computed(() => ({
        isActive,
        isFocused,
        controlRef,
        blur,
        focus
      }));
      function onClick(e) {
        if (e.target !== document.activeElement) {
          e.preventDefault();
        }
      }
      function onKeydownClear(e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        e.stopPropagation();
        props['onClick:clear']?.(new MouseEvent('click'));
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const isOutlined = computed(() => props.variant === 'outlined');
      const hasPrepend = computed(() => !!(vm.hasSlots['prepend-inner'] || props.prependInnerIcon));
      const hasClear = computed(() => !!(props.clearable || vm.hasSlots.clear));
      const hasAppend = computed(() => !!(vm.hasSlots['append-inner'] || props.appendInnerIcon || hasClear.value));
      const rootClasses = computed(() => normalizeClass(['v-field', {
        'v-field--active': isActive.value,
        'v-field--appended': hasAppend.value,
        'v-field--center-affix': props.centerAffix,
        'v-field--disabled': props.disabled,
        'v-field--dirty': props.dirty,
        'v-field--error': props.error,
        'v-field--flat': props.flat,
        'v-field--has-background': !!props.bgColor,
        'v-field--persistent-clear': props.persistentClear,
        'v-field--prepended': hasPrepend.value,
        'v-field--reverse': props.reverse,
        'v-field--single-line': isSingleLine.value,
        [`v-field--variant-${props.variant}`]: true
      }, themeClasses.value, backgroundColorClasses.value, focusClasses.value, loaderClasses.value, roundedClasses.value, rtlClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, styles.value]));
      return {
        expose: {
          controlRef
        },
        renderInput: {
          floatingLabelRef,
          labelRef,
          hasLabel,
          isPlainOrUnderlined,
          isOutlined,
          hasAppend,
          hasClear,
          hasPrepend,
          id,
          messagesId,
          onClick,
          onKeydownClear,
          rootClasses,
          rootStyles,
          slotProps,
          textColorClasses,
          textColorStyles,
          getInputIconProps
        }
      };
    },
    renderHeadless: () => null
  });

  // TODO(Vuetify): this is kinda slow, might be better to implicitly inherit props instead
  function filterFieldProps(attrs) {
    const keys = Object.keys(_Field.props).filter(k => !isOn(k) && k !== 'class' && k !== 'style');
    return pick(attrs, keys);
  }

  // Composables

  // Types

  const FormKey = Symbol.for('vuetify:form');
  const makeFormProps = propsFactory({
    disabled: Boolean,
    fastFail: Boolean,
    readonly: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    validateOn: {
      type: String,
      default: 'input'
    }
  }, 'form');
  function createForm(vm, props) {
    const {
      computed,
      ref,
      shallowRef,
      watch,
      provide,
      toRef,
      toRaw
    } = vm.reactivity;
    const model = useProxiedModel(vm, props, 'modelValue');
    const isDisabled = computed(() => props.disabled);
    const isReadonly = computed(() => props.readonly);
    const isValidating = shallowRef(false);
    const items = ref([]);
    const errors = ref([]);
    async function validate() {
      const results = [];
      let valid = true;
      errors.value = [];
      isValidating.value = true;
      for (const item of items.value) {
        const itemErrorMessages = await item.validate();
        if (itemErrorMessages.length > 0) {
          valid = false;
          results.push({
            id: item.id,
            errorMessages: itemErrorMessages
          });
        }
        if (!valid && props.fastFail) break;
      }
      errors.value = results;
      isValidating.value = false;
      return {
        valid,
        errors: errors.value
      };
    }
    function reset() {
      items.value.forEach(item => item.reset());
    }
    function resetValidation() {
      items.value.forEach(item => item.resetValidation());
    }
    watch(items, () => {
      let valid = 0;
      let invalid = 0;
      const results = [];
      for (const item of items.value) {
        if (item.isValid === false) {
          invalid++;
          results.push({
            id: item.id,
            errorMessages: item.errorMessages
          });
        } else if (item.isValid === true) valid++;
      }
      errors.value = results;
      model.value = invalid > 0 ? false : valid === items.value.length ? true : null;
    }, {
      deep: true,
      flush: 'post'
    });
    provide(FormKey, {
      register: _ref => {
        let {
          id,
          vm,
          validate,
          reset,
          resetValidation
        } = _ref;
        if (items.value.some(item => item.id === id)) {
          consoleWarn(`Duplicate input name "${id}"`);
        }
        items.value.push({
          id,
          validate,
          reset,
          resetValidation,
          // NOTE(Alpinui): Replaced `markRaw` with `toRaw`
          vm: toRaw(vm),
          isValid: null,
          errorMessages: []
        });
      },
      unregister: id => {
        items.value = items.value.filter(item => {
          return item.id !== id;
        });
      },
      update: (id, isValid, errorMessages) => {
        const found = items.value.find(item => item.id === id);
        if (!found) return;
        found.isValid = isValid;
        found.errorMessages = errorMessages;
      },
      isDisabled,
      isReadonly,
      isValidating,
      isValid: model,
      items,
      validateOn: toRef(props, 'validateOn')
    });
    return {
      errors,
      isDisabled,
      isReadonly,
      isValidating,
      isValid: model,
      items,
      validate,
      reset,
      resetValidation
    };
  }
  function useForm(vm) {
    return vm.reactivity.inject(FormKey, null);
  }

  // Composables

  // Types

  const makeValidationProps = propsFactory({
    disabled: {
      type: Boolean,
      default: null
    },
    error: Boolean,
    errorMessages: {
      type: [Array, String],
      default: () => []
    },
    maxErrors: {
      type: [Number, String],
      default: 1
    },
    name: String,
    label: String,
    readonly: {
      type: Boolean,
      default: null
    },
    rules: {
      type: Array,
      default: () => []
    },
    modelValue: null,
    validateOn: String,
    validationValue: null,
    ...makeFocusProps()
  }, 'validation');
  function useValidation(vm, props) {
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    let id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getUid(vm);
    const {
      computed,
      nextTick,
      ref,
      shallowRef,
      unref,
      watch,
      onBeforeMount,
      onBeforeUnmount,
      onMounted
    } = vm.reactivity;
    const model = useProxiedModel(vm, props, 'modelValue');
    const validationModel = computed(() => props.validationValue === undefined ? model.value : props.validationValue);
    const form = useForm(vm);
    const internalErrorMessages = ref([]);
    const isPristine = shallowRef(true);
    const isDirty = computed(() => !!(wrapInArray(model.value === '' ? null : model.value).length || wrapInArray(validationModel.value === '' ? null : validationModel.value).length));
    const isDisabled = computed(() => !!(props.disabled ?? form?.isDisabled.value));
    const isReadonly = computed(() => !!(props.readonly ?? form?.isReadonly.value));
    const errorMessages = computed(() => {
      return props.errorMessages?.length ? wrapInArray(props.errorMessages).concat(internalErrorMessages.value).slice(0, Math.max(0, +props.maxErrors)) : internalErrorMessages.value;
    });
    const validateOn = computed(() => {
      let value = (props.validateOn ?? form?.validateOn.value) || 'input';
      if (value === 'lazy') value = 'input lazy';
      const set = new Set(value?.split(' ') ?? []);
      return {
        blur: set.has('blur') || set.has('input'),
        input: set.has('input'),
        submit: set.has('submit'),
        lazy: set.has('lazy')
      };
    });
    const isValid = computed(() => {
      if (props.error || props.errorMessages?.length) return false;
      if (!props.rules.length) return true;
      if (isPristine.value) {
        return internalErrorMessages.value.length || validateOn.value.lazy ? null : true;
      } else {
        return !internalErrorMessages.value.length;
      }
    });
    const isValidating = shallowRef(false);
    const validationClasses = computed(() => {
      return {
        [`${name}--error`]: isValid.value === false,
        [`${name}--dirty`]: isDirty.value,
        [`${name}--disabled`]: isDisabled.value,
        [`${name}--readonly`]: isReadonly.value
      };
    });
    const uid = computed(() => props.name ?? unref(id));
    onBeforeMount(() => {
      form?.register({
        id: uid.value,
        vm: vm.instance(),
        validate,
        reset,
        resetValidation
      });
    });
    onBeforeUnmount(() => {
      form?.unregister(uid.value);
    });
    onMounted(async () => {
      if (!validateOn.value.lazy) {
        await validate(true);
      }
      form?.update(uid.value, isValid.value, errorMessages.value);
    });

    // NOTE(Alpinui): refactored from `useToggleScope`
    watch([validationModel, () => validateOn.value.input], () => {
      if (!validateOn.value.input) return;
      if (validationModel.value != null) {
        validate();
      } else if (props.focused) {
        const unwatch = watch(() => props.focused, val => {
          if (!val) validate();
          unwatch();
        });
      }
    });

    // NOTE(Alpinui): refactored from `useToggleScope`
    watch([() => validateOn.value.blur, () => props.focused], _ref => {
      let [_, val] = _ref;
      if (!validateOn.value.blur) return;
      if (!val) validate();
    });
    watch([isValid, errorMessages], () => {
      form?.update(uid.value, isValid.value, errorMessages.value);
    });
    async function reset() {
      model.value = null;
      await nextTick();
      await resetValidation();
    }
    async function resetValidation() {
      isPristine.value = true;
      if (!validateOn.value.lazy) {
        await validate(true);
      } else {
        internalErrorMessages.value = [];
      }
    }
    async function validate() {
      let silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      const results = [];
      isValidating.value = true;
      for (const rule of props.rules) {
        if (results.length >= +(props.maxErrors ?? 1)) {
          break;
        }
        const handler = typeof rule === 'function' ? rule : () => rule;
        const result = await handler(validationModel.value);
        if (result === true) continue;
        if (result !== false && typeof result !== 'string') {
          // eslint-disable-next-line no-console
          console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        results.push(result || '');
      }
      internalErrorMessages.value = results;
      isValidating.value = false;
      isPristine.value = silent;
      return internalErrorMessages.value;
    }
    return {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses
    };
  }

  // Styles
  const makeVInputProps = propsFactory({
    id: String,
    appendIcon: IconValue,
    centerAffix: Boolean,
    prependIcon: IconValue,
    hideDetails: [Boolean, String],
    hideSpinButtons: Boolean,
    hint: String,
    persistentHint: Boolean,
    messages: {
      type: [Array, String],
      default: () => []
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['horizontal', 'vertical'].includes(v)
    },
    'onClick:prepend': EventProp(),
    'onClick:append': EventProp(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...only(makeDimensionProps(), ['maxWidth', 'minWidth', 'width']),
    ...makeThemeProps(),
    ...makeValidationProps()
  }, 'VInput');
  const _Input = defineComponent({
    name: 'VInput',
    props: {
      ...makeVInputProps()
    },
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      details: null,
      message: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);
      const {
        getInputIconProps
      } = useInputIcon(vm, props);
      const uid = getUid(vm);
      const id = computed(() => props.id || `input-${uid}`);
      const messagesId = computed(() => `${id.value}-messages`);
      const {
        errorMessages,
        isDirty,
        isDisabled,
        isReadonly,
        isPristine,
        isValid,
        isValidating,
        reset,
        resetValidation,
        validate,
        validationClasses
      } = useValidation(vm, props, 'v-input', id);
      const slotProps = computed(() => ({
        id,
        messagesId,
        isDirty,
        isDisabled,
        isReadonly,
        isPristine,
        isValid,
        isValidating,
        reset,
        resetValidation,
        validate
      }));
      const messages = computed(() => {
        if (props.errorMessages?.length || !isPristine.value && errorMessages.value.length) {
          return errorMessages.value;
        } else if (props.hint && (props.persistentHint || props.focused)) {
          return props.hint;
        } else {
          return props.messages;
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-input', `v-input--${props.direction}`, {
        'v-input--center-affix': props.centerAffix,
        'v-input--hide-spin-buttons': props.hideSpinButtons
      }, densityClasses.value, themeClasses.value, rtlClasses.value, validationClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([dimensionStyles.value, styles.value]));
      const hasPrepend = computed(() => !!(vm.hasSlots.prepend || props.prependIcon));
      const hasAppend = computed(() => !!(vm.hasSlots.append || props.appendIcon));
      const hasMessages = computed(() => messages.value.length > 0);
      const hasDetails = computed(() => !props.hideDetails || props.hideDetails === 'auto' && (hasMessages.value || !!vm.hasSlots.details));
      return {
        expose: {
          reset,
          resetValidation,
          validate,
          isValid,
          errorMessages
        },
        renderInput: {
          hasAppend,
          hasDetails,
          hasMessages,
          hasPrepend,
          messages,
          messagesId,
          rootClasses,
          rootStyles,
          slotProps,
          getInputIconProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const Refs = Symbol('Forwarded refs');

  /** Omit properties starting with P */

  function getDescriptor(obj, key) {
    let currentObj = obj;
    while (currentObj) {
      const descriptor = Reflect.getOwnPropertyDescriptor(currentObj, key);
      if (descriptor) return descriptor;
      currentObj = Object.getPrototypeOf(currentObj);
    }
    return undefined;
  }
  function forwardRefs(target) {
    for (var _len = arguments.length, refs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      refs[_key - 1] = arguments[_key];
    }
    target[Refs] = refs;
    return new Proxy(target, {
      get(target, key) {
        if (Reflect.has(target, key)) {
          return Reflect.get(target, key);
        }

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            const val = Reflect.get(ref.value, key);
            return typeof val === 'function' ? val.bind(ref.value) : val;
          }
        }
      },
      has(target, key) {
        if (Reflect.has(target, key)) {
          return true;
        }

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return false;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            return true;
          }
        }
        return false;
      },
      set(target, key, value) {
        if (Reflect.has(target, key)) {
          return Reflect.set(target, key, value);
        }

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return false;
        for (const ref of refs) {
          if (ref.value && Reflect.has(ref.value, key)) {
            return Reflect.set(ref.value, key, value);
          }
        }
        return false;
      },
      getOwnPropertyDescriptor(target, key) {
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        if (descriptor) return descriptor;

        // Skip internal properties
        if (typeof key === 'symbol' || key.startsWith('$') || key.startsWith('__')) return;

        // Check each ref's own properties
        for (const ref of refs) {
          if (!ref.value) continue;
          const descriptor = getDescriptor(ref.value, key) ?? ('_' in ref.value ? getDescriptor(ref.value._?.setupState, key) : undefined);
          if (descriptor) return descriptor;
        }

        // Recursive search up each ref's prototype
        for (const ref of refs) {
          const childRefs = ref.value && ref.value[Refs];
          if (!childRefs) continue;
          const queue = childRefs.slice();
          while (queue.length) {
            const ref = queue.shift();
            const descriptor = getDescriptor(ref.value, key);
            if (descriptor) return descriptor;
            const childRefs = ref.value && ref.value[Refs];
            if (childRefs) queue.push(...childRefs);
          }
        }
        return undefined;
      }
    });
  }

  // Styles

  // Types

  const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
  const makeVTextFieldProps = propsFactory({
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: [Number, Function],
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    suffix: String,
    role: String,
    type: {
      type: String,
      default: 'text'
    },
    modelModifiers: Object,
    ...makeVInputProps(),
    ...makeVFieldProps()
  }, 'VTextField');
  const _TextField = defineComponent({
    name: 'VTextField',
    inheritAttrs: false,
    props: makeVTextFieldProps(),
    emits: {
      'click:control': e => true,
      'mousedown:control': e => true,
      'update:focused': focused => true,
      'update:modelValue': val => true
    },
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null,
      counter: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const counterValue = computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : (model.value ?? '').toString().length;
      });
      const max = computed(() => {
        if (vm.attrs.maxlength) return vm.attrs.maxlength;
        if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
        return props.counter;
      });
      const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
      function onIntersect(isIntersecting, entries) {
        if (!props.autofocus || !isIntersecting) return;
        entries[0].target?.focus?.();
      }
      const vInputRef = ref();
      const vFieldRef = ref();
      const inputRef = ref();
      const isActive = computed(() => activeTypes.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active);
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          inputRef.value?.focus();
        }
        if (!isFocused.value) focus();
      }
      function onControlMousedown(e) {
        vm.emit('mousedown:control', e);
        if (e.target === inputRef.value) return;
        onFocus();
        e.preventDefault();
      }
      function onControlClick(e) {
        onFocus();
        vm.emit('click:control', e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        nextTick(() => {
          model.value = null;
          callEvent(props['onClick:clear'], e);
        });
      }
      function onInput(e) {
        const el = e.target;
        model.value = el.value;
        if (props.modelModifiers?.trim && ['text', 'search', 'password', 'tel', 'url'].includes(props.type)) {
          const caretPosition = [el.selectionStart, el.selectionEnd];
          nextTick(() => {
            el.selectionStart = caretPosition[0];
            el.selectionEnd = caretPosition[1];
          });
        }
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => {
        const {
          modelValue: _,
          ...inputProps
        } = _Input.filterProps(props);
        return inputProps;
      });
      const fieldProps = computed(() => filterFieldProps(props));
      const rootClasses = computed(() => normalizeClass(['v-text-field', {
        'v-text-field--prefixed': !!props.prefix,
        'v-text-field--suffixed': !!props.suffix,
        'v-input--plain-underlined': isPlainOrUnderlined.value
      }, classes.value]));
      return {
        expose: forwardRefs({}, vInputRef, vFieldRef, inputRef),
        renderInput: {
          isActive,
          isFocused,
          counterValue,
          max,
          filterInputAttrs,
          fieldProps,
          inputProps,
          model,
          inputRef,
          vInputRef,
          vFieldRef,
          rootClasses,
          rootStyles: styles,
          onControlMousedown,
          onControlClick,
          onClear,
          onInput,
          onIntersect,
          onFocus,
          blur
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities

  // Types

  // Composables
  const makeItemsProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    itemTitle: {
      type: [String, Array, Function],
      default: 'title'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    itemChildren: {
      type: [Boolean, String, Array, Function],
      default: 'children'
    },
    itemProps: {
      type: [Boolean, String, Array, Function],
      default: 'props'
    },
    returnObject: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    }
  }, 'list-items');
  function transformItem$3(props, item) {
    const title = getPropertyFromItem(item, props.itemTitle, item);
    const value = getPropertyFromItem(item, props.itemValue, title);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? typeof item === 'object' && item != null && !Array.isArray(item) ? 'children' in item ? omit(item, ['children']) : item : undefined : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      title: String(_props.title ?? ''),
      value: _props.value,
      props: _props,
      children: Array.isArray(children) ? transformItems$3(props, children) : undefined,
      raw: item
    };
  }
  function transformItems$3(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem$3(props, item));
    }
    return array;
  }
  function useItems(vm, props) {
    const {
      computed
    } = vm.reactivity;
    const items = computed(() => transformItems$3(props, props.items));
    const hasNullItem = computed(() => items.value.some(item => item.value === null));
    function transformIn(value) {
      if (!hasNullItem.value) {
        // When the model value is null, return an InternalItem
        // based on null only if null is one of the items
        value = value.filter(v => v !== null);
      }
      return value.map(v => {
        if (props.returnObject && typeof v === 'string') {
          // String model value means value is a custom input value from combobox
          // Don't look up existing items if the model value is a string
          return transformItem$3(props, v);
        }
        return items.value.find(item => props.valueComparator(v, item.value)) || transformItem$3(props, v);
      });
    }
    function transformOut(value) {
      return props.returnObject ? value.map(_ref => {
        let {
          raw
        } = _ref;
        return raw;
      }) : value.map(_ref2 => {
        let {
          value
        } = _ref2;
        return value;
      });
    }
    return {
      items,
      transformIn,
      transformOut
    };
  }

  // Styles

  // Types

  const makeSelectProps = propsFactory({
    chips: Boolean,
    closableChips: Boolean,
    closeText: {
      type: String,
      default: '$vuetify.close'
    },
    openText: {
      type: String,
      default: '$vuetify.open'
    },
    eager: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    listProps: {
      type: Object
    },
    menu: Boolean,
    menuIcon: {
      type: IconValue,
      default: '$dropdown'
    },
    menuProps: {
      type: Object
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    openOnClear: Boolean,
    itemColor: String,
    ...makeItemsProps({
      itemChildren: false
    })
  }, 'Select');
  const makeVSelectProps = propsFactory({
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null,
      role: 'combobox'
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    // NOTE(Alpinui): This is set in the Vue file to avoid import Vue in headless
    ...makeTransitionProps({
      transition: {
        component: null
      }
    })
  }, 'VSelect');
  const _Select = defineComponent({
    name: 'VSelect',
    props: makeVSelectProps(),
    emits: {
      'update:focused': focused => true,
      'update:modelValue': value => true,
      'update:menu': ue => true
    },
    slots: makeSlots({
      item: null,
      chip: null,
      selection: null,
      'prepend-item': null,
      'append-item': null,
      'no-data': null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const vTextFieldRef = ref();
      const vMenuRef = ref();
      const vVirtualScrollRef = ref();
      const _menu = useProxiedModel(vm, props, 'menu');
      const menu = computed({
        get: () => _menu.value,
        set: v => {
          if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
          _menu.value = v;
        }
      });
      const {
        items,
        transformIn,
        transformOut
      } = useItems(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue', [], v => transformIn(v === null ? [null] : wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const counterValue = computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : model.value.length;
      });
      const form = useForm(vm);
      const selectedValues = computed(() => model.value.map(selection => selection.value));
      const isFocused = shallowRef(false);
      const label = computed(() => menu.value ? props.closeText : props.openText);
      let keyboardLookupPrefix = '';
      let keyboardLookupLastTime;
      const displayItems = computed(() => {
        if (props.hideSelected) {
          return items.value.filter(item => !model.value.some(s => props.valueComparator(s, item)));
        }
        return items.value;
      });
      const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || form?.isReadonly.value);
      const computedMenuProps = computed(() => {
        return {
          ...props.menuProps,
          activatorProps: {
            ...(props.menuProps?.activatorProps || {}),
            'aria-haspopup': 'listbox' // Set aria-haspopup to 'listbox'
          }
        };
      });
      const listRef = ref();
      const {
        onListScroll,
        onListKeydown
      } = useScrolling(vm, listRef, vTextFieldRef);
      function onClear(e) {
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onMousedownControl() {
        if (menuDisabled.value) return;
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        if (!e.key || props.readonly || form?.isReadonly.value) return;
        if (['Enter', ' ', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
        }
        if (['Enter', 'ArrowDown', ' '].includes(e.key)) {
          menu.value = true;
        }
        if (['Escape', 'Tab'].includes(e.key)) {
          menu.value = false;
        }
        if (e.key === 'Home') {
          listRef.value?.focus('first');
        } else if (e.key === 'End') {
          listRef.value?.focus('last');
        }

        // html select hotkeys
        const KEYBOARD_LOOKUP_THRESHOLD = 1000; // milliseconds

        function checkPrintable(e) {
          const isPrintableChar = e.key.length === 1;
          const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey;
          return isPrintableChar && noModifier;
        }
        if (props.multiple || !checkPrintable(e)) return;
        const now = performance.now();
        if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
          keyboardLookupPrefix = '';
        }
        keyboardLookupPrefix += e.key.toLowerCase();
        keyboardLookupLastTime = now;
        const item = items.value.find(item => item.title.toLowerCase().startsWith(keyboardLookupPrefix));
        if (item !== undefined) {
          model.value = [item];
          const index = displayItems.value.indexOf(item);
          IN_BROWSER && window.requestAnimationFrame(() => {
            index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
          });
        }
      }

      /** @param set - null means toggle */
      function select(item) {
        let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (item.props.disabled) return;
        if (props.multiple) {
          const index = model.value.findIndex(selection => props.valueComparator(selection.value, item.value));
          const add = set == null ? !~index : set;
          if (~index) {
            const value = add ? [...model.value, item] : [...model.value];
            value.splice(index, 1);
            model.value = value;
          } else if (add) {
            model.value = [...model.value, item];
          }
        } else {
          const add = set !== false;
          model.value = add ? [item] : [];
          nextTick(() => {
            menu.value = false;
          });
        }
      }
      function onBlur(e) {
        if (!listRef.value?.$el.contains(e.relatedTarget)) {
          menu.value = false;
        }
      }
      function onAfterLeave() {
        if (isFocused.value) {
          vTextFieldRef.value?.focus();
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onModelUpdate(v) {
        if (v == null) model.value = [];else if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
          const item = items.value.find(item => item.title === v);
          if (item) {
            select(item);
          }
        } else if (vTextFieldRef.value) {
          vTextFieldRef.value.value = '';
        }
      }
      watch(menu, () => {
        if (!props.hideSelected && menu.value && model.value.length) {
          const index = displayItems.value.findIndex(item => model.value.some(s => props.valueComparator(s.value, item.value)));
          IN_BROWSER && window.requestAnimationFrame(() => {
            index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
          });
        }
      });
      watch(() => props.items, (newVal, oldVal) => {
        if (menu.value) return;
        if (isFocused.value && !oldVal.length && newVal.length) {
          menu.value = true;
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const genItemProps = _ref => {
        let {
          index,
          item,
          itemRef
        } = _ref;
        return mergeProps(item.props, {
          ref: itemRef,
          key: index,
          onClick: () => select(item, null)
        });
      };
      const genChipProps = item => {
        function onChipClose(e) {
          e.stopPropagation();
          e.preventDefault();
          select(item, false);
        }
        return {
          'onClick:close': onChipClose,
          onKeydown(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            e.stopPropagation();
            onChipClose(e);
          },
          onMousedown(e) {
            e.preventDefault();
            e.stopPropagation();
          },
          modelValue: true,
          'onUpdate:modelValue': undefined
        };
      };
      const textFieldProps = computed(() => _TextField.filterProps(props));
      const isDirty = computed(() => model.value.length > 0);
      const modelValue = computed(() => model.value.map(v => v.props.value).join(', '));
      const title = computed(() => t(label.value));
      const showNoData = computed(() => !displayItems.value.length && !props.hideNoData);
      const noDataText = computed(() => t(props.noDataText));
      const placeholder = computed(() => isDirty.value || !isFocused.value && props.label && !props.persistentPlaceholder ? undefined : props.placeholder);
      const rootClasses = computed(() => normalizeClass(['v-select', {
        'v-select--active-menu': menu.value,
        'v-select--chips': !!props.chips,
        [`v-select--${props.multiple ? 'multiple' : 'single'}`]: true,
        'v-select--selected': !!model.value.length,
        'v-select--selection-slot': vm.hasSlots.selection
      }, classes.value]));
      return {
        expose: forwardRefs({
          isFocused,
          menu,
          select
        }, vTextFieldRef),
        renderInput: {
          counterValue,
          isDirty,
          isFocused,
          model,
          modelValue,
          menu,
          menuDisabled,
          computedMenuProps,
          placeholder,
          title,
          displayItems,
          genItemProps,
          genChipProps,
          showNoData,
          noDataText,
          textFieldProps,
          selectedValues,
          listRef,
          vMenuRef,
          vTextFieldRef,
          vVirtualScrollRef,
          rootClasses,
          rootStyles: styles,
          onModelUpdate,
          onClear,
          onMousedownControl,
          onBlur,
          onKeydown,
          onAfterLeave,
          onListKeydown,
          onListScroll,
          onFocusin
        }
      };
    },
    renderHeadless: () => null
  });

  /* eslint-disable max-statements */
  /* eslint-disable no-labels */


  // Types

  /**
   * - match without highlight
   * - single match (index), length already known
   * - single match (start, end)
   * - multiple matches (start, end), probably shouldn't overlap
   */

  // Composables
  const defaultFilter = (value, query, item) => {
    if (value == null || query == null) return -1;
    return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
  };
  const makeFilterProps = propsFactory({
    customFilter: Function,
    customKeyFilter: Object,
    filterKeys: [Array, String],
    filterMode: {
      type: String,
      default: 'intersection'
    },
    noFilter: Boolean
  }, 'filter');
  function filterItems(items, query, options) {
    const array = [];
    // always ensure we fall back to a functioning filter
    const filter = options?.default ?? defaultFilter;
    const keys = options?.filterKeys ? wrapInArray(options.filterKeys) : false;
    const customFiltersLength = Object.keys(options?.customKeyFilter ?? {}).length;
    if (!items?.length) return array;
    loop: for (let i = 0; i < items.length; i++) {
      const [item, transformed = item] = wrapInArray(items[i]);
      const customMatches = {};
      const defaultMatches = {};
      let match = -1;
      if ((query || customFiltersLength > 0) && !options?.noFilter) {
        if (typeof item === 'object') {
          const filterKeys = keys || Object.keys(transformed);
          for (const key of filterKeys) {
            const value = getPropertyFromItem(transformed, key);
            const keyFilter = options?.customKeyFilter?.[key];
            match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
            if (match !== -1 && match !== false) {
              if (keyFilter) customMatches[key] = match;else defaultMatches[key] = match;
            } else if (options?.filterMode === 'every') {
              continue loop;
            }
          }
        } else {
          match = filter(item, query, item);
          if (match !== -1 && match !== false) {
            defaultMatches.title = match;
          }
        }
        const defaultMatchesLength = Object.keys(defaultMatches).length;
        const customMatchesLength = Object.keys(customMatches).length;
        if (!defaultMatchesLength && !customMatchesLength) continue;
        if (options?.filterMode === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
        if (options?.filterMode === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
      }
      array.push({
        index: i,
        matches: {
          ...defaultMatches,
          ...customMatches
        }
      });
    }
    return array;
  }
  function useFilter(vm, props, items, query, options) {
    const {
      computed,
      ref,
      unref,
      watchEffect
    } = vm.reactivity;
    const filteredItems = ref([]);
    const filteredMatches = ref(new Map());
    const transformedItems = computed(() => options?.transform ? unref(items).map(item => [item, options.transform(item)]) : unref(items));
    watchEffect(() => {
      const _query = typeof query === 'function' ? query() : unref(query);
      const strQuery = typeof _query !== 'string' && typeof _query !== 'number' ? '' : String(_query);
      const results = filterItems(transformedItems.value, strQuery, {
        customKeyFilter: {
          ...props.customKeyFilter,
          ...unref(options?.customKeyFilter)
        },
        default: props.customFilter,
        filterKeys: props.filterKeys,
        filterMode: props.filterMode,
        noFilter: props.noFilter
      });
      const originalItems = unref(items);
      const _filteredItems = [];
      const _filteredMatches = new Map();
      results.forEach(_ref => {
        let {
          index,
          matches
        } = _ref;
        const item = originalItems[index];
        _filteredItems.push(item);
        _filteredMatches.set(item.value, matches);
      });
      filteredItems.value = _filteredItems;
      filteredMatches.value = _filteredMatches;
    });
    function getMatches(item) {
      return filteredMatches.value.get(item.value);
    }
    return {
      filteredItems,
      filteredMatches,
      getMatches
    };
  }

  // Styles

  // Types

  const makeVAutocompleteProps = propsFactory({
    autoSelectFirst: {
      type: [Boolean, String]
    },
    clearOnSelect: Boolean,
    search: String,
    ...makeFilterProps({
      filterKeys: ['title']
    }),
    ...makeSelectProps(),
    ...omit(makeVTextFieldProps({
      modelValue: null,
      role: 'combobox'
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({
      transition: false
    })
  }, 'VAutocomplete');
  const _Autocomplete = defineComponent({
    name: 'VAutocomplete',
    props: makeVAutocompleteProps(),
    emits: {
      'update:focused': focused => true,
      'update:search': value => true,
      'update:modelValue': value => true,
      'update:menu': value => true
    },
    slots: makeSlots({
      item: null,
      chip: null,
      selection: null,
      'prepend-item': null,
      'append-item': null,
      'no-data': null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const vTextFieldRef = ref();
      const isFocused = shallowRef(false);
      const isPristine = shallowRef(true);
      const listHasFocus = shallowRef(false);
      const vMenuRef = ref();
      const vVirtualScrollRef = ref();
      const _menu = useProxiedModel(vm, props, 'menu');
      const menu = computed({
        get: () => _menu.value,
        set: v => {
          if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
          _menu.value = v;
        }
      });
      const selectionIndex = shallowRef(-1);
      const color = computed(() => vTextFieldRef.value?.color);
      const label = computed(() => menu.value ? props.closeText : props.openText);
      const {
        items,
        transformIn,
        transformOut
      } = useItems(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, color);
      const search = useProxiedModel(vm, props, 'search', '');
      const model = useProxiedModel(vm, props, 'modelValue', [], v => transformIn(v === null ? [null] : wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const counterValue = computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : model.value.length;
      });
      const form = useForm(vm);
      const {
        filteredItems,
        getMatches
      } = useFilter(vm, props, items, () => isPristine.value ? '' : search.value);
      const displayItems = computed(() => {
        if (props.hideSelected) {
          return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value));
        }
        return filteredItems.value;
      });
      const hasChips = computed(() => !!(props.chips || vm.hasSlots.chip));
      const hasSelectionSlot = computed(() => hasChips.value || vm.hasSlots.selection);
      const selectedValues = computed(() => model.value.map(selection => selection.props.value));
      const highlightFirst = computed(() => {
        const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title;
        return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
      });
      const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || form?.isReadonly.value);
      const listRef = ref();
      const {
        onListScroll,
        onListKeydown
      } = useScrolling(vm, listRef, vTextFieldRef);
      function onClear(e) {
        if (props.openOnClear) {
          menu.value = true;
        }
        search.value = '';
      }
      function onMousedownControl() {
        if (menuDisabled.value) return;
        menu.value = true;
      }
      function onMousedownMenuIcon(e) {
        if (menuDisabled.value) return;
        if (isFocused.value) {
          e.preventDefault();
          e.stopPropagation();
        }
        menu.value = !menu.value;
      }
      function onKeydown(e) {
        if (props.readonly || form?.isReadonly.value) return;
        const selectionStart = vTextFieldRef.value.selectionStart;
        const length = model.value.length;
        if (selectionIndex.value > -1 || ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
        }
        if (['Enter', 'ArrowDown'].includes(e.key)) {
          menu.value = true;
        }
        if (['Escape'].includes(e.key)) {
          menu.value = false;
        }
        if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key) && !model.value.some(_ref => {
          let {
            value
          } = _ref;
          return value === displayItems.value[0].value;
        })) {
          select(displayItems.value[0]);
        }
        if (e.key === 'ArrowDown' && highlightFirst.value) {
          listRef.value?.focus('next');
        }
        if (['Backspace', 'Delete'].includes(e.key)) {
          if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value) return select(model.value[0], false);
          if (~selectionIndex.value) {
            const originalSelectionIndex = selectionIndex.value;
            select(model.value[selectionIndex.value], false);
            selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
          } else if (e.key === 'Backspace' && !search.value) {
            selectionIndex.value = length - 1;
          }
        }
        if (!props.multiple) return;
        if (e.key === 'ArrowLeft') {
          if (selectionIndex.value < 0 && selectionStart > 0) return;
          const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
          if (model.value[prev]) {
            selectionIndex.value = prev;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(search.value?.length, search.value?.length);
          }
        }
        if (e.key === 'ArrowRight') {
          if (selectionIndex.value < 0) return;
          const next = selectionIndex.value + 1;
          if (model.value[next]) {
            selectionIndex.value = next;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(0, 0);
          }
        }
      }
      function onChange(e) {
        if (matchesSelector(vTextFieldRef.value, ':autofill') || matchesSelector(vTextFieldRef.value, ':-webkit-autofill')) {
          const item = items.value.find(item => item.title === e.target.value);
          if (item) {
            select(item);
          }
        }
      }
      function onAfterLeave() {
        if (isFocused.value) {
          isPristine.value = true;
          vTextFieldRef.value?.focus();
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
        setTimeout(() => {
          listHasFocus.value = true;
        });
      }
      function onFocusout(e) {
        listHasFocus.value = false;
      }
      function onUpdateModelValue(v) {
        if (v == null || v === '' && !props.multiple && !hasSelectionSlot.value) model.value = [];
      }
      const isSelecting = shallowRef(false);

      /** @param set - null means toggle */
      function select(item) {
        let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (!item || item.props.disabled) return;
        if (props.multiple) {
          const index = model.value.findIndex(selection => props.valueComparator(selection.value, item.value));
          const add = set == null ? !~index : set;
          if (~index) {
            const value = add ? [...model.value, item] : [...model.value];
            value.splice(index, 1);
            model.value = value;
          } else if (add) {
            model.value = [...model.value, item];
          }
          if (props.clearOnSelect) {
            search.value = '';
          }
        } else {
          const add = set !== false;
          model.value = add ? [item] : [];
          search.value = add && !hasSelectionSlot.value ? item.title : '';

          // watch for search watcher to trigger
          nextTick(() => {
            menu.value = false;
            isPristine.value = true;
          });
        }
      }
      watch(isFocused, (val, oldVal) => {
        if (val === oldVal) return;
        if (val) {
          isSelecting.value = true;
          search.value = props.multiple || hasSelectionSlot.value ? '' : String(model.value.at(-1)?.props.title ?? '');
          isPristine.value = true;
          nextTick(() => isSelecting.value = false);
        } else {
          if (!props.multiple && search.value == null) model.value = [];
          menu.value = false;
          if (!model.value.some(_ref2 => {
            let {
              title
            } = _ref2;
            return title === search.value;
          })) search.value = '';
          selectionIndex.value = -1;
        }
      });
      watch(search, val => {
        if (!isFocused.value || isSelecting.value) return;
        if (val) menu.value = true;
        isPristine.value = !val;
      });
      watch(menu, () => {
        if (!props.hideSelected && menu.value && model.value.length) {
          const index = displayItems.value.findIndex(item => model.value.some(s => item.value === s.value));
          IN_BROWSER && window.requestAnimationFrame(() => {
            index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
          });
        }
      });
      watch(() => props.items, (newVal, oldVal) => {
        if (menu.value) return;
        if (isFocused.value && !oldVal.length && newVal.length) {
          menu.value = true;
        }
      });
      const isDirty = computed(() => model.value.length > 0);
      const textFieldProps = computed(() => _TextField.filterProps(props));
      const noDataText = computed(() => t(props.noDataText));
      const titleText = computed(() => t(label.value));
      const rootClasses = computed(() => normalizeClass(['v-autocomplete', `v-autocomplete--${props.multiple ? 'multiple' : 'single'}`, {
        'v-autocomplete--active-menu': !!menu.value,
        'v-autocomplete--chips': !!props.chips,
        'v-autocomplete--selection-slot': !!hasSelectionSlot.value,
        'v-autocomplete--selecting-index': selectionIndex.value > -1
      }, classes.value]));
      return {
        expose: forwardRefs({
          isFocused,
          isPristine,
          menu,
          search,
          filteredItems,
          select
        }, vTextFieldRef),
        renderInput: {
          displayItems,
          isDirty,
          isPristine,
          textFieldProps,
          textColorClasses,
          textColorStyles,
          vTextFieldRef,
          search,
          isFocused,
          listRef,
          selectedValues,
          model,
          menu,
          vMenuRef,
          menuDisabled,
          counterValue,
          noDataText,
          titleText,
          rootClasses,
          rootStyles: styles,
          vVirtualScrollRef,
          highlightFirst,
          hasChips,
          selectionIndex,
          getMatches,
          onUpdateModelValue,
          onChange,
          onClear,
          onMousedownControl,
          onKeydown,
          onAfterLeave,
          onListKeydown,
          onFocusin,
          onFocusout,
          onListScroll,
          select,
          noop,
          onMousedownMenuIcon
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AAutocomplete = defineAlpineComponent({
    ..._Autocomplete,
    name: 'AAutocomplete'
  });

  // Styles
  const makeVAvatarProps = propsFactory({
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    image: String,
    text: String,
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'flat'
    })
  }, 'VAvatar');
  const _Avatar = defineComponent({
    name: 'VAvatar',
    props: makeVAvatarProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(vm, props);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass([{
        'v-avatar': true,
        'v-avatar--start': props.start,
        'v-avatar--end': props.end
      }, themeClasses.value, colorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([colorStyles.value, sizeStyles.value, styles.value]));
      const contentDefaults = computed(() => ({
        VImg: {
          cover: true,
          image: props.image
        },
        VIcon: {
          icon: props.icon
        }
      }));
      return {
        expose: {},
        renderInput: {
          contentDefaults,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AAvatar = defineAlpineComponent({
    ..._Avatar,
    name: 'AAvatar'
  });

  // Styles
  const makeVBadgeProps = propsFactory({
    bordered: Boolean,
    color: String,
    content: [Number, String],
    dot: Boolean,
    floating: Boolean,
    icon: IconValue,
    inline: Boolean,
    label: {
      type: String,
      default: '$vuetify.badge'
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
    ...makeComponentProps(),
    ...makeLocationProps({
      location: 'top end'
    }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeTransitionProps({
      transition: 'scale-rotate-transition'
    })
  }, 'VBadge');
  const _Badge = defineComponent({
    name: 'VBadge',
    inheritAttrs: false,
    slots: makeSlots({
      default: null,
      badge: null
    }),
    props: makeVBadgeProps(),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'textColor'));
      const {
        themeClasses
      } = useTheme$1(vm);
      const {
        locationStyles
      } = useLocation(vm, props, true, side => {
        const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
        return base + (['top', 'bottom'].includes(side) ? +(props.offsetY ?? 0) : ['left', 'right'].includes(side) ? +(props.offsetX ?? 0) : 0);
      });
      const contentValue = computed(() => Number(props.content));
      const content = computed(() => {
        return !props.max || isNaN(contentValue.value) ? props.content : contentValue.value <= +props.max ? contentValue.value : `${props.max}+`;
      });
      const getBadgeAtts = () => {
        const [badgeAttrs, attrs] = pickWithRest(vm.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
        return {
          badgeAttrs,
          attrs
        };
      };

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass([{
        'v-badge': true,
        'v-badge--bordered': props.bordered,
        'v-badge--dot': props.dot,
        'v-badge--floating': props.floating,
        'v-badge--inline': props.inline
      }, classes.value]));
      const badgeClasses = computed(() => normalizeClass(['v-badge__badge', themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value]));
      const badgeStyles = computed(() => normalizeStyle([backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value]));
      const badgeAriaLabel = computed(() => t(props.label, contentValue.value));
      return {
        expose: {},
        renderInput: {
          badgeAriaLabel,
          badgeClasses,
          badgeStyles,
          content,
          getBadgeAtts,
          rootClasses,
          styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABadge = defineAlpineComponent({
    ..._Badge,
    name: 'ABadge'
  });

  // Styles
  const makeVBannerProps = propsFactory({
    avatar: String,
    bgColor: String,
    color: String,
    icon: IconValue,
    lines: String,
    stacked: Boolean,
    sticky: Boolean,
    text: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeDisplayProps({
      mobile: null
    }),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VBanner');
  const _Banner = defineComponent({
    name: 'VBanner',
    props: makeVBannerProps(),
    slots: makeSlots({
      default: null,
      prepend: null,
      text: null,
      actions: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, props, 'bgColor');
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        displayClasses,
        mobile
      } = useDisplay$1(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        locationStyles
      } = useLocation(vm, props);
      const {
        positionClasses
      } = usePosition(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const color = toRef(props, 'color');
      const density = toRef(props, 'density');
      provideDefaults(vm, {
        VBannerActions: {
          color,
          density
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass([{
        'v-banner': true,
        'v-banner--stacked': props.stacked || mobile.value,
        'v-banner--sticky': props.sticky,
        [`v-banner--${props.lines}-line`]: !!props.lines
      }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, displayClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, styles.value]));
      const prependDefaults = computed(() => ({
        VAvatar: {
          color: color.value,
          density: density.value,
          icon: props.icon,
          image: props.avatar
        }
      }));
      return {
        expose: {},
        renderInput: {
          color,
          density,
          prependDefaults,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABanner = defineAlpineComponent({
    ..._Banner,
    name: 'ABanner'
  });

  // Composables

  // Types

  const makeVBannerActionsProps = propsFactory({
    color: String,
    density: String,
    ...makeComponentProps()
  }, 'VBannerActions');
  const _BannerActions = defineComponent({
    name: 'VBannerActions',
    props: makeVBannerActionsProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      provideDefaults(vm, {
        VBtn: {
          color: props.color,
          density: props.density,
          slim: true,
          variant: 'text'
        }
      });
      const rootClasses = computed(() => normalizeClass(['v-banner-actions', classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABannerActions = defineAlpineComponent({
    ..._BannerActions,
    name: 'ABannerActions'
  });

  // Composables
  const _BannerText = createSimpleFunctionalHeadless('v-banner-text');

  // Types

  const ABannerText = defineAlpineComponent({
    ..._BannerText,
    name: 'ABannerText'
  });

  // Styles

  // Types

  const makeVBottomNavigationProps = propsFactory({
    baseColor: String,
    bgColor: String,
    color: String,
    grow: Boolean,
    mode: {
      type: String,
      validator: v => !v || ['horizontal', 'shift'].includes(v)
    },
    height: {
      type: [Number, String],
      default: 56
    },
    active: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'bottom-navigation'
    }),
    ...makeTagProps({
      tag: 'header'
    }),
    ...makeGroupProps({
      selectedClass: 'v-btn--selected'
    }),
    ...makeThemeProps()
  }, 'VBottomNavigation');
  const _BottomNavigation = defineComponent({
    name: 'VBottomNavigation',
    props: makeVBottomNavigationProps(),
    emits: {
      'update:active': value => true,
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        themeClasses
      } = useTheme$1(vm);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'bgColor'));
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        ssrBootStyles
      } = useSsrBoot(vm);
      const height = computed(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
      const isActive = useProxiedModel(vm, props, 'active', props.active);
      const {
        layoutItemStyles,
        layoutIsReady
      } = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: computed(() => 'bottom'),
        layoutSize: computed(() => isActive.value ? height.value : 0),
        elementSize: height,
        active: isActive,
        absolute: toRef(props, 'absolute')
      });
      useGroup(vm, props, VBtnToggleSymbol);
      provideDefaults(vm, {
        VBtn: {
          baseColor: toRef(props, 'baseColor'),
          color: toRef(props, 'color'),
          density: toRef(props, 'density'),
          stacked: computed(() => props.mode !== 'horizontal'),
          variant: 'text'
        }
      }, {
        scoped: true
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-bottom-navigation', {
        'v-bottom-navigation--active': isActive.value,
        'v-bottom-navigation--grow': props.grow,
        'v-bottom-navigation--shift': props.mode === 'shift'
      }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, layoutItemStyles.value, {
        height: convertToUnit(height.value)
      }, ssrBootStyles.value, styles.value]));
      return {
        expose: layoutIsReady,
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABottomNavigation = defineAlpineComponent({
    ..._BottomNavigation,
    name: 'ABottomNavigation'
  });

  // Types

  /** Convert a point in local space to viewport space */
  function elementToViewport(point, offset) {
    return {
      x: point.x + offset.x,
      y: point.y + offset.y
    };
  }

  /** Get the difference between two points */
  function getOffset$1(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }

  /** Convert an anchor object to a point in local space */
  function anchorToPoint(anchor, box) {
    if (anchor.side === 'top' || anchor.side === 'bottom') {
      const {
        side,
        align
      } = anchor;
      const x = align === 'left' ? 0 : align === 'center' ? box.width / 2 : align === 'right' ? box.width : align;
      const y = side === 'top' ? 0 : side === 'bottom' ? box.height : side;
      return elementToViewport({
        x,
        y
      }, box);
    } else if (anchor.side === 'left' || anchor.side === 'right') {
      const {
        side,
        align
      } = anchor;
      const x = side === 'left' ? 0 : side === 'right' ? box.width : side;
      const y = align === 'top' ? 0 : align === 'center' ? box.height / 2 : align === 'bottom' ? box.height : align;
      return elementToViewport({
        x,
        y
      }, box);
    }
    return elementToViewport({
      x: box.width / 2,
      y: box.height / 2
    }, box);
  }

  function getScrollParent(el) {
    let includeHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    while (el) {
      if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el;
      el = el.parentElement;
    }
    return document.scrollingElement;
  }
  function getScrollParents(el, stopAt) {
    const elements = [];
    if (stopAt && el && !stopAt.contains(el)) return elements;
    while (el) {
      if (hasScrollbar(el)) elements.push(el);
      if (el === stopAt) break;
      el = el.parentElement;
    }
    return elements;
  }
  function hasScrollbar(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const style = window.getComputedStyle(el);
    return style.overflowY === 'scroll' || style.overflowY === 'auto' && el.scrollHeight > el.clientHeight;
  }
  function isPotentiallyScrollable(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const style = window.getComputedStyle(el);
    return ['scroll', 'auto'].includes(style.overflowY);
  }

  function isFixedPosition(el) {
    while (el) {
      if (window.getComputedStyle(el).position === 'fixed') {
        return true;
      }
      el = el.offsetParent;
    }
    return false;
  }

  // Utilities

  // Types

  const locationStrategies = {
    static: staticLocationStrategy,
    // specific viewport position, usually centered
    connected: connectedLocationStrategy // connected to a certain element
  };
  const makeLocationStrategyProps = propsFactory({
    locationStrategy: {
      type: [String, Function],
      default: 'static',
      validator: val => typeof val === 'function' || val in locationStrategies
    },
    location: {
      type: String,
      default: 'bottom'
    },
    origin: {
      type: String,
      default: 'auto'
    },
    offset: [Number, String, Array]
  }, 'VOverlay-location-strategies');
  function useLocationStrategies(vm, props, data) {
    const {
      onBeforeUnmount,
      ref,
      watch
    } = vm.reactivity;
    const contentStyles = ref({});
    const updateLocation = ref();
    if (IN_BROWSER) {
      // NOTE(Alpinui): Replaced `useToggleScope` with `onBeforeUnmount`
      watch([() => props.locationStrategy, () => !!(data.isActive.value && props.locationStrategy)], (_ref, _ref2) => {
        let [strategy, cond] = _ref;
        let [oldStrategy] = _ref2;
        // NOTE(Alpinui): This conditional was previously `watch(() => props.locationStrategy, reset)`
        if (strategy !== oldStrategy) {
          // NOTE(Alpinui): Previously this was inside `onScopeDispose`
          // We call it also here to simulate reset
          window.removeEventListener('resize', onResize);
          updateLocation.value = undefined;
        }
        if (cond) {
          window.addEventListener('resize', onResize, {
            passive: true
          });
          if (typeof props.locationStrategy === 'function') {
            updateLocation.value = props.locationStrategy(data, props, contentStyles)?.updateLocation;
          } else {
            updateLocation.value = locationStrategies[props.locationStrategy](vm, data, props, contentStyles)?.updateLocation;
          }
        }
      });

      // NOTE(Alpinui): Previously this was inside `onScopeDispose`
      onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize);
        updateLocation.value = undefined;
      });
      // END of `useToggleScope`
    }
    function onResize(e) {
      updateLocation.value?.(e);
    }
    return {
      contentStyles,
      updateLocation
    };
  }
  function staticLocationStrategy() {
    // TODO(Vuetify)
  }

  /** Get size of element ignoring max-width/max-height */
  function getIntrinsicSize(el, isRtl) {
    // const scrollables = new Map<Element, [number, number]>()
    // el.querySelectorAll('*').forEach(el => {
    //   const x = el.scrollLeft
    //   const y = el.scrollTop
    //   if (x || y) {
    //     scrollables.set(el, [x, y])
    //   }
    // })

    // const initialMaxWidth = el.style.maxWidth
    // const initialMaxHeight = el.style.maxHeight
    // el.style.removeProperty('max-width')
    // el.style.removeProperty('max-height')

    if (isRtl) {
      el.style.removeProperty('left');
    } else {
      el.style.removeProperty('right');
    }

    /* eslint-disable-next-line sonarjs/prefer-immediate-return */
    const contentBox = nullifyTransforms(el);
    if (isRtl) {
      contentBox.x += parseFloat(el.style.right || 0);
    } else {
      contentBox.x -= parseFloat(el.style.left || 0);
    }
    contentBox.y -= parseFloat(el.style.top || 0);

    // el.style.maxWidth = initialMaxWidth
    // el.style.maxHeight = initialMaxHeight
    // scrollables.forEach((position, el) => {
    //   el.scrollTo(...position)
    // })

    return contentBox;
  }
  function connectedLocationStrategy(vm, data, props, contentStyles) {
    const {
      computed,
      nextTick,
      watch,
      onBeforeUnmount
    } = vm.reactivity;
    const activatorFixed = Array.isArray(data.target.value) || isFixedPosition(data.target.value);
    if (activatorFixed) {
      Object.assign(contentStyles.value, {
        position: 'fixed',
        top: 0,
        [data.isRtl.value ? 'right' : 'left']: 0
      });
    }
    const {
      preferredAnchor,
      preferredOrigin
    } = destructComputed(vm, () => {
      const parsedAnchor = parseAnchor(props.location, data.isRtl.value);
      const parsedOrigin = props.origin === 'overlap' ? parsedAnchor : props.origin === 'auto' ? flipSide(parsedAnchor) : parseAnchor(props.origin, data.isRtl.value);

      // Some combinations of props may produce an invalid origin
      if (parsedAnchor.side === parsedOrigin.side && parsedAnchor.align === flipAlign(parsedOrigin).align) {
        return {
          preferredAnchor: flipCorner(parsedAnchor),
          preferredOrigin: flipCorner(parsedOrigin)
        };
      } else {
        return {
          preferredAnchor: parsedAnchor,
          preferredOrigin: parsedOrigin
        };
      }
    });
    const [minWidth, minHeight, maxWidth, maxHeight] = ['minWidth', 'minHeight', 'maxWidth', 'maxHeight'].map(key => {
      return computed(() => {
        const val = parseFloat(props[key]);
        return isNaN(val) ? Infinity : val;
      });
    });
    const offset = computed(() => {
      if (Array.isArray(props.offset)) {
        return props.offset;
      }
      if (typeof props.offset === 'string') {
        const offset = props.offset.split(' ').map(parseFloat);
        if (offset.length < 2) offset.push(0);
        return offset;
      }
      return typeof props.offset === 'number' ? [props.offset, 0] : [0, 0];
    });
    let observe = false;
    const observer = new ResizeObserver(() => {
      if (observe) updateLocation();
    });
    watch([data.target, data.contentEl], (_ref3, _ref4) => {
      let [newTarget, newContentEl] = _ref3;
      let [oldTarget, oldContentEl] = _ref4;
      if (oldTarget && !Array.isArray(oldTarget)) observer.unobserve(oldTarget);
      if (newTarget && !Array.isArray(newTarget)) observer.observe(newTarget);
      if (oldContentEl) observer.unobserve(oldContentEl);
      if (newContentEl) observer.observe(newContentEl);
    }, {
      immediate: true
    });

    // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
    onBeforeUnmount(() => {
      observer.disconnect();
    });

    // eslint-disable-next-line max-statements
    function updateLocation() {
      observe = false;
      requestAnimationFrame(() => observe = true);
      if (!data.target.value || !data.contentEl.value) return;
      const targetBox = getTargetBox(data.target.value);
      const contentBox = getIntrinsicSize(data.contentEl.value, data.isRtl.value);
      const scrollParents = getScrollParents(data.contentEl.value);
      const viewportMargin = 12;
      if (!scrollParents.length) {
        scrollParents.push(document.documentElement);
        if (!(data.contentEl.value.style.top && data.contentEl.value.style.left)) {
          contentBox.x -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-x') || 0);
          contentBox.y -= parseFloat(document.documentElement.style.getPropertyValue('--v-body-scroll-y') || 0);
        }
      }
      const viewport = scrollParents.reduce((box, el) => {
        const rect = el.getBoundingClientRect();
        const scrollBox = new Box({
          x: el === document.documentElement ? 0 : rect.x,
          y: el === document.documentElement ? 0 : rect.y,
          width: el.clientWidth,
          height: el.clientHeight
        });
        if (box) {
          return new Box({
            x: Math.max(box.left, scrollBox.left),
            y: Math.max(box.top, scrollBox.top),
            width: Math.min(box.right, scrollBox.right) - Math.max(box.left, scrollBox.left),
            height: Math.min(box.bottom, scrollBox.bottom) - Math.max(box.top, scrollBox.top)
          });
        }
        return scrollBox;
      }, undefined);
      viewport.x += viewportMargin;
      viewport.y += viewportMargin;
      viewport.width -= viewportMargin * 2;
      viewport.height -= viewportMargin * 2;
      let placement = {
        anchor: preferredAnchor.value,
        origin: preferredOrigin.value
      };
      function checkOverflow(_placement) {
        const box = new Box(contentBox);
        const targetPoint = anchorToPoint(_placement.anchor, targetBox);
        const contentPoint = anchorToPoint(_placement.origin, box);
        let {
          x,
          y
        } = getOffset$1(targetPoint, contentPoint);
        switch (_placement.anchor.side) {
          case 'top':
            y -= offset.value[0];
            break;
          case 'bottom':
            y += offset.value[0];
            break;
          case 'left':
            x -= offset.value[0];
            break;
          case 'right':
            x += offset.value[0];
            break;
        }
        switch (_placement.anchor.align) {
          case 'top':
            y -= offset.value[1];
            break;
          case 'bottom':
            y += offset.value[1];
            break;
          case 'left':
            x -= offset.value[1];
            break;
          case 'right':
            x += offset.value[1];
            break;
        }
        box.x += x;
        box.y += y;
        box.width = Math.min(box.width, maxWidth.value);
        box.height = Math.min(box.height, maxHeight.value);
        const overflows = getOverflow(box, viewport);
        return {
          overflows,
          x,
          y
        };
      }
      let x = 0;
      let y = 0;
      const available = {
        x: 0,
        y: 0
      };
      const flipped = {
        x: false,
        y: false
      };
      let resets = -1;
      while (true) {
        if (resets++ > 10) {
          consoleError('Infinite loop detected in connectedLocationStrategy');
          break;
        }
        const {
          x: _x,
          y: _y,
          overflows
        } = checkOverflow(placement);
        x += _x;
        y += _y;
        contentBox.x += _x;
        contentBox.y += _y;

        // flip
        {
          const axis = getAxis(placement.anchor);
          const hasOverflowX = overflows.x.before || overflows.x.after;
          const hasOverflowY = overflows.y.before || overflows.y.after;
          let reset = false;
          ['x', 'y'].forEach(key => {
            if (key === 'x' && hasOverflowX && !flipped.x || key === 'y' && hasOverflowY && !flipped.y) {
              const newPlacement = {
                anchor: {
                  ...placement.anchor
                },
                origin: {
                  ...placement.origin
                }
              };
              const flip = key === 'x' ? axis === 'y' ? flipAlign : flipSide : axis === 'y' ? flipSide : flipAlign;
              newPlacement.anchor = flip(newPlacement.anchor);
              newPlacement.origin = flip(newPlacement.origin);
              const {
                overflows: newOverflows
              } = checkOverflow(newPlacement);
              if (newOverflows[key].before <= overflows[key].before && newOverflows[key].after <= overflows[key].after || newOverflows[key].before + newOverflows[key].after < (overflows[key].before + overflows[key].after) / 2) {
                placement = newPlacement;
                reset = flipped[key] = true;
              }
            }
          });
          if (reset) continue;
        }

        // shift
        if (overflows.x.before) {
          x += overflows.x.before;
          contentBox.x += overflows.x.before;
        }
        if (overflows.x.after) {
          x -= overflows.x.after;
          contentBox.x -= overflows.x.after;
        }
        if (overflows.y.before) {
          y += overflows.y.before;
          contentBox.y += overflows.y.before;
        }
        if (overflows.y.after) {
          y -= overflows.y.after;
          contentBox.y -= overflows.y.after;
        }

        // size
        {
          const overflows = getOverflow(contentBox, viewport);
          available.x = viewport.width - overflows.x.before - overflows.x.after;
          available.y = viewport.height - overflows.y.before - overflows.y.after;
          x += overflows.x.before;
          contentBox.x += overflows.x.before;
          y += overflows.y.before;
          contentBox.y += overflows.y.before;
        }
        break;
      }
      const axis = getAxis(placement.anchor);
      Object.assign(contentStyles.value, {
        '--v-overlay-anchor-origin': `${placement.anchor.side} ${placement.anchor.align}`,
        transformOrigin: `${placement.origin.side} ${placement.origin.align}`,
        // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
        top: convertToUnit(pixelRound(y)),
        left: data.isRtl.value ? undefined : convertToUnit(pixelRound(x)),
        right: data.isRtl.value ? convertToUnit(pixelRound(-x)) : undefined,
        minWidth: convertToUnit(axis === 'y' ? Math.min(minWidth.value, targetBox.width) : minWidth.value),
        maxWidth: convertToUnit(pixelCeil(clamp(available.x, minWidth.value === Infinity ? 0 : minWidth.value, maxWidth.value))),
        maxHeight: convertToUnit(pixelCeil(clamp(available.y, minHeight.value === Infinity ? 0 : minHeight.value, maxHeight.value)))
      });
      return {
        available,
        contentBox
      };
    }
    watch(() => [preferredAnchor.value, preferredOrigin.value, props.offset, props.minWidth, props.minHeight, props.maxWidth, props.maxHeight], () => updateLocation());
    nextTick(() => {
      const result = updateLocation();

      // TODO(Vuetify): overflowing content should only require a single updateLocation call
      // Icky hack to make sure the content is positioned consistently
      if (!result) return;
      const {
        available,
        contentBox
      } = result;
      if (contentBox.height > available.y) {
        requestAnimationFrame(() => {
          updateLocation();
          requestAnimationFrame(() => {
            updateLocation();
          });
        });
      }
    });
    return {
      updateLocation
    };
  }
  function pixelRound(val) {
    return Math.round(val * devicePixelRatio) / devicePixelRatio;
  }
  function pixelCeil(val) {
    return Math.ceil(val * devicePixelRatio) / devicePixelRatio;
  }

  let clean = true;
  const frames = [];

  /**
   * Schedule a task to run in an animation frame on its own
   * This is useful for heavy tasks that may cause jank if all ran together
   */
  function requestNewFrame(cb) {
    if (!clean || frames.length) {
      frames.push(cb);
      run();
    } else {
      clean = false;
      cb();
      run();
    }
  }
  let raf = -1;
  function run() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const frame = frames.shift();
      if (frame) frame();
      if (frames.length) run();else clean = true;
    });
  }

  // TODO(Alpinui) - DOES THIS WORK AS INTENDED? I DONT KNOW!


  // Types

  const scrollStrategies = {
    none: null,
    close: closeScrollStrategy,
    block: blockScrollStrategy,
    reposition: repositionScrollStrategy
  };
  const makeScrollStrategyProps = propsFactory({
    scrollStrategy: {
      type: [String, Function],
      default: 'block',
      validator: val => typeof val === 'function' || val in scrollStrategies
    }
  }, 'VOverlay-scroll-strategies');
  function useScrollStrategies(vm, props, data) {
    if (!IN_BROWSER) return;
    const {
      watchEffect
    } = vm.reactivity;

    // NOTE(ALpinui): Removed Effect scope
    watchEffect(async () => {
      if (!(data.isActive.value && props.scrollStrategy)) return;
      await new Promise(resolve => setTimeout(resolve));
      if (typeof props.scrollStrategy === 'function') {
        props.scrollStrategy(data, props);
      } else {
        scrollStrategies[props.scrollStrategy]?.(vm, data, props);
      }
    });
  }
  function closeScrollStrategy(vm, data) {
    function onScroll(e) {
      data.isActive.value = false;
    }
    bindScroll(vm, data.targetEl.value ?? data.contentEl.value, onScroll);
  }
  function blockScrollStrategy(vm, data, props) {
    const {
      onBeforeUnmount
    } = vm.reactivity;
    const offsetParent = data.root.value?.offsetParent;
    const scrollElements = [...new Set([...getScrollParents(data.targetEl.value, props.contained ? offsetParent : undefined), ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : undefined)])].filter(el => !el.classList.contains('v-overlay-scroll-blocked'));
    const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
    const scrollableParent = (el => hasScrollbar(el) && el)(offsetParent || document.documentElement);
    if (scrollableParent) {
      data.root.value.classList.add('v-overlay--scroll-blocked');
    }
    scrollElements.forEach((el, i) => {
      el.style.setProperty('--v-body-scroll-x', convertToUnit(-el.scrollLeft));
      el.style.setProperty('--v-body-scroll-y', convertToUnit(-el.scrollTop));
      if (el !== document.documentElement) {
        el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth));
      }
      el.classList.add('v-overlay-scroll-blocked');
    });
    onBeforeUnmount(() => {
      scrollElements.forEach((el, i) => {
        const x = parseFloat(el.style.getPropertyValue('--v-body-scroll-x'));
        const y = parseFloat(el.style.getPropertyValue('--v-body-scroll-y'));
        const scrollBehavior = el.style.scrollBehavior;
        el.style.scrollBehavior = 'auto';
        el.style.removeProperty('--v-body-scroll-x');
        el.style.removeProperty('--v-body-scroll-y');
        el.style.removeProperty('--v-scrollbar-offset');
        el.classList.remove('v-overlay-scroll-blocked');
        el.scrollLeft = -x;
        el.scrollTop = -y;
        el.style.scrollBehavior = scrollBehavior;
      });
      if (scrollableParent) {
        data.root.value.classList.remove('v-overlay--scroll-blocked');
      }
    });
  }
  function repositionScrollStrategy(vm, data, props) {
    const {
      onBeforeUnmount
    } = vm.reactivity;
    let slow = false;
    let raf = -1;
    let ric = -1;
    function update(e) {
      requestNewFrame(() => {
        const start = performance.now();
        data.updateLocation.value?.(e);
        const time = performance.now() - start;
        slow = time / (1000 / 60) > 2;
      });
    }
    ric = (typeof requestIdleCallback === 'undefined' ? cb => cb() : requestIdleCallback)(() => {
      bindScroll(vm, data.targetEl.value ?? data.contentEl.value, e => {
        if (slow) {
          // If the position calculation is slow,
          // defer updates until scrolling is finished.
          // Browsers usually fire one scroll event per frame so
          // we just wait until we've got two frames without an event
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => {
              update(e);
            });
          });
        } else {
          update(e);
        }
      });
    });
    onBeforeUnmount(() => {
      typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(ric);
      cancelAnimationFrame(raf);
    });
  }

  /** @private */
  function bindScroll(vm, el, onScroll) {
    const {
      onBeforeUnmount
    } = vm.reactivity;
    const scrollElements = [document, ...getScrollParents(el)];
    scrollElements.forEach(el => {
      el.addEventListener('scroll', onScroll, {
        passive: true
      });
    });
    onBeforeUnmount(() => {
      scrollElements.forEach(el => {
        el.removeEventListener('scroll', onScroll);
      });
    });
  }

  // Types

  const VMenuSymbol = Symbol.for('vuetify:v-menu');

  // Utilities

  // Types

  // Composables
  const makeDelayProps = propsFactory({
    closeDelay: [Number, String],
    openDelay: [Number, String]
  }, 'delay');
  function useDelay(props, cb) {
    let clearDelay = () => {};
    function runDelay(isOpening) {
      clearDelay?.();
      const delay = Number(isOpening ? props.openDelay : props.closeDelay);
      return new Promise(resolve => {
        clearDelay = defer(delay, () => {
          cb?.(isOpening);
          resolve(isOpening);
        });
      });
    }
    function runOpenDelay() {
      return runDelay(true);
    }
    function runCloseDelay() {
      return runDelay(false);
    }
    return {
      clearDelay,
      runOpenDelay,
      runCloseDelay
    };
  }

  // Utilities
  const handlers = new WeakMap();
  function bindProps(el, props) {
    Object.keys(props).forEach(k => {
      if (isOn(k)) {
        const name = eventName(k);
        const handler = handlers.get(el);
        if (props[k] == null) {
          handler?.forEach(v => {
            const [n, fn] = v;
            if (n === name) {
              el.removeEventListener(name, fn);
              handler.delete(v);
            }
          });
        } else if (!handler || ![...handler]?.some(v => v[0] === name && v[1] === props[k])) {
          el.addEventListener(name, props[k]);
          const _handler = handler || new Set();
          _handler.add([name, props[k]]);
          if (!handlers.has(el)) handlers.set(el, _handler);
        }
      } else {
        if (props[k] == null) {
          el.removeAttribute(k);
        } else {
          el.setAttribute(k, props[k]);
        }
      }
    });
  }
  function unbindProps(el, props) {
    Object.keys(props).forEach(k => {
      if (isOn(k)) {
        const name = eventName(k);
        const handler = handlers.get(el);
        handler?.forEach(v => {
          const [n, fn] = v;
          if (n === name) {
            el.removeEventListener(name, fn);
            handler.delete(v);
          }
        });
      } else {
        el.removeAttribute(k);
      }
    });
  }

  // Components

  // Types

  const makeActivatorProps = propsFactory({
    target: [String, Object],
    activator: [String, Object],
    activatorProps: {
      type: Object,
      default: () => ({})
    },
    openOnClick: {
      type: Boolean,
      default: undefined
    },
    openOnHover: Boolean,
    openOnFocus: {
      type: Boolean,
      default: undefined
    },
    closeOnContentClick: Boolean,
    ...makeDelayProps()
  }, 'VOverlay-activator');
  function useActivator(vm, props, _ref) {
    let {
      isActive,
      isTop
    } = _ref;
    const {
      computed,
      inject,
      nextTick,
      ref,
      watch,
      watchEffect
    } = vm.reactivity;
    const activatorEl = ref();
    let isHovered = false;
    let isFocused = false;
    let firstEnter = true;
    const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
    const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, value => {
      if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused) && !(props.openOnHover && isActive.value && !isTop.value)) {
        if (isActive.value !== value) {
          firstEnter = true;
        }
        isActive.value = value;
      }
    });
    const cursorTarget = ref();
    const availableEvents = {
      onClick: e => {
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        if (!isActive.value) {
          cursorTarget.value = [e.clientX, e.clientY];
        }
        isActive.value = !isActive.value;
      },
      onMouseenter: e => {
        if (e.sourceCapabilities?.firesTouchEvents) return;
        isHovered = true;
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      onMouseleave: e => {
        isHovered = false;
        runCloseDelay();
      },
      onFocus: e => {
        if (matchesSelector(e.target, ':focus-visible') === false) return;
        isFocused = true;
        e.stopPropagation();
        activatorEl.value = e.currentTarget || e.target;
        runOpenDelay();
      },
      onBlur: e => {
        isFocused = false;
        e.stopPropagation();
        runCloseDelay();
      }
    };
    const activatorEvents = computed(() => {
      const events = {};
      if (openOnClick.value) {
        events.onClick = availableEvents.onClick;
      }
      if (props.openOnHover) {
        events.onMouseenter = availableEvents.onMouseenter;
        events.onMouseleave = availableEvents.onMouseleave;
      }
      if (openOnFocus.value) {
        events.onFocus = availableEvents.onFocus;
        events.onBlur = availableEvents.onBlur;
      }
      return events;
    });
    const contentEvents = computed(() => {
      const events = {};
      if (props.openOnHover) {
        events.onMouseenter = () => {
          isHovered = true;
          runOpenDelay();
        };
        events.onMouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      if (openOnFocus.value) {
        events.onFocusin = () => {
          isFocused = true;
          runOpenDelay();
        };
        events.onFocusout = () => {
          isFocused = false;
          runCloseDelay();
        };
      }
      if (props.closeOnContentClick) {
        const menu = inject(VMenuSymbol, null);
        events.onClick = () => {
          isActive.value = false;
          menu?.closeParents();
        };
      }
      return events;
    });
    const scrimEvents = computed(() => {
      const events = {};
      if (props.openOnHover) {
        events.onMouseenter = () => {
          if (firstEnter) {
            isHovered = true;
            firstEnter = false;
            runOpenDelay();
          }
        };
        events.onMouseleave = () => {
          isHovered = false;
          runCloseDelay();
        };
      }
      return events;
    });
    watch(isTop, val => {
      if (val && (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused) || openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))) {
        isActive.value = false;
      }
    });
    watch(isActive, val => {
      if (!val) {
        setTimeout(() => {
          cursorTarget.value = undefined;
        });
      }
    }, {
      flush: 'post'
    });
    const activatorRef = templateRef(vm);
    watchEffect(() => {
      if (!activatorRef.value) return;
      nextTick(() => {
        activatorEl.value = activatorRef.el;
      });
    });
    const targetRef = templateRef(vm);
    const target = computed(() => {
      if (props.target === 'cursor' && cursorTarget.value) return cursorTarget.value;
      if (targetRef.value) return targetRef.el;
      return getTarget(vm, props.target) || activatorEl.value;
    });
    const targetEl = computed(() => {
      return Array.isArray(target.value) ? undefined : target.value;
    });

    // NOTE(Alpinui): Removed the EffectScope
    if (IN_BROWSER) {
      _useActivator(vm, props, {
        activatorEl,
        activatorEvents
      });
    }
    return {
      activatorEl,
      activatorRef,
      target,
      targetEl,
      targetRef,
      activatorEvents,
      contentEvents,
      scrimEvents
    };
  }
  function _useActivator(vm, props, _ref2) {
    let {
      activatorEl,
      activatorEvents
    } = _ref2;
    const {
      nextTick,
      watch,
      onBeforeUnmount
    } = vm.reactivity;
    watch(() => props.activator, (val, oldVal) => {
      if (!val) {
        unbindActivatorProps();
      }
      if (oldVal && val !== oldVal) {
        const activator = getActivator(oldVal);
        activator && unbindActivatorProps(activator);
      }
      if (val) {
        nextTick(() => bindActivatorProps());
      }
    }, {
      immediate: true
    });
    watch(() => props.activatorProps, () => {
      bindActivatorProps();
    });

    // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
    onBeforeUnmount(() => {
      unbindActivatorProps();
    });
    function bindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;
      if (!el) return;
      bindProps(el, mergeProps(activatorEvents.value, _props));
    }
    function unbindActivatorProps() {
      let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();
      let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;
      if (!el) return;
      unbindProps(el, mergeProps(activatorEvents.value, _props));
    }
    function getActivator() {
      let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.activator;
      const activator = getTarget(vm, selector);

      // The activator should only be a valid element (Ignore comments and text nodes)
      activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : undefined;
      return activatorEl.value;
    }
  }
  function getTarget(vm, selector) {
    if (!selector) return;
    let target;
    if (selector === 'parent') {
      // NOTE(Alpnui): Replaced `parentNode` with `parentElement`
      let el = vm?.el?.parentElement;
      while (el?.hasAttribute('data-no-activator')) {
        el = el.parentElement;
      }
      target = el;
    } else if (typeof selector === 'string') {
      // Selector
      target = document.querySelector(selector);
    } else if ('$el' in selector) {
      // Component (ref)
      target = selector.$el;
    } else {
      // HTMLElement | Element | [x, y]
      target = selector;
    }
    return target;
  }

  // Composables

  // Types

  function useHydration(vm) {
    const {
      onMounted,
      shallowRef
    } = vm.reactivity;
    if (!IN_BROWSER) return shallowRef(false);
    const {
      ssr
    } = useDisplay$1(vm);
    if (ssr) {
      const isMounted = shallowRef(false);
      onMounted(() => {
        isMounted.value = true;
      });
      return isMounted;
    } else {
      return shallowRef(true);
    }
  }

  // Utilities

  // Types

  const makeLazyProps = propsFactory({
    eager: Boolean
  }, 'lazy');
  const useLazy = (vm, props, active) => {
    const {
      computed,
      shallowRef,
      watch
    } = vm.reactivity;
    const isBooted = shallowRef(false);
    const hasContent = computed(() => isBooted.value || props.eager || active.value);
    watch(active, () => isBooted.value = true);
    const onAfterLeave = () => {
      if (!props.eager) isBooted.value = false;
    };
    return {
      isBooted,
      hasContent,
      onAfterLeave
    };
  };

  // Types

  function useScopeId(vm) {
    if (vm.type === 'vue') {
      const scopeId = vm.instance().vnode.scopeId;
      return {
        scopeId: scopeId ? {
          [scopeId]: ''
        } : undefined
      };
    } else {
      // useScopeId is NOOP for AlpineJS
      return {
        scopeId: undefined
      };
    }
  }

  // Utilities

  // Types

  const StackSymbol = Symbol.for('vuetify:stack');
  // NOTE(Alpinui): In AlpineJS we use element instead of uid
  let globalStack = null;
  function useStack(vm, isActive, zIndex, disableGlobalStack) {
    const {
      computed,
      inject,
      provide,
      reactive,
      readonly,
      shallowRef,
      toRaw,
      watch,
      watchEffect
    } = vm.reactivity;
    if (globalStack == null) globalStack = reactive([]);
    const createStackEntry = !disableGlobalStack;
    const parent = inject(StackSymbol, undefined);
    const stack = reactive({
      activeChildren: new Set()
    });
    provide(StackSymbol, stack);
    const _zIndex = shallowRef(+zIndex.value);

    // NOTE(Alpinui): Refactored from `useToggleScope`
    watch(isActive, () => {
      const uid = getUid(vm);

      // Add to stack
      if (isActive.value) {
        const lastZIndex = globalStack.at(-1)?.[1];
        _zIndex.value = lastZIndex ? lastZIndex + 10 : +zIndex.value;
        if (createStackEntry) {
          globalStack.push([uid, _zIndex.value]);
        }
        parent?.activeChildren.add(uid);
      } else {
        // Remove from stack
        if (createStackEntry) {
          const idx = toRaw(globalStack).findIndex(v => v[0] === uid);
          globalStack.splice(idx, 1);
        }
        parent?.activeChildren.delete(uid);
      }
    });
    const globalTop = shallowRef(true);
    if (createStackEntry) {
      watchEffect(() => {
        const uid = getUid(vm);
        const _isTop = globalStack.at(-1)?.[0] === uid;
        setTimeout(() => globalTop.value = _isTop);
      });
    }
    const localTop = computed(() => !stack.activeChildren.size);
    return {
      globalTop: readonly(globalTop),
      localTop,
      stackStyles: computed(() => ({
        zIndex: _zIndex.value
      }))
    };
  }

  // Utilities

  // Types

  function useTeleport(vm, target) {
    const {
      computed
    } = vm.reactivity;
    const teleportTarget = computed(() => {
      const _target = target();
      if (_target === true || !IN_BROWSER) return undefined;
      const targetElement = _target === false ? document.body : typeof _target === 'string' ? document.querySelector(_target) : _target;
      if (targetElement == null) {
        consoleWarn(`Unable to locate target ${_target}`);
        return undefined;
      }
      let container = targetElement.querySelector(':scope > .v-overlay-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'v-overlay-container';
        targetElement.appendChild(container);
      }
      return container;
    });
    return {
      teleportTarget
    };
  }

  // Styles

  // Types

  const makeVOverlayProps = propsFactory({
    absolute: Boolean,
    attach: [Boolean, String, Object],
    closeOnBack: {
      type: Boolean,
      default: true
    },
    contained: Boolean,
    contentClass: null,
    contentProps: null,
    opacity: [Number, String],
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [Boolean, String],
      default: true
    },
    zIndex: {
      type: [Number, String],
      default: 2000
    },
    ...makeActivatorProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeLazyProps(),
    ...makeLocationStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps()
  }, 'VOverlay');
  const _Overlay = defineComponent({
    name: 'VOverlay',
    inheritAttrs: false,
    props: {
      /* eslint-disable-next-line vue/prop-name-casing */
      _disableGlobalStack: Boolean,
      ...makeVOverlayProps()
    },
    emits: {
      'click:outside': e => true,
      'update:modelValue': value => true,
      afterEnter: () => true,
      afterLeave: () => true
    },
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        onBeforeUnmount,
        ref,
        toRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const isActive = computed({
        get: () => model.value,
        set: v => {
          if (!(v && props.disabled)) model.value = v;
        }
      });
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        rtlClasses,
        isRtl
      } = useRtl$1(vm);
      const {
        hasContent,
        onAfterLeave: _onAfterLeave
      } = useLazy(vm, props, isActive);
      const scrimColor = useBackgroundColor(vm, computed(() => {
        return typeof props.scrim === 'string' ? props.scrim : null;
      }));
      const {
        globalTop,
        localTop,
        stackStyles
      } = useStack(vm, isActive, toRef(props, 'zIndex'), props._disableGlobalStack);
      const {
        activatorEl,
        activatorRef,
        target,
        targetEl,
        targetRef,
        activatorEvents,
        contentEvents,
        scrimEvents
      } = useActivator(vm, props, {
        isActive,
        isTop: localTop
      });
      const {
        teleportTarget
      } = useTeleport(vm, () => {
        const target = props.attach || props.contained;
        if (target) return target;
        const rootNode = activatorEl?.value?.getRootNode();
        if (rootNode instanceof ShadowRoot) return rootNode;
        return false;
      });
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const isMounted = useHydration(vm);
      const {
        scopeId
      } = useScopeId(vm);
      watch(() => props.disabled, v => {
        if (v) isActive.value = false;
      });
      const root = ref();
      const scrimEl = ref();
      const contentEl = ref();
      const {
        contentStyles: locationContentStyles,
        updateLocation
      } = useLocationStrategies(vm, props, {
        isRtl,
        contentEl,
        target,
        isActive
      });
      useScrollStrategies(vm, props, {
        root,
        contentEl,
        targetEl,
        isActive,
        updateLocation
      });
      function onClickOutside(e) {
        vm.emit('click:outside', e);
        if (!props.persistent) isActive.value = false;else animateClick();
      }
      function closeConditional(e) {
        return isActive.value && globalTop.value && (
        // If using scrim, only close if clicking on it rather than anything opened on top
        !props.scrim || e.target === scrimEl.value);
      }
      IN_BROWSER && watch(isActive, val => {
        if (val) {
          window.addEventListener('keydown', onKeydown);
        } else {
          window.removeEventListener('keydown', onKeydown);
        }
      }, {
        immediate: true
      });
      onBeforeUnmount(() => {
        if (!IN_BROWSER) return;
        window.removeEventListener('keydown', onKeydown);
      });
      function onKeydown(e) {
        if (e.key === 'Escape' && globalTop.value) {
          if (!props.persistent) {
            isActive.value = false;
            if (contentEl.value?.contains(document.activeElement)) {
              activatorEl.value?.focus();
            }
          } else animateClick();
        }
      }

      // NOTE(Alpinui): Should be noop in AlpineJS
      const router = useRouter(vm);
      useBackButton(vm, router, next => {
        if (globalTop.value && isActive.value) {
          next(false);
          if (!props.persistent) isActive.value = false;else animateClick();
        } else {
          next();
        }
      });

      // NOTE(Alpinui): Remove `useToggleScope`
      useBackButton(vm, router, next => {
        if (globalTop.value && isActive.value && props.closeOnBack) {
          next(false);
          if (!props.persistent) isActive.value = false;else animateClick();
        } else {
          next();
        }
      });
      const top = ref();
      watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
        if (val) {
          const scrollParent = getScrollParent(root.value);
          if (scrollParent && scrollParent !== document.scrollingElement) {
            top.value = scrollParent.scrollTop;
          }
        }
      });

      // Add a quick "bounce" animation to the content
      function animateClick() {
        if (props.noClickAnimation) return;
        contentEl.value && animate(contentEl.value, [{
          transformOrigin: 'center'
        }, {
          transform: 'scale(1.03)'
        }, {
          transformOrigin: 'center'
        }], {
          duration: 150,
          easing: standardEasing
        });
      }
      function onAfterEnter() {
        vm.emit('afterEnter');
      }
      function onAfterLeave() {
        _onAfterLeave();
        vm.emit('afterLeave');
      }
      const rootClasses = computed(() => normalizeClass(['v-overlay', {
        'v-overlay--absolute': props.absolute || props.contained,
        'v-overlay--active': isActive.value,
        'v-overlay--contained': props.contained
      }, themeClasses.value, rtlClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([stackStyles.value, {
        '--v-overlay-opacity': props.opacity,
        top: convertToUnit(top.value)
      }, styles.value]));
      const contentClasses = computed(() => normalizeClass(['v-overlay__content', props.contentClass]));
      const contentStyles = computed(() => normalizeStyle([dimensionStyles.value, locationContentStyles.value]));
      return {
        expose: {
          activatorEl,
          scrimEl,
          target,
          animateClick,
          contentEl,
          globalTop,
          localTop,
          updateLocation
        },
        renderInput: {
          isActive,
          activatorEl,
          activatorRef,
          activatorEvents,
          contentEl,
          contentClasses,
          contentEvents,
          contentStyles,
          hasContent,
          isMounted,
          root,
          rootClasses,
          rootStyles,
          scopeId,
          scrimEl,
          scrimEvents,
          scrimColor,
          teleportTarget,
          target,
          targetRef,
          onAfterEnter,
          onAfterLeave,
          onClickOutside,
          closeConditional
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVDialogProps = propsFactory({
    fullscreen: Boolean,
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    ...makeVOverlayProps({
      origin: 'center center',
      scrollStrategy: 'block',
      // NOTE(Alpinui): The default component is set in `VDialog.tsx`
      transition: {
        component: null
      },
      zIndex: 2400
    })
  }, 'VDialog');
  const _Dialog = defineComponent({
    name: 'VDialog',
    props: makeVDialogProps(),
    emits: {
      'update:modelValue': value => true,
      afterLeave: () => true
    },
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const {
        scopeId
      } = useScopeId(vm);
      const overlay = ref();
      function onFocusin(e) {
        const before = e.relatedTarget;
        const after = e.target;
        if (before !== after && overlay.value?.contentEl &&
        // We're the topmost dialog
        overlay.value?.globalTop &&
        // It isn't the document or the dialog body
        ![document, overlay.value.contentEl].includes(after) &&
        // It isn't inside the dialog body
        !overlay.value.contentEl.contains(after)) {
          const focusable = focusableChildren(overlay.value.contentEl);
          if (!focusable.length) return;
          const firstElement = focusable[0];
          const lastElement = focusable[focusable.length - 1];
          if (before === firstElement) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
        }
      }
      if (IN_BROWSER) {
        watch(() => isActive.value && props.retainFocus, val => {
          val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
        }, {
          immediate: true
        });
      }
      function onAfterEnter() {
        if (overlay.value?.contentEl && !overlay.value.contentEl.contains(document.activeElement)) {
          overlay.value.contentEl.focus({
            preventScroll: true
          });
        }
      }
      function onAfterLeave() {
        vm.emit('afterLeave');
      }
      watch(isActive, async val => {
        if (!val) {
          await nextTick();
          overlay.value.activatorEl?.focus({
            preventScroll: true
          });
        }
      });
      const overlayProps = computed(() => _Overlay.filterProps(props));
      const activatorProps = computed(() => mergeProps({
        'aria-haspopup': 'dialog',
        'aria-expanded': String(isActive.value)
      }, props.activatorProps));
      const contentProps = computed(() => mergeProps({
        tabindex: -1
      }, props.contentProps));
      const rootClasses = computed(() => normalizeClass(['v-dialog', {
        'v-dialog--fullscreen': props.fullscreen,
        'v-dialog--scrollable': props.scrollable
      }, classes.value]));
      return {
        expose: forwardRefs({}, overlay),
        renderInput: {
          activatorProps,
          contentProps,
          overlayProps,
          isActive,
          overlay,
          onAfterEnter,
          onAfterLeave,
          scopeId,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVBottomSheetProps = propsFactory({
    inset: Boolean,
    ...makeVDialogProps({
      transition: 'bottom-sheet-transition'
    })
  }, 'VBottomSheet');
  const _BottomSheet = defineComponent({
    name: 'VBottomSheet',
    props: makeVBottomSheetProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const dialogProps = computed(() => _Dialog.filterProps(props));
      const dialogClasses = computed(() => normalizeClass(['v-bottom-sheet__content', props.contentClass]));
      const rootClasses = computed(() => normalizeClass(['v-bottom-sheet', {
        'v-bottom-sheet--inset': props.inset
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          dialogClasses,
          dialogProps,
          isActive,
          rootClasses,
          roootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABottomSheet = defineAlpineComponent({
    ..._BottomSheet,
    name: 'ABottomSheet'
  });

  // Styles
  const makeVBreadcrumbsProps = propsFactory({
    activeClass: String,
    activeColor: String,
    bgColor: String,
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/'
    },
    icon: IconValue,
    items: {
      type: Array,
      default: () => []
    },
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'ul'
    })
  }, 'VBreadcrumbs');
  const _Breadcrumbs = defineComponent({
    name: 'VBreadcrumbs',
    props: makeVBreadcrumbsProps(),
    slots: makeSlots({
      prepend: null,
      title: null,
      divider: null,
      item: null,
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'bgColor'));
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      provideDefaults(vm, {
        VBreadcrumbsDivider: {
          divider: toRef(props, 'divider')
        },
        VBreadcrumbsItem: {
          activeClass: toRef(props, 'activeClass'),
          activeColor: toRef(props, 'activeColor'),
          color: toRef(props, 'color'),
          disabled: toRef(props, 'disabled')
        }
      });
      const items = computed(() => props.items.map(item => {
        return typeof item === 'string' ? {
          item: {
            title: item
          },
          raw: item
        } : {
          item,
          raw: item
        };
      }));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-breadcrumbs', backgroundColorClasses.value, densityClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, styles.value]));
      const prependDefaults = computed(() => ({
        VIcon: {
          icon: props.icon,
          start: true
        }
      }));
      return {
        expose: {},
        renderInput: {
          items,
          prependDefaults,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABreadcrumbs = defineAlpineComponent({
    ..._Breadcrumbs,
    name: 'ABreadcrumbs'
  });

  // Composables

  // Types

  const makeVBreadcrumbsItemProps = propsFactory({
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    title: String,
    ...makeComponentProps(),
    ...makeRouterProps(),
    ...makeTagProps({
      tag: 'li'
    })
  }, 'VBreadcrumbsItem');
  const _BreadcrumbsItem = defineComponent({
    name: 'VBreadcrumbsItem',
    props: makeVBreadcrumbsItemProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const link = useRouterLink(vm, props, vm.attrs);
      const isActive = computed(() => props.active || link.isActive?.value);
      const color = computed(() => isActive.value ? props.activeColor : props.color);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, color);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-breadcrumbs-item', {
        'v-breadcrumbs-item--active': !!isActive.value,
        'v-breadcrumbs-item--disabled': props.disabled,
        [`${props.activeClass}`]: !!(isActive.value && props.activeClass)
      }, textColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([textColorStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          isActive,
          link,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABreadcrumbsItem = defineAlpineComponent({
    ..._BreadcrumbsItem,
    name: 'ABreadcrumbsItem'
  });

  // Composables

  // Types

  const makeVBreadcrumbsDividerProps = propsFactory({
    divider: [Number, String],
    ...makeComponentProps()
  }, 'VBreadcrumbsDivider');
  const _BreadcrumbsDivider = defineComponent({
    name: 'VBreadcrumbsDivider',
    props: makeVBreadcrumbsDividerProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-breadcrumbs-divider', classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABreadcrumbsDivider = defineAlpineComponent({
    ..._BreadcrumbsDivider,
    name: 'ABreadcrumbsDivider'
  });

  // Types

  const ABtn = defineAlpineComponent({
    ..._Btn,
    name: 'ABtn'
  });

  // Types

  const ABtnGroup = defineAlpineComponent({
    ..._BtnGroup,
    name: 'ABtnGroup'
  });

  // Types

  const ABtnToggle = defineAlpineComponent({
    ..._BtnToggle,
    name: 'ABtnToggle'
  });

  /* eslint-disable complexity */

  const makeVCardProps = propsFactory({
    appendAvatar: String,
    appendIcon: IconValue,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: {
      type: Boolean,
      default: undefined
    },
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    subtitle: [String, Number],
    text: [String, Number],
    title: [String, Number],
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'elevated'
    })
  }, 'VCard');
  const _Card = defineComponent({
    name: 'VCard',
    props: makeVCardProps(),
    slots: makeSlots({
      default: null,
      actions: null,
      text: null,
      loader: null,
      image: null,
      item: null,
      prepend: null,
      append: null,
      title: null,
      subtitle: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        loaderClasses
      } = useLoader(vm, props);
      const {
        locationStyles
      } = useLocation(vm, props);
      const {
        positionClasses
      } = usePosition(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const link = useRouterLink(vm, props, vm.attrs);
      const isLink = computed(() => props.link !== false && link.isLink.value);
      const isClickable = computed(() => !props.disabled && props.link !== false && !!(props.link || link.isClickable.value));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass([{
        'v-card': true,
        'v-card--disabled': props.disabled,
        'v-card--flat': props.flat,
        'v-card--hover': props.hover && !(props.disabled || props.flat),
        'v-card--link': isClickable.value
      }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, loaderClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([colorStyles.value, dimensionStyles.value, locationStyles.value, styles.value]));
      const imageDefaults = computed(() => ({
        VImg: {
          cover: true,
          src: props.image
        }
      }));
      const loaderColor = computed(() => typeof props.loading === 'boolean' ? undefined : props.loading);
      return {
        expose: {},
        renderInput: {
          isClickable,
          isLink,
          link,
          loaderColor,
          rootClasses,
          rootStyles,
          imageDefaults
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACard = defineAlpineComponent({
    ..._Card,
    name: 'ACard'
  });

  // Composables
  const _CardActions = defineComponent({
    name: 'VCardActions',
    props: makeComponentProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      provideDefaults(vm, {
        VBtn: {
          slim: true,
          variant: 'text'
        }
      });
      const rootClasses = computed(() => ['v-card-actions', classes.value]);
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACardActions = defineAlpineComponent({
    ..._CardActions,
    name: 'ACardActions'
  });

  // Composables
  const makeVCardItemProps = propsFactory({
    appendAvatar: String,
    appendIcon: IconValue,
    prependAvatar: String,
    prependIcon: IconValue,
    subtitle: [String, Number],
    title: [String, Number],
    ...makeComponentProps(),
    ...makeDensityProps()
  }, 'VCardItem');
  const _CardItem = defineComponent({
    name: 'VCardItem',
    props: makeVCardItemProps(),
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      title: null,
      subtitle: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-card-item', classes.value]));
      const prependDefaults = computed(() => ({
        VAvatar: {
          density: props.density,
          image: props.prependAvatar
        },
        VIcon: {
          density: props.density,
          icon: props.prependIcon
        }
      }));
      const appendDefaults = computed(() => ({
        VAvatar: {
          density: props.density,
          image: props.appendAvatar
        },
        VIcon: {
          density: props.density,
          icon: props.appendIcon
        }
      }));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles,
          prependDefaults,
          appendDefaults
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACardItem = defineAlpineComponent({
    ..._CardItem,
    name: 'ACardItem'
  });

  // Composables

  // Types

  const makeVCardSubtitleProps = propsFactory({
    opacity: [Number, String],
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VCardSubtitle');
  const _CardSubtitle = defineComponent({
    name: 'VCardSubtitle',
    props: makeVCardSubtitleProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-card-subtitle', classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-card-subtitle-opacity': props.opacity
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACardSubtitle = defineAlpineComponent({
    ..._CardSubtitle,
    name: 'ACardSubtitle'
  });

  // Composables

  // Types

  const makeVCardTextProps = propsFactory({
    opacity: [Number, String],
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VCardText');
  const _CardText = defineComponent({
    name: 'VCardText',
    props: makeVCardTextProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-card-text', classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-card-text-opacity': props.opacity
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACardText = defineAlpineComponent({
    ..._CardText,
    name: 'ACardText'
  });

  // Composables

  // Types

  const klass$6 = 'v-card-title';
  const _CardTitle = createSimpleFunctionalHeadless(klass$6);

  // Types

  const ACardTitle = defineAlpineComponent({
    ..._CardTitle,
    name: 'ACardTitle'
  });

  // Styles

  // Types

  const VWindowSymbol = Symbol.for('vuetify:v-window');
  const VWindowGroupSymbol = Symbol.for('vuetify:v-window-group');
  const makeVWindowProps = propsFactory({
    continuous: Boolean,
    nextIcon: {
      type: [Boolean, String, Function, Object],
      default: '$next'
    },
    prevIcon: {
      type: [Boolean, String, Function, Object],
      default: '$prev'
    },
    reverse: Boolean,
    showArrows: {
      type: [Boolean, String],
      validator: v => typeof v === 'boolean' || v === 'hover'
    },
    touch: {
      type: [Object, Boolean],
      default: undefined
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    modelValue: null,
    disabled: Boolean,
    selectedClass: {
      type: String,
      default: 'v-window-item--active'
    },
    // TODO(Vuetify): mandatory should probably not be exposed but do this for now
    mandatory: {
      type: [Boolean, String],
      default: 'force'
    },
    ...makeComponentProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VWindow');
  const _Window = defineComponent({
    name: 'VWindow',
    props: makeVWindowProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      additional: null,
      prev: null,
      next: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        provide,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isRtl
      } = useRtl$1(vm);
      const {
        t
      } = useLocale$1(vm);
      const group = useGroup(vm, props, VWindowGroupSymbol);
      const rootRef = ref();
      const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
      const isReversed = shallowRef(false);
      const transition = computed(() => {
        const axis = props.direction === 'vertical' ? 'y' : 'x';
        const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
        const direction = reverse ? '-reverse' : '';
        return `v-window-${axis}${direction}-transition`;
      });
      const transitionCount = shallowRef(0);
      const transitionHeight = ref(undefined);
      const activeIndex = computed(() => {
        return group.items.value.findIndex(item => group.selected.value.includes(item.id));
      });
      watch(activeIndex, (newVal, oldVal) => {
        const itemsLength = group.items.value.length;
        const lastIndex = itemsLength - 1;
        if (itemsLength <= 2) {
          isReversed.value = newVal < oldVal;
        } else if (newVal === lastIndex && oldVal === 0) {
          isReversed.value = true;
        } else if (newVal === 0 && oldVal === lastIndex) {
          isReversed.value = false;
        } else {
          isReversed.value = newVal < oldVal;
        }
      });
      provide(VWindowSymbol, {
        transition,
        isReversed,
        transitionCount,
        transitionHeight,
        rootRef
      });
      const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0);
      const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
      function prev() {
        canMoveBack.value && group.prev();
      }
      function next() {
        canMoveForward.value && group.next();
      }
      const prevProps = computed(() => ({
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? 'right' : 'left'}`,
        onClick: group.prev,
        'aria-label': t('$vuetify.carousel.prev')
      }));
      const nextProps = computed(() => ({
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? 'left' : 'right'}`,
        onClick: group.next,
        'aria-label': t('$vuetify.carousel.next')
      }));
      const touchOptions = computed(() => {
        if (props.touch === false) return props.touch;
        const options = {
          left: () => {
            isRtlReverse.value ? prev() : next();
          },
          right: () => {
            isRtlReverse.value ? next() : prev();
          },
          start: _ref => {
            let {
              originalEvent
            } = _ref;
            originalEvent.stopPropagation();
          }
        };
        return {
          ...options,
          ...(props.touch === true ? {} : props.touch)
        };
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-window', {
        'v-window--show-arrows-on-hover': props.showArrows === 'hover'
      }, themeClasses.value, classes.value]));
      const containerStyles = computed(() => normalizeStyle({
        height: transitionHeight.value
      }));
      return {
        expose: {
          group
        },
        renderInput: {
          containerStyles,
          group,
          rootRef,
          rootClasses,
          rootStyles: styles,
          touchOptions,
          prevProps,
          nextProps,
          canMoveBack,
          canMoveForward
        }
      };
    },
    renderHeadless: () => null
  });

  // Composables
  const makeVCarouselControlsProps = propsFactory({
    color: String,
    delimiterIcon: {
      type: IconValue,
      default: '$delimiter'
    },
    group: {
      type: Object,
      required: true
    },
    hideDelimiters: Boolean,
    modelValue: null,
    progress: [Boolean, String],
    verticalDelimiters: [Boolean, String]
  }, 'VCarouselControls');
  const _CarouselControls = defineComponent({
    name: 'VCarouselControls',
    props: makeVCarouselControlsProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      item: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const model = useProxiedModel(vm, props, 'modelValue');
      const {
        t
      } = useLocale$1(vm);
      const itemsLength = computed(() => props.group.items.value.length);
      const genControlsItemProps = (item, index) => ({
        id: `carousel-item-${item.id}`,
        'aria-label': t('$vuetify.carousel.ariaLabel.delimiter', index + 1, itemsLength.value),
        class: normalizeClass({
          'v-carousel__controls__item': true,
          'v-btn--active': props.group.isSelected(item.id)
        }),
        onClick: () => props.group.select(item.id, true)
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const controlsStyles = computed(() => normalizeStyle({
        left: props.verticalDelimiters === 'left' && props.verticalDelimiters ? 0 : 'auto',
        right: props.verticalDelimiters === 'right' ? 0 : 'auto'
      }));
      const itemDefaults = computed(() => ({
        VBtn: {
          color: props.color,
          icon: props.delimiterIcon,
          size: 'x-small',
          variant: 'text'
        }
      }));
      const progressColor = computed(() => typeof props.progress === 'string' ? props.progress : undefined);
      const progressValue = computed(() => (props.group.getItemIndex(model.value) + 1) / itemsLength.value * 100);
      return {
        expose: {},
        renderInput: {
          controlsStyles,
          itemDefaults,
          itemsLength,
          genControlsItemProps,
          progressColor,
          progressValue
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles
  const makeVCarouselProps = propsFactory({
    color: String,
    cycle: Boolean,
    delimiterIcon: {
      type: IconValue,
      default: '$delimiter'
    },
    height: {
      type: [Number, String],
      default: 500
    },
    hideDelimiters: Boolean,
    hideDelimiterBackground: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: value => Number(value) > 0
    },
    progress: [Boolean, String],
    verticalDelimiters: [Boolean, String],
    ...makeVWindowProps({
      continuous: true,
      mandatory: 'force',
      showArrows: true
    })
  }, 'VCarousel');
  const _Carousel = defineComponent({
    name: 'VCarousel',
    props: makeVCarouselProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      item: null,
      default: null,
      additional: null,
      prev: null,
      next: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        onMounted,
        ref,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const windowRef = ref();
      let slideTimeout = -1;
      watch(model, restartTimeout);
      watch(() => props.interval, restartTimeout);
      watch(() => props.cycle, val => {
        if (val) restartTimeout();else window.clearTimeout(slideTimeout);
      });
      onMounted(startTimeout);
      function startTimeout() {
        if (!props.cycle || !windowRef.value) return;
        slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000);
      }
      function restartTimeout() {
        window.clearTimeout(slideTimeout);
        window.requestAnimationFrame(startTimeout);
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const windowProps = computed(() => _Window.filterProps(props));
      const windowClasses = computed(() => normalizeClass(['v-carousel', {
        'v-carousel--hide-delimiter-background': props.hideDelimiterBackground,
        'v-carousel--vertical-delimiters': !!props.verticalDelimiters
      }, classes.value]));
      const windowStyles = computed(() => normalizeStyle([{
        height: convertToUnit(props.height)
      }, styles.value]));
      const controlsProps = computed(() => _CarouselControls.filterProps(props));
      return {
        expose: {},
        renderInput: {
          windowClasses,
          windowProps,
          windowRef,
          windowStyles,
          model,
          controlsProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACarousel = defineAlpineComponent({
    ..._Carousel,
    name: 'ACarousel'
  });

  // Types

  const ACarouselControls = defineAlpineComponent({
    ..._CarouselControls,
    name: 'ACarouselControls'
  });

  // Styles

  // Types

  function useAspectStyles(vm, props) {
    const {
      computed
    } = vm.reactivity;
    return {
      aspectStyles: computed(() => {
        const ratio = Number(props.aspectRatio);
        return ratio ? {
          paddingBottom: String(1 / ratio * 100) + '%'
        } : undefined;
      })
    };
  }
  const makeVResponsiveProps = propsFactory({
    aspectRatio: [String, Number],
    contentClass: null,
    inline: Boolean,
    ...makeComponentProps(),
    ...makeDimensionProps()
  }, 'VResponsive');
  const _Responsive = defineComponent({
    name: 'VResponsive',
    props: makeVResponsiveProps(),
    slots: makeSlots({
      default: null,
      additional: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        aspectStyles
      } = useAspectStyles(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-responsive', {
        'v-responsive--inline': props.inline
      }, classes.value]));
      const rootStyles = computed(() => normalizeStyle([dimensionStyles.value, styles.value]));
      const contentClasses = computed(() => normalizeClass(['v-responsive__content', props.contentClass]));
      return {
        expose: {},
        renderInput: {
          aspectStyles,
          contentClasses,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  // not intended for public use, this is passed in by vuetify-loader

  const makeVImgProps = propsFactory({
    alt: String,
    cover: Boolean,
    color: String,
    draggable: {
      type: [Boolean, String],
      default: undefined
    },
    eager: Boolean,
    gradient: String,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined
      })
    },
    sizes: String,
    src: {
      type: [String, Object],
      default: ''
    },
    crossorigin: String,
    referrerpolicy: String,
    srcset: String,
    position: String,
    ...makeVResponsiveProps(),
    ...makeComponentProps(),
    ...makeRoundedProps(),
    ...makeTransitionProps()
  }, 'VImg');
  const _Img = defineComponent({
    name: 'VImg',
    props: makeVImgProps(),
    slots: makeSlots({
      default: null,
      placeholder: null,
      error: null,
      sources: null
    }),
    emits: {
      loadstart: value => true,
      load: value => true,
      error: value => true
    },
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        onBeforeMount,
        onBeforeUnmount,
        ref,
        shallowRef,
        toRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        roundedClasses
      } = useRounded(vm, props);
      const currentSrc = shallowRef(''); // Set from srcset
      const image = ref();
      const state = shallowRef(props.eager ? 'loading' : 'idle');
      const naturalWidth = shallowRef();
      const naturalHeight = shallowRef();
      const normalisedSrc = computed(() => {
        return props.src && typeof props.src === 'object' ? {
          src: props.src.src,
          srcset: props.srcset || props.src.srcset,
          lazySrc: props.lazySrc || props.src.lazySrc,
          aspect: Number(props.aspectRatio || props.src.aspect || 0)
        } : {
          src: props.src,
          srcset: props.srcset,
          lazySrc: props.lazySrc,
          aspect: Number(props.aspectRatio || 0)
        };
      });
      const aspectRatio = computed(() => {
        return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
      });
      watch(() => props.src, () => {
        init(state.value !== 'idle');
      });
      watch(aspectRatio, (val, oldVal) => {
        if (!val && oldVal && image.value) {
          pollForSize(image.value);
        }
      });

      // TODO(Vuetify): getSrc when window width changes

      onBeforeMount(() => init());
      function init(isIntersecting) {
        if (props.eager && isIntersecting) return;
        if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return;
        state.value = 'loading';
        if (normalisedSrc.value.lazySrc) {
          const lazyImg = new Image();
          lazyImg.src = normalisedSrc.value.lazySrc;
          pollForSize(lazyImg, null);
        }
        if (!normalisedSrc.value.src) return;
        nextTick(() => {
          vm.emit('loadstart', image.value?.currentSrc || normalisedSrc.value.src);
          setTimeout(() => {
            if (vm.isUnmounted) return;
            if (image.value?.complete) {
              if (!image.value.naturalWidth) {
                onError();
              }
              if (state.value === 'error') return;
              if (!aspectRatio.value) pollForSize(image.value, null);
              if (state.value === 'loading') onLoad();
            } else {
              if (!aspectRatio.value) pollForSize(image.value);
              getSrc();
            }
          });
        });
      }
      function onLoad() {
        if (vm.isUnmounted) return;
        getSrc();
        pollForSize(image.value);
        state.value = 'loaded';
        vm.emit('load', image.value?.currentSrc || normalisedSrc.value.src);
      }
      function onError() {
        if (vm.isUnmounted) return;
        state.value = 'error';
        vm.emit('error', image.value?.currentSrc || normalisedSrc.value.src);
      }
      function getSrc() {
        const img = image.value;
        if (img) currentSrc.value = img.currentSrc || img.src;
      }
      let timer = -1;
      onBeforeUnmount(() => {
        clearTimeout(timer);
      });
      function pollForSize(img) {
        let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        const poll = () => {
          clearTimeout(timer);
          if (vm.isUnmounted) return;
          const {
            naturalHeight: imgHeight,
            naturalWidth: imgWidth
          } = img;
          if (imgHeight || imgWidth) {
            naturalWidth.value = imgWidth;
            naturalHeight.value = imgHeight;
          } else if (!img.complete && state.value === 'loading' && timeout != null) {
            timer = window.setTimeout(poll, timeout);
          } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
            naturalWidth.value = 1;
            naturalHeight.value = 1;
          }
        };
        poll();
      }
      const isBooted = shallowRef(false);
      {
        const stop = watch(aspectRatio, val => {
          if (val) {
            // Doesn't work with nextTick, idk why
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                isBooted.value = true;
              });
            });
            stop();
          }
        });
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const containClasses = computed(() => normalizeClass({
        'v-img__img--cover': props.cover,
        'v-img__img--contain': !props.cover
      }));
      const responsiveProps = computed(() => _Responsive.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-img', {
        'v-img--booting': !isBooted.value
      }, backgroundColorClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width)
      }, backgroundColorStyles.value, styles.value]));
      return {
        expose: {
          currentSrc,
          image,
          state,
          naturalWidth,
          naturalHeight
        },
        renderInput: {
          aspectRatio,
          image,
          containClasses,
          normalisedSrc,
          responsiveProps,
          rootClasses,
          rootStyles,
          state,
          init,
          onLoad,
          onError
        }
      };
    },
    renderHeadless: () => null
  });

  // Composables
  const makeVWindowItemProps = propsFactory({
    reverseTransition: {
      type: [Boolean, String],
      default: undefined
    },
    transition: {
      type: [Boolean, String],
      default: undefined
    },
    ...makeComponentProps(),
    ...makeGroupItemProps(),
    ...makeLazyProps()
  }, 'VWindowItem');
  const _WindowItem = defineComponent({
    name: 'VWindowItem',
    props: makeVWindowItemProps(),
    emits: {
      'group:selected': val => true
    },
    slots: {
      default: () => {}
    },
    setupHeadless(props, vm) {
      const {
        computed,
        inject,
        nextTick,
        shallowRef
      } = vm.reactivity;
      const window = inject(VWindowSymbol);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const groupItem = useGroupItem(vm, props, VWindowGroupSymbol);
      const {
        isBooted
      } = useSsrBoot(vm);
      if (!window || !groupItem) throw new Error('[Vuetify] VWindowItem must be used inside VWindow');
      const isTransitioning = shallowRef(false);
      const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
      function onAfterTransition() {
        if (!isTransitioning.value || !window) {
          return;
        }

        // Finalize transition state.
        isTransitioning.value = false;
        if (window.transitionCount.value > 0) {
          window.transitionCount.value -= 1;

          // Remove container height if we are out of transition.
          if (window.transitionCount.value === 0) {
            window.transitionHeight.value = undefined;
          }
        }
      }
      function onBeforeTransition() {
        if (isTransitioning.value || !window) {
          return;
        }

        // Initialize transition state here.
        isTransitioning.value = true;
        if (window.transitionCount.value === 0) {
          // Set initial height for height transition.
          window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
        }
        window.transitionCount.value += 1;
      }
      function onTransitionCancelled() {
        onAfterTransition(); // This should have the same path as normal transition end.
      }
      function onEnterTransition(el) {
        if (!isTransitioning.value) {
          return;
        }
        nextTick(() => {
          // Do not set height if no transition or cancelled.
          if (!hasTransition.value || !isTransitioning.value || !window) {
            return;
          }

          // Set transition target height.
          window.transitionHeight.value = convertToUnit(el.clientHeight);
        });
      }
      const transition = computed(() => {
        const name = window.isReversed.value ? props.reverseTransition : props.transition;
        return !hasTransition.value ? false : {
          name: typeof name !== 'string' ? window.transition.value : name,
          onBeforeEnter: onBeforeTransition,
          onAfterEnter: onAfterTransition,
          onEnterCancelled: onTransitionCancelled,
          onBeforeLeave: onBeforeTransition,
          onAfterLeave: onAfterTransition,
          onLeaveCancelled: onTransitionCancelled,
          onEnter: onEnterTransition
        };
      });
      const {
        hasContent
      } = useLazy(vm, props, groupItem.isSelected);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-window-item', groupItem.selectedClass.value, classes.value]));
      return {
        expose: {
          groupItem
        },
        renderInput: {
          transition,
          isBooted,
          groupItem,
          hasContent,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Components

  // Types

  const makeVCarouselItemProps = propsFactory({
    ...makeVImgProps(),
    ...makeVWindowItemProps()
  }, 'VCarouselItem');
  const _CarouselItem = defineComponent({
    name: 'VCarouselItem',
    inheritAttrs: false,
    props: makeVCarouselItemProps(),
    slots: makeSlots({
      default: null,
      placeholder: null,
      error: null,
      sources: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const imgProps = computed(() => _Img.filterProps(props));
      const windowItemProps = computed(() => _WindowItem.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-carousel-item', classes.value]));
      return {
        expose: {},
        renderInput: {
          imgProps,
          rootClasses,
          rootStyles: styles,
          windowItemProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACarouselItem = defineAlpineComponent({
    ..._CarouselItem,
    name: 'ACarouselItem'
  });

  // Styles
  const VSelectionControlGroupSymbol = Symbol.for('vuetify:selection-control-group');
  const makeSelectionControlGroupProps = propsFactory({
    color: String,
    disabled: {
      type: Boolean,
      default: null
    },
    defaultsTarget: String,
    error: Boolean,
    id: String,
    inline: Boolean,
    falseIcon: IconValue,
    trueIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    multiple: {
      type: Boolean,
      default: null
    },
    name: String,
    readonly: {
      type: Boolean,
      default: null
    },
    modelValue: null,
    type: String,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeThemeProps()
  }, 'SelectionControlGroup');
  const makeVSelectionControlGroupProps = propsFactory({
    ...makeSelectionControlGroupProps({
      defaultsTarget: 'VSelectionControl'
    })
  }, 'VSelectionControlGroup');
  const _SelectionControlGroup = defineComponent({
    name: 'VSelectionControlGroup',
    props: makeVSelectionControlGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        provide,
        toRef,
        onBeforeUnmount
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const modelValue = useProxiedModel(vm, props, 'modelValue');
      const uid = getUid(vm);
      const id = computed(() => props.id || `v-selection-control-group-${uid}`);
      const name = computed(() => props.name || id.value);
      const updateHandlers = new Set();
      provide(VSelectionControlGroupSymbol, {
        modelValue,
        forceUpdate: () => {
          updateHandlers.forEach(fn => fn());
        },
        onForceUpdate: cb => {
          updateHandlers.add(cb);
          // NOTE(Alpinui): Replaced `onScopeDispose` with onBeforeUnmount
          onBeforeUnmount(() => {
            updateHandlers.delete(cb);
          });
        }
      });
      provideDefaults(vm, {
        [props.defaultsTarget]: {
          color: toRef(props, 'color'),
          disabled: toRef(props, 'disabled'),
          density: toRef(props, 'density'),
          error: toRef(props, 'error'),
          inline: toRef(props, 'inline'),
          modelValue,
          multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
          name,
          falseIcon: toRef(props, 'falseIcon'),
          trueIcon: toRef(props, 'trueIcon'),
          readonly: toRef(props, 'readonly'),
          ripple: toRef(props, 'ripple'),
          type: toRef(props, 'type'),
          valueComparator: toRef(props, 'valueComparator')
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-selection-control-group', {
        'v-selection-control-group--inline': props.inline
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVSelectionControlProps = propsFactory({
    label: String,
    baseColor: String,
    trueValue: null,
    falseValue: null,
    value: null,
    ...makeComponentProps(),
    ...makeSelectionControlGroupProps()
  }, 'VSelectionControl');
  function useSelectionControl(vm, props) {
    const {
      computed,
      inject
    } = vm.reactivity;
    const group = inject(VSelectionControlGroupSymbol, undefined);
    const {
      densityClasses
    } = useDensity(vm, props);
    const modelValue = useProxiedModel(vm, props, 'modelValue');
    const trueValue = computed(() => props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true);
    const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false);
    const isMultiple = computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
    const model = computed({
      get() {
        const val = group ? group.modelValue.value : modelValue.value;
        return isMultiple.value ? wrapInArray(val).some(v => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
      },
      set(val) {
        if (props.readonly) return;
        const currentValue = val ? trueValue.value : falseValue.value;
        let newVal = currentValue;
        if (isMultiple.value) {
          newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter(item => !props.valueComparator(item, trueValue.value));
        }
        if (group) {
          group.modelValue.value = newVal;
        } else {
          modelValue.value = newVal;
        }
      }
    });
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(vm, computed(() => {
      if (props.error || props.disabled) return undefined;
      return model.value ? props.color : props.baseColor;
    }));
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(vm, computed(() => {
      return model.value && !props.error && !props.disabled ? props.color : props.baseColor;
    }));
    const icon = computed(() => model.value ? props.trueIcon : props.falseIcon);
    return {
      group,
      densityClasses,
      trueValue,
      falseValue,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      icon
    };
  }
  const _SelectionControl = defineComponent({
    name: 'VSelectionControl',
    inheritAttrs: false,
    props: makeVSelectionControlProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      label: null,
      input: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        shallowRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        group,
        densityClasses,
        icon,
        model,
        textColorClasses,
        textColorStyles,
        backgroundColorClasses,
        backgroundColorStyles,
        trueValue
      } = useSelectionControl(vm, props);
      const uid = getUid(vm);
      const isFocused = shallowRef(false);
      const isFocusVisible = shallowRef(false);
      const input = ref();
      const id = computed(() => props.id || `input-${uid}`);
      const isInteractive = computed(() => !props.disabled && !props.readonly);
      group?.onForceUpdate(() => {
        if (input.value) {
          input.value.checked = model.value;
        }
      });
      function onFocus(e) {
        if (!isInteractive.value) return;
        isFocused.value = true;
        if (matchesSelector(e.target, ':focus-visible') !== false) {
          isFocusVisible.value = true;
        }
      }
      function onBlur() {
        isFocused.value = false;
        isFocusVisible.value = false;
      }
      function onClickLabel(e) {
        e.stopPropagation();
      }
      function onInput(e) {
        if (!isInteractive.value) {
          if (input.value) {
            // model value is not updated when input is not interactive
            // but the internal checked state of the input is still updated,
            // so here it's value is restored
            input.value.checked = model.value;
          }
          return;
        }
        if (props.readonly && group) {
          nextTick(() => group.forceUpdate());
        }
        model.value = e.target.checked;
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-selection-control', {
        'v-selection-control--dirty': model.value,
        'v-selection-control--disabled': !!props.disabled,
        'v-selection-control--error': props.error,
        'v-selection-control--focused': isFocused.value,
        'v-selection-control--focus-visible': isFocusVisible.value,
        'v-selection-control--inline': props.inline
      }, densityClasses.value, classes.value]));
      const wrapperClasses = computed(() => normalizeClass(['v-selection-control__wrapper', textColorClasses.value]));
      return {
        expose: {
          isFocused,
          input
        },
        renderInput: {
          rootClasses,
          rootStyles: styles,
          wrapperClasses,
          icon,
          id,
          input,
          model,
          textColorClasses,
          textColorStyles,
          backgroundColorClasses,
          backgroundColorStyles,
          trueValue,
          onBlur,
          onFocus,
          onClickLabel,
          onInput
        }
      };
    },
    renderHeadless: () => null
  });

  // Components
  const makeVCheckboxBtnProps = propsFactory({
    indeterminate: Boolean,
    indeterminateIcon: {
      type: IconValue,
      default: '$checkboxIndeterminate'
    },
    ...makeVSelectionControlProps({
      falseIcon: '$checkboxOff',
      trueIcon: '$checkboxOn'
    })
  }, 'VCheckboxBtn');
  const _CheckboxBtn = defineComponent({
    name: 'VCheckboxBtn',
    props: makeVCheckboxBtnProps(),
    emits: {
      'update:modelValue': value => true,
      'update:indeterminate': value => true
    },
    slots: makeSlots({
      default: null,
      label: null,
      input: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const indeterminate = useProxiedModel(vm, props, 'indeterminate');
      const model = useProxiedModel(vm, props, 'modelValue');
      function onChange(v) {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }
      const falseIcon = computed(() => {
        return indeterminate.value ? props.indeterminateIcon : props.falseIcon;
      });
      const trueIcon = computed(() => {
        return indeterminate.value ? props.indeterminateIcon : props.trueIcon;
      });
      const controlProps = computed(() => omit(_SelectionControl.filterProps(props), ['modelValue']));
      const rootClasses = computed(() => normalizeClass(['v-checkbox-btn', classes.value]));
      const rootAriaChecked = computed(() => indeterminate.value ? 'mixed' : undefined);
      return {
        expose: {},
        renderInput: {
          controlProps,
          model,
          onChange,
          falseIcon,
          trueIcon,
          rootAriaChecked,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVCheckboxProps = propsFactory({
    ...makeVInputProps(),
    ...omit(makeVCheckboxBtnProps(), ['inline'])
  }, 'VCheckbox');
  const _Checkbox = defineComponent({
    name: 'VCheckbox',
    inheritAttrs: false,
    props: makeVCheckboxProps(),
    emits: {
      'update:modelValue': value => true,
      'update:focused': focused => true
    },
    slots: makeSlots({
      default: null,
      label: null,
      input: null,
      prepend: null,
      append: null,
      details: null,
      message: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const uid = getUid(vm);
      const id = computed(() => props.id || `checkbox-${uid}`);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => _Input.filterProps(props));
      const checkboxProps = computed(() => _CheckboxBtn.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-checkbox', classes.value]));
      return {
        expose: {},
        renderInput: {
          inputProps,
          checkboxProps,
          id,
          isFocused,
          model,
          rootClasses,
          rootStyles: styles,
          focus,
          blur
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACheckbox = defineAlpineComponent({
    ..._Checkbox,
    name: 'ACheckbox'
  });

  // Types

  const ACheckboxBtn = defineAlpineComponent({
    ..._CheckboxBtn,
    name: 'ACheckboxBtn'
  });

  function calculateUpdatedTarget(_ref) {
    let {
      selectedElement,
      containerElement,
      isRtl,
      isHorizontal
    } = _ref;
    const containerSize = getOffsetSize(isHorizontal, containerElement);
    const scrollPosition = getScrollPosition(isHorizontal, isRtl, containerElement);
    const childrenSize = getOffsetSize(isHorizontal, selectedElement);
    const childrenStartPosition = getOffsetPosition(isHorizontal, selectedElement);
    const additionalOffset = childrenSize * 0.4;
    if (scrollPosition > childrenStartPosition) {
      return childrenStartPosition - additionalOffset;
    } else if (scrollPosition + containerSize < childrenStartPosition + childrenSize) {
      return childrenStartPosition - containerSize + childrenSize + additionalOffset;
    }
    return scrollPosition;
  }
  function calculateCenteredTarget(_ref2) {
    let {
      selectedElement,
      containerElement,
      isHorizontal
    } = _ref2;
    const containerOffsetSize = getOffsetSize(isHorizontal, containerElement);
    const childrenOffsetPosition = getOffsetPosition(isHorizontal, selectedElement);
    const childrenOffsetSize = getOffsetSize(isHorizontal, selectedElement);
    return childrenOffsetPosition - containerOffsetSize / 2 + childrenOffsetSize / 2;
  }
  function getScrollSize(isHorizontal, element) {
    const key = isHorizontal ? 'scrollWidth' : 'scrollHeight';
    return element?.[key] || 0;
  }
  function getClientSize(isHorizontal, element) {
    const key = isHorizontal ? 'clientWidth' : 'clientHeight';
    return element?.[key] || 0;
  }
  function getScrollPosition(isHorizontal, rtl, element) {
    if (!element) {
      return 0;
    }
    const {
      scrollLeft,
      offsetWidth,
      scrollWidth
    } = element;
    if (isHorizontal) {
      return rtl ? scrollWidth - offsetWidth + scrollLeft : scrollLeft;
    }
    return element.scrollTop;
  }
  function getOffsetSize(isHorizontal, element) {
    const key = isHorizontal ? 'offsetWidth' : 'offsetHeight';
    return element?.[key] || 0;
  }
  function getOffsetPosition(isHorizontal, element) {
    const key = isHorizontal ? 'offsetLeft' : 'offsetTop';
    return element?.[key] || 0;
  }

  // Styles
  const VSlideGroupSymbol = Symbol.for('vuetify:v-slide-group');
  const makeVSlideGroupProps = propsFactory({
    centerActive: Boolean,
    direction: {
      type: String,
      default: 'horizontal'
    },
    symbol: {
      type: null,
      default: VSlideGroupSymbol
    },
    nextIcon: {
      type: IconValue,
      default: '$next'
    },
    prevIcon: {
      type: IconValue,
      default: '$prev'
    },
    showArrows: {
      type: [Boolean, String],
      validator: v => typeof v === 'boolean' || ['always', 'desktop', 'mobile'].includes(v)
    },
    ...makeComponentProps(),
    ...makeDisplayProps({
      mobile: null
    }),
    ...makeTagProps(),
    ...makeGroupProps({
      selectedClass: 'v-slide-group-item--active'
    })
  }, 'VSlideGroup');
  const _SlideGroup = defineComponent({
    name: 'VSlideGroup',
    props: makeVSlideGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      prev: null,
      next: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isRtl
      } = useRtl$1(vm);
      const {
        displayClasses,
        mobile
      } = useDisplay$1(vm, props);
      const group = useGroup(vm, props, props.symbol);
      const isOverflowing = shallowRef(false);
      const scrollOffset = shallowRef(0);
      const containerSize = shallowRef(0);
      const contentSize = shallowRef(0);
      const isHorizontal = computed(() => props.direction === 'horizontal');
      const {
        resizeRef: containerRef,
        contentRect: containerRect
      } = useResizeObserver(vm);
      const {
        resizeRef: contentRef,
        contentRect
      } = useResizeObserver(vm);
      const goTo = useGoTo$1(vm);
      const goToOptions = computed(() => {
        return {
          container: containerRef.el,
          duration: 200,
          easing: 'easeOutQuart'
        };
      });
      const firstSelectedIndex = computed(() => {
        if (!group.selected.value.length) return -1;
        return group.items.value.findIndex(item => item.id === group.selected.value[0]);
      });
      const lastSelectedIndex = computed(() => {
        if (!group.selected.value.length) return -1;
        return group.items.value.findIndex(item => item.id === group.selected.value[group.selected.value.length - 1]);
      });
      if (IN_BROWSER) {
        let frame = -1;
        watch(() => [group.selected.value, containerRect.value, contentRect.value, isHorizontal.value], () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            if (containerRect.value && contentRect.value) {
              const sizeProperty = isHorizontal.value ? 'width' : 'height';
              containerSize.value = containerRect.value[sizeProperty];
              contentSize.value = contentRect.value[sizeProperty];
              isOverflowing.value = containerSize.value + 1 < contentSize.value;
            }
            if (firstSelectedIndex.value >= 0 && contentRef.el) {
              // TODO(Vuetify): Is this too naive? Should we store element references in group composable?
              const selectedElement = contentRef.el.children[lastSelectedIndex.value];
              scrollToChildren(selectedElement, props.centerActive);
            }
          });
        });
      }
      const isFocused = shallowRef(false);
      function scrollToChildren(children, center) {
        let target = 0;
        if (center) {
          target = calculateCenteredTarget({
            containerElement: containerRef.el,
            isHorizontal: isHorizontal.value,
            selectedElement: children
          });
        } else {
          target = calculateUpdatedTarget({
            containerElement: containerRef.el,
            isHorizontal: isHorizontal.value,
            isRtl: isRtl.value,
            selectedElement: children
          });
        }
        scrollToPosition(target);
      }
      function scrollToPosition(newPosition) {
        if (!IN_BROWSER || !containerRef.el) return;
        const offsetSize = getOffsetSize(isHorizontal.value, containerRef.el);
        const scrollPosition = getScrollPosition(isHorizontal.value, isRtl.value, containerRef.el);
        const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
        if (scrollSize <= offsetSize ||
        // Prevent scrolling by only a couple of pixels, which doesn't look smooth
        Math.abs(newPosition - scrollPosition) < 16) return;
        if (isHorizontal.value && isRtl.value && containerRef.el) {
          const {
            scrollWidth,
            offsetWidth: containerWidth
          } = containerRef.el;
          newPosition = scrollWidth - containerWidth - newPosition;
        }
        if (isHorizontal.value) {
          goTo.horizontal(newPosition, goToOptions.value);
        } else {
          goTo(newPosition, goToOptions.value);
        }
      }
      function onScroll(e) {
        const {
          scrollTop,
          scrollLeft
        } = e.target;
        scrollOffset.value = isHorizontal.value ? scrollLeft : scrollTop;
      }
      function onFocusin(e) {
        isFocused.value = true;
        if (!isOverflowing.value || !contentRef.el) return;

        // Focused element is likely to be the root of an item, so a
        // breadth-first search will probably find it in the first iteration
        for (const el of e.composedPath()) {
          for (const item of contentRef.el.children) {
            if (item === el) {
              scrollToChildren(item);
              return;
            }
          }
        }
      }
      function onFocusout(e) {
        isFocused.value = false;
      }

      // Affix clicks produce onFocus that we have to ignore to avoid extra scrollToChildren
      let ignoreFocusEvent = false;
      function onFocus(e) {
        if (!ignoreFocusEvent && !isFocused.value && !(e.relatedTarget && contentRef.el?.contains(e.relatedTarget))) focus();
        ignoreFocusEvent = false;
      }
      function onFocusAffixes() {
        ignoreFocusEvent = true;
      }
      function onKeydown(e) {
        if (!contentRef.el) return;
        function toFocus(location) {
          e.preventDefault();
          focus(location);
        }
        if (isHorizontal.value) {
          if (e.key === 'ArrowRight') {
            toFocus(isRtl.value ? 'prev' : 'next');
          } else if (e.key === 'ArrowLeft') {
            toFocus(isRtl.value ? 'next' : 'prev');
          }
        } else {
          if (e.key === 'ArrowDown') {
            toFocus('next');
          } else if (e.key === 'ArrowUp') {
            toFocus('prev');
          }
        }
        if (e.key === 'Home') {
          toFocus('first');
        } else if (e.key === 'End') {
          toFocus('last');
        }
      }
      function focus(location) {
        if (!contentRef.el) return;
        let el;
        if (!location) {
          const focusable = focusableChildren(contentRef.el);
          el = focusable[0];
        } else if (location === 'next') {
          el = contentRef.el.querySelector(':focus')?.nextElementSibling;
          if (!el) return focus('first');
        } else if (location === 'prev') {
          el = contentRef.el.querySelector(':focus')?.previousElementSibling;
          if (!el) return focus('last');
        } else if (location === 'first') {
          el = contentRef.el.firstElementChild;
        } else if (location === 'last') {
          el = contentRef.el.lastElementChild;
        }
        if (el) {
          el.focus({
            preventScroll: true
          });
        }
      }
      function scrollTo(location) {
        const direction = isHorizontal.value && isRtl.value ? -1 : 1;
        const offsetStep = (location === 'prev' ? -direction : direction) * containerSize.value;
        let newPosition = scrollOffset.value + offsetStep;

        // TODO(Vuetify): improve it
        if (isHorizontal.value && isRtl.value && containerRef.el) {
          const {
            scrollWidth,
            offsetWidth: containerWidth
          } = containerRef.el;
          newPosition += scrollWidth - containerWidth;
        }
        scrollToPosition(newPosition);
      }
      const slotProps = computed(() => ({
        next: group.next,
        prev: group.prev,
        select: group.select,
        isSelected: group.isSelected
      }));
      const hasAffixes = computed(() => {
        switch (props.showArrows) {
          // Always show arrows on desktop & mobile
          case 'always':
            return true;

          // Always show arrows on desktop
          case 'desktop':
            return !mobile.value;

          // Show arrows on mobile when overflowing.
          // This matches the default 2.2 behavior
          case true:
            return isOverflowing.value || Math.abs(scrollOffset.value) > 0;

          // Always show on mobile
          case 'mobile':
            return mobile.value || isOverflowing.value || Math.abs(scrollOffset.value) > 0;

          // https://material.io/components/tabs#scrollable-tabs
          // Always show arrows when
          // overflowed on desktop
          default:
            return !mobile.value && (isOverflowing.value || Math.abs(scrollOffset.value) > 0);
        }
      });
      const hasPrev = computed(() => {
        // 1 pixel in reserve, may be lost after rounding
        return Math.abs(scrollOffset.value) > 1;
      });
      const hasNext = computed(() => {
        if (!containerRef.value) return false;
        const scrollSize = getScrollSize(isHorizontal.value, containerRef.el);
        const clientSize = getClientSize(isHorizontal.value, containerRef.el);
        const scrollSizeMax = scrollSize - clientSize;

        // 1 pixel in reserve, may be lost after rounding
        return scrollSizeMax - Math.abs(scrollOffset.value) > 1;
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-slide-group', {
        'v-slide-group--vertical': !isHorizontal.value,
        'v-slide-group--has-affixes': hasAffixes.value,
        'v-slide-group--is-overflowing': isOverflowing.value
      }, displayClasses.value, classes.value]));
      const rootTabIndex = computed(() => isFocused.value || group.selected.value.length ? -1 : 0);
      const prevClasses = computed(() => normalizeClass(['v-slide-group__prev', {
        'v-slide-group__prev--disabled': !hasPrev.value
      }]));
      const onPrevClick = () => hasPrev.value && scrollTo('prev');
      const nextClasses = computed(() => normalizeClass(['v-slide-group__next', {
        'v-slide-group__next--disabled': !hasNext.value
      }]));
      const onNextClick = () => hasNext.value && scrollTo('next');
      return {
        expose: {
          selected: group.selected,
          scrollTo,
          scrollOffset,
          focus
        },
        renderInput: {
          hasAffixes,
          isRtl,
          onFocus,
          onFocusAffixes,
          onFocusin,
          onFocusout,
          onScroll,
          onKeydown,
          onNextClick,
          onPrevClick,
          containerRef,
          contentRef,
          prevClasses,
          nextClasses,
          rootClasses,
          rootStyles: styles,
          rootTabIndex,
          slotProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const VChipGroupSymbol = Symbol.for('vuetify:v-chip-group');
  const makeVChipGroupProps = propsFactory({
    column: Boolean,
    filter: Boolean,
    valueComparator: {
      type: Function,
      default: deepEqual
    },
    ...makeVSlideGroupProps(),
    ...makeComponentProps(),
    ...makeGroupProps({
      selectedClass: 'v-chip--selected'
    }),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'tonal'
    })
  }, 'VChipGroup');
  const _ChipGroup = defineComponent({
    name: 'VChipGroup',
    props: makeVChipGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(vm, props, VChipGroupSymbol);
      provideDefaults(vm, {
        VChip: {
          color: toRef(props, 'color'),
          disabled: toRef(props, 'disabled'),
          filter: toRef(props, 'filter'),
          variant: toRef(props, 'variant')
        }
      });
      const slideGroupProps = computed(() => _SlideGroup.filterProps(props));
      const slideGroupClasses = computed(() => normalizeClass(['v-chip-group', {
        'v-chip-group--column': props.column
      }, themeClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          slideGroupProps,
          slideGroupClasses,
          slideGroupStyles: styles,
          isSelected,
          select,
          next,
          prev,
          selected
        }
      };
    },
    renderHeadless: () => null
  });

  /* eslint-disable complexity */
  // Styles
  const makeVChipProps = propsFactory({
    activeClass: String,
    appendAvatar: String,
    appendIcon: IconValue,
    closable: Boolean,
    closeIcon: {
      type: IconValue,
      default: '$delete'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete'
    },
    label: Boolean,
    link: {
      type: Boolean,
      default: undefined
    },
    pill: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    text: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    onClick: EventProp(),
    onClickOnce: EventProp(),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'span'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'tonal'
    })
  }, 'VChip');
  const _Chip = defineComponent({
    name: 'VChip',
    props: makeVChipProps(),
    emits: {
      'click:close': e => true,
      'update:modelValue': value => true,
      'group:selected': val => true,
      click: e => true
    },
    slots: makeSlots({
      default: null,
      label: null,
      prepend: null,
      append: null,
      close: null,
      filter: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        t
      } = useLocale$1(vm);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        sizeClasses
      } = useSize(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const group = useGroupItem(vm, props, VChipGroupSymbol, false);
      const link = useRouterLink(vm, props, vm.attrs);
      const isLink = computed(() => props.link !== false && link.isLink.value);
      const isClickable = computed(() => !props.disabled && props.link !== false && (!!group || props.link || link.isClickable.value));
      const closeProps = computed(() => ({
        'aria-label': t(props.closeLabel),
        onClick(e) {
          e.preventDefault();
          e.stopPropagation();
          isActive.value = false;
          vm.emit('click:close', e);
        }
      }));
      function onClick(e) {
        vm.emit('click', e);
        if (!isClickable.value) return;
        link.navigate?.(e);
        group?.toggle();
      }
      function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const hasColor = computed(() => !group || group.isSelected.value);
      const rootClasses = computed(() => normalizeClass([{
        'v-chip': true,
        'v-chip--disabled': props.disabled,
        'v-chip--label': props.label,
        'v-chip--link': isClickable.value,
        'v-chip--pill': props.pill
      }, themeClasses.value, borderClasses.value, hasColor.value ? colorClasses.value : {}, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value, group?.selectedClass.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([hasColor ? colorStyles.value : {}, styles.value]));
      const prependDefaults = computed(() => ({
        VAvatar: {
          image: props.prependAvatar,
          start: true
        },
        VIcon: {
          icon: props.prependIcon,
          start: true
        }
      }));
      const appendDefaults = computed(() => ({
        VAvatar: {
          end: true,
          image: props.appendAvatar
        },
        VIcon: {
          end: true,
          icon: props.appendIcon
        }
      }));
      const filterDefaults = computed(() => ({
        VIcon: {
          icon: props.filterIcon
        }
      }));
      const closeDefaults = computed(() => ({
        VIcon: {
          icon: props.closeIcon,
          size: 'x-small'
        }
      }));
      return {
        expose: {},
        renderInput: {
          closeProps,
          isActive,
          isClickable,
          isLink,
          group,
          link,
          onClick,
          onKeyDown,
          appendDefaults,
          filterDefaults,
          closeDefaults,
          prependDefaults,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AChip = defineAlpineComponent({
    ..._Chip,
    name: 'AChip'
  });

  // Types

  const AChipGroup = defineAlpineComponent({
    ..._ChipGroup,
    name: 'AChipGroup'
  });

  // Styles

  // Types

  const klass$5 = 'v-code';
  const _Code = createSimpleFunctionalHeadless(klass$5);

  // Types

  const ACode = defineAlpineComponent({
    ..._Code,
    name: 'ACode'
  });

  // Styles

  // Types

  const makeVSheetProps = propsFactory({
    color: String,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VSheet');
  const _Sheet = defineComponent({
    name: 'VSheet',
    props: makeVSheetProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        locationStyles
      } = useLocation(vm, props);
      const {
        positionClasses
      } = usePosition(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, locationStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities

  // Types

  function stripAlpha(color, stripAlpha) {
    if (stripAlpha) {
      const {
        a,
        ...rest
      } = color;
      return rest;
    }
    return color;
  }
  function extractColor(color, input) {
    if (input == null || typeof input === 'string') {
      const hex = HSVtoHex(color);
      if (color.a === 1) return hex.slice(0, 7);else return hex;
    }
    if (typeof input === 'object') {
      let converted;
      if (has(input, ['r', 'g', 'b'])) converted = HSVtoRGB(color);else if (has(input, ['h', 's', 'l'])) converted = HSVtoHSL(color);else if (has(input, ['h', 's', 'v'])) converted = color;
      return stripAlpha(converted, !has(input, ['a']) && color.a === 1);
    }
    return color;
  }
  const nullColor = {
    h: 0,
    s: 0,
    v: 0,
    a: 1
  };
  const rgba = {
    inputProps: {
      type: 'number',
      min: 0
    },
    inputs: [{
      label: 'R',
      max: 255,
      step: 1,
      getValue: c => Math.round(c.r),
      getColor: (c, v) => ({
        ...c,
        r: Number(v)
      })
    }, {
      label: 'G',
      max: 255,
      step: 1,
      getValue: c => Math.round(c.g),
      getColor: (c, v) => ({
        ...c,
        g: Number(v)
      })
    }, {
      label: 'B',
      max: 255,
      step: 1,
      getValue: c => Math.round(c.b),
      getColor: (c, v) => ({
        ...c,
        b: Number(v)
      })
    }, {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: _ref => {
        let {
          a
        } = _ref;
        return a != null ? Math.round(a * 100) / 100 : 1;
      },
      getColor: (c, v) => ({
        ...c,
        a: Number(v)
      })
    }],
    to: HSVtoRGB,
    from: RGBtoHSV
  };
  const rgb = {
    ...rgba,
    inputs: rgba.inputs?.slice(0, 3)
  };
  const hsla = {
    inputProps: {
      type: 'number',
      min: 0
    },
    inputs: [{
      label: 'H',
      max: 360,
      step: 1,
      getValue: c => Math.round(c.h),
      getColor: (c, v) => ({
        ...c,
        h: Number(v)
      })
    }, {
      label: 'S',
      max: 1,
      step: 0.01,
      getValue: c => Math.round(c.s * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        s: Number(v)
      })
    }, {
      label: 'L',
      max: 1,
      step: 0.01,
      getValue: c => Math.round(c.l * 100) / 100,
      getColor: (c, v) => ({
        ...c,
        l: Number(v)
      })
    }, {
      label: 'A',
      max: 1,
      step: 0.01,
      getValue: _ref2 => {
        let {
          a
        } = _ref2;
        return a != null ? Math.round(a * 100) / 100 : 1;
      },
      getColor: (c, v) => ({
        ...c,
        a: Number(v)
      })
    }],
    to: HSVtoHSL,
    from: HSLtoHSV
  };
  const hsl = {
    ...hsla,
    inputs: hsla.inputs.slice(0, 3)
  };
  const hexa = {
    inputProps: {
      type: 'text'
    },
    inputs: [{
      label: 'HEXA',
      getValue: c => c,
      getColor: (c, v) => v
    }],
    to: HSVtoHex,
    from: HexToHSV
  };
  const hex = {
    ...hexa,
    inputs: [{
      label: 'HEX',
      getValue: c => c.slice(0, 7),
      getColor: (c, v) => v
    }]
  };
  const modes = {
    rgb,
    rgba,
    hsl,
    hsla,
    hex,
    hexa
  };

  // Styles

  // Types

  const makeVColorPickerProps = propsFactory({
    canvasHeight: {
      type: [String, Number],
      default: 150
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    hideCanvas: Boolean,
    hideSliders: Boolean,
    hideInputs: Boolean,
    mode: {
      type: String,
      default: 'rgba',
      validator: v => Object.keys(modes).includes(v)
    },
    modes: {
      type: Array,
      default: () => Object.keys(modes),
      validator: v => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m))
    },
    showSwatches: Boolean,
    swatches: Array,
    swatchesMaxHeight: {
      type: [Number, String],
      default: 150
    },
    modelValue: {
      type: [Object, String]
    },
    ...omit(makeVSheetProps({
      width: 300
    }), ['height', 'location', 'minHeight', 'maxHeight', 'minWidth', 'maxWidth'])
  }, 'VColorPicker');
  const _ColorPicker = defineComponent({
    name: 'VColorPicker',
    props: makeVColorPickerProps(),
    emits: {
      'update:modelValue': color => true,
      'update:mode': mode => true
    },
    slots: makeSlots(null),
    setupHeadless(props, vm) {
      const {
        computed,
        onMounted,
        ref,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const mode = useProxiedModel(vm, props, 'mode');
      const hue = ref(null);
      const model = useProxiedModel(vm, props, 'modelValue', undefined, v => {
        if (v == null || v === '') return null;
        let c;
        try {
          c = RGBtoHSV(parseColor(v));
        } catch (err) {
          consoleWarn(err);
          return null;
        }
        return c;
      }, v => {
        if (!v) return null;
        return extractColor(v, props.modelValue);
      });
      const currentColor = computed(() => {
        return model.value ? {
          ...model.value,
          h: hue.value ?? model.value.h
        } : null;
      });
      const {
        rtlClasses
      } = useRtl$1(vm);
      let externalChange = true;
      watch(model, v => {
        if (!externalChange) {
          // prevent hue shift from rgb conversion inaccuracy
          externalChange = true;
          return;
        }
        if (!v) return;
        hue.value = v.h;
      }, {
        immediate: true
      });
      const updateColor = hsva => {
        externalChange = false;
        hue.value = hsva.h;
        model.value = hsva;
      };
      onMounted(() => {
        if (!props.modes.includes(mode.value)) mode.value = props.modes[0];
      });
      provideDefaults(vm, {
        VSlider: {
          color: undefined,
          trackColor: undefined,
          trackFillColor: undefined
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-color-picker', rtlClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-color-picker-color-hsv': HSVtoCSS({
          ...(currentColor.value ?? nullColor),
          a: 1
        })
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          mode,
          currentColor,
          updateColor,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AColorPicker = defineAlpineComponent({
    ..._ColorPicker,
    name: 'AColorPicker'
  });

  // Styles

  // Types

  const makeVColorPickerCanvasProps = propsFactory({
    color: {
      type: Object
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    height: {
      type: [Number, String],
      default: 150
    },
    width: {
      type: [Number, String],
      default: 300
    },
    ...makeComponentProps()
  }, 'VColorPickerCanvas');
  const _ColorPickerCanvas = defineComponent({
    name: 'VColorPickerCanvas',
    props: makeVColorPickerCanvasProps(),
    emits: {
      'update:color': color => true,
      'update:position': hue => true
    },
    slots: makeSlots(null),
    setupHeadless(props, vm) {
      const {
        computed,
        onMounted,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isInteracting = shallowRef(false);
      const canvasRef = ref();
      const canvasWidth = shallowRef(parseFloat(props.width));
      const canvasHeight = shallowRef(parseFloat(props.height));
      const _dotPosition = ref({
        x: 0,
        y: 0
      });
      const dotPosition = computed({
        get: () => _dotPosition.value,
        set(val) {
          if (!canvasRef.value) return;
          const {
            x,
            y
          } = val;
          _dotPosition.value = val;
          vm.emit('update:color', {
            h: props.color?.h ?? 0,
            s: clamp(x, 0, canvasWidth.value) / canvasWidth.value,
            v: 1 - clamp(y, 0, canvasHeight.value) / canvasHeight.value,
            a: props.color?.a ?? 1
          });
        }
      });
      const dotStyles = computed(() => {
        const {
          x,
          y
        } = dotPosition.value;
        const radius = parseInt(props.dotSize, 10) / 2;
        return {
          width: convertToUnit(props.dotSize),
          height: convertToUnit(props.dotSize),
          transform: `translate(${convertToUnit(x - radius)}, ${convertToUnit(y - radius)})`
        };
      });
      const {
        resizeRef
      } = useResizeObserver(vm, entries => {
        if (!resizeRef.el?.offsetParent) return;
        const {
          width,
          height
        } = entries[0].contentRect;
        canvasWidth.value = width;
        canvasHeight.value = height;
      });
      function updateDotPosition(x, y, rect) {
        const {
          left,
          top,
          width,
          height
        } = rect;
        dotPosition.value = {
          x: clamp(x - left, 0, width),
          y: clamp(y - top, 0, height)
        };
      }
      function handleMouseDown(e) {
        if (e.type === 'mousedown') {
          // Prevent text selection while dragging
          e.preventDefault();
        }
        if (props.disabled) return;
        handleMouseMove(e);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
      }
      function handleMouseMove(e) {
        if (props.disabled || !canvasRef.value) return;
        isInteracting.value = true;
        const coords = getEventCoordinates(e);
        updateDotPosition(coords.clientX, coords.clientY, canvasRef.value.getBoundingClientRect());
      }
      function handleMouseUp() {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      }
      function updateCanvas() {
        if (!canvasRef.value) return;
        const canvas = canvasRef.value;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const saturationGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        saturationGradient.addColorStop(0, 'hsla(0, 0%, 100%, 1)'); // white
        saturationGradient.addColorStop(1, `hsla(${props.color?.h ?? 0}, 100%, 50%, 1)`);
        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const valueGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        valueGradient.addColorStop(0, 'hsla(0, 0%, 0%, 0)'); // transparent
        valueGradient.addColorStop(1, 'hsla(0, 0%, 0%, 1)'); // black
        ctx.fillStyle = valueGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      watch(() => props.color?.h, updateCanvas, {
        immediate: true
      });
      watch(() => [canvasWidth.value, canvasHeight.value], (newVal, oldVal) => {
        updateCanvas();
        _dotPosition.value = {
          x: dotPosition.value.x * newVal[0] / oldVal[0],
          y: dotPosition.value.y * newVal[1] / oldVal[1]
        };
      }, {
        flush: 'post'
      });
      watch(() => props.color, () => {
        if (isInteracting.value) {
          isInteracting.value = false;
          return;
        }
        _dotPosition.value = props.color ? {
          x: props.color.s * canvasWidth.value,
          y: (1 - props.color.v) * canvasHeight.value
        } : {
          x: 0,
          y: 0
        };
      }, {
        deep: true,
        immediate: true
      });
      onMounted(() => updateCanvas());
      const canvasClasses = computed(() => normalizeClass(['v-color-picker-canvas', classes.value]));
      const dotClasses = computed(() => normalizeClass({
        'v-color-picker-canvas__dot': true,
        'v-color-picker-canvas__dot--disabled': props.disabled
      }));
      return {
        expose: {},
        renderInput: {
          canvasClasses,
          canvasStyles: styles,
          canvasRef,
          canvasWidth,
          canvasHeight,
          dotClasses,
          dotStyles,
          handleMouseDown,
          resizeRef
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AColorPickerCanvas = defineAlpineComponent({
    ..._ColorPickerCanvas,
    name: 'AColorPickerCanvas'
  });

  // Styles

  // Types

  const makeVColorPickerEditProps = propsFactory({
    color: Object,
    disabled: Boolean,
    mode: {
      type: String,
      default: 'rgba',
      validator: v => Object.keys(modes).includes(v)
    },
    modes: {
      type: Array,
      default: () => Object.keys(modes),
      validator: v => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m))
    },
    ...makeComponentProps()
  }, 'VColorPickerEdit');
  const _ColorPickerEdit = defineComponent({
    name: 'VColorPickerEdit',
    props: makeVColorPickerEditProps(),
    emits: {
      'update:color': color => true,
      'update:mode': mode => true
    },
    slots: makeSlots(null),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const enabledModes = computed(() => {
        return props.modes.map(key => ({
          ...modes[key],
          name: key
        }));
      });
      const inputs = computed(() => {
        const mode = enabledModes.value.find(m => m.name === props.mode);
        if (!mode) return [];
        const color = props.color ? mode.to(props.color) : null;
        return mode.inputs?.map(_ref => {
          let {
            getValue,
            getColor,
            ...inputProps
          } = _ref;
          return {
            ...mode.inputProps,
            ...inputProps,
            disabled: props.disabled,
            value: color && getValue(color),
            onChange: e => {
              const target = e.target;
              if (!target) return;
              vm.emit('update:color', mode.from(getColor(color ?? mode.to(nullColor), target.value)));
            }
          };
        });
      });
      const rootClasses = computed(() => normalizeClass(['v-color-picker-edit', classes.value]));
      return {
        expose: {},
        renderInput: {
          enabledModes,
          inputs,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AColorPickerEdit = defineAlpineComponent({
    ..._ColorPickerEdit,
    name: 'AColorPickerEdit'
  });

  // Styles

  // Types

  const makeVColorPickerPreviewProps = propsFactory({
    color: {
      type: Object
    },
    disabled: Boolean,
    hideAlpha: Boolean,
    ...makeComponentProps()
  }, 'VColorPickerPreview');
  const _ColorPickerPreview = defineComponent({
    name: 'VColorPickerPreview',
    props: makeVColorPickerPreviewProps(),
    emits: {
      'update:color': color => true
    },
    slots: makeSlots(null),
    setupHeadless(props, vm) {
      const {
        computed,
        onUnmounted
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const abortController = new AbortController();
      onUnmounted(() => abortController.abort());
      async function openEyeDropper() {
        if (!SUPPORTS_EYE_DROPPER) return;
        const eyeDropper = new window.EyeDropper();
        try {
          const result = await eyeDropper.open({
            signal: abortController.signal
          });
          const colorHexValue = HexToHSV(result.sRGBHex);
          vm.emit('update:color', {
            ...(props.color ?? nullColor),
            ...colorHexValue
          });
        } catch (e) {}
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-color-picker-preview', {
        'v-color-picker-preview--hide-alpha': props.hideAlpha
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles,
          nullColor,
          openEyeDropper,
          SUPPORTS_EYE_DROPPER
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AColorPickerPreview = defineAlpineComponent({
    ..._ColorPickerPreview,
    name: 'AColorPickerPreview'
  });

  const red = {
    base: '#f44336',
    lighten5: '#ffebee',
    lighten4: '#ffcdd2',
    lighten3: '#ef9a9a',
    lighten2: '#e57373',
    lighten1: '#ef5350',
    darken1: '#e53935',
    darken2: '#d32f2f',
    darken3: '#c62828',
    darken4: '#b71c1c',
    accent1: '#ff8a80',
    accent2: '#ff5252',
    accent3: '#ff1744',
    accent4: '#d50000'
  };
  const pink = {
    base: '#e91e63',
    lighten5: '#fce4ec',
    lighten4: '#f8bbd0',
    lighten3: '#f48fb1',
    lighten2: '#f06292',
    lighten1: '#ec407a',
    darken1: '#d81b60',
    darken2: '#c2185b',
    darken3: '#ad1457',
    darken4: '#880e4f',
    accent1: '#ff80ab',
    accent2: '#ff4081',
    accent3: '#f50057',
    accent4: '#c51162'
  };
  const purple = {
    base: '#9c27b0',
    lighten5: '#f3e5f5',
    lighten4: '#e1bee7',
    lighten3: '#ce93d8',
    lighten2: '#ba68c8',
    lighten1: '#ab47bc',
    darken1: '#8e24aa',
    darken2: '#7b1fa2',
    darken3: '#6a1b9a',
    darken4: '#4a148c',
    accent1: '#ea80fc',
    accent2: '#e040fb',
    accent3: '#d500f9',
    accent4: '#aa00ff'
  };
  const deepPurple = {
    base: '#673ab7',
    lighten5: '#ede7f6',
    lighten4: '#d1c4e9',
    lighten3: '#b39ddb',
    lighten2: '#9575cd',
    lighten1: '#7e57c2',
    darken1: '#5e35b1',
    darken2: '#512da8',
    darken3: '#4527a0',
    darken4: '#311b92',
    accent1: '#b388ff',
    accent2: '#7c4dff',
    accent3: '#651fff',
    accent4: '#6200ea'
  };
  const indigo = {
    base: '#3f51b5',
    lighten5: '#e8eaf6',
    lighten4: '#c5cae9',
    lighten3: '#9fa8da',
    lighten2: '#7986cb',
    lighten1: '#5c6bc0',
    darken1: '#3949ab',
    darken2: '#303f9f',
    darken3: '#283593',
    darken4: '#1a237e',
    accent1: '#8c9eff',
    accent2: '#536dfe',
    accent3: '#3d5afe',
    accent4: '#304ffe'
  };
  const blue = {
    base: '#2196f3',
    lighten5: '#e3f2fd',
    lighten4: '#bbdefb',
    lighten3: '#90caf9',
    lighten2: '#64b5f6',
    lighten1: '#42a5f5',
    darken1: '#1e88e5',
    darken2: '#1976d2',
    darken3: '#1565c0',
    darken4: '#0d47a1',
    accent1: '#82b1ff',
    accent2: '#448aff',
    accent3: '#2979ff',
    accent4: '#2962ff'
  };
  const lightBlue = {
    base: '#03a9f4',
    lighten5: '#e1f5fe',
    lighten4: '#b3e5fc',
    lighten3: '#81d4fa',
    lighten2: '#4fc3f7',
    lighten1: '#29b6f6',
    darken1: '#039be5',
    darken2: '#0288d1',
    darken3: '#0277bd',
    darken4: '#01579b',
    accent1: '#80d8ff',
    accent2: '#40c4ff',
    accent3: '#00b0ff',
    accent4: '#0091ea'
  };
  const cyan = {
    base: '#00bcd4',
    lighten5: '#e0f7fa',
    lighten4: '#b2ebf2',
    lighten3: '#80deea',
    lighten2: '#4dd0e1',
    lighten1: '#26c6da',
    darken1: '#00acc1',
    darken2: '#0097a7',
    darken3: '#00838f',
    darken4: '#006064',
    accent1: '#84ffff',
    accent2: '#18ffff',
    accent3: '#00e5ff',
    accent4: '#00b8d4'
  };
  const teal = {
    base: '#009688',
    lighten5: '#e0f2f1',
    lighten4: '#b2dfdb',
    lighten3: '#80cbc4',
    lighten2: '#4db6ac',
    lighten1: '#26a69a',
    darken1: '#00897b',
    darken2: '#00796b',
    darken3: '#00695c',
    darken4: '#004d40',
    accent1: '#a7ffeb',
    accent2: '#64ffda',
    accent3: '#1de9b6',
    accent4: '#00bfa5'
  };
  const green = {
    base: '#4caf50',
    lighten5: '#e8f5e9',
    lighten4: '#c8e6c9',
    lighten3: '#a5d6a7',
    lighten2: '#81c784',
    lighten1: '#66bb6a',
    darken1: '#43a047',
    darken2: '#388e3c',
    darken3: '#2e7d32',
    darken4: '#1b5e20',
    accent1: '#b9f6ca',
    accent2: '#69f0ae',
    accent3: '#00e676',
    accent4: '#00c853'
  };
  const lightGreen = {
    base: '#8bc34a',
    lighten5: '#f1f8e9',
    lighten4: '#dcedc8',
    lighten3: '#c5e1a5',
    lighten2: '#aed581',
    lighten1: '#9ccc65',
    darken1: '#7cb342',
    darken2: '#689f38',
    darken3: '#558b2f',
    darken4: '#33691e',
    accent1: '#ccff90',
    accent2: '#b2ff59',
    accent3: '#76ff03',
    accent4: '#64dd17'
  };
  const lime = {
    base: '#cddc39',
    lighten5: '#f9fbe7',
    lighten4: '#f0f4c3',
    lighten3: '#e6ee9c',
    lighten2: '#dce775',
    lighten1: '#d4e157',
    darken1: '#c0ca33',
    darken2: '#afb42b',
    darken3: '#9e9d24',
    darken4: '#827717',
    accent1: '#f4ff81',
    accent2: '#eeff41',
    accent3: '#c6ff00',
    accent4: '#aeea00'
  };
  const yellow = {
    base: '#ffeb3b',
    lighten5: '#fffde7',
    lighten4: '#fff9c4',
    lighten3: '#fff59d',
    lighten2: '#fff176',
    lighten1: '#ffee58',
    darken1: '#fdd835',
    darken2: '#fbc02d',
    darken3: '#f9a825',
    darken4: '#f57f17',
    accent1: '#ffff8d',
    accent2: '#ffff00',
    accent3: '#ffea00',
    accent4: '#ffd600'
  };
  const amber = {
    base: '#ffc107',
    lighten5: '#fff8e1',
    lighten4: '#ffecb3',
    lighten3: '#ffe082',
    lighten2: '#ffd54f',
    lighten1: '#ffca28',
    darken1: '#ffb300',
    darken2: '#ffa000',
    darken3: '#ff8f00',
    darken4: '#ff6f00',
    accent1: '#ffe57f',
    accent2: '#ffd740',
    accent3: '#ffc400',
    accent4: '#ffab00'
  };
  const orange = {
    base: '#ff9800',
    lighten5: '#fff3e0',
    lighten4: '#ffe0b2',
    lighten3: '#ffcc80',
    lighten2: '#ffb74d',
    lighten1: '#ffa726',
    darken1: '#fb8c00',
    darken2: '#f57c00',
    darken3: '#ef6c00',
    darken4: '#e65100',
    accent1: '#ffd180',
    accent2: '#ffab40',
    accent3: '#ff9100',
    accent4: '#ff6d00'
  };
  const deepOrange = {
    base: '#ff5722',
    lighten5: '#fbe9e7',
    lighten4: '#ffccbc',
    lighten3: '#ffab91',
    lighten2: '#ff8a65',
    lighten1: '#ff7043',
    darken1: '#f4511e',
    darken2: '#e64a19',
    darken3: '#d84315',
    darken4: '#bf360c',
    accent1: '#ff9e80',
    accent2: '#ff6e40',
    accent3: '#ff3d00',
    accent4: '#dd2c00'
  };
  const brown = {
    base: '#795548',
    lighten5: '#efebe9',
    lighten4: '#d7ccc8',
    lighten3: '#bcaaa4',
    lighten2: '#a1887f',
    lighten1: '#8d6e63',
    darken1: '#6d4c41',
    darken2: '#5d4037',
    darken3: '#4e342e',
    darken4: '#3e2723'
  };
  const blueGrey = {
    base: '#607d8b',
    lighten5: '#eceff1',
    lighten4: '#cfd8dc',
    lighten3: '#b0bec5',
    lighten2: '#90a4ae',
    lighten1: '#78909c',
    darken1: '#546e7a',
    darken2: '#455a64',
    darken3: '#37474f',
    darken4: '#263238'
  };
  const grey = {
    base: '#9e9e9e',
    lighten5: '#fafafa',
    lighten4: '#f5f5f5',
    lighten3: '#eeeeee',
    lighten2: '#e0e0e0',
    lighten1: '#bdbdbd',
    darken1: '#757575',
    darken2: '#616161',
    darken3: '#424242',
    darken4: '#212121'
  };
  const shades = {
    black: '#000000',
    white: '#ffffff',
    transparent: '#ffffff00'
  };
  var colors = {
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    blueGrey,
    grey,
    shades
  };

  // Styles

  // Types

  const makeVColorPickerSwatchesProps = propsFactory({
    swatches: {
      type: Array,
      default: () => parseDefaultColors(colors)
    },
    disabled: Boolean,
    color: Object,
    maxHeight: [Number, String],
    ...makeComponentProps()
  }, 'VColorPickerSwatches');
  function parseDefaultColors(colors) {
    return Object.keys(colors).map(key => {
      const color = colors[key];
      return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
    });
  }
  const _ColorPickerSwatches = defineComponent({
    name: 'VColorPickerSwatches',
    props: makeVColorPickerSwatchesProps(),
    emits: {
      'update:color': color => true
    },
    slots: makeSlots(null),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-color-picker-swatches', classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        maxHeight: convertToUnit(props.maxHeight)
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AColorPickerSwatches = defineAlpineComponent({
    ..._ColorPickerSwatches,
    name: 'AColorPickerSwatches'
  });

  // Styles

  // Types

  const makeVComboboxProps = propsFactory({
    autoSelectFirst: {
      type: [Boolean, String]
    },
    clearOnSelect: {
      type: Boolean,
      default: true
    },
    delimiters: Array,
    ...makeFilterProps({
      filterKeys: ['title']
    }),
    ...makeSelectProps({
      hideNoData: true,
      returnObject: true
    }),
    ...omit(makeVTextFieldProps({
      modelValue: null,
      role: 'combobox'
    }), ['validationValue', 'dirty', 'appendInnerIcon']),
    ...makeTransitionProps({
      transition: false
    })
  }, 'VCombobox');
  const _Combobox = defineComponent({
    name: 'VCombobox',
    props: makeVComboboxProps(),
    emits: {
      'update:focused': focused => true,
      'update:modelValue': value => true,
      'update:search': value => true,
      'update:menu': value => true
    },
    slots: makeSlots({
      item: null,
      chip: null,
      selection: null,
      'prepend-item': null,
      'append-item': null,
      'no-data': null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const vTextFieldRef = ref();
      const isFocused = shallowRef(false);
      const isPristine = shallowRef(true);
      const listHasFocus = shallowRef(false);
      const vMenuRef = ref();
      const vVirtualScrollRef = ref();
      const _menu = useProxiedModel(vm, props, 'menu');
      const menu = computed({
        get: () => _menu.value,
        set: v => {
          if (_menu.value && !v && vMenuRef.value?.ΨopenChildren) return;
          _menu.value = v;
        }
      });
      const selectionIndex = shallowRef(-1);
      let cleared = false;
      const color = computed(() => vTextFieldRef.value?.color);
      const label = computed(() => menu.value ? props.closeText : props.openText);
      const {
        items,
        transformIn,
        transformOut
      } = useItems(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, color);
      const model = useProxiedModel(vm, props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
        const transformed = transformOut(v);
        return props.multiple ? transformed : transformed[0] ?? null;
      });
      const form = useForm(vm);
      const hasChips = computed(() => !!(props.chips || vm.hasSlots.chip));
      const hasSelectionSlot = computed(() => hasChips.value || vm.hasSlots.selection);
      const _search = shallowRef(!props.multiple && !hasSelectionSlot.value ? model.value[0]?.title ?? '' : '');
      const search = computed({
        get: () => {
          return _search.value;
        },
        set: val => {
          _search.value = val ?? '';
          if (!props.multiple && !hasSelectionSlot.value) {
            model.value = [transformItem$3(props, val)];
          }
          if (val && props.multiple && props.delimiters?.length) {
            const values = val.split(new RegExp(`(?:${props.delimiters.join('|')})+`));
            if (values.length > 1) {
              values.forEach(v => {
                v = v.trim();
                if (v) select(transformItem$3(props, v));
              });
              _search.value = '';
            }
          }
          if (!val) selectionIndex.value = -1;
          isPristine.value = !val;
        }
      });
      const counterValue = computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : typeof props.counterValue === 'number' ? props.counterValue : props.multiple ? model.value.length : search.value.length;
      });
      watch(_search, value => {
        if (cleared) {
          // wait for clear to finish, VTextField sets _search to null
          // then search computed triggers and updates _search to ''
          nextTick(() => cleared = false);
        } else if (isFocused.value && !menu.value) {
          menu.value = true;
        }
        vm.emit('update:search', value);
      });
      watch(model, value => {
        if (!props.multiple && !hasSelectionSlot.value) {
          _search.value = value[0]?.title ?? '';
        }
      });
      const {
        filteredItems,
        getMatches
      } = useFilter(vm, props, items, () => isPristine.value ? '' : search.value);
      const displayItems = computed(() => {
        if (props.hideSelected) {
          return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value));
        }
        return filteredItems.value;
      });
      const selectedValues = computed(() => model.value.map(selection => selection.value));
      const highlightFirst = computed(() => {
        const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title;
        return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
      });
      const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || props.readonly || form?.isReadonly.value);
      const listRef = ref();
      const {
        onListScroll,
        onListKeydown
      } = useScrolling(vm, listRef, vTextFieldRef);
      function onClear(e) {
        cleared = true;
        if (props.openOnClear) {
          menu.value = true;
        }
      }
      function onMousedownControl() {
        if (menuDisabled.value) return;
        menu.value = true;
      }
      function onMousedownMenuIcon(e) {
        if (menuDisabled.value) return;
        if (isFocused.value) {
          e.preventDefault();
          e.stopPropagation();
        }
        menu.value = !menu.value;
      }
      // eslint-disable-next-line complexity
      function onKeydown(e) {
        if (isComposingIgnoreKey(e) || props.readonly || form?.isReadonly.value) return;
        const selectionStart = vTextFieldRef.value.selectionStart;
        const length = model.value.length;
        if (selectionIndex.value > -1 || ['Enter', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
          e.preventDefault();
        }
        if (['Enter', 'ArrowDown'].includes(e.key)) {
          menu.value = true;
        }
        if (['Escape'].includes(e.key)) {
          menu.value = false;
        }
        if (['Enter', 'Escape', 'Tab'].includes(e.key)) {
          if (highlightFirst.value && ['Enter', 'Tab'].includes(e.key) && !model.value.some(_ref => {
            let {
              value
            } = _ref;
            return value === displayItems.value[0].value;
          })) {
            select(filteredItems.value[0]);
          }
          isPristine.value = true;
        }
        if (e.key === 'ArrowDown' && highlightFirst.value) {
          listRef.value?.focus('next');
        }
        if (e.key === 'Enter' && search.value) {
          select(transformItem$3(props, search.value));
          if (hasSelectionSlot.value) _search.value = '';
        }
        if (['Backspace', 'Delete'].includes(e.key)) {
          if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value) return select(model.value[0], false);
          if (~selectionIndex.value) {
            const originalSelectionIndex = selectionIndex.value;
            select(model.value[selectionIndex.value], false);
            selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
          } else if (e.key === 'Backspace' && !search.value) {
            selectionIndex.value = length - 1;
          }
        }
        if (!props.multiple) return;
        if (e.key === 'ArrowLeft') {
          if (selectionIndex.value < 0 && selectionStart > 0) return;
          const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
          if (model.value[prev]) {
            selectionIndex.value = prev;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(search.value.length, search.value.length);
          }
        }
        if (e.key === 'ArrowRight') {
          if (selectionIndex.value < 0) return;
          const next = selectionIndex.value + 1;
          if (model.value[next]) {
            selectionIndex.value = next;
          } else {
            selectionIndex.value = -1;
            vTextFieldRef.value.setSelectionRange(0, 0);
          }
        }
      }
      function onAfterLeave() {
        if (isFocused.value) {
          isPristine.value = true;
          vTextFieldRef.value?.focus();
        }
      }
      /** @param set - null means toggle */
      function select(item) {
        let set = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (!item || item.props.disabled) return;
        if (props.multiple) {
          const index = model.value.findIndex(selection => props.valueComparator(selection.value, item.value));
          const add = set == null ? !~index : set;
          if (~index) {
            const value = add ? [...model.value, item] : [...model.value];
            value.splice(index, 1);
            model.value = value;
          } else if (add) {
            model.value = [...model.value, item];
          }
          if (props.clearOnSelect) {
            search.value = '';
          }
        } else {
          const add = set !== false;
          model.value = add ? [item] : [];
          _search.value = add && !hasSelectionSlot.value ? item.title : '';

          // watch for search watcher to trigger
          nextTick(() => {
            menu.value = false;
            isPristine.value = true;
          });
        }
      }
      function onFocusin(e) {
        isFocused.value = true;
        setTimeout(() => {
          listHasFocus.value = true;
        });
      }
      function onFocusout(e) {
        listHasFocus.value = false;
      }
      function onUpdateModelValue(v) {
        if (v == null || v === '' && !props.multiple && !hasSelectionSlot.value) model.value = [];
      }
      watch(isFocused, (val, oldVal) => {
        if (val || val === oldVal) return;
        selectionIndex.value = -1;
        menu.value = false;
        if (search.value) {
          if (props.multiple) {
            select(transformItem$3(props, search.value));
            return;
          }
          if (!hasSelectionSlot.value) return;
          if (model.value.some(_ref2 => {
            let {
              title
            } = _ref2;
            return title === search.value;
          })) {
            _search.value = '';
          } else {
            select(transformItem$3(props, search.value));
          }
        }
      });
      watch(menu, () => {
        if (!props.hideSelected && menu.value && model.value.length) {
          const index = displayItems.value.findIndex(item => model.value.some(s => props.valueComparator(s.value, item.value)));
          IN_BROWSER && window.requestAnimationFrame(() => {
            index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index);
          });
        }
      });
      watch(() => props.items, (newVal, oldVal) => {
        if (menu.value) return;
        if (isFocused.value && !oldVal.length && newVal.length) {
          menu.value = true;
        }
      });
      const isDirty = computed(() => model.value.length > 0);
      const textFieldProps = computed(() => _TextField.filterProps(props));
      const noDataText = computed(() => t(props.noDataText));
      const titleText = computed(() => t(label.value));
      const rootClasses = computed(() => normalizeClass(['v-combobox', {
        'v-combobox--active-menu': menu.value,
        'v-combobox--chips': !!props.chips,
        'v-combobox--selection-slot': !!hasSelectionSlot.value,
        'v-combobox--selecting-index': selectionIndex.value > -1,
        [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true
      }, classes.value]));
      return {
        expose: forwardRefs({
          isFocused,
          isPristine,
          menu,
          search,
          selectionIndex,
          filteredItems,
          select
        }, vTextFieldRef),
        renderInput: {
          displayItems,
          isDirty,
          isPristine,
          textFieldProps,
          textColorClasses,
          textColorStyles,
          vTextFieldRef,
          search,
          isFocused,
          listRef,
          selectedValues,
          model,
          menu,
          vMenuRef,
          menuDisabled,
          counterValue,
          noDataText,
          titleText,
          rootClasses,
          rootStyles: styles,
          vVirtualScrollRef,
          highlightFirst,
          hasChips,
          selectionIndex,
          getMatches,
          onUpdateModelValue,
          onClear,
          onMousedownControl,
          onKeydown,
          onAfterLeave,
          onListKeydown,
          onFocusin,
          onFocusout,
          onListScroll,
          select,
          noop,
          onMousedownMenuIcon
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACombobox = defineAlpineComponent({
    ..._Combobox,
    name: 'ACombobox'
  });

  // Composables

  // Types

  const makeVConfirmEditProps = propsFactory({
    modelValue: null,
    color: String,
    cancelText: {
      type: String,
      default: '$vuetify.confirmEdit.cancel'
    },
    okText: {
      type: String,
      default: '$vuetify.confirmEdit.ok'
    }
  }, 'VConfirmEdit');
  const _ConfirmEdit = defineComponent({
    name: 'VConfirmEdit',
    props: makeVConfirmEditProps(),
    emits: {
      cancel: () => true,
      save: value => true,
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        toRaw,
        watchEffect
      } = vm.reactivity;
      const model = useProxiedModel(vm, props, 'modelValue');
      const internalModel = ref();
      watchEffect(() => {
        internalModel.value = structuredClone(toRaw(model.value));
      });
      const {
        t
      } = useLocale$1(vm);
      const isPristine = computed(() => {
        return deepEqual(model.value, internalModel.value);
      });
      function save() {
        model.value = internalModel.value;
        vm.emit('save', internalModel.value);
      }
      function cancel() {
        internalModel.value = structuredClone(toRaw(model.value));
        vm.emit('cancel');
      }
      const actionsUsed = ref(false);
      const cancelText = computed(() => t(props.cancelText));
      const okText = computed(() => t(props.okText));
      return {
        expose: {
          save,
          cancel,
          isPristine
        },
        renderInput: {
          actionsUsed,
          isPristine,
          internalModel,
          cancelText,
          okText,
          cancel,
          save
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AConfirmEdit = defineAlpineComponent({
    ..._ConfirmEdit,
    name: 'AConfirmEdit'
  });

  // Styles

  // Types

  const makeVCounterProps = propsFactory({
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0
    },
    ...makeComponentProps(),
    ...makeTransitionProps({
      // NOTE(Alpinui): The default component is set in `VCounter.tsx`
      transition: {
        component: null
      }
    })
  }, 'VCounter');
  const _Counter = defineComponent({
    name: 'VCounter',
    functional: true,
    props: makeVCounterProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const counter = computed(() => {
        return props.max ? `${props.value} / ${props.max}` : String(props.value);
      });
      const rootClasses = computed(() => normalizeClass(['v-counter', {
        'text-error': !!(props.max && !props.disabled && parseFloat(props.value) > parseFloat(props.max))
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          counter,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACounter = defineAlpineComponent({
    ..._Counter,
    name: 'ACounter'
  });

  // Composables

  // Types

  const makeDataTableExpandProps = propsFactory({
    expandOnClick: Boolean,
    showExpand: Boolean,
    expanded: {
      type: Array,
      default: () => []
    }
  }, 'DataTable-expand');
  const VDataTableExpandedKey = Symbol.for('vuetify:datatable:expanded');
  function provideExpanded(vm, props) {
    const {
      provide,
      toRef
    } = vm.reactivity;
    const expandOnClick = toRef(props, 'expandOnClick');
    const expanded = useProxiedModel(vm, props, 'expanded', props.expanded, v => {
      return new Set(v);
    }, v => {
      return [...v.values()];
    });
    function expand(item, value) {
      const newExpanded = new Set(expanded.value);
      if (!value) {
        newExpanded.delete(item.value);
      } else {
        newExpanded.add(item.value);
      }
      expanded.value = newExpanded;
    }
    function isExpanded(item) {
      return expanded.value.has(item.value);
    }
    function toggleExpand(item) {
      expand(item, !isExpanded(item));
    }
    const data = {
      expand,
      expanded,
      expandOnClick,
      isExpanded,
      toggleExpand
    };
    provide(VDataTableExpandedKey, data);
    return data;
  }
  function useExpanded(vm) {
    const {
      inject
    } = vm.reactivity;
    const data = inject(VDataTableExpandedKey);
    if (!data) throw new Error('foo');
    return data;
  }

  // Composables

  // Types

  const makeDataTableGroupProps = propsFactory({
    groupBy: {
      type: Array,
      default: () => []
    }
  }, 'DataTable-group');
  const VDataTableGroupSymbol = Symbol.for('vuetify:data-table-group');
  function createGroupBy(vm, props) {
    const groupBy = useProxiedModel(vm, props, 'groupBy');
    return {
      groupBy
    };
  }
  function provideGroupBy(vm, options) {
    const {
      computed,
      provide,
      ref
    } = vm.reactivity;
    const {
      disableSort,
      groupBy,
      sortBy
    } = options;
    const opened = ref(new Set());
    const sortByWithGroups = computed(() => {
      return groupBy.value.map(val => ({
        ...val,
        order: val.order ?? false
      })).concat(disableSort?.value ? [] : sortBy.value);
    });
    function isGroupOpen(group) {
      return opened.value.has(group.id);
    }
    function toggleGroup(group) {
      const newOpened = new Set(opened.value);
      if (!isGroupOpen(group)) newOpened.add(group.id);else newOpened.delete(group.id);
      opened.value = newOpened;
    }
    function extractRows(items) {
      function dive(group) {
        const arr = [];
        for (const item of group.items) {
          if ('type' in item && item.type === 'group') {
            arr.push(...dive(item));
          } else {
            arr.push(item);
          }
        }
        return arr;
      }
      return dive({
        type: 'group',
        items,
        id: 'dummy',
        key: 'dummy',
        value: 'dummy',
        depth: 0
      });
    }

    // onBeforeMount(() => {
    //   for (const key of groupedItems.value.keys()) {
    //     opened.value.add(key)
    //   }
    // })

    const data = {
      sortByWithGroups,
      toggleGroup,
      opened,
      groupBy,
      extractRows,
      isGroupOpen
    };
    provide(VDataTableGroupSymbol, data);
    return data;
  }
  function useGroupBy(vm) {
    const {
      inject
    } = vm.reactivity;
    const data = inject(VDataTableGroupSymbol);
    if (!data) throw new Error('Missing group!');
    return data;
  }
  function groupItemsByProperty(items, groupBy) {
    if (!items.length) return [];
    const groups = new Map();
    for (const item of items) {
      const value = getObjectValueByPath(item.raw, groupBy);
      if (!groups.has(value)) {
        groups.set(value, []);
      }
      groups.get(value).push(item);
    }
    return groups;
  }
  function groupItems(items, groupBy) {
    let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'root';
    if (!groupBy.length) return [];
    const groupedItems = groupItemsByProperty(items, groupBy[0]);
    const groups = [];
    const rest = groupBy.slice(1);
    groupedItems.forEach((items, value) => {
      const key = groupBy[0];
      const id = `${prefix}_${key}_${value}`;
      groups.push({
        depth,
        id,
        key,
        value,
        items: rest.length ? groupItems(items, rest, depth + 1, id) : items,
        type: 'group'
      });
    });
    return groups;
  }
  function flattenItems(items, opened) {
    const flatItems = [];
    for (const item of items) {
      // TODO(Vuetify): make this better
      if ('type' in item && item.type === 'group') {
        if (item.value != null) {
          flatItems.push(item);
        }
        if (opened.has(item.id) || item.value == null) {
          flatItems.push(...flattenItems(item.items, opened));
        }
      } else {
        flatItems.push(item);
      }
    }
    return flatItems;
  }
  function useGroupedItems(vm, items, groupBy, opened) {
    const {
      computed
    } = vm.reactivity;
    const flatItems = computed(() => {
      if (!groupBy.value.length) return items.value;
      const groupedItems = groupItems(items.value, groupBy.value.map(item => item.key));
      return flattenItems(groupedItems, opened.value);
    });
    return {
      flatItems
    };
  }

  // Utilities

  // Types

  function useOptions(vm, _ref) {
    let {
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    } = _ref;
    const {
      computed,
      watch
    } = vm.reactivity;
    const options = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      groupBy: groupBy.value,
      search: search.value
    }));
    let oldOptions = null;
    watch(options, () => {
      if (deepEqual(oldOptions, options.value)) return;

      // Reset page when searching
      if (oldOptions && oldOptions.search !== options.value.search) {
        page.value = 1;
      }
      vm.emit('update:options', ...[options.value]);
      oldOptions = options.value;
    }, {
      deep: true,
      immediate: true
    });
  }

  // Composables

  // Types

  const makeDataTablePaginateProps = propsFactory({
    page: {
      type: [Number, String],
      default: 1
    },
    itemsPerPage: {
      type: [Number, String],
      default: 10
    }
  }, 'DataTable-paginate');
  const VDataTablePaginationSymbol = Symbol.for('vuetify:data-table-pagination');
  function createPagination(vm, props) {
    const page = useProxiedModel(vm, props, 'page', undefined, value => +(value ?? 1));
    const itemsPerPage = useProxiedModel(vm, props, 'itemsPerPage', undefined, value => +(value ?? 10));
    return {
      page,
      itemsPerPage
    };
  }
  function providePagination(vm, options) {
    const {
      computed,
      provide,
      watchEffect
    } = vm.reactivity;
    const {
      page,
      itemsPerPage,
      itemsLength
    } = options;
    const startIndex = computed(() => {
      if (itemsPerPage.value === -1) return 0;
      return itemsPerPage.value * (page.value - 1);
    });
    const stopIndex = computed(() => {
      if (itemsPerPage.value === -1) return itemsLength.value;
      return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
    });
    const pageCount = computed(() => {
      if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
      return Math.ceil(itemsLength.value / itemsPerPage.value);
    });
    watchEffect(() => {
      if (page.value > pageCount.value) {
        page.value = pageCount.value;
      }
    });
    function setItemsPerPage(value) {
      itemsPerPage.value = value;
      page.value = 1;
    }
    function nextPage() {
      page.value = clamp(page.value + 1, 1, pageCount.value);
    }
    function prevPage() {
      page.value = clamp(page.value - 1, 1, pageCount.value);
    }
    function setPage(value) {
      page.value = clamp(value, 1, pageCount.value);
    }
    const data = {
      page,
      itemsPerPage,
      startIndex,
      stopIndex,
      pageCount,
      itemsLength,
      nextPage,
      prevPage,
      setPage,
      setItemsPerPage
    };
    provide(VDataTablePaginationSymbol, data);
    return data;
  }
  function usePagination(vm) {
    const {
      inject
    } = vm.reactivity;
    const data = inject(VDataTablePaginationSymbol);
    if (!data) throw new Error('Missing pagination!');
    return data;
  }
  function usePaginatedItems(vm, options) {
    const {
      computed,
      watch
    } = vm.reactivity;
    const {
      items,
      startIndex,
      stopIndex,
      itemsPerPage
    } = options;
    const paginatedItems = computed(() => {
      if (itemsPerPage.value <= 0) return items.value;
      return items.value.slice(startIndex.value, stopIndex.value);
    });
    watch(paginatedItems, val => {
      vm.emit('update:currentItems', ...[val]);
    });
    return {
      paginatedItems
    };
  }

  // Composables

  // Types

  const singleSelectStrategy = {
    showSelectAll: false,
    allSelected: () => [],
    select: _ref => {
      let {
        items,
        value
      } = _ref;
      return new Set(value ? [items[0]?.value] : []);
    },
    selectAll: _ref2 => {
      let {
        selected
      } = _ref2;
      return selected;
    }
  };
  const pageSelectStrategy = {
    showSelectAll: true,
    allSelected: _ref3 => {
      let {
        currentPage
      } = _ref3;
      return currentPage;
    },
    select: _ref4 => {
      let {
        items,
        value,
        selected
      } = _ref4;
      for (const item of items) {
        if (value) selected.add(item.value);else selected.delete(item.value);
      }
      return selected;
    },
    selectAll: _ref5 => {
      let {
        value,
        currentPage,
        selected
      } = _ref5;
      return pageSelectStrategy.select({
        items: currentPage,
        value,
        selected
      });
    }
  };
  const allSelectStrategy = {
    showSelectAll: true,
    allSelected: _ref6 => {
      let {
        allItems
      } = _ref6;
      return allItems;
    },
    select: _ref7 => {
      let {
        items,
        value,
        selected
      } = _ref7;
      for (const item of items) {
        if (value) selected.add(item.value);else selected.delete(item.value);
      }
      return selected;
    },
    selectAll: _ref8 => {
      let {
        value,
        allItems,
        selected
      } = _ref8;
      return allSelectStrategy.select({
        items: allItems,
        value,
        selected
      });
    }
  };
  const makeDataTableSelectProps = propsFactory({
    showSelect: Boolean,
    selectStrategy: {
      type: [String, Object],
      default: 'page'
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    valueComparator: {
      type: Function,
      default: deepEqual
    }
  }, 'DataTable-select');
  const VDataTableSelectionSymbol = Symbol.for('vuetify:data-table-selection');
  function provideSelection(vm, props, _ref9) {
    let {
      allItems,
      currentPage
    } = _ref9;
    const {
      computed,
      provide
    } = vm.reactivity;
    const selected = useProxiedModel(vm, props, 'modelValue', props.modelValue, v => {
      return new Set(wrapInArray(v).map(v => {
        return allItems.value.find(item => props.valueComparator(v, item.value))?.value ?? v;
      }));
    }, v => {
      return [...v.values()];
    });
    const allSelectable = computed(() => allItems.value.filter(item => item.selectable));
    const currentPageSelectable = computed(() => currentPage.value.filter(item => item.selectable));
    const selectStrategy = computed(() => {
      if (typeof props.selectStrategy === 'object') return props.selectStrategy;
      switch (props.selectStrategy) {
        case 'single':
          return singleSelectStrategy;
        case 'all':
          return allSelectStrategy;
        case 'page':
        default:
          return pageSelectStrategy;
      }
    });
    function isSelected(items) {
      return wrapInArray(items).every(item => selected.value.has(item.value));
    }
    function isSomeSelected(items) {
      return wrapInArray(items).some(item => selected.value.has(item.value));
    }
    function select(items, value) {
      const newSelected = selectStrategy.value.select({
        items,
        value,
        selected: new Set(selected.value)
      });
      selected.value = newSelected;
    }
    function toggleSelect(item) {
      select([item], !isSelected([item]));
    }
    function selectAll(value) {
      const newSelected = selectStrategy.value.selectAll({
        value,
        allItems: allSelectable.value,
        currentPage: currentPageSelectable.value,
        selected: new Set(selected.value)
      });
      selected.value = newSelected;
    }
    const someSelected = computed(() => selected.value.size > 0);
    const allSelected = computed(() => {
      const items = selectStrategy.value.allSelected({
        allItems: allSelectable.value,
        currentPage: currentPageSelectable.value
      });
      return !!items.length && isSelected(items);
    });
    const showSelectAll = computed(() => selectStrategy.value.showSelectAll);
    const data = {
      toggleSelect,
      select,
      selectAll,
      isSelected,
      isSomeSelected,
      someSelected,
      allSelected,
      showSelectAll
    };
    provide(VDataTableSelectionSymbol, data);
    return data;
  }
  function useSelection(vm) {
    const {
      inject
    } = vm.reactivity;
    const data = inject(VDataTableSelectionSymbol);
    if (!data) throw new Error('Missing selection!');
    return data;
  }

  // Composables

  // Types

  const makeDataTableSortProps = propsFactory({
    sortBy: {
      type: Array,
      default: () => []
    },
    customKeySort: Object,
    multiSort: Boolean,
    mustSort: Boolean
  }, 'DataTable-sort');
  const VDataTableSortSymbol = Symbol.for('vuetify:data-table-sort');
  function createSort(vm, props) {
    const {
      toRef
    } = vm.reactivity;
    const sortBy = useProxiedModel(vm, props, 'sortBy');
    const mustSort = toRef(props, 'mustSort');
    const multiSort = toRef(props, 'multiSort');
    return {
      sortBy,
      mustSort,
      multiSort
    };
  }
  function provideSort(vm, options) {
    const {
      provide
    } = vm.reactivity;
    const {
      sortBy,
      mustSort,
      multiSort,
      page
    } = options;
    const toggleSort = column => {
      if (column.key == null) return;
      let newSortBy = sortBy.value.map(x => ({
        ...x
      })) ?? [];
      const item = newSortBy.find(x => x.key === column.key);
      if (!item) {
        if (multiSort.value) newSortBy = [...newSortBy, {
          key: column.key,
          order: 'asc'
        }];else newSortBy = [{
          key: column.key,
          order: 'asc'
        }];
      } else if (item.order === 'desc') {
        if (mustSort.value) {
          item.order = 'asc';
        } else {
          newSortBy = newSortBy.filter(x => x.key !== column.key);
        }
      } else {
        item.order = 'desc';
      }
      sortBy.value = newSortBy;
      if (page) page.value = 1;
    };
    function isSorted(column) {
      return !!sortBy.value.find(item => item.key === column.key);
    }
    const data = {
      sortBy,
      toggleSort,
      isSorted
    };
    provide(VDataTableSortSymbol, data);
    return data;
  }
  function useSort(vm) {
    const {
      inject
    } = vm.reactivity;
    const data = inject(VDataTableSortSymbol);
    if (!data) throw new Error('Missing sort!');
    return data;
  }

  // TODO(Vuetify): abstract into project composable
  function useSortedItems(vm, props, items, sortBy, options) {
    const {
      computed
    } = vm.reactivity;
    const locale = useLocale$1(vm);
    const sortedItems = computed(() => {
      if (!sortBy.value.length) return items.value;
      return sortItems(items.value, sortBy.value, locale.current.value, {
        transform: options?.transform,
        sortFunctions: {
          ...props.customKeySort,
          ...options?.sortFunctions?.value
        },
        sortRawFunctions: options?.sortRawFunctions?.value
      });
    });
    return {
      sortedItems
    };
  }
  function sortItems(items, sortByItems, locale, options) {
    const stringCollator = new Intl.Collator(locale, {
      sensitivity: 'accent',
      usage: 'sort'
    });
    const transformedItems = items.map(item => [item, options?.transform ? options.transform(item) : item]);
    return transformedItems.sort((a, b) => {
      for (let i = 0; i < sortByItems.length; i++) {
        let hasCustomResult = false;
        const sortKey = sortByItems[i].key;
        const sortOrder = sortByItems[i].order ?? 'asc';
        if (sortOrder === false) continue;
        let sortA = a[1][sortKey];
        let sortB = b[1][sortKey];
        let sortARaw = a[0].raw;
        let sortBRaw = b[0].raw;
        if (sortOrder === 'desc') {
          [sortA, sortB] = [sortB, sortA];
          [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
        }
        if (options?.sortRawFunctions?.[sortKey]) {
          const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
          if (customResult == null) continue;
          hasCustomResult = true;
          if (customResult) return customResult;
        }
        if (options?.sortFunctions?.[sortKey]) {
          const customResult = options.sortFunctions[sortKey](sortA, sortB);
          if (customResult == null) continue;
          hasCustomResult = true;
          if (customResult) return customResult;
        }
        if (hasCustomResult) continue;

        // Dates should be compared numerically
        if (sortA instanceof Date && sortB instanceof Date) {
          return sortA.getTime() - sortB.getTime();
        }
        [sortA, sortB] = [sortA, sortB].map(s => s != null ? s.toString().toLocaleLowerCase() : s);
        if (sortA !== sortB) {
          if (isEmpty(sortA) && isEmpty(sortB)) return 0;
          if (isEmpty(sortA)) return -1;
          if (isEmpty(sortB)) return 1;
          if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
          return stringCollator.compare(sortA, sortB);
        }
      }
      return 0;
    }).map(_ref => {
      let [item] = _ref;
      return item;
    });
  }

  // Utilities

  // Types

  // Composables
  const makeDataIteratorItemsProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'id'
    },
    itemSelectable: {
      type: [String, Array, Function],
      default: null
    },
    returnObject: Boolean
  }, 'DataIterator-items');
  function transformItem$2(props, item) {
    const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
    const selectable = getPropertyFromItem(item, props.itemSelectable, true);
    return {
      type: 'item',
      value,
      selectable,
      raw: item
    };
  }
  function transformItems$2(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem$2(props, item));
    }
    return array;
  }
  function useDataIteratorItems(vm, props) {
    const {
      computed
    } = vm.reactivity;
    const items = computed(() => transformItems$2(props, props.items));
    return {
      items
    };
  }

  // Components
  const makeVDataIteratorProps = propsFactory({
    search: String,
    loading: Boolean,
    ...makeComponentProps(),
    ...makeDataIteratorItemsProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeDataTablePaginateProps({
      itemsPerPage: 5
    }),
    ...makeDataTableExpandProps(),
    ...makeDataTableGroupProps(),
    ...makeFilterProps(),
    ...makeTagProps(),
    ...makeTransitionProps({
      transition: {
        // NOTE(Alpinui): This is set in the Vue file to avoid import Vue in the headless file
        component: null,
        hideOnLeave: true
      }
    })
  }, 'VDataIterator');
  const _DataIterator = defineComponent({
    name: 'VDataIterator',
    props: makeVDataIteratorProps(),
    emits: {
      'update:modelValue': value => true,
      'update:groupBy': value => true,
      'update:page': value => true,
      'update:itemsPerPage': value => true,
      'update:sortBy': value => true,
      'update:options': value => true,
      'update:expanded': value => true,
      'update:currentItems': value => true
    },
    slots: makeSlots({
      default: null,
      header: null,
      footer: null,
      loader: null,
      'no-data': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const groupBy = useProxiedModel(vm, props, 'groupBy');
      const search = toRef(props, 'search');
      const {
        items
      } = useDataIteratorItems(vm, props);
      const {
        filteredItems
      } = useFilter(vm, props, items, search, {
        transform: item => item.raw
      });
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(vm, props);
      const {
        page,
        itemsPerPage
      } = createPagination(vm, props);
      const {
        toggleSort
      } = provideSort(vm, {
        sortBy,
        multiSort,
        mustSort,
        page
      });
      const {
        sortByWithGroups,
        opened,
        extractRows,
        isGroupOpen,
        toggleGroup
      } = provideGroupBy(vm, {
        groupBy,
        sortBy
      });
      const {
        sortedItems
      } = useSortedItems(vm, props, filteredItems, sortByWithGroups, {
        transform: item => item.raw
      });
      const {
        flatItems
      } = useGroupedItems(vm, sortedItems, groupBy, opened);
      const itemsLength = computed(() => flatItems.value.length);
      const {
        startIndex,
        stopIndex,
        pageCount,
        prevPage,
        nextPage,
        setItemsPerPage,
        setPage
      } = providePagination(vm, {
        page,
        itemsPerPage,
        itemsLength
      });
      const {
        paginatedItems
      } = usePaginatedItems(vm, {
        items: flatItems,
        startIndex,
        stopIndex,
        itemsPerPage
      });
      const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
      const {
        isSelected,
        select,
        selectAll,
        toggleSelect
      } = provideSelection(vm, props, {
        allItems: items,
        currentPage: paginatedItemsWithoutGroups
      });
      const {
        isExpanded,
        toggleExpand
      } = provideExpanded(vm, props);
      useOptions(vm, {
        page,
        itemsPerPage,
        sortBy,
        groupBy,
        search
      });
      const slotProps = computed(() => ({
        page: page.value,
        itemsPerPage: itemsPerPage.value,
        sortBy: sortBy.value,
        pageCount: pageCount.value,
        toggleSort,
        prevPage,
        nextPage,
        setPage,
        setItemsPerPage,
        isSelected,
        select,
        selectAll,
        toggleSelect,
        isExpanded,
        toggleExpand,
        isGroupOpen,
        toggleGroup,
        items: paginatedItemsWithoutGroups.value,
        groupedItems: paginatedItems.value
      }));
      const rootClasses = computed(() => normalizeClass(['v-data-iterator', {
        'v-data-iterator--loading': props.loading
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          paginatedItems,
          slotProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataIterator = defineAlpineComponent({
    ..._DataIterator,
    name: 'ADataIterator'
  });

  // Types

  function useRefs(vm) {
    const {
      onBeforeUpdate,
      ref
    } = vm.reactivity;
    const refs = ref([]);
    onBeforeUpdate(() => refs.value = []);
    function updateRef(e, i) {
      refs.value[i] = e;
    }
    return {
      refs,
      updateRef
    };
  }

  // Styles
  const makeVPaginationProps = propsFactory({
    activeColor: String,
    start: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: Number,
      default: props => props.start
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 1,
      validator: val => val % 1 === 0
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: IconValue,
      default: '$first'
    },
    prevIcon: {
      type: IconValue,
      default: '$prev'
    },
    nextIcon: {
      type: IconValue,
      default: '$next'
    },
    lastIcon: {
      type: IconValue,
      default: '$last'
    },
    ariaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.root'
    },
    pageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.page'
    },
    currentPageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.currentPage'
    },
    firstAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.first'
    },
    previousAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.previous'
    },
    nextAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.next'
    },
    lastAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.last'
    },
    ellipsis: {
      type: String,
      default: '...'
    },
    showFirstLastPage: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'nav'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'text'
    })
  }, 'VPagination');
  const _Pagination = defineComponent({
    name: 'VPagination',
    props: makeVPaginationProps(),
    emits: {
      'update:modelValue': value => true,
      first: value => true,
      prev: value => true,
      next: value => true,
      last: value => true
    },
    slots: makeSlots({
      item: null,
      first: null,
      prev: null,
      next: null,
      last: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        shallowRef,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const page = useProxiedModel(vm, props, 'modelValue');
      const {
        t,
        n
      } = useLocale$1(vm);
      const {
        isRtl
      } = useRtl$1(vm);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        width
      } = useDisplay$1(vm);
      const maxButtons = shallowRef(-1);
      provideDefaults(vm, undefined, {
        scoped: true
      });
      const {
        resizeRef
      } = useResizeObserver(vm, entries => {
        if (!entries.length) return;
        const {
          target,
          contentRect
        } = entries[0];
        const firstItem = target.querySelector('.v-pagination__list > *');
        if (!firstItem) return;
        const totalWidth = contentRect.width;
        const itemWidth = firstItem.offsetWidth + parseFloat(getComputedStyle(firstItem).marginRight) * 2;
        maxButtons.value = getMax(totalWidth, itemWidth);
      });
      const length = computed(() => parseInt(props.length, 10));
      const start = computed(() => parseInt(props.start, 10));
      const totalVisible = computed(() => {
        if (props.totalVisible != null) return parseInt(props.totalVisible, 10);else if (maxButtons.value >= 0) return maxButtons.value;
        return getMax(width.value, 58);
      });
      function getMax(totalWidth, itemWidth) {
        const minButtons = props.showFirstLastPage ? 5 : 3;
        return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        +((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)));
      }
      const range = computed(() => {
        if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
        if (totalVisible.value <= 0) return [];else if (totalVisible.value === 1) return [page.value];
        if (length.value <= totalVisible.value) {
          return createRange(length.value, start.value);
        }
        const even = totalVisible.value % 2 === 0;
        const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
        const left = even ? middle : middle + 1;
        const right = length.value - middle;
        if (left - page.value >= 0) {
          return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
        } else if (page.value - right >= (even ? 1 : 0)) {
          const rangeLength = totalVisible.value - 1;
          const rangeStart = length.value - rangeLength + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
        } else {
          const rangeLength = Math.max(1, totalVisible.value - 3);
          const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
          return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
        }
      });

      // TODO(Vuetify): 'first' | 'prev' | 'next' | 'last' does not work here?
      function setValue(e, value, event) {
        e.preventDefault();
        page.value = value;
        event && vm.emit(event, value);
      }
      const {
        refs,
        updateRef
      } = useRefs(vm);
      provideDefaults(vm, {
        VPaginationBtn: {
          color: toRef(props, 'color'),
          border: toRef(props, 'border'),
          density: toRef(props, 'density'),
          size: toRef(props, 'size'),
          variant: toRef(props, 'variant'),
          rounded: toRef(props, 'rounded'),
          elevation: toRef(props, 'elevation')
        }
      });
      const items = computed(() => {
        return range.value.map((item, index) => {
          const ref = e => updateRef(e, index);
          if (typeof item === 'string') {
            return {
              isActive: false,
              key: `ellipsis-${index}`,
              page: item,
              props: {
                ref,
                ellipsis: true,
                icon: true,
                disabled: true
              }
            };
          } else {
            const isActive = item === page.value;
            return {
              isActive,
              key: item,
              page: n(item),
              props: {
                ref,
                ellipsis: false,
                icon: true,
                disabled: !!props.disabled || +props.length < 2,
                color: isActive ? props.activeColor : props.color,
                'aria-current': isActive,
                'aria-label': t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
                onClick: e => setValue(e, item)
              }
            };
          }
        });
      });
      const controls = computed(() => {
        const prevDisabled = !!props.disabled || page.value <= start.value;
        const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
        return {
          first: props.showFirstLastPage ? {
            icon: isRtl.value ? props.lastIcon : props.firstIcon,
            onClick: e => setValue(e, start.value, 'first'),
            disabled: prevDisabled,
            'aria-label': t(props.firstAriaLabel),
            'aria-disabled': prevDisabled
          } : undefined,
          prev: {
            icon: isRtl.value ? props.nextIcon : props.prevIcon,
            onClick: e => setValue(e, page.value - 1, 'prev'),
            disabled: prevDisabled,
            'aria-label': t(props.previousAriaLabel),
            'aria-disabled': prevDisabled
          },
          next: {
            icon: isRtl.value ? props.prevIcon : props.nextIcon,
            onClick: e => setValue(e, page.value + 1, 'next'),
            disabled: nextDisabled,
            'aria-label': t(props.nextAriaLabel),
            'aria-disabled': nextDisabled
          },
          last: props.showFirstLastPage ? {
            icon: isRtl.value ? props.firstIcon : props.lastIcon,
            onClick: e => setValue(e, start.value + length.value - 1, 'last'),
            disabled: nextDisabled,
            'aria-label': t(props.lastAriaLabel),
            'aria-disabled': nextDisabled
          } : undefined
        };
      });
      function updateFocus() {
        const currentIndex = page.value - start.value;
        refs.value[currentIndex]?.$el.focus();
      }
      function onKeydown(e) {
        if (e.key === keyValues.left && !props.disabled && page.value > +props.start) {
          page.value = page.value - 1;
          nextTick(updateFocus);
        } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
          page.value = page.value + 1;
          nextTick(updateFocus);
        }
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-pagination', themeClasses.value, classes.value]));
      const rootAriaLabel = computed(() => t(props.ariaLabel));
      return {
        expose: {},
        renderInput: {
          controls,
          items,
          resizeRef,
          rootAriaLabel,
          rootClasses,
          rootStyles: styles,
          onKeydown
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVDataTableFooterProps = propsFactory({
    prevIcon: {
      type: IconValue,
      default: '$prev'
    },
    nextIcon: {
      type: IconValue,
      default: '$next'
    },
    firstIcon: {
      type: IconValue,
      default: '$first'
    },
    lastIcon: {
      type: IconValue,
      default: '$last'
    },
    itemsPerPageText: {
      type: String,
      default: '$vuetify.dataFooter.itemsPerPageText'
    },
    pageText: {
      type: String,
      default: '$vuetify.dataFooter.pageText'
    },
    firstPageLabel: {
      type: String,
      default: '$vuetify.dataFooter.firstPage'
    },
    prevPageLabel: {
      type: String,
      default: '$vuetify.dataFooter.prevPage'
    },
    nextPageLabel: {
      type: String,
      default: '$vuetify.dataFooter.nextPage'
    },
    lastPageLabel: {
      type: String,
      default: '$vuetify.dataFooter.lastPage'
    },
    itemsPerPageOptions: {
      type: Array,
      default: () => [{
        value: 10,
        title: '10'
      }, {
        value: 25,
        title: '25'
      }, {
        value: 50,
        title: '50'
      }, {
        value: 100,
        title: '100'
      }, {
        value: -1,
        title: '$vuetify.dataFooter.itemsPerPageAll'
      }]
    },
    showCurrentPage: Boolean
  }, 'VDataTableFooter');
  const _DataTableFooter = defineComponent({
    name: 'VDataTableFooter',
    props: makeVDataTableFooterProps(),
    slots: makeSlots({
      prepend: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        t
      } = useLocale$1(vm);
      const {
        page,
        pageCount,
        startIndex,
        stopIndex,
        itemsLength,
        itemsPerPage,
        setItemsPerPage
      } = usePagination(vm);
      const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map(option => {
        if (typeof option === 'number') {
          return {
            value: option,
            title: option === -1 ? t('$vuetify.dataFooter.itemsPerPageAll') : String(option)
          };
        }
        return {
          ...option,
          title: !isNaN(Number(option.title)) ? option.title : t(option.title)
        };
      }));
      const onUpdateItemsPerPage = v => setItemsPerPage(Number(v));
      const paginationProps = computed(() => _Pagination.filterProps(props));
      const itemsPerPageText = computed(() => t(props.itemsPerPageText));
      const pageText = computed(() => t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value));
      return {
        expose: {},
        renderInput: {
          paginationProps,
          itemsPerPage,
          itemsPerPageOptions,
          itemsPerPageText,
          onUpdateItemsPerPage,
          page,
          pageCount,
          pageText
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities

  // Types

  const makeDataTableHeaderProps = propsFactory({
    headers: Array
  }, 'DataTable-header');
  const VDataTableHeadersSymbol = Symbol.for('vuetify:data-table-headers');
  const defaultHeader = {
    title: '',
    sortable: false
  };
  const defaultActionHeader = {
    ...defaultHeader,
    width: 48
  };
  function priorityQueue() {
    let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const queue = arr.map(element => ({
      element,
      priority: 0
    }));
    return {
      enqueue: (element, priority) => {
        let added = false;
        for (let i = 0; i < queue.length; i++) {
          const item = queue[i];
          if (item.priority > priority) {
            queue.splice(i, 0, {
              element,
              priority
            });
            added = true;
            break;
          }
        }
        if (!added) queue.push({
          element,
          priority
        });
      },
      size: () => queue.length,
      count: () => {
        let count = 0;
        if (!queue.length) return 0;
        const whole = Math.floor(queue[0].priority);
        for (let i = 0; i < queue.length; i++) {
          if (Math.floor(queue[i].priority) === whole) count += 1;
        }
        return count;
      },
      dequeue: () => {
        return queue.shift();
      }
    };
  }
  function extractLeaves(item) {
    let columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (!item.children) {
      columns.push(item);
    } else {
      for (const child of item.children) {
        extractLeaves(child, columns);
      }
    }
    return columns;
  }
  function extractKeys(headers) {
    let keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
    for (const item of headers) {
      if (item.key) keys.add(item.key);
      if (item.children) {
        extractKeys(item.children, keys);
      }
    }
    return keys;
  }
  function getDefaultItem(item) {
    if (!item.key) return undefined;
    if (item.key === 'data-table-group') return defaultHeader;
    if (['data-table-expand', 'data-table-select'].includes(item.key)) return defaultActionHeader;
    return undefined;
  }
  function getDepth(item) {
    let depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!item.children) return depth;
    return Math.max(depth, ...item.children.map(child => getDepth(child, depth + 1)));
  }
  function parseFixedColumns(items) {
    let seenFixed = false;
    function setFixed(item) {
      let parentFixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!item) return;
      if (parentFixed) {
        item.fixed = true;
      }
      if (item.fixed) {
        if (item.children) {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], true);
          }
        } else {
          if (!seenFixed) {
            item.lastFixed = true;
          } else if (isNaN(+item.width)) {
            consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
          }
          seenFixed = true;
        }
      } else {
        if (item.children) {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i]);
          }
        } else {
          seenFixed = false;
        }
      }
    }
    for (let i = items.length - 1; i >= 0; i--) {
      setFixed(items[i]);
    }
    function setFixedOffset(item) {
      let fixedOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!item) return fixedOffset;
      if (item.children) {
        item.fixedOffset = fixedOffset;
        for (const child of item.children) {
          fixedOffset = setFixedOffset(child, fixedOffset);
        }
      } else if (item.fixed) {
        item.fixedOffset = fixedOffset;
        fixedOffset += parseFloat(item.width || '0') || 0;
      }
      return fixedOffset;
    }
    let fixedOffset = 0;
    for (const item of items) {
      fixedOffset = setFixedOffset(item, fixedOffset);
    }
  }
  function parse(items, maxDepth) {
    const headers = [];
    let currentDepth = 0;
    const queue = priorityQueue(items);
    while (queue.size() > 0) {
      let rowSize = queue.count();
      const row = [];
      let fraction = 1;
      while (rowSize > 0) {
        const {
          element: item,
          priority
        } = queue.dequeue();
        const diff = maxDepth - currentDepth - getDepth(item);
        row.push({
          ...item,
          rowspan: diff ?? 1,
          colspan: item.children ? extractLeaves(item).length : 1
        });
        if (item.children) {
          for (const child of item.children) {
            // This internally sorts items that are on the same priority "row"
            const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
            queue.enqueue(child, currentDepth + diff + sort);
          }
        }
        fraction += 1;
        rowSize -= 1;
      }
      currentDepth += 1;
      headers.push(row);
    }
    const columns = items.map(item => extractLeaves(item)).flat();
    return {
      columns,
      headers
    };
  }
  function convertToInternalHeaders(items) {
    const internalHeaders = [];
    for (const item of items) {
      const defaultItem = {
        ...getDefaultItem(item),
        ...item
      };
      const key = defaultItem.key ?? (typeof defaultItem.value === 'string' ? defaultItem.value : null);
      const value = defaultItem.value ?? key ?? null;
      const internalItem = {
        ...defaultItem,
        key,
        value,
        sortable: defaultItem.sortable ?? (defaultItem.key != null || !!defaultItem.sort),
        children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : undefined
      };
      internalHeaders.push(internalItem);
    }
    return internalHeaders;
  }
  function createHeaders(vm, props, options) {
    const {
      provide,
      ref,
      watchEffect
    } = vm.reactivity;
    const headers = ref([]);
    const columns = ref([]);
    const sortFunctions = ref({});
    const sortRawFunctions = ref({});
    const filterFunctions = ref({});
    watchEffect(() => {
      const _headers = props.headers || Object.keys(props.items[0] ?? {}).map(key => ({
        key,
        title: capitalize(key)
      }));
      const items = _headers.slice();
      const keys = extractKeys(items);
      if (options?.groupBy?.value.length && !keys.has('data-table-group')) {
        items.unshift({
          key: 'data-table-group',
          title: 'Group'
        });
      }
      if (options?.showSelect?.value && !keys.has('data-table-select')) {
        items.unshift({
          key: 'data-table-select'
        });
      }
      if (options?.showExpand?.value && !keys.has('data-table-expand')) {
        items.push({
          key: 'data-table-expand'
        });
      }
      const internalHeaders = convertToInternalHeaders(items);
      parseFixedColumns(internalHeaders);
      const maxDepth = Math.max(...internalHeaders.map(item => getDepth(item))) + 1;
      const parsed = parse(internalHeaders, maxDepth);
      headers.value = parsed.headers;
      columns.value = parsed.columns;
      const flatHeaders = parsed.headers.flat(1);
      for (const header of flatHeaders) {
        if (!header.key) continue;
        if (header.sortable) {
          if (header.sort) {
            sortFunctions.value[header.key] = header.sort;
          }
          if (header.sortRaw) {
            sortRawFunctions.value[header.key] = header.sortRaw;
          }
        }
        if (header.filter) {
          filterFunctions.value[header.key] = header.filter;
        }
      }
    });
    const data = {
      headers,
      columns,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    };
    provide(VDataTableHeadersSymbol, data);
    return data;
  }
  function useHeaders(vm) {
    const {
      inject
    } = vm.reactivity;
    const data = inject(VDataTableHeadersSymbol);
    if (!data) throw new Error('Missing headers!');
    return data;
  }

  // Composables
  const makeVDataTableHeadersProps = propsFactory({
    color: String,
    sticky: Boolean,
    disableSort: Boolean,
    multiSort: Boolean,
    sortAscIcon: {
      type: IconValue,
      default: '$sortAsc'
    },
    sortDescIcon: {
      type: IconValue,
      default: '$sortDesc'
    },
    headerProps: {
      type: Object
    },
    ...makeDisplayProps(),
    ...makeLoaderProps()
  }, 'VDataTableHeaders');
  const _DataTableHeaders = defineComponent({
    name: 'VDataTableHeaders',
    props: makeVDataTableHeadersProps(),
    slots: makeSlots({
      headers: null,
      loader: null,
      'header.data-table-select': null,
      'header.data-table-expand': null,
      // TODO - How to handle this?
      'header.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        t
      } = useLocale$1(vm);
      const {
        toggleSort,
        sortBy,
        isSorted
      } = useSort(vm);
      const {
        someSelected,
        allSelected,
        selectAll,
        showSelectAll
      } = useSelection(vm);
      const {
        columns,
        headers
      } = useHeaders(vm);
      const {
        loaderClasses
      } = useLoader(vm, props);
      function getFixedStyles(column, y) {
        if (!props.sticky && !column.fixed) return undefined;
        return {
          position: 'sticky',
          left: column.fixed ? convertToUnit(column.fixedOffset) : undefined,
          top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : undefined
        };
      }
      function getSortIcon(column) {
        const item = sortBy.value.find(item => item.key === column.key);
        if (!item) return props.sortAscIcon;
        return item.order === 'asc' ? props.sortAscIcon : props.sortDescIcon;
      }
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, props, 'color');
      const {
        displayClasses,
        mobile
      } = useDisplay$1(vm, props);
      const slotProps = computed(() => ({
        headers: headers.value,
        columns: columns.value,
        toggleSort,
        isSorted,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        selectAll,
        getSortIcon
      }));
      const genSortIconClasses = rawValue => normalizeClass(['v-data-table__td-sort-icon', isSorted(rawValue) ? 'v-data-table__td-sort-icon-active' : []]);
      const displayItems = computed(() => {
        return columns.value.filter(column => column?.sortable && !props.disableSort);
      });
      const appendIcon = computed(() => {
        const showSelectColumn = columns.value.find(column => column.key === 'data-table-select');
        if (showSelectColumn == null) return;
        return allSelected.value ? '$checkboxOn' : someSelected.value ? '$checkboxIndeterminate' : '$checkboxOff';
      });
      const sortByText = computed(() => t('$vuetify.dataTable.sortBy'));
      const headerCellClasses = computed(() => ['v-data-table__th', {
        'v-data-table__th--sticky': !!props.sticky
      }, displayClasses.value, loaderClasses.value]);
      const genColumnClasses = column => normalizeClass([{
        'v-data-table__th--sortable': column.sortable && !props.disableSort,
        'v-data-table__th--sorted': isSorted(column),
        'v-data-table__th--fixed': !!column.fixed
      }, ...headerCellClasses.value]);
      const genColumnStyles = (column, y) => normalizeStyle({
        width: convertToUnit(column.width),
        minWidth: convertToUnit(column.minWidth),
        maxWidth: convertToUnit(column.maxWidth),
        ...getFixedStyles(column, y)
      });
      return {
        expose: {},
        renderInput: {
          columns,
          headers,
          headerCellClasses,
          displayItems,
          appendIcon,
          toggleSort,
          selectAll,
          isSorted,
          sortBy,
          sortByText,
          someSelected,
          allSelected,
          showSelectAll,
          genColumnClasses,
          genColumnStyles,
          getSortIcon,
          genSortIconClasses,
          backgroundColorClasses,
          backgroundColorStyles,
          slotProps,
          mobile
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities
  function getPrefixedEventHandlers(attrs, suffix, getData) {
    return Object.keys(attrs).filter(key => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
      acc[key.slice(0, -suffix.length)] = event => attrs[key](event, getData(event));
      return acc;
    }, {});
  }

  // Composables

  // Types

  const makeVDataTableRowsProps = propsFactory({
    loading: [Boolean, String],
    loadingText: {
      type: String,
      default: '$vuetify.dataIterator.loadingText'
    },
    hideNoData: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    noDataText: {
      type: String,
      default: '$vuetify.noDataText'
    },
    rowProps: [Object, Function],
    cellProps: [Object, Function],
    ...makeDisplayProps()
  }, 'VDataTableRows');
  const _DataTableRows = defineComponent({
    name: 'VDataTableRows',
    inheritAttrs: false,
    props: makeVDataTableRowsProps(),
    slots: makeSlots({
      'data-table-group': null,
      'data-table-select': null,
      'item.data-table-select': null,
      'item.data-table-expand': null,
      'header.data-table-select': null,
      'header.data-table-expand': null,
      item: null,
      loading: null,
      'group-header': null,
      'no-data': null,
      'expanded-row': null,
      // TODO - How to handle these?
      'item.<name>': null,
      'header.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        columns
      } = useHeaders(vm);
      const {
        expandOnClick,
        toggleExpand,
        isExpanded
      } = useExpanded(vm);
      const {
        isSelected,
        toggleSelect
      } = useSelection(vm);
      const {
        toggleGroup,
        isGroupOpen
      } = useGroupBy(vm);
      const {
        t
      } = useLocale$1(vm);
      const {
        mobile
      } = useDisplay$1(vm, props);
      const genGroupHeaderProps = (attrs, slotProps) => getPrefixedEventHandlers(attrs, ':group-header', () => slotProps);
      const genItemProps = (attrs, slotProps) => getPrefixedEventHandlers(attrs, ':row', () => slotProps);
      const loadingText = computed(() => t(props.loadingText));
      const noDataText = computed(() => t(props.noDataText));
      return {
        expose: {},
        renderInput: {
          columns,
          mobile,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect,
          toggleGroup,
          isGroupOpen,
          expandOnClick,
          genGroupHeaderProps,
          genItemProps,
          loadingText,
          noDataText
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles
  const makeVTableProps = propsFactory({
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],
    hover: Boolean,
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VTable');
  const _Table = defineComponent({
    name: 'VTable',
    props: makeVTableProps(),
    slots: makeSlots({
      default: null,
      top: null,
      bottom: null,
      wrapper: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-table', {
        'v-table--fixed-height': !!props.height,
        'v-table--fixed-header': props.fixedHeader,
        'v-table--fixed-footer': props.fixedFooter,
        'v-table--has-top': vm.hasSlots.top,
        'v-table--has-bottom': vm.hasSlots.bottom,
        'v-table--hover': props.hover
      }, themeClasses.value, densityClasses.value, classes.value]));
      const wrapperStyles = computed(() => normalizeStyle({
        height: convertToUnit(props.height)
      }));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles,
          wrapperStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Utilities

  // Types

  // Composables
  const makeDataTableItemsProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'id'
    },
    itemSelectable: {
      type: [String, Array, Function],
      default: null
    },
    rowProps: [Object, Function],
    cellProps: [Object, Function],
    returnObject: Boolean
  }, 'DataTable-items');
  function transformItem$1(props, item, index, columns) {
    const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
    const selectable = getPropertyFromItem(item, props.itemSelectable, true);
    const itemColumns = columns.reduce((obj, column) => {
      if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
      return obj;
    }, {});
    return {
      type: 'item',
      key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
      index,
      value,
      selectable,
      columns: itemColumns,
      raw: item
    };
  }
  function transformItems$1(props, items, columns) {
    return items.map((item, index) => transformItem$1(props, item, index, columns));
  }
  function useDataTableItems(vm, props, columns) {
    const {
      computed
    } = vm.reactivity;
    const items = computed(() => transformItems$1(props, props.items, columns.value));
    return {
      items
    };
  }

  // Styles

  // Types

  const makeDataTableProps = propsFactory({
    ...makeVDataTableRowsProps(),
    hideDefaultBody: Boolean,
    hideDefaultFooter: Boolean,
    hideDefaultHeader: Boolean,
    width: [String, Number],
    search: String,
    ...makeDataTableExpandProps(),
    ...makeDataTableGroupProps(),
    ...makeDataTableHeaderProps(),
    ...makeDataTableItemsProps(),
    ...makeDataTableSelectProps(),
    ...makeDataTableSortProps(),
    ...makeVDataTableHeadersProps(),
    ...makeVTableProps()
  }, 'DataTable');
  const makeVDataTableProps = propsFactory({
    ...makeDataTablePaginateProps(),
    ...makeDataTableProps(),
    ...makeFilterProps(),
    ...makeVDataTableFooterProps()
  }, 'VDataTable');
  const _DataTable = defineComponent({
    name: 'VDataTable',
    props: makeVDataTableProps(),
    emits: {
      'update:modelValue': value => true,
      'update:page': value => true,
      'update:itemsPerPage': value => true,
      'update:sortBy': value => true,
      'update:options': value => true,
      'update:groupBy': value => true,
      'update:expanded': value => true,
      'update:currentItems': value => true
    },
    slots: makeSlots({
      default: null,
      colgroup: null,
      top: null,
      body: null,
      tbody: null,
      thead: null,
      tfoot: null,
      bottom: null,
      'body.prepend': null,
      'body.append': null,
      'footer.prepend': null,
      item: null,
      loading: null,
      'group-header': null,
      'no-data': null,
      'expanded-row': null,
      'data-table-group': null,
      'data-table-select': null,
      'item.data-table-select': null,
      'item.data-table-expand': null,
      'header.data-table-select': null,
      'header.data-table-expand': null,
      headers: null,
      loader: null,
      // TODO - How to handle these?
      'header.<name>': null,
      'item.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef,
        toRefs
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        groupBy
      } = createGroupBy(vm, props);
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(vm, props);
      const {
        page,
        itemsPerPage
      } = createPagination(vm, props);
      const {
        disableSort
      } = toRefs(props);
      const {
        columns,
        headers,
        sortFunctions,
        sortRawFunctions,
        filterFunctions
      } = createHeaders(vm, props, {
        groupBy,
        showSelect: toRef(props, 'showSelect'),
        showExpand: toRef(props, 'showExpand')
      });
      const {
        items
      } = useDataTableItems(vm, props, columns);
      const search = toRef(props, 'search');
      const {
        filteredItems
      } = useFilter(vm, props, items, search, {
        transform: item => item.columns,
        customKeyFilter: filterFunctions
      });
      const {
        toggleSort
      } = provideSort(vm, {
        sortBy,
        multiSort,
        mustSort,
        page
      });
      const {
        sortByWithGroups,
        opened,
        extractRows,
        isGroupOpen,
        toggleGroup
      } = provideGroupBy(vm, {
        groupBy,
        sortBy,
        disableSort
      });
      const {
        sortedItems
      } = useSortedItems(vm, props, filteredItems, sortByWithGroups, {
        transform: item => item.columns,
        sortFunctions,
        sortRawFunctions
      });
      const {
        flatItems
      } = useGroupedItems(vm, sortedItems, groupBy, opened);
      const itemsLength = computed(() => flatItems.value.length);
      const {
        startIndex,
        stopIndex,
        pageCount,
        setItemsPerPage
      } = providePagination(vm, {
        page,
        itemsPerPage,
        itemsLength
      });
      const {
        paginatedItems
      } = usePaginatedItems(vm, {
        items: flatItems,
        startIndex,
        stopIndex,
        itemsPerPage
      });
      const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
      const {
        isSelected,
        select,
        selectAll,
        toggleSelect,
        someSelected,
        allSelected
      } = provideSelection(vm, props, {
        allItems: items,
        currentPage: paginatedItemsWithoutGroups
      });
      const {
        isExpanded,
        toggleExpand
      } = provideExpanded(vm, props);
      useOptions(vm, {
        page,
        itemsPerPage,
        sortBy,
        groupBy,
        search
      });
      provideDefaults(vm, {
        VDataTableRows: {
          hideNoData: toRef(props, 'hideNoData'),
          noDataText: toRef(props, 'noDataText'),
          loading: toRef(props, 'loading'),
          loadingText: toRef(props, 'loadingText')
        }
      });
      const slotProps = computed(() => ({
        page: page.value,
        itemsPerPage: itemsPerPage.value,
        sortBy: sortBy.value,
        pageCount: pageCount.value,
        toggleSort,
        setItemsPerPage,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        isSelected,
        select,
        selectAll,
        toggleSelect,
        isExpanded,
        toggleExpand,
        isGroupOpen,
        toggleGroup,
        items: paginatedItemsWithoutGroups.value.map(item => item.raw),
        internalItems: paginatedItemsWithoutGroups.value,
        groupedItems: paginatedItems.value,
        columns: columns.value,
        headers: headers.value
      }));
      const dataTableFooterProps = computed(() => _DataTableFooter.filterProps(props));
      const dataTableHeadersProps = computed(() => _DataTableHeaders.filterProps(props));
      const dataTableRowsProps = computed(() => _DataTableRows.filterProps(props));
      const tableProps = computed(() => _Table.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-data-table', {
        'v-data-table--show-select': props.showSelect,
        'v-data-table--loading': !!props.loading
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          dataTableFooterProps,
          dataTableHeadersProps,
          dataTableRowsProps,
          tableProps,
          rootClasses,
          rootStyles: styles,
          slotProps,
          paginatedItems
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataTable = defineAlpineComponent({
    ..._DataTable,
    name: 'ADataTable'
  });

  // Utilities

  // Types

  const makeVDataTableColumnProps = propsFactory({
    align: {
      type: String,
      default: 'start'
    },
    fixed: Boolean,
    fixedOffset: [Number, String],
    height: [Number, String],
    lastFixed: Boolean,
    noPadding: Boolean,
    tag: String,
    width: [Number, String],
    maxWidth: [Number, String],
    nowrap: Boolean
  }, 'VDataTableColumn');
  const _DataTableColumn = defineComponent({
    name: 'VDataTableColumn',
    props: makeVDataTableColumnProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const rootClasses = computed(() => normalizeClass(['v-data-table__td', {
        'v-data-table-column--fixed': props.fixed,
        'v-data-table-column--last-fixed': props.lastFixed,
        'v-data-table-column--no-padding': props.noPadding,
        'v-data-table-column--nowrap': props.nowrap
      }, `v-data-table-column--align-${props.align}`]));
      const rootStyles = computed(() => normalizeStyle({
        height: convertToUnit(props.height),
        width: convertToUnit(props.width),
        maxWidth: convertToUnit(props.maxWidth),
        left: convertToUnit(props.fixedOffset || null)
      }));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataTableColumn = defineAlpineComponent({
    ..._DataTableColumn,
    name: 'ADataTableColumn'
  });

  // Types

  const ADataTableFooter = defineAlpineComponent({
    ..._DataTableFooter,
    name: 'ADataTableFooter'
  });

  // Composables

  // Types

  const makeVDataTableGroupHeaderRowProps = propsFactory({
    item: {
      type: Object,
      required: true
    }
  }, 'VDataTableGroupHeaderRow');
  const _DataTableGroupHeaderRow = defineComponent({
    name: 'VDataTableGroupHeaderRow',
    props: makeVDataTableGroupHeaderRowProps(),
    slots: makeSlots({
      'data-table-group': null,
      'data-table-select': null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        isGroupOpen,
        toggleGroup,
        extractRows
      } = useGroupBy(vm);
      const {
        isSelected,
        isSomeSelected,
        select
      } = useSelection(vm);
      const {
        columns
      } = useHeaders(vm);
      const rows = computed(() => {
        return extractRows([props.item]);
      });
      const rootStyles = computed(() => normalizeStyle([{
        '--v-data-table-group-header-row-depth': props.item.depth
      }]));
      return {
        expose: {},
        renderInput: {
          columns,
          rows,
          isGroupOpen,
          toggleGroup,
          select,
          isSelected,
          isSomeSelected,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataTableGroupHeaderRow = defineAlpineComponent({
    ..._DataTableGroupHeaderRow,
    name: 'ADataTableGroupHeaderRow'
  });

  // Types

  const ADataTableHeaders = defineAlpineComponent({
    ..._DataTableHeaders,
    name: 'ADataTableHeaders'
  });

  // Composables

  // Types

  const makeVDataTableRowProps = propsFactory({
    index: Number,
    item: Object,
    cellProps: [Object, Function],
    onClick: EventProp(),
    onContextmenu: EventProp(),
    onDblclick: EventProp(),
    ...makeDisplayProps()
  }, 'VDataTableRow');
  const _DataTableRow = defineComponent({
    name: 'VDataTableRow',
    props: makeVDataTableRowProps(),
    slots: makeSlots({
      'item.data-table-select': null,
      'item.data-table-expand': null,
      'header.data-table-select': null,
      'header.data-table-expand': null,
      // TODO - How to handle these?
      'item.<name>': null,
      'header.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        displayClasses,
        mobile
      } = useDisplay$1(vm, props, 'v-data-table__tr');
      const {
        isSelected,
        toggleSelect,
        someSelected,
        allSelected,
        selectAll
      } = useSelection(vm);
      const {
        isExpanded,
        toggleExpand
      } = useExpanded(vm);
      const {
        toggleSort,
        sortBy,
        isSorted
      } = useSort(vm);
      const {
        columns
      } = useHeaders(vm);
      const rootClasses = computed(() => normalizeClass(['v-data-table__tr', {
        'v-data-table__tr--clickable': !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value]));
      return {
        expose: {},
        renderInput: {
          columns,
          rootClasses,
          getObjectValueByPath,
          isSelected,
          toggleSelect,
          isExpanded,
          toggleExpand,
          selectAll,
          isSorted,
          toggleSort,
          sortBy,
          someSelected,
          allSelected,
          mobile
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataTableRow = defineAlpineComponent({
    ..._DataTableRow,
    name: 'ADataTableRow'
  });

  // Types

  const ADataTableRows = defineAlpineComponent({
    ..._DataTableRows,
    name: 'ADataTableRows'
  });

  // Components

  // Types

  const makeVDataTableServerProps = propsFactory({
    itemsLength: {
      type: [Number, String],
      required: true
    },
    ...makeDataTablePaginateProps(),
    ...makeDataTableProps(),
    ...makeVDataTableFooterProps()
  }, 'VDataTableServer');
  const _DataTableServer = defineComponent({
    name: 'VDataTableServer',
    props: makeVDataTableServerProps(),
    emits: {
      'update:modelValue': value => true,
      'update:page': page => true,
      'update:itemsPerPage': page => true,
      'update:sortBy': sortBy => true,
      'update:options': options => true,
      'update:expanded': options => true,
      'update:groupBy': value => true
    },
    slots: makeSlots({
      default: null,
      colgroup: null,
      top: null,
      body: null,
      tbody: null,
      thead: null,
      tfoot: null,
      bottom: null,
      'body.prepend': null,
      'body.append': null,
      'footer.prepend': null,
      item: null,
      loading: null,
      'group-header': null,
      'no-data': null,
      'expanded-row': null,
      'data-table-group': null,
      'data-table-select': null,
      'item.data-table-select': null,
      'item.data-table-expand': null,
      'header.data-table-select': null,
      'header.data-table-expand': null,
      headers: null,
      loader: null,
      // TODO - How to handle these?
      'header.<name>': null,
      'item.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        provide,
        toRef,
        toRefs
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        groupBy
      } = createGroupBy(vm, props);
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(vm, props);
      const {
        page,
        itemsPerPage
      } = createPagination(vm, props);
      const {
        disableSort
      } = toRefs(props);
      const itemsLength = computed(() => parseInt(props.itemsLength, 10));
      const {
        columns,
        headers
      } = createHeaders(vm, props, {
        groupBy,
        showSelect: toRef(props, 'showSelect'),
        showExpand: toRef(props, 'showExpand')
      });
      const {
        items
      } = useDataTableItems(vm, props, columns);
      const {
        toggleSort
      } = provideSort(vm, {
        sortBy,
        multiSort,
        mustSort,
        page
      });
      const {
        opened,
        isGroupOpen,
        toggleGroup,
        extractRows
      } = provideGroupBy(vm, {
        groupBy,
        sortBy,
        disableSort
      });
      const {
        pageCount,
        setItemsPerPage
      } = providePagination(vm, {
        page,
        itemsPerPage,
        itemsLength
      });
      const {
        flatItems
      } = useGroupedItems(vm, items, groupBy, opened);
      const {
        isSelected,
        select,
        selectAll,
        toggleSelect,
        someSelected,
        allSelected
      } = provideSelection(vm, props, {
        allItems: items,
        currentPage: items
      });
      const {
        isExpanded,
        toggleExpand
      } = provideExpanded(vm, props);
      const itemsWithoutGroups = computed(() => extractRows(items.value));
      useOptions(vm, {
        page,
        itemsPerPage,
        sortBy,
        groupBy,
        search: toRef(props, 'search')
      });
      provide('v-data-table', {
        toggleSort,
        sortBy
      });
      provideDefaults(vm, {
        VDataTableRows: {
          hideNoData: toRef(props, 'hideNoData'),
          noDataText: toRef(props, 'noDataText'),
          loading: toRef(props, 'loading'),
          loadingText: toRef(props, 'loadingText')
        }
      });
      const slotProps = computed(() => ({
        page: page.value,
        itemsPerPage: itemsPerPage.value,
        sortBy: sortBy.value,
        pageCount: pageCount.value,
        toggleSort,
        setItemsPerPage,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        isSelected,
        select,
        selectAll,
        toggleSelect,
        isExpanded,
        toggleExpand,
        isGroupOpen,
        toggleGroup,
        items: itemsWithoutGroups.value.map(item => item.raw),
        internalItems: itemsWithoutGroups.value,
        groupedItems: flatItems.value,
        columns: columns.value,
        headers: headers.value
      }));
      const dataTableFooterProps = computed(() => _DataTableFooter.filterProps(props));
      const dataTableHeadersProps = computed(() => _DataTableHeaders.filterProps(props));
      const dataTableRowsProps = computed(() => _DataTableRows.filterProps(props));
      const tableProps = computed(() => _Table.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-data-table', {
        'v-data-table--loading': !!props.loading
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          dataTableFooterProps,
          dataTableHeadersProps,
          dataTableRowsProps,
          tableProps,
          slotProps,
          rootClasses,
          rootStyles: styles,
          flatItems
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataTableServer = defineAlpineComponent({
    ..._DataTableServer,
    name: 'ADataTableServer'
  });

  // Composables

  // Types

  const UP = -1;
  const DOWN = 1;

  /** Determines how large each batch of items should be */
  const BUFFER_PX = 100;
  const makeVirtualProps = propsFactory({
    itemHeight: {
      type: [Number, String],
      default: null
    },
    height: [Number, String]
  }, 'virtual');
  function useVirtual(vm, props, items) {
    const {
      computed,
      nextTick,
      ref,
      shallowRef,
      watchEffect,
      watch,
      onBeforeUnmount
    } = vm.reactivity;
    const display = useDisplay$1(vm);
    const itemHeight = shallowRef(0);
    watchEffect(() => {
      itemHeight.value = parseFloat(props.itemHeight || 0);
    });
    const first = shallowRef(0);
    const last = shallowRef(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(props.height) || display.height.value) / (itemHeight.value || 16)) || 1);
    const paddingTop = shallowRef(0);
    const paddingBottom = shallowRef(0);

    /** The scrollable element */
    const containerRef = ref();
    /** An element marking the top of the scrollable area,
     * used to add an offset if there's padding or other elements above the virtual list */
    const markerRef = ref();
    /** markerRef's offsetTop, lazily evaluated */
    let markerOffset = 0;
    const {
      resizeRef,
      contentRect
    } = useResizeObserver(vm);
    watchEffect(() => {
      resizeRef.value = containerRef.value;
    });
    const viewportHeight = computed(() => {
      return containerRef.value === document.documentElement ? display.height.value : contentRect.value?.height || parseInt(props.height) || 0;
    });
    /** All static elements have been rendered and we have an assumed item height */
    const hasInitialRender = computed(() => {
      return !!(containerRef.value && markerRef.value && viewportHeight.value && itemHeight.value);
    });
    let sizes = Array.from({
      length: items.value.length
    });
    let offsets = Array.from({
      length: items.value.length
    });
    const updateTime = shallowRef(0);
    let targetScrollIndex = -1;
    function getSize(index) {
      return sizes[index] || itemHeight.value;
    }
    const updateOffsets = debounce(vm, () => {
      const start = performance.now();
      offsets[0] = 0;
      const length = items.value.length;
      for (let i = 1; i <= length - 1; i++) {
        offsets[i] = (offsets[i - 1] || 0) + getSize(i - 1);
      }
      updateTime.value = Math.max(updateTime.value, performance.now() - start);
    }, updateTime);
    const unwatch = watch(hasInitialRender, v => {
      if (!v) return;
      // First render is complete, update offsets and visible
      // items in case our assumed item height was incorrect

      unwatch();
      markerOffset = markerRef.value.offsetTop;
      updateOffsets.immediate();
      calculateVisibleItems();
      if (!~targetScrollIndex) return;
      nextTick(() => {
        IN_BROWSER && window.requestAnimationFrame(() => {
          scrollToIndex(targetScrollIndex);
          targetScrollIndex = -1;
        });
      });
    });

    // NOTE(Alpinui): Used onBeforeUnmount instead of `onScopeDispose`
    onBeforeUnmount(() => {
      updateOffsets.clear();
    });
    function handleItemResize(index, height) {
      const prevHeight = sizes[index];
      const prevMinHeight = itemHeight.value;
      itemHeight.value = prevMinHeight ? Math.min(itemHeight.value, height) : height;
      if (prevHeight !== height || prevMinHeight !== itemHeight.value) {
        sizes[index] = height;
        updateOffsets();
      }
    }
    function calculateOffset(index) {
      index = clamp(index, 0, items.value.length - 1);
      return offsets[index] || 0;
    }
    function calculateIndex(scrollTop) {
      return binaryClosest(offsets, scrollTop);
    }
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    let lastScrollTime = 0;
    watch(viewportHeight, (val, oldVal) => {
      if (oldVal) {
        calculateVisibleItems();
        if (val < oldVal) {
          requestAnimationFrame(() => {
            scrollVelocity = 0;
            calculateVisibleItems();
          });
        }
      }
    });
    function handleScroll() {
      if (!containerRef.value || !markerRef.value) return;
      const scrollTop = containerRef.value.scrollTop;
      const scrollTime = performance.now();
      const scrollDeltaT = scrollTime - lastScrollTime;
      if (scrollDeltaT > 500) {
        scrollVelocity = Math.sign(scrollTop - lastScrollTop);

        // Not super important, only update at the
        // start of a scroll sequence to avoid reflows
        markerOffset = markerRef.value.offsetTop;
      } else {
        scrollVelocity = scrollTop - lastScrollTop;
      }
      lastScrollTop = scrollTop;
      lastScrollTime = scrollTime;
      calculateVisibleItems();
    }
    function handleScrollend() {
      if (!containerRef.value || !markerRef.value) return;
      scrollVelocity = 0;
      lastScrollTime = 0;
      calculateVisibleItems();
    }
    let raf = -1;
    function calculateVisibleItems() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(_calculateVisibleItems);
    }
    function _calculateVisibleItems() {
      if (!containerRef.value || !viewportHeight.value) return;
      const scrollTop = lastScrollTop - markerOffset;
      const direction = Math.sign(scrollVelocity);
      const startPx = Math.max(0, scrollTop - BUFFER_PX);
      const start = clamp(calculateIndex(startPx), 0, items.value.length);
      const endPx = scrollTop + viewportHeight.value + BUFFER_PX;
      const end = clamp(calculateIndex(endPx) + 1, start + 1, items.value.length);
      if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (direction !== UP || start < first.value) && (direction !== DOWN || end > last.value)) {
        const topOverflow = calculateOffset(first.value) - calculateOffset(start);
        const bottomOverflow = calculateOffset(end) - calculateOffset(last.value);
        const bufferOverflow = Math.max(topOverflow, bottomOverflow);
        if (bufferOverflow > BUFFER_PX) {
          first.value = start;
          last.value = end;
        } else {
          // Only update the side that's reached its limit if there's still buffer left
          if (start <= 0) first.value = start;
          if (end >= items.value.length) last.value = end;
        }
      }
      paddingTop.value = calculateOffset(first.value);
      paddingBottom.value = calculateOffset(items.value.length) - calculateOffset(last.value);
    }
    function scrollToIndex(index) {
      const offset = calculateOffset(index);
      if (!containerRef.value || index && !offset) {
        targetScrollIndex = index;
      } else {
        containerRef.value.scrollTop = offset;
      }
    }
    const computedItems = computed(() => {
      return items.value.slice(first.value, last.value).map((item, index) => ({
        raw: item,
        index: index + first.value
      }));
    });
    watch(items, () => {
      sizes = Array.from({
        length: items.value.length
      });
      offsets = Array.from({
        length: items.value.length
      });
      updateOffsets.immediate();
      calculateVisibleItems();
    }, {
      deep: true
    });
    return {
      containerRef,
      markerRef,
      computedItems,
      paddingTop,
      paddingBottom,
      scrollToIndex,
      handleScroll,
      handleScrollend,
      handleItemResize
    };
  }

  // https://gist.github.com/robertleeplummerjr/1cc657191d34ecd0a324
  function binaryClosest(arr, val) {
    let high = arr.length - 1;
    let low = 0;
    let mid = 0;
    let item = null;
    let target = -1;
    if (arr[high] < val) {
      return high;
    }
    while (low <= high) {
      mid = low + high >> 1;
      item = arr[mid];
      if (item > val) {
        high = mid - 1;
      } else if (item < val) {
        target = mid;
        low = mid + 1;
      } else if (item === val) {
        return mid;
      } else {
        return low;
      }
    }
    return target;
  }

  // Components

  // Types

  const makeVDataTableVirtualProps = propsFactory({
    ...makeDataTableProps(),
    ...makeDataTableGroupProps(),
    ...makeVirtualProps(),
    ...makeFilterProps()
  }, 'VDataTableVirtual');
  const _DataTableVirtual = defineComponent({
    name: 'VDataTableVirtual',
    props: makeVDataTableVirtualProps(),
    emits: {
      'update:modelValue': value => true,
      'update:sortBy': value => true,
      'update:options': value => true,
      'update:groupBy': value => true,
      'update:expanded': value => true
    },
    slots: makeSlots({
      colgroup: null,
      top: null,
      headers: null,
      bottom: null,
      'body.prepend': null,
      'body.append': null,
      item: null,
      loading: null,
      'group-header': null,
      'no-data': null,
      'expanded-row': null,
      'data-table-group': null,
      'data-table-select': null,
      'item.data-table-select': null,
      'item.data-table-expand': null,
      'header.data-table-select': null,
      'header.data-table-expand': null,
      loader: null,
      // TODO - How to handle these?
      'item.<name>': null,
      'header.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        shallowRef,
        toRef,
        toRefs
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        groupBy
      } = createGroupBy(vm, props);
      const {
        sortBy,
        multiSort,
        mustSort
      } = createSort(vm, props);
      const {
        disableSort
      } = toRefs(props);
      const {
        columns,
        headers,
        filterFunctions,
        sortFunctions,
        sortRawFunctions
      } = createHeaders(vm, props, {
        groupBy,
        showSelect: toRef(props, 'showSelect'),
        showExpand: toRef(props, 'showExpand')
      });
      const {
        items
      } = useDataTableItems(vm, props, columns);
      const search = toRef(props, 'search');
      const {
        filteredItems
      } = useFilter(vm, props, items, search, {
        transform: item => item.columns,
        customKeyFilter: filterFunctions
      });
      const {
        toggleSort
      } = provideSort(vm, {
        sortBy,
        multiSort,
        mustSort
      });
      const {
        sortByWithGroups,
        opened,
        extractRows,
        isGroupOpen,
        toggleGroup
      } = provideGroupBy(vm, {
        groupBy,
        sortBy,
        disableSort
      });
      const {
        sortedItems
      } = useSortedItems(vm, props, filteredItems, sortByWithGroups, {
        transform: item => item.columns,
        sortFunctions,
        sortRawFunctions
      });
      const {
        flatItems
      } = useGroupedItems(vm, sortedItems, groupBy, opened);
      const allItems = computed(() => extractRows(flatItems.value));
      const {
        isSelected,
        select,
        selectAll,
        toggleSelect,
        someSelected,
        allSelected
      } = provideSelection(vm, props, {
        allItems,
        currentPage: allItems
      });
      const {
        isExpanded,
        toggleExpand
      } = provideExpanded(vm, props);
      const {
        containerRef,
        markerRef,
        paddingTop,
        paddingBottom,
        computedItems,
        handleItemResize,
        handleScroll,
        handleScrollend
      } = useVirtual(vm, props, flatItems);
      const displayItems = computed(() => computedItems.value.map(item => item.raw));
      useOptions(vm, {
        sortBy,
        page: shallowRef(1),
        itemsPerPage: shallowRef(-1),
        groupBy,
        search
      });
      provideDefaults(vm, {
        VDataTableRows: {
          hideNoData: toRef(props, 'hideNoData'),
          noDataText: toRef(props, 'noDataText'),
          loading: toRef(props, 'loading'),
          loadingText: toRef(props, 'loadingText')
        }
      });
      const slotProps = computed(() => ({
        sortBy: sortBy.value,
        toggleSort,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        isSelected,
        select,
        selectAll,
        toggleSelect,
        isExpanded,
        toggleExpand,
        isGroupOpen,
        toggleGroup,
        items: allItems.value.map(item => item.raw),
        internalItems: allItems.value,
        groupedItems: flatItems.value,
        columns: columns.value,
        headers: headers.value
      }));
      const dataTableHeadersProps = computed(() => _DataTableHeaders.filterProps(props));
      const dataTableRowsProps = computed(() => _DataTableRows.filterProps(props));
      const tableProps = computed(() => _Table.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-data-table', {
        'v-data-table--loading': !!props.loading
      }, classes.value]));
      const containerStyles = computed(() => normalizeStyle({
        height: convertToUnit(props.height)
      }));
      const markerStyles = computed(() => normalizeStyle({
        height: convertToUnit(paddingTop.value),
        border: 0
      }));
      const bottomStyles = computed(() => normalizeStyle({
        height: convertToUnit(paddingBottom.value),
        border: 0
      }));
      return {
        expose: {},
        renderInput: {
          bottomStyles,
          columns,
          containerRef,
          containerStyles,
          displayItems,
          dataTableHeadersProps,
          dataTableRowsProps,
          markerRef,
          markerStyles,
          slotProps,
          tableProps,
          rootClasses,
          rootStyles: styles,
          handleScroll,
          handleScrollend,
          handleItemResize
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADataTableVirtual = defineAlpineComponent({
    ..._DataTableVirtual,
    name: 'ADataTableVirtual'
  });

  // Styles

  // Types

  const makeVDatePickerControlsProps = propsFactory({
    active: {
      type: [String, Array],
      default: undefined
    },
    disabled: {
      type: [Boolean, String, Array],
      default: false
    },
    nextIcon: {
      type: IconValue,
      default: '$next'
    },
    prevIcon: {
      type: IconValue,
      default: '$prev'
    },
    modeIcon: {
      type: IconValue,
      default: '$subgroup'
    },
    text: String,
    viewMode: {
      type: String,
      default: 'month'
    }
  }, 'VDatePickerControls');
  const _DatePickerControls = defineComponent({
    name: 'VDatePickerControls',
    props: makeVDatePickerControlsProps(),
    emits: {
      'click:year': () => true,
      'click:month': () => true,
      'click:prev': () => true,
      'click:next': () => true,
      'click:text': () => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const disableMonth = computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes('text') : !!props.disabled;
      });
      const disableYear = computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes('mode') : !!props.disabled;
      });
      const disablePrev = computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes('prev') : !!props.disabled;
      });
      const disableNext = computed(() => {
        return Array.isArray(props.disabled) ? props.disabled.includes('next') : !!props.disabled;
      });
      function onClickPrev() {
        vm.emit('click:prev');
      }
      function onClickNext() {
        vm.emit('click:next');
      }
      function onClickYear() {
        vm.emit('click:year');
      }
      function onClickMonth() {
        vm.emit('click:month');
      }
      return {
        expose: {},
        renderInput: {
          disableMonth,
          disableYear,
          disablePrev,
          disableNext,
          onClickMonth,
          onClickYear,
          onClickPrev,
          onClickNext
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVDatePickerHeaderProps = propsFactory({
    appendIcon: String,
    color: String,
    header: String,
    transition: String,
    onClick: EventProp()
  }, 'VDatePickerHeader');
  const _DatePickerHeader = defineComponent({
    name: 'VDatePickerHeader',
    props: makeVDatePickerHeaderProps(),
    emits: {
      click: () => true,
      'click:append': () => true
    },
    slots: makeSlots({
      prepend: null,
      default: null,
      append: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, props, 'color');
      function onClick() {
        vm.emit('click');
      }
      function onClickAppend() {
        vm.emit('click:append');
      }
      const rootClasses = computed(() => normalizeClass(['v-date-picker-header', {
        'v-date-picker-header--clickable': !!props.onClick
      }, backgroundColorClasses.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          backgroundColorStyles,
          onClick,
          onClickAppend
        }
      };
    },
    renderHeadless: () => null
  });

  // Composables

  // Types

  // Types

  // Composables
  const makeCalendarProps = propsFactory({
    allowedDates: [Array, Function],
    disabled: Boolean,
    displayValue: null,
    modelValue: Array,
    month: [Number, String],
    max: null,
    min: null,
    showAdjacentMonths: Boolean,
    year: [Number, String],
    weekdays: {
      type: Array,
      default: () => [0, 1, 2, 3, 4, 5, 6]
    },
    weeksInMonth: {
      type: String,
      default: 'dynamic'
    },
    firstDayOfWeek: [Number, String]
  }, 'calendar');
  function useCalendar(vm, props) {
    const {
      computed
    } = vm.reactivity;
    const adapter = useDate$1(vm);
    const model = useProxiedModel(vm, props, 'modelValue', [], v => wrapInArray(v));
    const displayValue = computed(() => {
      if (props.displayValue) return adapter.date(props.displayValue);
      if (model.value.length > 0) return adapter.date(model.value[0]);
      if (props.min) return adapter.date(props.min);
      if (Array.isArray(props.allowedDates)) return adapter.date(props.allowedDates[0]);
      return adapter.date();
    });
    const year = useProxiedModel(vm, props, 'year', undefined, v => {
      const value = v != null ? Number(v) : adapter.getYear(displayValue.value);
      return adapter.startOfYear(adapter.setYear(adapter.date(), value));
    }, v => adapter.getYear(v));
    const month = useProxiedModel(vm, props, 'month', undefined, v => {
      const value = v != null ? Number(v) : adapter.getMonth(displayValue.value);
      const date = adapter.setYear(adapter.startOfMonth(adapter.date()), adapter.getYear(year.value));
      return adapter.setMonth(date, value);
    }, v => adapter.getMonth(v));
    const weekDays = computed(() => {
      const firstDayOfWeek = Number(props.firstDayOfWeek ?? 0);
      return props.weekdays.map(day => (day + firstDayOfWeek) % 7);
    });
    const weeksInMonth = computed(() => {
      const weeks = adapter.getWeekArray(month.value, props.firstDayOfWeek);
      const days = weeks.flat();

      // Make sure there's always 6 weeks in month (6 * 7 days)
      // if weeksInMonth is 'static'
      const daysInMonth = 6 * 7;
      if (props.weeksInMonth === 'static' && days.length < daysInMonth) {
        const lastDay = days[days.length - 1];
        let week = [];
        for (let day = 1; day <= daysInMonth - days.length; day++) {
          week.push(adapter.addDays(lastDay, day));
          if (day % 7 === 0) {
            weeks.push(week);
            week = [];
          }
        }
      }
      return weeks;
    });
    function genDays(days, today) {
      return days.filter(date => {
        return weekDays.value.includes(adapter.toJsDate(date).getDay());
      }).map((date, index) => {
        const isoDate = adapter.toISO(date);
        const isAdjacent = !adapter.isSameMonth(date, month.value);
        const isStart = adapter.isSameDay(date, adapter.startOfMonth(month.value));
        const isEnd = adapter.isSameDay(date, adapter.endOfMonth(month.value));
        const isSame = adapter.isSameDay(date, month.value);
        return {
          date,
          isoDate,
          formatted: adapter.format(date, 'keyboardDate'),
          year: adapter.getYear(date),
          month: adapter.getMonth(date),
          isDisabled: isDisabled(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isToday: adapter.isSameDay(date, today),
          isAdjacent,
          isHidden: isAdjacent && !props.showAdjacentMonths,
          isStart,
          isSelected: model.value.some(value => adapter.isSameDay(date, value)),
          isEnd,
          isSame,
          localized: adapter.format(date, 'dayOfMonth')
        };
      });
    }
    const daysInWeek = computed(() => {
      const lastDay = adapter.startOfWeek(displayValue.value, props.firstDayOfWeek);
      const week = [];
      for (let day = 0; day <= 6; day++) {
        week.push(adapter.addDays(lastDay, day));
      }
      const today = adapter.date();
      return genDays(week, today);
    });
    const daysInMonth = computed(() => {
      const days = weeksInMonth.value.flat();
      const today = adapter.date();
      return genDays(days, today);
    });
    const weekNumbers = computed(() => {
      return weeksInMonth.value.map(week => {
        return week.length ? getWeek(adapter, week[0]) : null;
      });
    });
    function isDisabled(value) {
      if (props.disabled) return true;
      const date = adapter.date(value);
      if (props.min && adapter.isAfter(adapter.date(props.min), date)) return true;
      if (props.max && adapter.isAfter(date, adapter.date(props.max))) return true;
      if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
        return !props.allowedDates.some(d => adapter.isSameDay(adapter.date(d), date));
      }
      if (typeof props.allowedDates === 'function') {
        return !props.allowedDates(date);
      }
      return false;
    }
    return {
      displayValue,
      daysInMonth,
      daysInWeek,
      genDays,
      model,
      weeksInMonth,
      weekDays,
      weekNumbers
    };
  }

  // Styles

  // Types

  const makeVDatePickerMonthProps = propsFactory({
    color: String,
    hideWeekdays: Boolean,
    multiple: [Boolean, Number, String],
    showWeek: Boolean,
    transition: {
      type: String,
      default: 'picker-transition'
    },
    reverseTransition: {
      type: String,
      default: 'picker-reverse-transition'
    },
    ...makeCalendarProps()
  }, 'VDatePickerMonth');
  const _DatePickerMonth = defineComponent({
    name: 'VDatePickerMonth',
    props: makeVDatePickerMonthProps(),
    emits: {
      'update:modelValue': date => true,
      'update:month': date => true,
      'update:year': date => true
    },
    slots: makeSlots({
      day: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const daysRef = ref();
      const {
        daysInMonth,
        model,
        weekNumbers
      } = useCalendar(vm, props);
      const adapter = useDate$1(vm);
      const rangeStart = shallowRef();
      const rangeStop = shallowRef();
      const isReverse = shallowRef(false);
      const transition = computed(() => {
        return !isReverse.value ? props.transition : props.reverseTransition;
      });
      if (props.multiple === 'range' && model.value.length > 0) {
        rangeStart.value = model.value[0];
        if (model.value.length > 1) {
          rangeStop.value = model.value[model.value.length - 1];
        }
      }
      const atMax = computed(() => {
        const max = ['number', 'string'].includes(typeof props.multiple) ? Number(props.multiple) : Infinity;
        return model.value.length >= max;
      });
      watch(daysInMonth, (val, oldVal) => {
        if (!oldVal) return;
        isReverse.value = adapter.isBefore(val[0].date, oldVal[0].date);
      });
      function onRangeClick(value) {
        const _value = adapter.startOfDay(value);
        if (model.value.length === 0) {
          rangeStart.value = undefined;
        }
        if (!rangeStart.value) {
          rangeStart.value = _value;
          model.value = [rangeStart.value];
        } else if (!rangeStop.value) {
          if (adapter.isSameDay(_value, rangeStart.value)) {
            rangeStart.value = undefined;
            model.value = [];
            return;
          } else if (adapter.isBefore(_value, rangeStart.value)) {
            rangeStop.value = adapter.endOfDay(rangeStart.value);
            rangeStart.value = _value;
          } else {
            rangeStop.value = adapter.endOfDay(_value);
          }
          const diff = adapter.getDiff(rangeStop.value, rangeStart.value, 'days');
          const datesInRange = [rangeStart.value];
          for (let i = 1; i < diff; i++) {
            const nextDate = adapter.addDays(rangeStart.value, i);
            datesInRange.push(nextDate);
          }
          datesInRange.push(rangeStop.value);
          model.value = datesInRange;
        } else {
          rangeStart.value = value;
          rangeStop.value = undefined;
          model.value = [rangeStart.value];
        }
      }
      function onMultipleClick(value) {
        const index = model.value.findIndex(selection => adapter.isSameDay(selection, value));
        if (index === -1) {
          model.value = [...model.value, value];
        } else {
          const value = [...model.value];
          value.splice(index, 1);
          model.value = value;
        }
      }
      function onClick(value) {
        if (props.multiple === 'range') {
          onRangeClick(value);
        } else if (props.multiple) {
          onMultipleClick(value);
        } else {
          model.value = [value];
        }
      }
      return {
        expose: {},
        renderInput: {
          weekNumbers,
          transition,
          daysRef,
          daysInMonth,
          adapter,
          atMax,
          onClick
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVDatePickerMonthsProps = propsFactory({
    color: String,
    height: [String, Number],
    min: null,
    max: null,
    modelValue: Number,
    year: Number
  }, 'VDatePickerMonths');
  const _DatePickerMonths = defineComponent({
    name: 'VDatePickerMonths',
    props: makeVDatePickerMonthsProps(),
    emits: {
      'update:modelValue': date => true
    },
    slots: makeSlots({
      month: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        watchEffect
      } = vm.reactivity;
      const adapter = useDate$1(vm);
      const model = useProxiedModel(vm, props, 'modelValue');
      const months = computed(() => {
        let date = adapter.startOfYear(adapter.date());
        if (props.year) {
          date = adapter.setYear(date, props.year);
        }
        return createRange(12).map(i => {
          const text = adapter.format(date, 'monthShort');
          const isDisabled = !!(props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min)), date) || props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max))));
          date = adapter.getNextMonth(date);
          return {
            isDisabled,
            text,
            value: i
          };
        });
      });
      watchEffect(() => {
        model.value = model.value ?? adapter.getMonth(adapter.date());
      });
      function onClick(i) {
        if (model.value === i) {
          vm.emit('update:modelValue', model.value);
          return;
        }
        model.value = i;
      }
      const rootStyles = computed(() => normalizeStyle([{
        height: convertToUnit(props.height)
      }]));
      return {
        expose: {},
        renderInput: {
          rootStyles,
          months,
          model,
          onClick
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  // Types

  const makeVDatePickerYearsProps = propsFactory({
    color: String,
    height: [String, Number],
    min: null,
    max: null,
    modelValue: Number
  }, 'VDatePickerYears');
  const _DatePickerYears = defineComponent({
    name: 'VDatePickerYears',
    props: makeVDatePickerYearsProps(),
    emits: {
      'update:modelValue': year => true
    },
    slots: makeSlots({
      year: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        onMounted,
        watchEffect
      } = vm.reactivity;
      const adapter = useDate$1(vm);
      const model = useProxiedModel(vm, props, 'modelValue');
      const years = computed(() => {
        const year = adapter.getYear(adapter.date());
        let min = year - 100;
        let max = year + 52;
        if (props.min) {
          min = adapter.getYear(adapter.date(props.min));
        }
        if (props.max) {
          max = adapter.getYear(adapter.date(props.max));
        }
        let date = adapter.startOfYear(adapter.date());
        date = adapter.setYear(date, min);
        return createRange(max - min + 1, min).map(i => {
          const text = adapter.format(date, 'year');
          date = adapter.setYear(date, adapter.getYear(date) + 1);
          return {
            text,
            value: i
          };
        });
      });
      watchEffect(() => {
        model.value = model.value ?? adapter.getYear(adapter.date());
      });
      const yearRef = templateRef(vm);
      onMounted(async () => {
        await nextTick();
        yearRef.el?.scrollIntoView({
          block: 'center'
        });
      });
      const onYearClick = year => {
        if (model.value === year.value) {
          vm.emit('update:modelValue', model.value);
          return;
        }
        model.value = year.value;
      };
      const rootStyles = computed(() => normalizeStyle([{
        height: convertToUnit(props.height)
      }]));
      return {
        expose: {},
        renderInput: {
          model,
          years,
          yearRef,
          onYearClick,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeVPickerProps = propsFactory({
    bgColor: String,
    landscape: Boolean,
    title: String,
    hideHeader: Boolean,
    ...makeVSheetProps()
  }, 'VPicker');
  const _Picker = defineComponent({
    name: 'VPicker',
    props: makeVPickerProps(),
    slots: makeSlots({
      header: null,
      default: null,
      actions: null,
      title: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const sheetProps = computed(() => _Sheet.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-picker', {
        'v-picker--landscape': props.landscape,
        'v-picker--with-actions': vm.hasSlots.actions
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          backgroundColorClasses,
          backgroundColorStyles,
          sheetProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  // Types

  const makeVDatePickerProps = propsFactory({
    // TODO(Vuetify): implement in v3.5
    // calendarIcon: {
    //   type: String,
    //   default: '$calendar',
    // },
    // keyboardIcon: {
    //   type: String,
    //   default: '$edit',
    // },
    // inputMode: {
    //   type: String as PropType<'calendar' | 'keyboard'>,
    //   default: 'calendar',
    // },
    // inputText: {
    //   type: String,
    //   default: '$vuetify.datePicker.input.placeholder',
    // },
    // inputPlaceholder: {
    //   type: String,
    //   default: 'dd/mm/yyyy',
    // },
    header: {
      type: String,
      default: '$vuetify.datePicker.header'
    },
    ...makeVDatePickerControlsProps(),
    ...makeVDatePickerMonthProps({
      weeksInMonth: 'static'
    }),
    ...omit(makeVDatePickerMonthsProps(), ['modelValue']),
    ...omit(makeVDatePickerYearsProps(), ['modelValue']),
    ...makeVPickerProps({
      title: '$vuetify.datePicker.title'
    }),
    modelValue: null
  }, 'VDatePicker');
  const _DatePicker = defineComponent({
    name: 'VDatePicker',
    props: makeVDatePickerProps(),
    emits: {
      'update:modelValue': date => true,
      'update:month': date => true,
      'update:year': date => true,
      // 'update:inputMode': (date: any) => true,
      'update:viewMode': date => true
    },
    slots: makeSlots({
      header: null,
      default: null,
      actions: null,
      title: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const adapter = useDate$1(vm);
      const {
        t
      } = useLocale$1(vm);
      const model = useProxiedModel(vm, props, 'modelValue', undefined, v => wrapInArray(v), v => props.multiple ? v : v[0]);
      const viewMode = useProxiedModel(vm, props, 'viewMode');
      // const inputMode = useProxiedModel(props, 'inputMode')
      const internal = computed(() => {
        const value = adapter.date(model.value?.[0]);
        return value && adapter.isValid(value) ? value : adapter.date();
      });
      const month = ref(Number(props.month ?? adapter.getMonth(adapter.startOfMonth(internal.value))));
      const year = ref(Number(props.year ?? adapter.getYear(adapter.startOfYear(adapter.setMonth(internal.value, month.value)))));
      const isReversing = shallowRef(false);
      const header = computed(() => {
        if (props.multiple && model.value.length > 1) {
          return t('$vuetify.datePicker.itemsSelected', model.value.length);
        }
        return model.value[0] && adapter.isValid(model.value[0]) ? adapter.format(adapter.date(model.value[0]), 'normalDateWithWeekday') : t(props.header);
      });
      const text = computed(() => {
        let date = adapter.date();
        date = adapter.setDate(date, 1);
        date = adapter.setMonth(date, month.value);
        date = adapter.setYear(date, year.value);
        return adapter.format(date, 'monthAndYear');
      });
      // const headerIcon = computed(() => props.inputMode === 'calendar' ? props.keyboardIcon : props.calendarIcon)
      const headerTransition = computed(() => `date-picker-header${isReversing.value ? '-reverse' : ''}-transition`);
      const minDate = computed(() => {
        const date = adapter.date(props.min);
        return props.min && adapter.isValid(date) ? date : null;
      });
      const maxDate = computed(() => {
        const date = adapter.date(props.max);
        return props.max && adapter.isValid(date) ? date : null;
      });
      const disabled = computed(() => {
        if (props.disabled) return true;
        const targets = [];
        if (viewMode.value !== 'month') {
          targets.push(...['prev', 'next']);
        } else {
          let _date = adapter.date();
          _date = adapter.setYear(_date, year.value);
          _date = adapter.setMonth(_date, month.value);
          if (minDate.value) {
            const date = adapter.addDays(adapter.startOfMonth(_date), -1);
            adapter.isAfter(minDate.value, date) && targets.push('prev');
          }
          if (maxDate.value) {
            const date = adapter.addDays(adapter.endOfMonth(_date), 1);
            adapter.isAfter(date, maxDate.value) && targets.push('next');
          }
        }
        return targets;
      });

      // function onClickAppend () {
      //   inputMode.value = inputMode.value === 'calendar' ? 'keyboard' : 'calendar'
      // }

      function onClickNext() {
        if (month.value < 11) {
          month.value++;
        } else {
          year.value++;
          month.value = 0;
          onUpdateYear(year.value);
        }
        onUpdateMonth(month.value);
      }
      function onClickPrev() {
        if (month.value > 0) {
          month.value--;
        } else {
          year.value--;
          month.value = 11;
          onUpdateYear(year.value);
        }
        onUpdateMonth(month.value);
      }
      function onClickDate() {
        viewMode.value = 'month';
      }
      function onClickMonth() {
        viewMode.value = viewMode.value === 'months' ? 'month' : 'months';
      }
      function onClickYear() {
        viewMode.value = viewMode.value === 'year' ? 'month' : 'year';
      }
      function onUpdateMonth(value) {
        if (viewMode.value === 'months') onClickMonth();
        vm.emit('update:month', value);
      }
      function onUpdateYear(value) {
        if (viewMode.value === 'year') onClickYear();
        vm.emit('update:year', value);
      }
      watch(model, (val, oldVal) => {
        const arrBefore = wrapInArray(oldVal);
        const arrAfter = wrapInArray(val);
        if (!arrAfter.length) return;
        const before = adapter.date(arrBefore[arrBefore.length - 1]);
        const after = adapter.date(arrAfter[arrAfter.length - 1]);
        const newMonth = adapter.getMonth(after);
        const newYear = adapter.getYear(after);
        if (newMonth !== month.value) {
          month.value = newMonth;
          onUpdateMonth(month.value);
        }
        if (newYear !== year.value) {
          year.value = newYear;
          onUpdateYear(year.value);
        }
        isReversing.value = adapter.isBefore(before, after);
      });
      const pickerProps = computed(() => _Picker.filterProps(props));
      const datePickerControlsProps = computed(() => _DatePickerControls.filterProps(props));
      const datePickerHeaderProps = computed(() => _DatePickerHeader.filterProps(props));
      const datePickerMonthProps = computed(() => _DatePickerMonth.filterProps(props));
      const datePickerMonthsProps = computed(() => omit(_DatePickerMonths.filterProps(props), ['modelValue']));
      const datePickerYearsProps = computed(() => omit(_DatePickerYears.filterProps(props), ['modelValue']));
      const headerProps = computed(() => ({
        header: header.value,
        transition: headerTransition.value
      }));
      const rootClasses = computed(() => normalizeClass(['v-date-picker', `v-date-picker--${viewMode.value}`, {
        'v-date-picker--show-week': props.showWeek
      }, classes.value]));
      const title = computed(() => t(props.title));
      return {
        expose: {},
        renderInput: {
          model,
          disabled,
          text,
          title,
          month,
          year,
          minDate,
          maxDate,
          pickerProps,
          datePickerControlsProps,
          datePickerHeaderProps,
          datePickerMonthProps,
          datePickerMonthsProps,
          datePickerYearsProps,
          headerProps,
          viewMode,
          rootClasses,
          rootStyles: styles,
          onClickDate,
          onUpdateMonth,
          onUpdateYear,
          onClickNext,
          onClickPrev,
          onClickMonth,
          onClickYear
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADatePicker = defineAlpineComponent({
    ..._DatePicker,
    name: 'ADatePicker'
  });

  // Types

  const ADatePickerControls = defineAlpineComponent({
    ..._DatePickerControls,
    name: 'ADatePickerControls'
  });

  // Types

  const ADatePickerHeader = defineAlpineComponent({
    ..._DatePickerHeader,
    name: 'ADatePickerHeader'
  });

  // Types

  const ADatePickerMonth = defineAlpineComponent({
    ..._DatePickerMonth,
    name: 'ADatePickerMonth'
  });

  // Types

  const ADatePickerMonths = defineAlpineComponent({
    ..._DatePickerMonths,
    name: 'ADatePickerMonths'
  });

  // Types

  const ADatePickerYears = defineAlpineComponent({
    ..._DatePickerYears,
    name: 'ADatePickerYears'
  });

  // Composables

  // Types

  const makeVDefaultsProviderProps = propsFactory({
    defaults: Object,
    disabled: Boolean,
    reset: [Number, String],
    root: [Boolean, String],
    scoped: Boolean
  }, 'VDefaultsProvider');
  const _DefaultsProvider = defineComponent({
    name: 'VDefaultsProvider',
    props: makeVDefaultsProviderProps(),
    exposeDefaults: false,
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        toRefs
      } = vm.reactivity;
      const {
        defaults,
        disabled,
        reset,
        root,
        scoped
      } = toRefs(props);
      provideDefaults(vm, defaults, {
        reset,
        root,
        scoped,
        disabled
      });
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADefaultsProvider = defineAlpineComponent({
    ..._DefaultsProvider,
    name: 'ADefaultsProvider'
  });

  // Types

  const ADialog = defineAlpineComponent({
    ..._Dialog,
    name: 'ADialog'
  });

  // Styles

  // Types

  const makeVDividerProps = propsFactory({
    color: String,
    inset: Boolean,
    length: [Number, String],
    opacity: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
    ...makeComponentProps(),
    ...makeThemeProps()
  }, 'VDivider');
  const _Divider = defineComponent({
    name: 'VDivider',
    props: makeVDividerProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'color'));
      const dividerStyles = computed(() => {
        const styles = {};
        if (props.length) {
          styles[props.vertical ? 'height' : 'width'] = convertToUnit(props.length);
        }
        if (props.thickness) {
          styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness);
        }
        return styles;
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const hrClasses = computed(() => normalizeClass([{
        'v-divider': true,
        'v-divider--inset': props.inset,
        'v-divider--vertical': props.vertical
      }, themeClasses.value, textColorClasses.value, classes.value]));
      const hrStyles = computed(() => normalizeStyle([dividerStyles.value, textColorStyles.value, props.opacity != null ? {
        '--v-border-opacity': props.opacity
      } : {}, styles.value]));
      const hrAriaOrient = computed(() => !vm.attrs.role || vm.attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined);
      const hrRole = computed(() => `${vm.attrs.role || 'separator'}`);
      const hrProps = computed(() => ({
        class: hrClasses.value,
        style: hrStyles.value,
        'aria-orientation': hrAriaOrient.value,
        role: hrRole.value
      }));
      const wrapperClasses = computed(() => normalizeClass({
        'v-divider__wrapper': true,
        'v-divider__wrapper--vertical': props.vertical,
        'v-divider__wrapper--inset': props.inset
      }));
      const wrapperProps = computed(() => ({
        class: wrapperClasses.value
      }));
      return {
        expose: {},
        renderInput: {
          hrProps,
          wrapperProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ADivider = defineAlpineComponent({
    ..._Divider,
    name: 'ADivider'
  });

  // Styles

  // Types

  const makeVEmptyStateProps = propsFactory({
    actionText: String,
    bgColor: String,
    color: String,
    icon: IconValue,
    image: String,
    justify: {
      type: String,
      default: 'center'
    },
    headline: String,
    title: String,
    text: String,
    textWidth: {
      type: [Number, String],
      default: 500
    },
    href: String,
    to: String,
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeSizeProps({
      size: undefined
    }),
    ...makeThemeProps()
  }, 'VEmptyState');
  const _EmptyState = defineComponent({
    name: 'VEmptyState',
    props: makeVEmptyStateProps(),
    emits: {
      'click:action': e => true
    },
    slots: makeSlots({
      actions: null,
      default: null,
      headline: null,
      title: null,
      media: null,
      text: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'bgColor'));
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        displayClasses
      } = useDisplay$1(vm);
      function onClickAction(e) {
        vm.emit('click:action', e);
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const size = computed(() => props.size || (props.image ? 200 : 96));
      const rootClasses = computed(() => normalizeClass(['v-empty-state', {
        [`v-empty-state--${props.justify}`]: true
      }, themeClasses.value, backgroundColorClasses.value, displayClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, styles.value]));
      const textStyles = computed(() => normalizeStyle({
        maxWidth: convertToUnit(props.textWidth)
      }));
      const mediaDefaults = computed(() => ({
        VImg: {
          src: props.image,
          height: size.value
        },
        VIcon: {
          size: size.value,
          icon: props.icon
        }
      }));
      const actionDefaults = computed(() => ({
        VBtn: {
          class: 'v-empty-state__action-btn',
          color: props.color ?? 'surface-variant',
          text: props.actionText
        }
      }));
      return {
        expose: {},
        renderInput: {
          size,
          actionDefaults,
          mediaDefaults,
          rootClasses,
          rootStyles,
          textStyles,
          onClickAction
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AEmptyState = defineAlpineComponent({
    ..._EmptyState,
    name: 'AEmptyState'
  });

  // Types

  const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');

  // Components

  // Types

  const makeVExpansionPanelTextProps = propsFactory({
    ...makeComponentProps(),
    ...makeLazyProps()
  }, 'VExpansionPanelText');
  const _ExpansionPanelText = defineComponent({
    name: 'VExpansionPanelText',
    props: makeVExpansionPanelTextProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject
      } = vm.reactivity;
      const expansionPanel = inject(VExpansionPanelSymbol);
      if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel');
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        hasContent,
        onAfterLeave
      } = useLazy(vm, props, expansionPanel.isSelected);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-expansion-panel-text', classes.value]));
      return {
        expose: {},
        renderInput: {
          expansionPanel,
          hasContent,
          rootClasses,
          rootStyles: styles,
          onAfterLeave
        }
      };
    },
    renderHeadless: () => null
  });

  // Components
  const makeVExpansionPanelTitleProps = propsFactory({
    color: String,
    expandIcon: {
      type: IconValue,
      default: '$expand'
    },
    collapseIcon: {
      type: IconValue,
      default: '$collapse'
    },
    hideActions: Boolean,
    focusable: Boolean,
    static: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: false
    },
    readonly: Boolean,
    ...makeComponentProps()
  }, 'VExpansionPanelTitle');
  const _ExpansionPanelTitle = defineComponent({
    name: 'VExpansionPanelTitle',
    props: makeVExpansionPanelTitleProps(),
    slots: makeSlots({
      default: null,
      actions: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject
      } = vm.reactivity;
      const expansionPanel = inject(VExpansionPanelSymbol);
      if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, props, 'color');
      const slotProps = computed(() => ({
        collapseIcon: props.collapseIcon,
        disabled: expansionPanel.disabled.value,
        expanded: expansionPanel.isSelected.value,
        expandIcon: props.expandIcon,
        readonly: props.readonly
      }));
      const icon = computed(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-expansion-panel-title', {
        'v-expansion-panel-title--active': expansionPanel.isSelected.value,
        'v-expansion-panel-title--focusable': props.focusable,
        'v-expansion-panel-title--static': props.static
      }, backgroundColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, styles.value]));
      const actionsDefaults = computed(() => ({
        VIcon: {
          icon: icon.value
        }
      }));
      return {
        expose: {},
        renderInput: {
          actionsDefaults,
          expansionPanel,
          rootClasses,
          rootStyles,
          slotProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Components
  const makeVExpansionPanelProps = propsFactory({
    title: String,
    text: String,
    bgColor: String,
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps(),
    ...makeVExpansionPanelTextProps()
  }, 'VExpansionPanel');
  const _ExpansionPanel = defineComponent({
    name: 'VExpansionPanel',
    props: makeVExpansionPanelProps(),
    emits: {
      'group:selected': val => true
    },
    slots: makeSlots({
      default: null,
      title: null,
      text: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        provide
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const groupItem = useGroupItem(vm, props, VExpansionPanelSymbol);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, props, 'bgColor');
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const isDisabled = computed(() => groupItem?.disabled.value || props.disabled);
      const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
        if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
        return arr;
      }, []));
      const isBeforeSelected = computed(() => {
        const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
        return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === 1);
      });
      const isAfterSelected = computed(() => {
        const index = groupItem.group.items.value.findIndex(item => item.id === groupItem.id);
        return !groupItem.isSelected.value && selectedIndices.value.some(selectedIndex => selectedIndex - index === -1);
      });
      provide(VExpansionPanelSymbol, groupItem);

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const expansionPanelTitleProps = computed(() => _ExpansionPanelTitle.filterProps(props));
      const expansionPanelTextProps = computed(() => _ExpansionPanelText.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-expansion-panel', {
        'v-expansion-panel--active': groupItem.isSelected.value,
        'v-expansion-panel--before-active': isBeforeSelected.value,
        'v-expansion-panel--after-active': isAfterSelected.value,
        'v-expansion-panel--disabled': isDisabled.value
      }, roundedClasses.value, backgroundColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, styles.value]));
      const shadowClasses = computed(() => normalizeClass(['v-expansion-panel__shadow', elevationClasses.value]));
      const defaults = computed(() => ({
        VExpansionPanelTitle: {
          ...expansionPanelTitleProps.value
        },
        VExpansionPanelText: {
          ...expansionPanelTextProps.value
        }
      }));
      return {
        expose: {
          groupItem
        },
        renderInput: {
          defaults,
          shadowClasses,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const allowedVariants = ['default', 'accordion', 'inset', 'popout'];
  const makeVExpansionPanelsProps = propsFactory({
    flat: Boolean,
    ...makeGroupProps(),
    ...pick(makeVExpansionPanelProps(), ['bgColor', 'collapseIcon', 'color', 'eager', 'elevation', 'expandIcon', 'focusable', 'hideActions', 'readonly', 'ripple', 'rounded', 'tile', 'static']),
    ...makeThemeProps(),
    ...makeComponentProps(),
    ...makeTagProps(),
    variant: {
      type: String,
      default: 'default',
      validator: v => allowedVariants.includes(v)
    }
  }, 'VExpansionPanels');
  const _ExpansionPanels = defineComponent({
    name: 'VExpansionPanels',
    props: makeVExpansionPanelsProps(),
    emits: {
      'update:modelValue': val => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        next,
        prev
      } = useGroup(vm, props, VExpansionPanelSymbol);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const variantClass = computed(() => normalizeClass(props.variant && `v-expansion-panels--variant-${props.variant}`));
      provideDefaults(vm, {
        VExpansionPanel: {
          bgColor: toRef(props, 'bgColor'),
          collapseIcon: toRef(props, 'collapseIcon'),
          color: toRef(props, 'color'),
          eager: toRef(props, 'eager'),
          elevation: toRef(props, 'elevation'),
          expandIcon: toRef(props, 'expandIcon'),
          focusable: toRef(props, 'focusable'),
          hideActions: toRef(props, 'hideActions'),
          readonly: toRef(props, 'readonly'),
          ripple: toRef(props, 'ripple'),
          rounded: toRef(props, 'rounded'),
          static: toRef(props, 'static')
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-expansion-panels', {
        'v-expansion-panels--flat': props.flat,
        'v-expansion-panels--tile': props.tile
      }, themeClasses.value, variantClass.value, classes.value]));
      return {
        expose: {
          next,
          prev
        },
        renderInput: {
          rootClasses,
          rootStyles: styles,
          next,
          prev
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AExpansionPanels = defineAlpineComponent({
    ..._ExpansionPanels,
    name: 'AExpansionPanels'
  });

  // Types

  const AExpansionPanel = defineAlpineComponent({
    ..._ExpansionPanel,
    name: 'AExpansionPanel'
  });

  // Types

  const AExpansionPanelText = defineAlpineComponent({
    ..._ExpansionPanelText,
    name: 'AExpansionPanelText'
  });

  // Types

  const AExpansionPanelTitle = defineAlpineComponent({
    ..._ExpansionPanelTitle,
    name: 'AExpansionPanelTitle'
  });

  // Styles

  // Types

  const makeVFabProps = propsFactory({
    app: Boolean,
    appear: Boolean,
    extended: Boolean,
    layout: Boolean,
    offset: Boolean,
    modelValue: {
      type: Boolean,
      default: true
    },
    ...omit(makeVBtnProps({
      active: true
    }), ['location']),
    ...makeLayoutItemProps(),
    ...makeLocationProps(),
    ...makeTransitionProps({
      transition: 'fab-transition'
    })
  }, 'VFab');
  const _Fab = defineComponent({
    name: 'VFab',
    props: makeVFabProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        shallowRef,
        toRef,
        watchEffect
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const height = shallowRef(56);
      const layoutItemStyles = ref();
      const {
        resizeRef
      } = useResizeObserver(vm, entries => {
        if (!entries.length) return;
        height.value = entries[0].target.clientHeight;
      });
      const hasPosition = computed(() => props.app || props.absolute);
      const position = computed(() => {
        if (!hasPosition.value) return false;
        return props.location?.split(' ').shift() ?? 'bottom';
      });
      const orientation = computed(() => {
        if (!hasPosition.value) return false;
        return props.location?.split(' ')[1] ?? 'end';
      });
      const layout = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position,
        layoutSize: computed(() => props.layout ? height.value + 24 : 0),
        elementSize: computed(() => height.value + 24),
        active: computed(() => props.app && model.value),
        absolute: toRef(props, 'absolute')
      });

      // NOTE(Alpinui): Refactored from useToggleScope
      watchEffect(() => {
        // Touch
        /* eslint-disable no-unused-expressions */
        layoutItemStyles.value;
        layout.layoutItemStyles.value;
        /* eslint-enable no-unused-expressions */

        if (!props.app) return;
        layoutItemStyles.value = layout.layoutItemStyles.value;
      });
      const vFabRef = ref();
      const btnProps = computed(() => _Btn.filterProps(props));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-fab', {
        'v-fab--absolute': props.absolute,
        'v-fab--app': !!props.app,
        'v-fab--extended': props.extended,
        'v-fab--offset': props.offset,
        [`v-fab--${position.value}`]: hasPosition.value,
        [`v-fab--${orientation.value}`]: hasPosition.value
      }, classes.value]));
      const rootStyles = computed(() => normalizeStyle([props.app ? {
        ...layoutItemStyles.value
      } : {
        height: 'inherit',
        width: undefined
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          btnProps,
          vFabRef,
          resizeRef,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AFab = defineAlpineComponent({
    ..._Fab,
    name: 'AFab'
  });

  // Types

  const AField = defineAlpineComponent({
    ..._Field,
    name: 'AField'
  });

  // Composables

  // Types

  const makeVFieldLabelProps = propsFactory({
    floating: Boolean,
    ...makeComponentProps()
  }, 'VFieldLabel');
  const _FieldLabel = defineComponent({
    name: 'VFieldLabel',
    props: makeVFieldLabelProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-field-label', {
        'v-field-label--floating': props.floating
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AFieldLabel = defineAlpineComponent({
    ..._FieldLabel,
    name: 'AFieldLabel'
  });

  // Styles

  // Types

  const makeVFileInputProps = propsFactory({
    chips: Boolean,
    counter: Boolean,
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize'
    },
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter'
    },
    hideInput: Boolean,
    multiple: Boolean,
    showSize: {
      type: [Boolean, Number, String],
      default: false,
      validator: v => {
        return typeof v === 'boolean' || [1000, 1024].includes(Number(v));
      }
    },
    ...makeVInputProps({
      prependIcon: '$file'
    }),
    modelValue: {
      type: [Array, Object],
      default: props => props.multiple ? [] : null,
      validator: val => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object');
      }
    },
    ...makeVFieldProps({
      clearable: true
    })
  }, 'VFileInput');
  const _FileInput = defineComponent({
    name: 'VFileInput',
    inheritAttrs: false,
    props: makeVFileInputProps(),
    emits: {
      'click:control': e => true,
      'mousedown:control': e => true,
      'update:focused': focused => true,
      'update:modelValue': files => true
    },
    slots: makeSlots({
      counter: null,
      selection: null,
      default: null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const model = useProxiedModel(vm, props, 'modelValue', props.modelValue, val => wrapInArray(val), val => props.multiple || Array.isArray(props.modelValue) ? val : val[0] ?? null);
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
      const totalBytes = computed(() => (model.value ?? []).reduce((bytes, _ref) => {
        let {
          size = 0
        } = _ref;
        return bytes + size;
      }, 0));
      const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
      const fileNames = computed(() => (model.value ?? []).map(file => {
        const {
          name = '',
          size = 0
        } = file;
        return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
      }));
      const counterValue = computed(() => {
        const fileCount = model.value?.length ?? 0;
        if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
      });
      const vInputRef = ref();
      const vFieldRef = ref();
      const inputRef = ref();
      const isActive = computed(() => isFocused.value || props.active);
      const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
      function onFocus() {
        if (inputRef.value !== document.activeElement) {
          inputRef.value?.focus();
        }
        if (!isFocused.value) focus();
      }
      function onClickPrepend(e) {
        inputRef.value?.click();
      }
      function onControlMousedown(e) {
        vm.emit('mousedown:control', e);
      }
      function onControlClick(e) {
        inputRef.value?.click();
        vm.emit('click:control', e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        nextTick(() => {
          model.value = [];
          callEvent(props['onClick:clear'], e);
        });
      }
      watch(model, newValue => {
        const hasModelReset = !Array.isArray(newValue) || !newValue.length;
        if (hasModelReset && inputRef.value) {
          inputRef.value.value = '';
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => {
        const {
          modelValue: _,
          ...inputProps
        } = _Input.filterProps(props);
        return inputProps;
      });
      const fieldProps = computed(() => filterFieldProps(props));
      const rootClasses = computed(() => normalizeClass(['v-file-input', {
        'v-file-input--chips': !!props.chips,
        'v-file-input--hide': props.hideInput,
        'v-input--plain-underlined': isPlainOrUnderlined.value
      }, classes.value]));
      return {
        expose: forwardRefs({}, vInputRef, vFieldRef, inputRef),
        renderInput: {
          isActive,
          isFocused,
          isPlainOrUnderlined,
          model,
          fileNames,
          totalBytes,
          totalBytesReadable,
          counterValue,
          vFieldRef,
          vInputRef,
          inputRef,
          inputProps,
          fieldProps,
          rootClasses,
          rootStyles: styles,
          onClickPrepend,
          onControlClick,
          onControlMousedown,
          onClear,
          onFocus,
          blur,
          filterInputAttrs
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AFileInput = defineAlpineComponent({
    ..._FileInput,
    name: 'AFileInput'
  });

  // Styles

  // Types

  const makeVFooterProps = propsFactory({
    app: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 'auto'
    },
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'footer'
    }),
    ...makeThemeProps()
  }, 'VFooter');
  const _Footer = defineComponent({
    name: 'VFooter',
    props: makeVFooterProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        shallowRef,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const autoHeight = shallowRef(32);
      const {
        resizeRef
      } = useResizeObserver(vm, entries => {
        if (!entries.length) return;
        autoHeight.value = entries[0].target.clientHeight;
      });
      const height = computed(() => props.height === 'auto' ? autoHeight.value : parseInt(props.height, 10));
      const {
        layoutItemStyles,
        layoutIsReady
      } = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: computed(() => 'bottom'),
        layoutSize: height,
        elementSize: computed(() => props.height === 'auto' ? undefined : height.value),
        active: computed(() => props.app),
        absolute: toRef(props, 'absolute')
      });
      const rootClasses = computed(() => normalizeClass(['v-footer', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, props.app ? layoutItemStyles.value : {
        height: convertToUnit(props.height)
      }, styles.value]));
      return {
        expose: props.app ? layoutIsReady : {},
        renderInput: {
          resizeRef,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AFooter = defineAlpineComponent({
    ..._Footer,
    name: 'AFooter'
  });

  // Composables

  // Types

  const makeVFormProps = propsFactory({
    ...makeComponentProps(),
    ...makeFormProps()
  }, 'VForm');
  const _Form = defineComponent({
    name: 'VForm',
    props: makeVFormProps(),
    emits: {
      'update:modelValue': val => true,
      submit: e => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const form = createForm(vm, props);
      const formRef = ref();
      function onReset(e) {
        e.preventDefault();
        form.reset();
      }
      function onSubmit(_e) {
        const e = _e;
        const ready = form.validate();
        e.then = ready.then.bind(ready);
        e.catch = ready.catch.bind(ready);
        e.finally = ready.finally.bind(ready);
        vm.emit('submit', e);
        if (!e.defaultPrevented) {
          ready.then(_ref => {
            let {
              valid
            } = _ref;
            if (valid) {
              formRef.value?.submit();
            }
          });
        }
        e.preventDefault();
      }
      const rootClasses = computed(() => normalizeClass(['v-form', classes.value]));
      return {
        expose: forwardRefs(form, formRef),
        renderInput: {
          form,
          formRef,
          rootClasses,
          rootStyles: styles,
          onReset,
          onSubmit
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AForm = defineAlpineComponent({
    ..._Form,
    name: 'AForm'
  });

  // Styles

  // Types

  const breakpointProps = (() => {
    return breakpoints.reduce((props, val) => {
      props[val] = {
        type: [Boolean, String, Number],
        default: false
      };
      return props;
    }, {});
  })();
  const offsetProps = (() => {
    return breakpoints.reduce((props, val) => {
      const offsetKey = 'offset' + capitalize(val);
      props[offsetKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const orderProps = (() => {
    return breakpoints.reduce((props, val) => {
      const orderKey = 'order' + capitalize(val);
      props[orderKey] = {
        type: [String, Number],
        default: null
      };
      return props;
    }, {});
  })();
  const propMap$1 = {
    col: Object.keys(breakpointProps),
    offset: Object.keys(offsetProps),
    order: Object.keys(orderProps)
  };
  function breakpointClass$1(type, prop, val) {
    let className = type;
    if (val == null || val === false) {
      return undefined;
    }
    if (prop) {
      const breakpoint = prop.replace(type, '');
      className += `-${breakpoint}`;
    }
    if (type === 'col') {
      className = 'v-' + className;
    }
    // Handling the boolean style prop when accepting [Boolean, String, Number]
    // means Vue will not convert <v-col sm></v-col> to sm: true for us.
    // Since the default is false, an empty string indicates the prop's presence.
    if (type === 'col' && (val === '' || val === true)) {
      // .v-col-md
      return className.toLowerCase();
    }
    // .order-md-6
    className += `-${val}`;
    return className.toLowerCase();
  }
  const ALIGN_SELF_VALUES = ['auto', 'start', 'end', 'center', 'baseline', 'stretch'];
  const makeVColProps = propsFactory({
    cols: {
      type: [Boolean, String, Number],
      default: false
    },
    ...breakpointProps,
    offset: {
      type: [String, Number],
      default: null
    },
    ...offsetProps,
    order: {
      type: [String, Number],
      default: null
    },
    ...orderProps,
    alignSelf: {
      type: String,
      default: null,
      validator: str => ALIGN_SELF_VALUES.includes(str)
    },
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VCol');
  const _Col = defineComponent({
    name: 'VCol',
    props: makeVColProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const colClasses = computed(() => {
        const classList = [];

        // Loop through `col`, `offset`, `order` breakpoint props
        let type;
        for (type in propMap$1) {
          propMap$1[type].forEach(prop => {
            const value = props[prop];
            const className = breakpointClass$1(type, prop, value);
            if (className) classList.push(className);
          });
        }
        const hasColClasses = classList.some(className => className.startsWith('v-col-'));
        classList.push({
          // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
          'v-col': !hasColClasses || !props.cols,
          [`v-col-${props.cols}`]: props.cols,
          [`offset-${props.offset}`]: props.offset,
          [`order-${props.order}`]: props.order,
          [`align-self-${props.alignSelf}`]: props.alignSelf
        });
        return classList;
      });
      const rootClasses = computed(() => normalizeClass([colClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ACol = defineAlpineComponent({
    ..._Col,
    name: 'ACol'
  });

  // Styles

  // Types

  const makeVContainerProps = propsFactory({
    fluid: {
      type: Boolean,
      default: false
    },
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VContainer');
  const _Container = defineComponent({
    name: 'VContainer',
    props: makeVContainerProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);
      const rootClasses = computed(() => normalizeClass(['v-container', {
        'v-container--fluid': props.fluid
      }, rtlClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AContainer = defineAlpineComponent({
    ..._Container,
    name: 'AContainer'
  });

  // Styles

  // Types

  const ALIGNMENT = ['start', 'end', 'center'];
  const SPACE = ['space-between', 'space-around', 'space-evenly'];
  function makeRowProps(prefix, def) {
    return breakpoints.reduce((props, val) => {
      const prefixKey = prefix + capitalize(val);
      props[prefixKey] = def();
      return props;
    }, {});
  }
  const ALIGN_VALUES = [...ALIGNMENT, 'baseline', 'stretch'];
  const alignValidator = str => ALIGN_VALUES.includes(str);
  const alignProps = makeRowProps('align', () => ({
    type: String,
    default: null,
    validator: alignValidator
  }));
  const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
  const justifyValidator = str => JUSTIFY_VALUES.includes(str);
  const justifyProps = makeRowProps('justify', () => ({
    type: String,
    default: null,
    validator: justifyValidator
  }));
  const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, 'stretch'];
  const alignContentValidator = str => ALIGN_CONTENT_VALUES.includes(str);
  const alignContentProps = makeRowProps('alignContent', () => ({
    type: String,
    default: null,
    validator: alignContentValidator
  }));
  const propMap = {
    align: Object.keys(alignProps),
    justify: Object.keys(justifyProps),
    alignContent: Object.keys(alignContentProps)
  };
  const classMap = {
    align: 'align',
    justify: 'justify',
    alignContent: 'align-content'
  };
  function breakpointClass(type, prop, val) {
    let className = classMap[type];
    if (val == null) {
      return undefined;
    }
    if (prop) {
      // alignSm -> Sm
      const breakpoint = prop.replace(type, '');
      className += `-${breakpoint}`;
    }
    // .align-items-sm-center
    className += `-${val}`;
    return className.toLowerCase();
  }
  const makeVRowProps = propsFactory({
    dense: Boolean,
    noGutters: Boolean,
    align: {
      type: String,
      default: null,
      validator: alignValidator
    },
    ...alignProps,
    justify: {
      type: String,
      default: null,
      validator: justifyValidator
    },
    ...justifyProps,
    alignContent: {
      type: String,
      default: null,
      validator: alignContentValidator
    },
    ...alignContentProps,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VRow');
  const _Row = defineComponent({
    name: 'VRow',
    props: makeVRowProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rowClasses = computed(() => {
        const classList = [];

        // Loop through `align`, `justify`, `alignContent` breakpoint props
        let type;
        for (type in propMap) {
          propMap[type].forEach(prop => {
            const value = props[prop];
            const className = breakpointClass(type, prop, value);
            if (className) classList.push(className);
          });
        }
        classList.push({
          'v-row--no-gutters': props.noGutters,
          'v-row--dense': props.dense,
          [`align-${props.align}`]: props.align,
          [`justify-${props.justify}`]: props.justify,
          [`align-content-${props.alignContent}`]: props.alignContent
        });
        return classList;
      });
      const rootClasses = computed(() => normalizeClass(['v-row', rowClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ARow = defineAlpineComponent({
    ..._Row,
    name: 'ARow'
  });

  // Styles

  // Types

  const klass$4 = 'v-spacer';
  const tag = 'div';
  const name = 'VSpacer';
  const _Spacer = createSimpleFunctionalHeadless(klass$4, tag, name);

  // Types

  const ASpacer = defineAlpineComponent({
    ..._Spacer,
    name: 'ASpacer'
  });

  // Composables
  const makeVHoverProps = propsFactory({
    disabled: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    ...makeDelayProps()
  }, 'VHover');
  const _Hover = defineComponent({
    name: 'VHover',
    props: makeVHoverProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const isHovering = useProxiedModel(vm, props, 'modelValue');
      const {
        runOpenDelay,
        runCloseDelay
      } = useDelay(props, value => !props.disabled && (isHovering.value = value));
      return {
        expose: {},
        renderInput: {
          isHovering,
          runOpenDelay,
          runCloseDelay
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AHover = defineAlpineComponent({
    ..._Hover,
    name: 'AHover'
  });

  // Styles
  const makeVIconProps = propsFactory({
    color: String,
    disabled: Boolean,
    start: Boolean,
    end: Boolean,
    icon: IconValue,
    ...makeComponentProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'i'
    }),
    ...makeThemeProps()
  }, 'VIcon');
  const _Icon = defineComponent({
    name: 'VIcon',
    props: makeVIconProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        toRef
      } = vm.reactivity;
      const slotIcon = ref();
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        iconData
      } = useIcon(vm, computed(() => slotIcon.value || props.icon));
      const {
        sizeClasses
      } = useSize(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'color'));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-icon', 'notranslate', themeClasses.value, sizeClasses.value, textColorClasses.value, {
        'v-icon--disabled': props.disabled,
        'v-icon--start': props.start,
        'v-icon--end': props.end
      }, classes.value]));
      const rootStyles = computed(() => normalizeStyle([!sizeClasses.value ? {
        fontSize: convertToUnit(props.size),
        height: convertToUnit(props.size),
        width: convertToUnit(props.size)
      } : undefined, textColorStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          iconData,
          rootClasses,
          rootStyles,
          slotIcon
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AIcon = defineAlpineComponent({
    ..._Icon,
    name: 'AIcon'
  });

  // Components
  const AFa4Icon = defineAlpineComponent({
    ..._ClassIcon,
    setupHeadless(props, vm) {
      const result = _ClassIcon.setupHeadless(props, vm);
      return {
        expose: result.expose,
        renderInput: {
          ...result.renderInput,
          // Add `fa` class
          icon: `${result.renderInput.icon} fa`
        }
      };
    },
    name: 'AFa4Icon'
  });
  ({
    component: AFa4Icon.name
  });

  // Components
  const AMdIcon = defineAlpineComponent({
    ..._LigatureIcon,
    setupHeadless(props, vm) {
      const result = _LigatureIcon.setupHeadless(props, vm);
      return {
        expose: result.expose,
        renderInput: {
          ...result.renderInput,
          // Add `fa` class
          icon: `${result.renderInput.icon} fa`,
          // TODO(Alpinui): This needs to be added in the template
          class: 'material-icons'
        }
      };
    },
    name: 'AMdIcon'
  });
  ({
    component: AMdIcon.name
  });

  // Types

  const AImg = defineAlpineComponent({
    ..._Img,
    name: 'AImg'
  });

  // Utilities

  // Types

  function useIntersectionObserver(vm, callback, options) {
    const {
      ref,
      shallowRef,
      onBeforeUnmount,
      watch
    } = vm.reactivity;
    const intersectionRef = ref();
    const isIntersecting = shallowRef(false);
    if (SUPPORTS_INTERSECTION) {
      const observer = new IntersectionObserver(entries => {
        callback?.(entries, observer);
        isIntersecting.value = !!entries.find(entry => entry.isIntersecting);
      }, options);
      onBeforeUnmount(() => {
        observer.disconnect();
      });
      watch(intersectionRef, (newValue, oldValue) => {
        if (oldValue) {
          observer.unobserve(oldValue);
          isIntersecting.value = false;
        }
        if (newValue) observer.observe(newValue);
      }, {
        flush: 'post'
      });
    }
    return {
      intersectionRef,
      isIntersecting
    };
  }

  // Styles

  // Types

  const makeVInfiniteScrollProps = propsFactory({
    color: String,
    direction: {
      type: String,
      default: 'vertical',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    side: {
      type: String,
      default: 'end',
      validator: v => ['start', 'end', 'both'].includes(v)
    },
    mode: {
      type: String,
      default: 'intersect',
      validator: v => ['intersect', 'manual'].includes(v)
    },
    margin: [Number, String],
    loadMoreText: {
      type: String,
      default: '$vuetify.infiniteScroll.loadMore'
    },
    emptyText: {
      type: String,
      default: '$vuetify.infiniteScroll.empty'
    },
    ...makeDimensionProps(),
    ...makeTagProps()
  }, 'VInfiniteScroll');
  defineComponent({
    name: 'VInfiniteScrollIntersect',
    props: {
      side: {
        type: String,
        required: true
      },
      rootRef: null,
      rootMargin: String
    },
    emits: {
      intersect: (side, isIntersecting) => true
    },
    slots: makeSlots(null),
    setupHeadless(props, vm) {
      const {
        watch
      } = vm.reactivity;
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver(vm, entries => {}, props.rootMargin ? {
        rootMargin: props.rootMargin
      } : undefined);
      watch(isIntersecting, async val => {
        vm.emit('intersect', props.side, val);
      });
      return {
        expose: {},
        renderInput: {
          intersectionRef
        }
      };
    },
    renderHeadless: () => null
  });
  const _InfiniteScroll = defineComponent({
    name: 'VInfiniteScroll',
    props: makeVInfiniteScrollProps(),
    emits: {
      load: options => true
    },
    slots: makeSlots({
      default: null,
      loading: null,
      error: null,
      empty: null,
      'load-more': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        onMounted,
        ref,
        shallowRef
      } = vm.reactivity;
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const rootEl = ref();
      const startStatus = shallowRef('ok');
      const endStatus = shallowRef('ok');
      const margin = computed(() => convertToUnit(props.margin));
      const isIntersecting = shallowRef(false);
      function setScrollAmount(amount) {
        if (!rootEl.value) return;
        const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
        rootEl.value[property] = amount;
      }
      function getScrollAmount() {
        if (!rootEl.value) return 0;
        const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
        return rootEl.value[property];
      }
      function getScrollSize() {
        if (!rootEl.value) return 0;
        const property = props.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth';
        return rootEl.value[property];
      }
      function getContainerSize() {
        if (!rootEl.value) return 0;
        const property = props.direction === 'vertical' ? 'clientHeight' : 'clientWidth';
        return rootEl.value[property];
      }
      onMounted(() => {
        if (!rootEl.value) return;
        if (props.side === 'start') {
          setScrollAmount(getScrollSize());
        } else if (props.side === 'both') {
          setScrollAmount(getScrollSize() / 2 - getContainerSize() / 2);
        }
      });
      function setStatus(side, status) {
        if (side === 'start') {
          startStatus.value = status;
        } else if (side === 'end') {
          endStatus.value = status;
        }
      }
      function getStatus(side) {
        return side === 'start' ? startStatus.value : endStatus.value;
      }
      let previousScrollSize = 0;
      function handleIntersect(side, _isIntersecting) {
        isIntersecting.value = _isIntersecting;
        if (isIntersecting.value) {
          intersecting(side);
        }
      }
      function intersecting(side) {
        if (props.mode !== 'manual' && !isIntersecting.value) return;
        const status = getStatus(side);
        if (!rootEl.value || ['empty', 'loading'].includes(status)) return;
        previousScrollSize = getScrollSize();
        setStatus(side, 'loading');
        function done(status) {
          setStatus(side, status);
          nextTick(() => {
            if (status === 'empty' || status === 'error') return;
            if (status === 'ok' && side === 'start') {
              setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount());
            }
            if (props.mode !== 'manual') {
              nextTick(() => {
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                      intersecting(side);
                    });
                  });
                });
              });
            }
          });
        }
        vm.emit('load', {
          side,
          done
        });
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const hasStartIntersect = computed(() => props.side === 'start' || props.side === 'both');
      const hasEndIntersect = computed(() => props.side === 'end' || props.side === 'both');
      const intersectMode = computed(() => props.mode === 'intersect');
      const shouldRenderStartIntersect = computed(() => rootEl.value && hasStartIntersect.value && intersectMode.value);
      const shouldRenderEndIntersect = computed(() => rootEl.value && hasEndIntersect.value && intersectMode.value);
      const loadMoreText = computed(() => t(props.loadMoreText));
      const emptyText = computed(() => t(props.emptyText));
      const rootClasses = computed(() => normalizeClass(['v-infinite-scroll', `v-infinite-scroll--${props.direction}`, {
        'v-infinite-scroll--start': hasStartIntersect.value,
        'v-infinite-scroll--end': hasEndIntersect.value
      }]));
      return {
        expose: {},
        renderInput: {
          shouldRenderStartIntersect,
          shouldRenderEndIntersect,
          dimensionStyles,
          loadMoreText,
          emptyText,
          margin,
          rootClasses,
          rootEl,
          startStatus,
          endStatus,
          handleIntersect,
          intersecting
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AInfiniteScroll = defineAlpineComponent({
    ..._InfiniteScroll,
    name: 'AInfiniteScroll'
  });

  // Types

  const AInput = defineAlpineComponent({
    ..._Input,
    name: 'AInput'
  });

  // Styles
  const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');
  const makeVItemGroupProps = propsFactory({
    ...makeComponentProps(),
    ...makeGroupProps({
      selectedClass: 'v-item--selected'
    }),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VItemGroup');
  const _ItemGroup = defineComponent({
    name: 'VItemGroup',
    props: makeVItemGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isSelected,
        select,
        next,
        prev,
        selected
      } = useGroup(vm, props, VItemGroupSymbol);
      const rootClasses = computed(() => normalizeClass(['v-item-group', themeClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyle: styles,
          isSelected,
          select,
          next,
          prev,
          selected
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AItemGroup = defineAlpineComponent({
    ..._ItemGroup,
    name: 'AItemGroup'
  });

  // Composables
  const makeVItemProps = makeGroupItemProps;
  const _Item = defineComponent({
    name: 'VItem',
    props: makeVItemProps(),
    emits: {
      'group:selected': val => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        isSelected,
        select,
        toggle,
        selectedClass,
        value,
        disabled
      } = useGroupItem(vm, props, VItemGroupSymbol);
      return {
        expose: {},
        renderInput: {
          isSelected,
          selectedClass,
          select,
          toggle,
          value,
          disabled
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AItem = defineAlpineComponent({
    ..._Item,
    name: 'AItem'
  });

  // Styles

  // Types

  const klass$3 = 'v-kbd';
  const _Kbd = createSimpleFunctionalHeadless(klass$3);

  // Types

  const AKbd = defineAlpineComponent({
    ..._Kbd,
    name: 'AKbd'
  });

  // Styles

  // Types

  const makeVLabelProps = propsFactory({
    text: String,
    onClick: EventProp(),
    ...makeComponentProps(),
    ...makeThemeProps()
  }, 'VLabel');
  const _Label = defineComponent({
    name: 'VLabel',
    props: makeVLabelProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-label', {
        'v-label--clickable': !!props.onClick
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ALabel = defineAlpineComponent({
    ..._Label,
    name: 'ALabel'
  });

  // Styles

  // Types

  const makeVLayoutProps = propsFactory({
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeLayoutProps()
  }, 'VLayout');
  const _Layout = defineComponent({
    name: 'VLayout',
    props: makeVLayoutProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        layoutClasses,
        layoutStyles,
        getLayoutItem,
        items,
        layoutRef
      } = createLayout(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const rootClasses = computed(() => normalizeClass([layoutClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([dimensionStyles.value, layoutStyles.value, styles.value]));
      return {
        expose: {
          getLayoutItem,
          items
        },
        renderInput: {
          layoutRef,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ALayout = defineAlpineComponent({
    ..._Layout,
    name: 'ALayout'
  });

  // Styles

  // Types

  const makeVLayoutItemProps = propsFactory({
    position: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 300
    },
    modelValue: Boolean,
    ...makeComponentProps(),
    ...makeLayoutItemProps()
  }, 'VLayoutItem');
  const _LayoutItem = defineComponent({
    name: 'VLayoutItem',
    props: makeVLayoutItemProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        layoutItemStyles,
        layoutIsReady
      } = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: toRef(props, 'position'),
        elementSize: toRef(props, 'size'),
        layoutSize: toRef(props, 'size'),
        active: toRef(props, 'modelValue'),
        absolute: toRef(props, 'absolute')
      });
      const rootClasses = computed(() => normalizeClass(['v-layout-item', classes.value]));
      const rootStyles = computed(() => normalizeStyle([layoutItemStyles.value, styles.value]));
      return {
        expose: layoutIsReady,
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ALayoutItem = defineAlpineComponent({
    ..._LayoutItem,
    name: 'ALayoutItem'
  });

  // Components

  // Types

  const makeVLazyProps = propsFactory({
    modelValue: Boolean,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined
      })
    },
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeTagProps(),
    ...makeTransitionProps({
      transition: 'fade-transition'
    })
  }, 'VLazy');
  const _Lazy = defineComponent({
    name: 'VLazy',
    props: makeVLazyProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      function onIntersect(isIntersecting) {
        if (isActive.value) return;
        isActive.value = isIntersecting;
      }
      const rootClasses = computed(() => normalizeClass(['v-lazy', classes.value]));
      const rootStyles = computed(() => normalizeStyle([dimensionStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          isActive,
          onIntersect,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ALazy = defineAlpineComponent({
    ..._Lazy,
    name: 'ALazy'
  });

  // Types


  // List
  const ListKey = Symbol.for('vuetify:list');
  function createList(vm) {
    const {
      inject,
      provide,
      shallowRef
    } = vm.reactivity;
    const parent = inject(ListKey, {
      hasPrepend: shallowRef(false),
      updateHasPrepend: () => null
    });
    const data = {
      hasPrepend: shallowRef(false),
      updateHasPrepend: value => {
        if (value) data.hasPrepend.value = value;
      }
    };
    provide(ListKey, data);
    return parent;
  }
  function useList(vm) {
    const {
      inject
    } = vm.reactivity;
    return inject(ListKey, null);
  }

  /* eslint-disable sonarjs/no-identical-functions */
  // Utilities

  // Types

  const independentActiveStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const strategy = {
      activate: _ref => {
        let {
          id,
          value,
          activated
        } = _ref;
        id = toRaw(id);

        // When mandatory and we're trying to deselect when id
        // is the only currently selected item then do nothing
        if (mandatory && !value && activated.size === 1 && activated.has(id)) return activated;
        if (value) {
          activated.add(id);
        } else {
          activated.delete(id);
        }
        return activated;
      },
      in: (v, children, parents) => {
        let set = new Set();
        if (v != null) {
          for (const id of wrapInArray(v)) {
            set = strategy.activate({
              id,
              value: true,
              activated: new Set(set),
              children,
              parents
            });
          }
        }
        return set;
      },
      out: v => {
        return Array.from(v);
      }
    };
    return strategy;
  };
  const independentSingleActiveStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const parentStrategy = independentActiveStrategy(vm, mandatory);
    const strategy = {
      activate: _ref2 => {
        let {
          activated,
          id,
          ...rest
        } = _ref2;
        id = toRaw(id);
        const singleSelected = activated.has(id) ? new Set([id]) : new Set();
        return parentStrategy.activate({
          ...rest,
          id,
          activated: singleSelected
        });
      },
      in: (v, children, parents) => {
        let set = new Set();
        if (v != null) {
          const arr = wrapInArray(v);
          if (arr.length) {
            set = parentStrategy.in(arr.slice(0, 1), children, parents);
          }
        }
        return set;
      },
      out: (v, children, parents) => {
        return parentStrategy.out(v, children, parents);
      }
    };
    return strategy;
  };
  const leafActiveStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const parentStrategy = independentActiveStrategy(vm, mandatory);
    const strategy = {
      activate: _ref3 => {
        let {
          id,
          activated,
          children,
          ...rest
        } = _ref3;
        id = toRaw(id);
        if (children.has(id)) return activated;
        return parentStrategy.activate({
          id,
          activated,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const leafSingleActiveStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const parentStrategy = independentSingleActiveStrategy(vm, mandatory);
    const strategy = {
      activate: _ref4 => {
        let {
          id,
          activated,
          children,
          ...rest
        } = _ref4;
        id = toRaw(id);
        if (children.has(id)) return activated;
        return parentStrategy.activate({
          id,
          activated,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };

  const singleOpenStrategy = {
    open: _ref => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref;
      if (value) {
        const newOpened = new Set();
        newOpened.add(id);
        let parent = parents.get(id);
        while (parent != null) {
          newOpened.add(parent);
          parent = parents.get(parent);
        }
        return newOpened;
      } else {
        opened.delete(id);
        return opened;
      }
    },
    select: () => null
  };
  const multipleOpenStrategy = {
    open: _ref2 => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref2;
      if (value) {
        let parent = parents.get(id);
        opened.add(id);
        while (parent != null && parent !== id) {
          opened.add(parent);
          parent = parents.get(parent);
        }
        return opened;
      } else {
        opened.delete(id);
      }
      return opened;
    },
    select: () => null
  };
  const listOpenStrategy = {
    open: multipleOpenStrategy.open,
    select: _ref3 => {
      let {
        id,
        value,
        opened,
        parents
      } = _ref3;
      if (!value) return opened;
      const path = [];
      let parent = parents.get(id);
      while (parent != null) {
        path.push(parent);
        parent = parents.get(parent);
      }
      return new Set(path);
    }
  };

  /* eslint-disable sonarjs/no-identical-functions */

  // Types

  const independentSelectStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const strategy = {
      select: _ref => {
        let {
          id,
          value,
          selected
        } = _ref;
        id = toRaw(id);

        // When mandatory and we're trying to deselect when id
        // is the only currently selected item then do nothing
        if (mandatory && !value) {
          const on = Array.from(selected.entries()).reduce((arr, _ref2) => {
            let [key, value] = _ref2;
            if (value === 'on') arr.push(key);
            return arr;
          }, []);
          if (on.length === 1 && on[0] === id) return selected;
        }
        selected.set(id, value ? 'on' : 'off');
        return selected;
      },
      in: (v, children, parents) => {
        let map = new Map();
        for (const id of v || []) {
          map = strategy.select({
            id,
            value: true,
            selected: new Map(map),
            children,
            parents
          });
        }
        return map;
      },
      out: v => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === 'on') arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };
  const independentSingleSelectStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const parentStrategy = independentSelectStrategy(vm, mandatory);
    const strategy = {
      select: _ref3 => {
        let {
          selected,
          id,
          ...rest
        } = _ref3;
        id = toRaw(id);
        const singleSelected = selected.has(id) ? new Map([[id, selected.get(id)]]) : new Map();
        return parentStrategy.select({
          ...rest,
          id,
          selected: singleSelected
        });
      },
      in: (v, children, parents) => {
        let map = new Map();
        if (v?.length) {
          map = parentStrategy.in(v.slice(0, 1), children, parents);
        }
        return map;
      },
      out: (v, children, parents) => {
        return parentStrategy.out(v, children, parents);
      }
    };
    return strategy;
  };
  const leafSelectStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const parentStrategy = independentSelectStrategy(vm, mandatory);
    const strategy = {
      select: _ref4 => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref4;
        id = toRaw(id);
        if (children.has(id)) return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const leafSingleSelectStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const parentStrategy = independentSingleSelectStrategy(vm, mandatory);
    const strategy = {
      select: _ref5 => {
        let {
          id,
          selected,
          children,
          ...rest
        } = _ref5;
        id = toRaw(id);
        if (children.has(id)) return selected;
        return parentStrategy.select({
          id,
          selected,
          children,
          ...rest
        });
      },
      in: parentStrategy.in,
      out: parentStrategy.out
    };
    return strategy;
  };
  const classicSelectStrategy = (vm, mandatory) => {
    const {
      toRaw
    } = vm.reactivity;
    const strategy = {
      select: _ref6 => {
        let {
          id,
          value,
          selected,
          children,
          parents
        } = _ref6;
        id = toRaw(id);
        const original = new Map(selected);
        const items = [id];
        while (items.length) {
          const item = items.shift();
          selected.set(item, value ? 'on' : 'off');
          if (children.has(item)) {
            items.push(...children.get(item));
          }
        }
        let parent = parents.get(id);
        while (parent) {
          const childrenIds = children.get(parent);
          const everySelected = childrenIds.every(cid => selected.get(cid) === 'on');
          const noneSelected = childrenIds.every(cid => !selected.has(cid) || selected.get(cid) === 'off');
          selected.set(parent, everySelected ? 'on' : noneSelected ? 'off' : 'indeterminate');
          parent = parents.get(parent);
        }

        // If mandatory and planned deselect results in no selected
        // items then we can't do it, so return original state
        if (mandatory && !value) {
          const on = Array.from(selected.entries()).reduce((arr, _ref7) => {
            let [key, value] = _ref7;
            if (value === 'on') arr.push(key);
            return arr;
          }, []);
          if (on.length === 0) return original;
        }
        return selected;
      },
      in: (v, children, parents) => {
        let map = new Map();
        for (const id of v || []) {
          map = strategy.select({
            id,
            value: true,
            selected: new Map(map),
            children,
            parents
          });
        }
        return map;
      },
      out: (v, children) => {
        const arr = [];
        for (const [key, value] of v.entries()) {
          if (value === 'on' && !children.has(key)) arr.push(key);
        }
        return arr;
      }
    };
    return strategy;
  };

  // Composables

  // Types

  const VNestedSymbol = Symbol.for('vuetify:nested');
  const emptyNested = vm => {
    const {
      shallowRef,
      ref
    } = vm.reactivity;
    return {
      id: shallowRef(),
      root: {
        register: () => null,
        unregister: () => null,
        parents: ref(new Map()),
        children: ref(new Map()),
        open: () => null,
        openOnSelect: () => null,
        activate: () => null,
        select: () => null,
        activatable: ref(false),
        selectable: ref(false),
        opened: ref(new Set()),
        activated: ref(new Set()),
        selected: ref(new Map()),
        selectedValues: ref([])
      }
    };
  };
  const makeNestedProps = propsFactory({
    activatable: Boolean,
    selectable: Boolean,
    activeStrategy: [String, Function, Object],
    selectStrategy: [String, Function, Object],
    openStrategy: [String, Object],
    opened: null,
    activated: null,
    selected: null,
    mandatory: Boolean
  }, 'nested');
  const useNested = (vm, props) => {
    const {
      computed,
      ref,
      provide,
      shallowRef,
      toRef,
      onBeforeUnmount
    } = vm.reactivity;
    let isUnmounted = false;
    const children = ref(new Map());
    const parents = ref(new Map());
    const opened = useProxiedModel(vm, props, 'opened', props.opened, v => new Set(v), v => [...v.values()]);
    const activeStrategy = computed(() => {
      if (typeof props.activeStrategy === 'object') return props.activeStrategy;
      if (typeof props.activeStrategy === 'function') return props.activeStrategy(props.mandatory);
      switch (props.activeStrategy) {
        case 'leaf':
          return leafActiveStrategy(vm, props.mandatory);
        case 'single-leaf':
          return leafSingleActiveStrategy(vm, props.mandatory);
        case 'independent':
          return independentActiveStrategy(vm, props.mandatory);
        case 'single-independent':
        default:
          return independentSingleActiveStrategy(vm, props.mandatory);
      }
    });
    const selectStrategy = computed(() => {
      if (typeof props.selectStrategy === 'object') return props.selectStrategy;
      if (typeof props.selectStrategy === 'function') return props.selectStrategy(props.mandatory);
      switch (props.selectStrategy) {
        case 'single-leaf':
          return leafSingleSelectStrategy(vm, props.mandatory);
        case 'leaf':
          return leafSelectStrategy(vm, props.mandatory);
        case 'independent':
          return independentSelectStrategy(vm, props.mandatory);
        case 'single-independent':
          return independentSingleSelectStrategy(vm, props.mandatory);
        case 'classic':
        default:
          return classicSelectStrategy(vm, props.mandatory);
      }
    });
    const openStrategy = computed(() => {
      if (typeof props.openStrategy === 'object') return props.openStrategy;
      switch (props.openStrategy) {
        case 'list':
          return listOpenStrategy;
        case 'single':
          return singleOpenStrategy;
        case 'multiple':
        default:
          return multipleOpenStrategy;
      }
    });
    const activated = useProxiedModel(vm, props, 'activated', props.activated, v => activeStrategy.value.in(v, children.value, parents.value), v => activeStrategy.value.out(v, children.value, parents.value));
    const selected = useProxiedModel(vm, props, 'selected', props.selected, v => selectStrategy.value.in(v, children.value, parents.value), v => selectStrategy.value.out(v, children.value, parents.value));
    onBeforeUnmount(() => {
      isUnmounted = true;
    });
    function getPath(id) {
      const path = [];
      let parent = id;
      while (parent != null) {
        path.unshift(parent);
        parent = parents.value.get(parent);
      }
      return path;
    }
    const nested = {
      id: shallowRef(),
      root: {
        opened,
        activatable: toRef(props, 'activatable'),
        selectable: toRef(props, 'selectable'),
        activated,
        selected,
        selectedValues: computed(() => {
          const arr = [];
          for (const [key, value] of selected.value.entries()) {
            if (value === 'on') arr.push(key);
          }
          return arr;
        }),
        register: (id, parentId, isGroup) => {
          parentId && id !== parentId && parents.value.set(id, parentId);
          isGroup && children.value.set(id, []);
          if (parentId != null) {
            children.value.set(parentId, [...(children.value.get(parentId) || []), id]);
          }
        },
        unregister: id => {
          if (isUnmounted) return;
          children.value.delete(id);
          const parent = parents.value.get(id);
          if (parent) {
            const list = children.value.get(parent) ?? [];
            children.value.set(parent, list.filter(child => child !== id));
          }
          parents.value.delete(id);
          opened.value.delete(id);
        },
        open: (id, value, event) => {
          vm.emit('click:open', {
            id,
            value,
            path: getPath(id),
            event
          });
          const newOpened = openStrategy.value.open({
            id,
            value,
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        openOnSelect: (id, value, event) => {
          const newOpened = openStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            opened: new Set(opened.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newOpened && (opened.value = newOpened);
        },
        select: (id, value, event) => {
          vm.emit('click:select', {
            id,
            value,
            path: getPath(id),
            event
          });
          const newSelected = selectStrategy.value.select({
            id,
            value,
            selected: new Map(selected.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newSelected && (selected.value = newSelected);
          nested.root.openOnSelect(id, value, event);
        },
        activate: (id, value, event) => {
          if (!props.activatable) {
            return nested.root.select(id, true, event);
          }
          vm.emit('click:activate', {
            id,
            value,
            path: getPath(id),
            event
          });
          const newActivated = activeStrategy.value.activate({
            id,
            value,
            activated: new Set(activated.value),
            children: children.value,
            parents: parents.value,
            event
          });
          newActivated && (activated.value = newActivated);
        },
        children,
        parents
      }
    };
    provide(VNestedSymbol, nested);
    return nested.root;
  };
  const useNestedItem = (vm, id, isGroup) => {
    const {
      computed,
      inject,
      provide,
      toRaw,
      onBeforeUnmount
    } = vm.reactivity;
    const parent = inject(VNestedSymbol, emptyNested(vm));
    const uidSymbol = Symbol(getUid(vm));
    const computedId = computed(() => id.value !== undefined ? id.value : uidSymbol);
    const item = {
      ...parent,
      id: computedId,
      open: (open, e) => parent.root.open(computedId.value, open, e),
      openOnSelect: (open, e) => parent.root.openOnSelect(computedId.value, open, e),
      isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
      parent: computed(() => parent.root.parents.value.get(computedId.value)),
      activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
      isActivated: computed(() => parent.root.activated.value.has(toRaw(computedId.value))),
      select: (selected, e) => parent.root.select(computedId.value, selected, e),
      isSelected: computed(() => parent.root.selected.value.get(toRaw(computedId.value)) === 'on'),
      isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === 'indeterminate'),
      isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
      isGroupActivator: parent.isGroupActivator
    };
    !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup);
    onBeforeUnmount(() => {
      !parent.isGroupActivator && parent.root.unregister(computedId.value);
    });
    isGroup && provide(VNestedSymbol, item);
    return item;
  };
  const useNestedGroupActivator = vm => {
    const {
      inject,
      provide
    } = vm.reactivity;
    const parent = inject(VNestedSymbol, emptyNested(vm));
    provide(VNestedSymbol, {
      ...parent,
      isGroupActivator: true
    });
  };

  // Styles

  // Types

  function isPrimitive(value) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
  }
  function transformItem(props, item) {
    const type = getPropertyFromItem(item, props.itemType, 'item');
    const title = isPrimitive(item) ? item : getPropertyFromItem(item, props.itemTitle);
    const value = getPropertyFromItem(item, props.itemValue, undefined);
    const children = getPropertyFromItem(item, props.itemChildren);
    const itemProps = props.itemProps === true ? omit(item, ['children']) : getPropertyFromItem(item, props.itemProps);
    const _props = {
      title,
      value,
      ...itemProps
    };
    return {
      type,
      title: _props.title,
      value: _props.value,
      props: _props,
      children: type === 'item' && children ? transformItems(props, children) : undefined,
      raw: item
    };
  }
  function transformItems(props, items) {
    const array = [];
    for (const item of items) {
      array.push(transformItem(props, item));
    }
    return array;
  }
  function useListItems(vm, props) {
    const {
      computed
    } = vm.reactivity;
    const items = computed(() => transformItems(props, props.items));
    return {
      items
    };
  }
  const makeVListProps = propsFactory({
    baseColor: String,
    /* @deprecated */
    activeColor: String,
    activeClass: String,
    bgColor: String,
    disabled: Boolean,
    expandIcon: String,
    collapseIcon: String,
    lines: {
      type: [Boolean, String],
      default: 'one'
    },
    slim: Boolean,
    nav: Boolean,
    'onClick:open': EventProp(),
    'onClick:select': EventProp(),
    'onUpdate:opened': EventProp(),
    ...makeNestedProps({
      selectStrategy: 'single-leaf',
      openStrategy: 'list'
    }),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    itemType: {
      type: String,
      default: 'type'
    },
    ...makeItemsProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'text'
    })
  }, 'VList');
  const _List = defineComponent({
    name: 'VList',
    props: makeVListProps(),
    emits: {
      'update:selected': value => true,
      'update:activated': value => true,
      'update:opened': value => true,
      'click:open': value => true,
      'click:activate': value => true,
      'click:select': value => true
    },
    slots: makeSlots({
      default: null,
      item: null,
      divider: null,
      subheader: null,
      header: null,
      prepend: null,
      append: null,
      title: null,
      subtitle: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        shallowRef,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        items
      } = useListItems(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'bgColor'));
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        children,
        open,
        parents,
        select
      } = useNested(vm, props);
      const lineClasses = computed(() => props.lines ? `v-list--${props.lines}-line` : undefined);
      const activeColor = toRef(props, 'activeColor');
      const baseColor = toRef(props, 'baseColor');
      const color = toRef(props, 'color');
      createList(vm);
      provideDefaults(vm, {
        VListGroup: {
          activeColor,
          baseColor,
          color,
          expandIcon: toRef(props, 'expandIcon'),
          collapseIcon: toRef(props, 'collapseIcon')
        },
        VListItem: {
          activeClass: toRef(props, 'activeClass'),
          activeColor,
          baseColor,
          color,
          density: toRef(props, 'density'),
          disabled: toRef(props, 'disabled'),
          lines: toRef(props, 'lines'),
          nav: toRef(props, 'nav'),
          slim: toRef(props, 'slim'),
          variant: toRef(props, 'variant')
        }
      });
      const isFocused = shallowRef(false);
      const contentRef = ref();
      function onFocusin(e) {
        isFocused.value = true;
      }
      function onFocusout(e) {
        isFocused.value = false;
      }
      function onFocus(e) {
        if (!isFocused.value && !(e.relatedTarget && contentRef.value?.contains(e.relatedTarget))) focus();
      }
      function onKeydown(e) {
        const target = e.target;
        if (!contentRef.value || ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
        if (e.key === 'ArrowDown') {
          focus('next');
        } else if (e.key === 'ArrowUp') {
          focus('prev');
        } else if (e.key === 'Home') {
          focus('first');
        } else if (e.key === 'End') {
          focus('last');
        } else {
          return;
        }
        e.preventDefault();
      }
      function onMousedown(e) {
        isFocused.value = true;
      }
      function focus(location) {
        if (contentRef.value) {
          return focusChild(contentRef.value, location);
        }
      }
      const rootClasses = computed(() => normalizeClass(['v-list', {
        'v-list--disabled': props.disabled,
        'v-list--nav': props.nav,
        'v-list--slim': props.slim
      }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, styles.value]));
      return {
        expose: {
          open,
          select,
          focus,
          children,
          parents
        },
        renderInput: {
          items,
          isFocused,
          contentRef,
          rootClasses,
          rootStyles,
          onFocusin,
          onFocusout,
          onFocus,
          onKeydown,
          onMousedown
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AList = defineAlpineComponent({
    ..._List,
    name: 'AList'
  });

  // Utilities

  // Types

  const makeVListChildrenProps = propsFactory({
    items: Array,
    returnObject: Boolean
  }, 'VListChildren');
  const _ListChildren = defineComponent({
    name: 'VListChildren',
    props: makeVListChildrenProps(),
    slots: makeSlots({
      default: null,
      item: null,
      divider: null,
      subheader: null,
      header: null,
      prepend: null,
      append: null,
      title: null,
      subtitle: null
    }),
    setupHeadless(props, vm) {
      createList(vm);
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListChildren = defineAlpineComponent({
    ..._ListChildren,
    name: 'AListChildren'
  });

  // Composables
  const makeVListGroupProps = propsFactory({
    /* @deprecated */
    activeColor: String,
    baseColor: String,
    color: String,
    collapseIcon: {
      type: IconValue,
      default: '$collapse'
    },
    expandIcon: {
      type: IconValue,
      default: '$expand'
    },
    prependIcon: IconValue,
    appendIcon: IconValue,
    fluid: Boolean,
    subgroup: Boolean,
    title: String,
    value: null,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VListGroup');
  const _ListGroup = defineComponent({
    name: 'VListGroup',
    props: makeVListGroupProps(),
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isOpen,
        open,
        id: _id
      } = useNestedItem(vm, toRef(props, 'value'), true);
      const id = computed(() => `v-list-group--id-${String(_id.value)}`);
      const list = useList(vm);
      const {
        isBooted
      } = useSsrBoot(vm);
      function onClick(e) {
        e.stopPropagation();
        open(!isOpen.value, e);
      }
      const activatorProps = computed(() => ({
        onClick,
        class: 'v-list-group__header',
        id: id.value
      }));
      const toggleIcon = computed(() => isOpen.value ? props.collapseIcon : props.expandIcon);
      const activatorDefaults = computed(() => ({
        VListItem: {
          active: isOpen.value,
          activeColor: props.activeColor,
          baseColor: props.baseColor,
          color: props.color,
          prependIcon: props.prependIcon || props.subgroup && toggleIcon.value,
          appendIcon: props.appendIcon || !props.subgroup && toggleIcon.value,
          title: props.title,
          value: props.value
        }
      }));
      const rootClasses = computed(() => normalizeClass(['v-list-group', {
        'v-list-group--prepend': !!list?.hasPrepend.value,
        'v-list-group--fluid': props.fluid,
        'v-list-group--subgroup': props.subgroup,
        'v-list-group--open': isOpen.value
      }, classes.value]));
      return {
        expose: {
          isOpen
        },
        renderInput: {
          id,
          isBooted,
          isOpen,
          activatorDefaults,
          activatorProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListGroup = defineAlpineComponent({
    ..._ListGroup,
    name: 'AListGroup'
  });

  // Composables
  const _ListGroupActivator = defineComponent({
    name: 'VListGroupActivator',
    props: {},
    slots: makeSlots({
      default: null
    }),
    setupHeadless(_, vm) {
      useNestedGroupActivator(vm);
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: (vm, renderInput, _ref) => {
      let {
        slots
      } = _ref;
      return slots.default?.() ?? null;
    }
  });

  // Types

  const AListGroupActivator = defineAlpineComponent({
    ..._ListGroupActivator,
    name: 'AListGroupActivator'
  });

  // Composables

  // Types

  const klass$2 = 'v-list-img';
  const _ListImg = createSimpleFunctionalHeadless(klass$2);

  // Types

  const AListImg = defineAlpineComponent({
    ..._ListImg,
    name: 'AListImg'
  });

  // Styles
  const makeVListItemProps = propsFactory({
    active: {
      type: Boolean,
      default: undefined
    },
    activeClass: String,
    /* @deprecated */
    activeColor: String,
    appendAvatar: String,
    appendIcon: IconValue,
    baseColor: String,
    disabled: Boolean,
    lines: [Boolean, String],
    link: {
      type: Boolean,
      default: undefined
    },
    nav: Boolean,
    prependAvatar: String,
    prependIcon: IconValue,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    slim: Boolean,
    subtitle: [String, Number],
    title: [String, Number],
    value: null,
    onClick: EventProp(),
    onClickOnce: EventProp(),
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'text'
    })
  }, 'VListItem');
  const _ListItem = defineComponent({
    name: 'VListItem',
    props: makeVListItemProps(),
    emits: {
      click: e => true
    },
    slots: makeSlots({
      prepend: null,
      append: null,
      default: null,
      title: null,
      subtitle: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const link = useRouterLink(vm, props, vm.attrs);
      const id = computed(() => props.value === undefined ? link.href.value : props.value);
      const {
        activate,
        isActivated,
        select,
        isSelected,
        isIndeterminate,
        isGroupActivator,
        root,
        parent,
        openOnSelect
      } = useNestedItem(vm, id, false);
      const list = useList(vm);
      const isActive = computed(() => props.active !== false && (props.active || link.isActive?.value || (root.activatable.value ? isActivated.value : isSelected.value)));
      const isLink = computed(() => props.link !== false && link.isLink.value);
      const isClickable = computed(() => !props.disabled && props.link !== false && (props.link || link.isClickable.value || !!list && (root.selectable.value || root.activatable.value || props.value != null)));
      const roundedProps = computed(() => props.rounded || props.nav);
      const color = computed(() => props.color ?? props.activeColor);
      const variantProps = computed(() => ({
        color: isActive.value ? color.value ?? props.baseColor : props.baseColor,
        variant: props.variant
      }));
      watch(() => link.isActive?.value, val => {
        if (val && parent.value != null) {
          root.open(parent.value, true);
        }
        if (val) {
          openOnSelect(val);
        }
      }, {
        immediate: true
      });
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, variantProps);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, roundedProps);
      const lineClasses = computed(() => props.lines ? `v-list-item--${props.lines}-line` : undefined);
      const slotProps = computed(() => ({
        isActive: isActive.value,
        select,
        isSelected: isSelected.value,
        isIndeterminate: isIndeterminate.value
      }));
      function onClick(e) {
        vm.emit('click', e);
        if (!isClickable.value) return;
        link.navigate?.(e);
        if (isGroupActivator) return;
        if (root.activatable.value) {
          activate(!isActivated.value, e);
        } else if (root.selectable.value) {
          select(!isSelected.value, e);
        } else if (props.value != null) {
          select(!isSelected.value, e);
        }
      }
      function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const Tag = computed(() => isLink.value ? 'a' : props.tag);
      const hasTitle = computed(() => vm.hasSlots.title || props.title != null);
      const hasSubtitle = computed(() => vm.hasSlots.subtitle || props.subtitle != null);
      const hasAppendMedia = computed(() => !!(props.appendAvatar || props.appendIcon));
      const hasAppend = computed(() => !!(hasAppendMedia.value || vm.hasSlots.append));
      const hasPrependMedia = computed(() => !!(props.prependAvatar || props.prependIcon));
      const hasPrepend = computed(() => !!(hasPrependMedia.value || vm.hasSlots.prepend));
      const rootClasses = computed(() => normalizeClass(['v-list-item', {
        'v-list-item--active': isActive.value,
        'v-list-item--disabled': props.disabled,
        'v-list-item--link': isClickable.value,
        'v-list-item--nav': props.nav,
        'v-list-item--prepend': !!(!hasPrepend.value && list?.hasPrepend.value),
        'v-list-item--slim': props.slim,
        [`${props.activeClass}`]: !!(props.activeClass && isActive.value)
      }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, lineClasses.value, roundedClasses.value, variantClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([colorStyles.value, dimensionStyles.value, styles.value]));
      const prependDefaults = computed(() => ({
        VAvatar: {
          density: props.density,
          image: props.prependAvatar
        },
        VIcon: {
          density: props.density,
          icon: props.prependIcon
        },
        VListItemAction: {
          start: true
        }
      }));
      const appendDefaults = computed(() => ({
        VAvatar: {
          density: props.density,
          image: props.appendAvatar
        },
        VIcon: {
          density: props.density,
          icon: props.appendIcon
        },
        VListItemAction: {
          end: true
        }
      }));
      return {
        expose: {
          activate,
          isActivated,
          isGroupActivator,
          isSelected,
          list,
          select
        },
        renderInput: {
          link,
          list,
          isActive,
          isClickable,
          isLink,
          hasTitle,
          hasSubtitle,
          hasAppendMedia,
          hasAppend,
          hasPrependMedia,
          hasPrepend,
          prependDefaults,
          appendDefaults,
          rootClasses,
          rootStyles,
          slotProps,
          Tag,
          onClick,
          onKeyDown
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListItem = defineAlpineComponent({
    ..._ListItem,
    name: 'AListItem'
  });

  // Composables

  // Types

  const makeVListItemActionProps = propsFactory({
    start: Boolean,
    end: Boolean,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VListItemAction');
  const _ListItemAction = defineComponent({
    name: 'VListItemAction',
    props: makeVListItemActionProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-list-item-action', {
        'v-list-item-action--start': props.start,
        'v-list-item-action--end': props.end
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListItemAction = defineAlpineComponent({
    ..._ListItemAction,
    name: 'AListItemAction'
  });

  // Composables

  // Types

  const makeVListItemMediaProps = propsFactory({
    start: Boolean,
    end: Boolean,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VListItemMedia');
  const _ListItemMedia = defineComponent({
    name: 'VListItemMedia',
    props: makeVListItemMediaProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-list-item-media', {
        'v-list-item-media--start': props.start,
        'v-list-item-media--end': props.end
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListItemMedia = defineAlpineComponent({
    ..._ListItemMedia,
    name: 'AListItemMedia'
  });

  // Composables

  // Types

  const makeVListItemSubtitleProps = propsFactory({
    opacity: [Number, String],
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VListItemSubtitle');
  const _ListItemSubtitle = defineComponent({
    name: 'VListItemSubtitle',
    props: makeVListItemSubtitleProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-list-item-subtitle', classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-list-item-subtitle-opacity': props.opacity
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListItemSubtitle = defineAlpineComponent({
    ..._ListItemSubtitle,
    name: 'AListItemSubtitle'
  });

  // Composables

  // Types

  const klass$1 = 'v-list-item-title';
  const _ListItemTitle = createSimpleFunctionalHeadless(klass$1);

  // Types

  const AListItemTitle = defineAlpineComponent({
    ..._ListItemTitle,
    name: 'AListItemTitle'
  });

  // Composables

  // Types

  const makeVListSubheaderProps = propsFactory({
    color: String,
    inset: Boolean,
    sticky: Boolean,
    title: String,
    ...makeComponentProps(),
    ...makeTagProps()
  }, 'VListSubheader');
  const _ListSubheader = defineComponent({
    name: 'VListSubheader',
    props: makeVListSubheaderProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'color'));
      const rootClasses = computed(() => normalizeClass(['v-list-subheader', {
        'v-list-subheader--inset': props.inset,
        'v-list-subheader--sticky': props.sticky
      }, textColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([textColorStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AListSubheader = defineAlpineComponent({
    ..._ListSubheader,
    name: 'AListSubheader'
  });

  // Utilities

  // Types

  const makeVLoaderSlotProps = propsFactory({
    absolute: Boolean,
    active: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    color: String
  }, 'VLoaderSlot');
  const _LoaderSlot = defineComponent({
    name: 'VLoaderSlot',
    props: makeVLoaderSlotProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      return {
        expose: {},
        renderInput: {}
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ALoaderSlot = defineAlpineComponent({
    ..._LoaderSlot,
    name: 'ALoaderSlot'
  });

  // Styles

  // Types

  const makeVLocaleProviderProps = propsFactory({
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined
    },
    ...makeComponentProps()
  }, 'VLocaleProvider');
  const _LocaleProvider = defineComponent({
    name: 'VLocaleProvider',
    props: makeVLocaleProviderProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        rtlClasses
      } = provideLocale(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-locale-provider', rtlClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ALocaleProvider = defineAlpineComponent({
    ..._LocaleProvider,
    name: 'ALocaleProvider'
  });

  // Styles

  // Types

  const makeVMainProps = propsFactory({
    scrollable: Boolean,
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeTagProps({
      tag: 'main'
    })
  }, 'VMain');
  const _Main = defineComponent({
    name: 'VMain',
    props: makeVMainProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        mainStyles,
        layoutIsReady
      } = useLayout$1(vm);
      const {
        ssrBootStyles
      } = useSsrBoot(vm);
      const rootClasses = computed(() => normalizeClass(['v-main', {
        'v-main--scrollable': props.scrollable
      }, classes.value]));
      const rootStyles = computed(() => normalizeStyle([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, styles.value]));
      return {
        expose: layoutIsReady,
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AMain = defineAlpineComponent({
    ..._Main,
    name: 'AMain'
  });

  // Styles

  // Types

  const makeVMenuProps = propsFactory({
    // TODO(Vuetify)
    // disableKeys: Boolean,
    id: String,
    ...omit(makeVOverlayProps({
      closeDelay: 250,
      closeOnContentClick: true,
      locationStrategy: 'connected',
      openDelay: 300,
      scrim: false,
      scrollStrategy: 'reposition',
      // NOTE(Alpinui): We set the default component in the Vue file
      transition: {
        component: null
      }
    }), ['absolute'])
  }, 'VMenu');
  const _Menu = defineComponent({
    name: 'VMenu',
    props: makeVMenuProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject,
        nextTick,
        provide,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const {
        scopeId
      } = useScopeId(vm);
      const uid = getUid(vm);
      const id = computed(() => props.id || `v-menu-${uid}`);
      const overlay = ref();
      const parent = inject(VMenuSymbol, null);
      const openChildren = shallowRef(0);
      provide(VMenuSymbol, {
        register() {
          ++openChildren.value;
        },
        unregister() {
          --openChildren.value;
        },
        closeParents(e) {
          setTimeout(() => {
            if (!openChildren.value && !props.persistent && (e == null || e && !isClickInsideElement(e, overlay.value.contentEl))) {
              isActive.value = false;
              parent?.closeParents();
            }
          }, 40);
        }
      });
      async function onFocusIn(e) {
        const before = e.relatedTarget;
        const after = e.target;
        await nextTick();
        if (isActive.value && before !== after && overlay.value?.contentEl &&
        // We're the topmost menu
        overlay.value?.globalTop &&
        // It isn't the document or the menu body
        ![document, overlay.value.contentEl].includes(after) &&
        // It isn't inside the menu body
        !overlay.value.contentEl.contains(after)) {
          const focusable = focusableChildren(overlay.value.contentEl);
          focusable[0]?.focus();
        }
      }
      watch(isActive, val => {
        if (val) {
          parent?.register();
          document.addEventListener('focusin', onFocusIn, {
            once: true
          });
        } else {
          parent?.unregister();
          document.removeEventListener('focusin', onFocusIn);
        }
      });
      function onClickOutside(e) {
        parent?.closeParents(e);
      }
      function onKeydown(e) {
        if (props.disabled) return;
        if (e.key === 'Tab' || e.key === 'Enter' && !props.closeOnContentClick) {
          if (e.key === 'Enter' && (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement && !!e.target.closest('form'))) return;
          if (e.key === 'Enter') e.preventDefault();
          const nextElement = getNextElement(focusableChildren(overlay.value?.contentEl, false), e.shiftKey ? 'prev' : 'next', el => el.tabIndex >= 0);
          if (!nextElement) {
            isActive.value = false;
            overlay.value?.activatorEl?.focus();
          }
        } else if (['Enter', ' '].includes(e.key) && props.closeOnContentClick) {
          isActive.value = false;
          parent?.closeParents();
        }
      }
      function onActivatorKeydown(e) {
        if (props.disabled) return;
        const el = overlay.value?.contentEl;
        if (el && isActive.value) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            focusChild(el, 'next');
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            focusChild(el, 'prev');
          }
        } else if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
          isActive.value = true;
          e.preventDefault();
          setTimeout(() => setTimeout(() => onActivatorKeydown(e)));
        }
      }
      const activatorProps = computed(() => mergeProps({
        'aria-haspopup': 'menu',
        'aria-expanded': String(isActive.value),
        'aria-owns': id.value,
        onKeydown: onActivatorKeydown
      }, props.activatorProps));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-menu', classes.value]));
      const overlayProps = computed(() => _Overlay.filterProps(props));
      return {
        expose: forwardRefs({
          id,
          ΨopenChildren: openChildren
        }, overlay),
        renderInput: {
          isActive,
          id,
          activatorProps,
          overlay,
          overlayProps,
          scopeId,
          rootClasses,
          rootStyles: styles,
          onClickOutside,
          onKeydown
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AMenu = defineAlpineComponent({
    ..._Menu,
    name: 'AMenu'
  });

  // Styles

  // Types

  const makeVMessagesProps = propsFactory({
    active: Boolean,
    color: String,
    messages: {
      type: [Array, String],
      default: () => []
    },
    ...makeComponentProps(),
    ...makeTransitionProps({
      transition: {
        // NOTE(Alpinui): We set the default component in the Vue file
        component: null,
        leaveAbsolute: true,
        group: true
      }
    })
  }, 'VMessages');
  const _Messages = defineComponent({
    name: 'VMessages',
    props: makeVMessagesProps(),
    slots: makeSlots({
      message: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const messages = computed(() => wrapInArray(props.messages));
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, computed(() => props.color));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-messages', textColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([textColorStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          messages,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AMessages = defineAlpineComponent({
    ..._Messages,
    name: 'AMessages'
  });

  // Utilities

  // Types

  function useSticky(vm, _ref) {
    let {
      rootEl,
      isSticky,
      layoutItemStyles
    } = _ref;
    const {
      computed,
      onBeforeUnmount,
      onMounted,
      shallowRef,
      watch
    } = vm.reactivity;
    const isStuck = shallowRef(false);
    const stuckPosition = shallowRef(0);
    const stickyStyles = computed(() => {
      const side = typeof isStuck.value === 'boolean' ? 'top' : isStuck.value;
      return [isSticky.value ? {
        top: 'auto',
        bottom: 'auto',
        height: undefined
      } : undefined, isStuck.value ? {
        [side]: convertToUnit(stuckPosition.value)
      } : {
        top: layoutItemStyles.value.top
      }];
    });
    onMounted(() => {
      watch(isSticky, val => {
        if (val) {
          window.addEventListener('scroll', onScroll, {
            passive: true
          });
        } else {
          window.removeEventListener('scroll', onScroll);
        }
      }, {
        immediate: true
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onScroll);
    });
    let lastScrollTop = 0;
    function onScroll() {
      const direction = lastScrollTop > window.scrollY ? 'up' : 'down';
      const rect = rootEl.value.getBoundingClientRect();
      const layoutTop = parseFloat(layoutItemStyles.value.top ?? 0);
      const top = window.scrollY - Math.max(0, stuckPosition.value - layoutTop);
      const bottom = rect.height + Math.max(stuckPosition.value, layoutTop) - window.scrollY - window.innerHeight;
      const bodyScroll = parseFloat(getComputedStyle(rootEl.value).getPropertyValue('--v-body-scroll-y')) || 0;
      if (rect.height < window.innerHeight - layoutTop) {
        isStuck.value = 'top';
        stuckPosition.value = layoutTop;
      } else if (direction === 'up' && isStuck.value === 'bottom' || direction === 'down' && isStuck.value === 'top') {
        stuckPosition.value = window.scrollY + rect.top - bodyScroll;
        isStuck.value = true;
      } else if (direction === 'down' && bottom <= 0) {
        stuckPosition.value = 0;
        isStuck.value = 'bottom';
      } else if (direction === 'up' && top <= 0) {
        if (!bodyScroll) {
          stuckPosition.value = rect.top + top;
          isStuck.value = 'top';
        } else if (isStuck.value !== 'top') {
          stuckPosition.value = -top + bodyScroll + layoutTop;
          isStuck.value = 'top';
        }
      }
      lastScrollTop = window.scrollY;
    }
    return {
      isStuck,
      stickyStyles
    };
  }

  // Utilities
  const HORIZON = 100; // ms
  const HISTORY = 20; // number of samples to keep

  /** @see https://android.googlesource.com/platform/frameworks/native/+/master/libs/input/VelocityTracker.cpp */
  function kineticEnergyToVelocity(work) {
    const sqrt2 = 1.41421356237;
    return (work < 0 ? -1.0 : 1.0) * Math.sqrt(Math.abs(work)) * sqrt2;
  }

  /**
   * Returns pointer velocity in px/s
   */
  function calculateImpulseVelocity(samples) {
    // The input should be in reversed time order (most recent sample at index i=0)
    if (samples.length < 2) {
      // if 0 or 1 points, velocity is zero
      return 0;
    }
    // if (samples[1].t > samples[0].t) {
    //   // Algorithm will still work, but not perfectly
    //   consoleWarn('Samples provided to calculateImpulseVelocity in the wrong order')
    // }
    if (samples.length === 2) {
      // if 2 points, basic linear calculation
      if (samples[1].t === samples[0].t) {
        // consoleWarn(`Events have identical time stamps t=${samples[0].t}, setting velocity = 0`)
        return 0;
      }
      return (samples[1].d - samples[0].d) / (samples[1].t - samples[0].t);
    }
    // Guaranteed to have at least 3 points here
    // start with the oldest sample and go forward in time
    let work = 0;
    for (let i = samples.length - 1; i > 0; i--) {
      if (samples[i].t === samples[i - 1].t) {
        // consoleWarn(`Events have identical time stamps t=${samples[i].t}, skipping sample`)
        continue;
      }
      const vprev = kineticEnergyToVelocity(work); // v[i-1]
      const vcurr = (samples[i].d - samples[i - 1].d) / (samples[i].t - samples[i - 1].t); // v[i]
      work += (vcurr - vprev) * Math.abs(vcurr);
      if (i === samples.length - 1) {
        work *= 0.5;
      }
    }
    return kineticEnergyToVelocity(work) * 1000;
  }
  function useVelocity() {
    const touches = {};
    function addMovement(e) {
      Array.from(e.changedTouches).forEach(touch => {
        const samples = touches[touch.identifier] ?? (touches[touch.identifier] = new CircularBuffer(HISTORY));
        samples.push([e.timeStamp, touch]);
      });
    }
    function endTouch(e) {
      Array.from(e.changedTouches).forEach(touch => {
        delete touches[touch.identifier];
      });
    }
    function getVelocity(id) {
      const samples = touches[id]?.values().reverse();
      if (!samples) {
        throw new Error(`No samples for touch id ${id}`);
      }
      const newest = samples[0];
      const x = [];
      const y = [];
      for (const val of samples) {
        if (newest[0] - val[0] > HORIZON) break;
        x.push({
          t: val[0],
          d: val[1].clientX
        });
        y.push({
          t: val[0],
          d: val[1].clientY
        });
      }
      return {
        x: calculateImpulseVelocity(x),
        y: calculateImpulseVelocity(y),
        get direction() {
          const {
            x,
            y
          } = this;
          const [absX, absY] = [Math.abs(x), Math.abs(y)];
          return absX > absY && x >= 0 ? 'right' : absX > absY && x <= 0 ? 'left' : absY > absX && y >= 0 ? 'down' : absY > absX && y <= 0 ? 'up' : oops$1();
        }
      };
    }
    return {
      addMovement,
      endTouch,
      getVelocity
    };
  }
  function oops$1() {
    throw new Error();
  }

  // Composables

  // Types

  function useTouch(vm, _ref) {
    let {
      el,
      isActive,
      isTemporary,
      width,
      touchless,
      position
    } = _ref;
    const {
      computed,
      onBeforeUnmount,
      onMounted,
      ref,
      shallowRef,
      watch
    } = vm.reactivity;
    onMounted(() => {
      window.addEventListener('touchstart', onTouchstart, {
        passive: true
      });
      window.addEventListener('touchmove', onTouchmove, {
        passive: false
      });
      window.addEventListener('touchend', onTouchend, {
        passive: true
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener('touchstart', onTouchstart);
      window.removeEventListener('touchmove', onTouchmove);
      window.removeEventListener('touchend', onTouchend);
    });
    const isHorizontal = computed(() => ['left', 'right'].includes(position.value));
    const {
      addMovement,
      endTouch,
      getVelocity
    } = useVelocity();
    let maybeDragging = false;
    const isDragging = shallowRef(false);
    const dragProgress = shallowRef(0);
    const offset = shallowRef(0);
    let start;
    function getOffset(pos, active) {
      return (position.value === 'left' ? pos : position.value === 'right' ? document.documentElement.clientWidth - pos : position.value === 'top' ? pos : position.value === 'bottom' ? document.documentElement.clientHeight - pos : oops()) - (active ? width.value : 0);
    }
    function getProgress(pos) {
      let limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const progress = position.value === 'left' ? (pos - offset.value) / width.value : position.value === 'right' ? (document.documentElement.clientWidth - pos - offset.value) / width.value : position.value === 'top' ? (pos - offset.value) / width.value : position.value === 'bottom' ? (document.documentElement.clientHeight - pos - offset.value) / width.value : oops();
      return limit ? Math.max(0, Math.min(1, progress)) : progress;
    }
    function onTouchstart(e) {
      if (touchless.value) return;
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      const touchZone = 25;
      const inTouchZone = position.value === 'left' ? touchX < touchZone : position.value === 'right' ? touchX > document.documentElement.clientWidth - touchZone : position.value === 'top' ? touchY < touchZone : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - touchZone : oops();
      const inElement = isActive.value && (position.value === 'left' ? touchX < width.value : position.value === 'right' ? touchX > document.documentElement.clientWidth - width.value : position.value === 'top' ? touchY < width.value : position.value === 'bottom' ? touchY > document.documentElement.clientHeight - width.value : oops());
      if (inTouchZone || inElement || isActive.value && isTemporary.value) {
        start = [touchX, touchY];
        offset.value = getOffset(isHorizontal.value ? touchX : touchY, isActive.value);
        dragProgress.value = getProgress(isHorizontal.value ? touchX : touchY);
        maybeDragging = offset.value > -20 && offset.value < 80;
        endTouch(e);
        addMovement(e);
      }
    }
    function onTouchmove(e) {
      const touchX = e.changedTouches[0].clientX;
      const touchY = e.changedTouches[0].clientY;
      if (maybeDragging) {
        if (!e.cancelable) {
          maybeDragging = false;
          return;
        }
        const dx = Math.abs(touchX - start[0]);
        const dy = Math.abs(touchY - start[1]);
        const thresholdMet = isHorizontal.value ? dx > dy && dx > 3 : dy > dx && dy > 3;
        if (thresholdMet) {
          isDragging.value = true;
          maybeDragging = false;
        } else if ((isHorizontal.value ? dy : dx) > 3) {
          maybeDragging = false;
        }
      }
      if (!isDragging.value) return;
      e.preventDefault();
      addMovement(e);
      const progress = getProgress(isHorizontal.value ? touchX : touchY, false);
      dragProgress.value = Math.max(0, Math.min(1, progress));
      if (progress > 1) {
        offset.value = getOffset(isHorizontal.value ? touchX : touchY, true);
      } else if (progress < 0) {
        offset.value = getOffset(isHorizontal.value ? touchX : touchY, false);
      }
    }
    function onTouchend(e) {
      maybeDragging = false;
      if (!isDragging.value) return;
      addMovement(e);
      isDragging.value = false;
      const velocity = getVelocity(e.changedTouches[0].identifier);
      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);
      const thresholdMet = isHorizontal.value ? vx > vy && vx > 400 : vy > vx && vy > 3;
      if (thresholdMet) {
        isActive.value = velocity.direction === ({
          left: 'right',
          right: 'left',
          top: 'down',
          bottom: 'up'
        }[position.value] || oops());
      } else {
        isActive.value = dragProgress.value > 0.5;
      }
    }
    const dragStyles = computed(() => {
      return isDragging.value ? {
        transform: position.value === 'left' ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'right' ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === 'top' ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === 'bottom' ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
        transition: 'none'
      } : undefined;
    });

    // NOTE(Alpinui): Refactored from useToggleScope
    const origTransform = ref(null);
    const origTransition = ref(null);
    watch(isDragging, () => {
      if (!isDragging.value) return;
      origTransform.value = el.value?.style.transform ?? null;
      origTransition.value = el.value?.style.transition ?? null;
    });
    watch([isDragging, dragStyles], () => {
      if (!isDragging.value) return;
      el.value?.style.setProperty('transform', dragStyles.value?.transform || 'none');
      el.value?.style.setProperty('transition', dragStyles.value?.transition || null);
    });

    // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
    onBeforeUnmount(() => {
      if (origTransform.value !== null) {
        el.value?.style.setProperty('transform', origTransform.value);
      }
      if (origTransition.value !== null) {
        el.value?.style.setProperty('transition', origTransition.value);
      }
    });
    // END of useToggleScope

    return {
      isDragging,
      dragProgress,
      dragStyles
    };
  }
  function oops() {
    throw new Error();
  }

  // Styles

  // Types

  const locations = ['start', 'end', 'left', 'right', 'top', 'bottom'];
  const makeVNavigationDrawerProps = propsFactory({
    color: String,
    disableResizeWatcher: Boolean,
    disableRouteWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: {
      type: Boolean,
      default: null
    },
    railWidth: {
      type: [Number, String],
      default: 56
    },
    scrim: {
      type: [Boolean, String],
      default: true
    },
    image: String,
    temporary: Boolean,
    persistent: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    location: {
      type: String,
      default: 'start',
      validator: value => locations.includes(value)
    },
    sticky: Boolean,
    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDelayProps(),
    ...makeDisplayProps({
      mobile: null
    }),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'nav'
    }),
    ...makeThemeProps()
  }, 'VNavigationDrawer');
  const _NavigationDrawer = defineComponent({
    name: 'VNavigationDrawer',
    props: makeVNavigationDrawerProps(),
    emits: {
      'update:modelValue': val => true,
      'update:rail': val => true
    },
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      image: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        shallowRef,
        toRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isRtl
      } = useRtl$1(vm);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        borderClasses
      } = useBorder(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        displayClasses,
        mobile
      } = useDisplay$1(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const router = useRouter(vm);
      const isActive = useProxiedModel(vm, props, 'modelValue', null, v => !!v);
      const {
        ssrBootStyles
      } = useSsrBoot(vm);
      const {
        scopeId
      } = useScopeId(vm);
      const rootEl = ref();
      const isHovering = shallowRef(false);
      const {
        runOpenDelay,
        runCloseDelay
      } = useDelay(props, value => {
        isHovering.value = value;
      });
      const width = computed(() => {
        return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
      });
      const location = computed(() => {
        return toPhysical(props.location, isRtl.value);
      });
      const isPersistent = computed(() => props.persistent);
      const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
      const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== 'bottom');

      // NOTE(Alpinui): Refactored from useToggleScope
      watch([isHovering, () => props.expandOnHover && props.rail != null], _ref => {
        let [val, cond] = _ref;
        if (!cond) return;
        vm.emit('update:rail', !val);
      });

      // NOTE(Alpinui): Refactored from useToggleScope
      watch([isTemporary, () => !props.disableResizeWatcher], _ref2 => {
        let [val, cond] = _ref2;
        if (!cond || props.permanent) return;
        nextTick(() => isActive.value = !val);
      });

      // NOTE(Alpinui): Refactored from useToggleScope
      watch([router.currentRoute, () => !props.disableRouteWatcher && !!router], _ref3 => {
        let [_, cond] = _ref3;
        if (!cond || !isTemporary.value) return;
        isActive.value = false;
      });
      watch(() => props.permanent, val => {
        if (val) isActive.value = true;
      });
      if (props.modelValue == null && !isTemporary.value) {
        isActive.value = props.permanent || !mobile.value;
      }
      const {
        isDragging,
        dragProgress
      } = useTouch(vm, {
        el: rootEl,
        isActive,
        isTemporary,
        width,
        touchless: toRef(props, 'touchless'),
        position: location
      });
      const layoutSize = computed(() => {
        const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
        return isDragging.value ? size * dragProgress.value : size;
      });
      const elementSize = computed(() => ['top', 'bottom'].includes(props.location) ? 0 : width.value);
      const {
        layoutItemStyles,
        layoutItemScrimStyles,
        layoutIsReady
      } = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: location,
        layoutSize,
        elementSize,
        active: computed(() => isActive.value || isDragging.value),
        disableTransitions: computed(() => isDragging.value),
        absolute: computed(() =>
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== 'string')
      });
      const {
        isStuck,
        stickyStyles
      } = useSticky(vm, {
        rootEl,
        isSticky,
        layoutItemStyles
      });
      const scrimColor = useBackgroundColor(vm, computed(() => {
        return typeof props.scrim === 'string' ? props.scrim : null;
      }));
      const scrimStyles = computed(() => normalizeStyle([isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: 'none'
      } : {}, layoutItemScrimStyles.value, scrimColor.backgroundColorStyles.value]));
      provideDefaults(vm, {
        VList: {
          bgColor: 'transparent'
        }
      });
      const onScrimClick = () => {
        if (isPersistent.value) return;
        isActive.value = false;
      };

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-navigation-drawer', `v-navigation-drawer--${location.value}`, {
        'v-navigation-drawer--expand-on-hover': props.expandOnHover,
        'v-navigation-drawer--floating': props.floating,
        'v-navigation-drawer--is-hovering': isHovering.value,
        'v-navigation-drawer--rail': !!props.rail,
        'v-navigation-drawer--temporary': isTemporary.value,
        'v-navigation-drawer--persistent': isPersistent.value,
        'v-navigation-drawer--active': isActive.value,
        'v-navigation-drawer--sticky': isSticky.value
      }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, styles.value, ['top', 'bottom'].includes(location.value) ? {
        height: 'auto'
      } : {}]));
      const imageDefaults = computed(() => ({
        VImg: {
          alt: '',
          cover: true,
          height: 'inherit',
          src: props.image
        }
      }));
      const scrimClasses = computed(() => normalizeClass(['v-navigation-drawer__scrim', scrimColor.backgroundColorClasses.value]));
      const showScrim = computed(() => isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim);
      return {
        expose: layoutIsReady.then(() => ({
          isStuck
        })),
        renderInput: {
          imageDefaults,
          rootClasses,
          rootStyles,
          rootEl,
          scrimClasses,
          scrimStyles,
          showScrim,
          onScrimClick,
          scopeId,
          runOpenDelay,
          runCloseDelay
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ANavigationDrawer = defineAlpineComponent({
    ..._NavigationDrawer,
    name: 'ANavigationDrawer'
  });

  // Composables

  // Types

  const _NoSsr = defineComponent({
    name: 'VNoSsr',
    props: {},
    slots: makeSlots({
      default: null
    }),
    setupHeadless(_, vm) {
      const show = useHydration(vm);
      return {
        expose: {},
        renderInput: {
          show
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ANoSsr = defineAlpineComponent({
    ..._NoSsr,
    name: 'ANoSsr'
  });

  // Styles

  // Types

  // Types

  const makeVOtpInputProps = propsFactory({
    autofocus: Boolean,
    divider: String,
    focusAll: Boolean,
    label: {
      type: String,
      default: '$vuetify.input.otp'
    },
    length: {
      type: [Number, String],
      default: 6
    },
    modelValue: {
      type: [Number, String],
      default: undefined
    },
    placeholder: String,
    type: {
      type: String,
      default: 'number'
    },
    ...makeDimensionProps(),
    ...makeFocusProps(),
    ...only(makeVFieldProps({
      variant: 'outlined'
    }), ['baseColor', 'bgColor', 'class', 'color', 'disabled', 'error', 'loading', 'rounded', 'style', 'theme', 'variant'])
  }, 'VOtpInput');
  const _OtpInput = defineComponent({
    name: 'VOtpInput',
    props: makeVOtpInputProps(),
    emits: {
      finish: val => true,
      'update:focused': val => true,
      'update:modelValue': val => true
    },
    slots: makeSlots({
      default: null,
      loader: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue', '', val => val == null ? [] : String(val).split(''), val => val.join(''));
      const {
        t
      } = useLocale$1(vm);
      const length = computed(() => Number(props.length));
      const fields = computed(() => Array(length.value).fill(0));
      const focusIndex = ref(-1);
      const contentRef = ref();
      const inputRef = ref([]);
      const current = computed(() => inputRef.value[focusIndex.value]);
      function onInput() {
        // The maxlength attribute doesn't work for the number type input, so the text type is used.
        // The following logic simulates the behavior of a number input.
        if (isValidNumber(current.value.value)) {
          current.value.value = '';
          return;
        }
        const array = model.value.slice();
        const value = current.value.value;
        array[focusIndex.value] = value;
        let target = null;
        if (focusIndex.value > model.value.length) {
          target = model.value.length + 1;
        } else if (focusIndex.value + 1 !== length.value) {
          target = 'next';
        }
        model.value = array;
        if (target) focusChild(contentRef.value, target);
      }
      function onKeydown(e) {
        const array = model.value.slice();
        const index = focusIndex.value;
        let target = null;
        if (!['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(e.key)) return;
        e.preventDefault();
        if (e.key === 'ArrowLeft') {
          target = 'prev';
        } else if (e.key === 'ArrowRight') {
          target = 'next';
        } else if (['Backspace', 'Delete'].includes(e.key)) {
          array[focusIndex.value] = '';
          model.value = array;
          if (focusIndex.value > 0 && e.key === 'Backspace') {
            target = 'prev';
          } else {
            requestAnimationFrame(() => {
              inputRef.value[index]?.select();
            });
          }
        }
        requestAnimationFrame(() => {
          if (target != null) {
            focusChild(contentRef.value, target);
          }
        });
      }
      function onPaste(index, e) {
        e.preventDefault();
        e.stopPropagation();
        const clipboardText = e?.clipboardData?.getData('Text') ?? '';
        if (isValidNumber(clipboardText)) return;
        model.value = clipboardText.split('');
        inputRef.value?.[index].blur();
      }
      function reset() {
        model.value = [];
      }
      function onFocus(e, index) {
        focus();
        focusIndex.value = index;
      }
      function onBlur() {
        blur();
        focusIndex.value = -1;
      }
      function isValidNumber(value) {
        return props.type === 'number' && /[^0-9]/g.test(value);
      }
      provideDefaults(vm, {
        VField: {
          color: computed(() => props.color),
          bgColor: computed(() => props.color),
          baseColor: computed(() => props.baseColor),
          disabled: computed(() => props.disabled),
          error: computed(() => props.error),
          variant: computed(() => props.variant)
        }
      }, {
        scoped: true
      });
      watch(model, val => {
        if (val.length === length.value) vm.emit('finish', val.join(''));
      }, {
        deep: true
      });
      watch(focusIndex, val => {
        if (val < 0) return;
        nextTick(() => {
          inputRef.value[val]?.select();
        });
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-otp-input', {
        'v-otp-input--divided': !!props.divider
      }, classes.value]));
      return {
        expose: {
          blur: () => {
            inputRef.value?.some(input => input.blur());
          },
          focus: () => {
            inputRef.value?.[0].focus();
          },
          reset
        },
        renderInput: {
          contentRef,
          dimensionStyles,
          fields,
          isFocused,
          focusIndex,
          // NOTE(Alpinui): Type must be set to avoid following TypeScript error:
          // TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize.
          inputRef: inputRef,
          model,
          rootClasses,
          rootStyles: styles,
          onBlur,
          onFocus,
          onInput,
          onKeydown,
          onPaste,
          t
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AOtpInput = defineAlpineComponent({
    ..._OtpInput,
    name: 'AOtpInput'
  });

  // Types

  const AOverlay = defineAlpineComponent({
    ..._Overlay,
    name: 'AOverlay'
  });

  // Types

  const APagination = defineAlpineComponent({
    ..._Pagination,
    name: 'APagination'
  });

  // Styles

  // Types

  function floor(val) {
    return Math.floor(Math.abs(val)) * Math.sign(val);
  }
  const makeVParallaxProps = propsFactory({
    scale: {
      type: [Number, String],
      default: 0.5
    },
    ...makeComponentProps()
  }, 'VParallax');
  const _Parallax = defineComponent({
    name: 'VParallax',
    props: makeVParallaxProps(),
    slots: makeSlots({
      default: null,
      placeholder: null,
      error: null,
      sources: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        onBeforeUnmount,
        ref,
        watch,
        watchEffect
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver(vm);
      const {
        resizeRef,
        contentRect
      } = useResizeObserver(vm);
      const {
        height: displayHeight
      } = useDisplay$1(vm);
      const root = ref();
      watchEffect(() => {
        intersectionRef.value = resizeRef.value = root.value?.$el;
      });
      let scrollParent;
      watch(isIntersecting, val => {
        if (val) {
          scrollParent = getScrollParent(intersectionRef.value);
          scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
          scrollParent.addEventListener('scroll', onScroll, {
            passive: true
          });
          onScroll();
        } else {
          scrollParent.removeEventListener('scroll', onScroll);
        }
      });
      onBeforeUnmount(() => {
        scrollParent?.removeEventListener('scroll', onScroll);
      });
      watch(displayHeight, onScroll);
      watch(() => contentRect.value?.height, onScroll);
      const scale = computed(() => {
        return 1 - clamp(+props.scale);
      });
      let frame = -1;
      function onScroll() {
        if (!isIntersecting.value) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const el = (root.value?.$el).querySelector('.v-img__img');
          if (!el) return;
          const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight;
          const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop;
          const top = intersectionRef.value.getBoundingClientRect().top + scrollPos;
          const height = contentRect.value.height;
          const center = top + (height - scrollHeight) / 2;
          const translate = floor((scrollPos - center) * scale.value);
          const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height);
          el.style.setProperty('transform', `translateY(${translate}px) scale(${sizeScale})`);
        });
      }
      const rootClasses = computed(() => normalizeClass(['v-parallax', {
        'v-parallax--active': isIntersecting.value
      }, classes.value]));
      return {
        expose: {},
        renderInput: {
          root,
          rootClasses,
          rootStyles: styles,
          onScroll
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AParallax = defineAlpineComponent({
    ..._Parallax,
    name: 'AParallax'
  });

  // Styles

  // Types

  const makeVProgressCircularProps = propsFactory({
    bgColor: String,
    color: String,
    indeterminate: [Boolean, String],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 4
    },
    ...makeComponentProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'div'
    }),
    ...makeThemeProps()
  }, 'VProgressCircular');
  const _ProgressCircular = defineComponent({
    name: 'VProgressCircular',
    props: makeVProgressCircularProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const MAGIC_RADIUS_CONSTANT = 20;
      const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
      const {
        computed,
        ref,
        toRef,
        watchEffect
      } = vm.reactivity;
      const root = ref();
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'color'));
      const {
        textColorClasses: underlayColorClasses,
        textColorStyles: underlayColorStyles
      } = useTextColor(vm, toRef(props, 'bgColor'));
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver(vm);
      const {
        resizeRef,
        contentRect
      } = useResizeObserver(vm);
      const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
      const width = computed(() => Number(props.width));
      const size = computed(() => {
        // Get size from element if size prop value is small, large etc
        return sizeStyles.value ? Number(props.size) : contentRect.value ? contentRect.value.width : Math.max(width.value, 32);
      });
      const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
      const strokeWidth = computed(() => width.value / size.value * diameter.value);
      const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
      watchEffect(() => {
        intersectionRef.value = root.value;
        resizeRef.value = root.value;
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-progress-circular', {
        'v-progress-circular--indeterminate': !!props.indeterminate,
        'v-progress-circular--visible': isIntersecting.value,
        'v-progress-circular--disable-shrink': props.indeterminate === 'disable-shrink'
      }, themeClasses.value, sizeClasses.value, textColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([sizeStyles.value, textColorStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          diameter,
          normalizedValue,
          root,
          rootClasses,
          rootStyles,
          strokeDashOffset,
          strokeWidth,
          underlayColorClasses,
          underlayColorStyles,
          MAGIC_RADIUS_CONSTANT,
          CIRCUMFERENCE
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AProgressCircular = defineAlpineComponent({
    ..._ProgressCircular,
    name: 'AProgressCircular'
  });

  // Styles
  const makeVProgressLinearProps = propsFactory({
    absolute: Boolean,
    active: {
      type: Boolean,
      default: true
    },
    bgColor: String,
    bgOpacity: [Number, String],
    bufferValue: {
      type: [Number, String],
      default: 0
    },
    bufferColor: String,
    bufferOpacity: [Number, String],
    clickable: Boolean,
    color: String,
    height: {
      type: [Number, String],
      default: 4
    },
    indeterminate: Boolean,
    max: {
      type: [Number, String],
      default: 100
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    opacity: [Number, String],
    reverse: Boolean,
    stream: Boolean,
    striped: Boolean,
    roundedBar: Boolean,
    ...makeComponentProps(),
    ...makeLocationProps({
      location: 'top'
    }),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VProgressLinear');
  const _ProgressLinear = defineComponent({
    name: 'VProgressLinear',
    props: makeVProgressLinearProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const progress = useProxiedModel(vm, props, 'modelValue');
      const {
        isRtl,
        rtlClasses
      } = useRtl$1(vm);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        locationStyles
      } = useLocation(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, props, 'color');
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, computed(() => props.bgColor || props.color));
      const {
        backgroundColorClasses: bufferColorClasses,
        backgroundColorStyles: bufferColorStyles
      } = useBackgroundColor(vm, computed(() => props.bufferColor || props.bgColor || props.color));
      const {
        backgroundColorClasses: barColorClasses,
        backgroundColorStyles: barColorStyles
      } = useBackgroundColor(vm, props, 'color');
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        intersectionRef,
        isIntersecting
      } = useIntersectionObserver(vm);
      const max = computed(() => parseFloat(props.max));
      const height = computed(() => parseFloat(props.height));
      const normalizedBuffer = computed(() => clamp(parseFloat(props.bufferValue) / max.value * 100, 0, 100));
      const normalizedValue = computed(() => clamp(parseFloat(progress.value) / max.value * 100, 0, 100));
      const isReversed = computed(() => isRtl.value !== props.reverse);
      const transition = computed(() => props.indeterminate ? 'fade-transition' : 'slide-x-transition');
      const isForcedColorsModeActive = IN_BROWSER && window.matchMedia?.('(forced-colors: active)').matches;
      function handleClick(e) {
        if (!intersectionRef.value) return;
        const {
          left,
          right,
          width
        } = intersectionRef.value.getBoundingClientRect();
        const value = isReversed.value ? width - e.clientX + (right - width) : e.clientX - left;
        progress.value = Math.round(value / width * max.value);
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-progress-linear', {
        'v-progress-linear--absolute': props.absolute,
        'v-progress-linear--active': !!(props.active && isIntersecting.value),
        'v-progress-linear--reverse': isReversed.value,
        'v-progress-linear--rounded': !!props.rounded,
        'v-progress-linear--rounded-bar': props.roundedBar,
        'v-progress-linear--striped': props.striped
      }, roundedClasses.value, themeClasses.value, rtlClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        bottom: props.location === 'bottom' ? 0 : undefined,
        top: props.location === 'top' ? 0 : undefined,
        height: props.active ? convertToUnit(height.value) : 0,
        '--v-progress-linear-height': convertToUnit(height.value),
        ...(props.absolute ? locationStyles.value : {})
      }, styles.value]));
      const streamClasses = computed(() => normalizeClass(['v-progress-linear__stream', textColorClasses.value]));
      const streamStyles = computed(() => normalizeStyle({
        ...textColorStyles.value,
        [isReversed.value ? 'left' : 'right']: convertToUnit(-height.value),
        borderTop: `${convertToUnit(height.value / 2)} dotted`,
        opacity: parseFloat(props.bufferOpacity),
        top: `calc(50% - ${convertToUnit(height.value / 4)})`,
        width: convertToUnit(100 - normalizedBuffer.value, '%'),
        '--v-progress-linear-stream-to': convertToUnit(height.value * (isReversed.value ? 1 : -1))
      }));
      const bgClasses = computed(() => normalizeClass(['v-progress-linear__background', !isForcedColorsModeActive ? backgroundColorClasses.value : undefined]));
      const bgStyles = computed(() => normalizeStyle([backgroundColorStyles.value, {
        opacity: parseFloat(props.bgOpacity),
        width: props.stream ? 0 : undefined
      }]));
      const bufferClasses = computed(() => normalizeClass(['v-progress-linear__buffer', !isForcedColorsModeActive ? bufferColorClasses.value : undefined]));
      const bufferStyles = computed(() => normalizeStyle([bufferColorStyles.value, {
        opacity: parseFloat(props.bufferOpacity),
        width: convertToUnit(normalizedBuffer.value, '%')
      }]));
      const determinateClasses = computed(() => normalizeClass(['v-progress-linear__determinate', !isForcedColorsModeActive ? barColorClasses.value : undefined]));
      const determinateStyles = computed(() => normalizeStyle([barColorStyles.value, {
        width: convertToUnit(normalizedValue.value, '%')
      }]));
      const indeterminateClasses = computed(() => normalizeClass(['v-progress-linear__indeterminate', !isForcedColorsModeActive ? barColorClasses.value : undefined]));
      return {
        expose: {},
        renderInput: {
          barColorStyles,
          intersectionRef,
          normalizedBuffer,
          normalizedValue,
          handleClick,
          transition,
          rootClasses,
          rootStyles,
          streamClasses,
          streamStyles,
          bgClasses,
          bgStyles,
          bufferClasses,
          bufferStyles,
          determinateClasses,
          determinateStyles,
          indeterminateClasses
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AProgressLinear = defineAlpineComponent({
    ..._ProgressLinear,
    name: 'AProgressLinear'
  });

  // Components

  // Types

  const makeVRadioProps = propsFactory({
    ...makeVSelectionControlProps({
      falseIcon: '$radioOff',
      trueIcon: '$radioOn'
    })
  }, 'VRadio');
  const _Radio = defineComponent({
    name: 'VRadio',
    props: makeVRadioProps(),
    slots: makeSlots({
      default: null,
      label: null,
      input: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const controlProps = computed(() => _SelectionControl.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-radio', classes.value]));
      return {
        expose: {},
        renderInput: {
          controlProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ARadio = defineAlpineComponent({
    ..._Radio,
    name: 'ARadio'
  });

  // Styles
  const makeVRadioGroupProps = propsFactory({
    height: {
      type: [Number, String],
      default: 'auto'
    },
    ...makeVInputProps(),
    ...omit(makeSelectionControlGroupProps(), ['multiple']),
    trueIcon: {
      type: IconValue,
      default: '$radioOn'
    },
    falseIcon: {
      type: IconValue,
      default: '$radioOff'
    },
    type: {
      type: String,
      default: 'radio'
    }
  }, 'VRadioGroup');
  const _RadioGroup = defineComponent({
    name: 'VRadioGroup',
    inheritAttrs: false,
    props: makeVRadioGroupProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      label: null,
      prepend: null,
      append: null,
      details: null,
      message: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const uid = getUid(vm);
      const id = computed(() => props.id || `radio-group-${uid}`);
      const model = useProxiedModel(vm, props, 'modelValue');

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => _Input.filterProps(props));
      const controlProps = computed(() => _SelectionControl.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-radio-group', classes.value]));
      return {
        expose: {},
        renderInput: {
          id,
          model,
          inputProps,
          controlProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ARadioGroup = defineAlpineComponent({
    ..._RadioGroup,
    name: 'ARadioGroup'
  });

  /* eslint-disable max-statements */
  // Composables

  // Types

  const VSliderSymbol = Symbol.for('vuetify:v-slider');
  function getOffset(e, el, direction) {
    const vertical = direction === 'vertical';
    const rect = el.getBoundingClientRect();
    const touch = 'touches' in e ? e.touches[0] : e;
    return vertical ? touch.clientY - (rect.top + rect.height / 2) : touch.clientX - (rect.left + rect.width / 2);
  }
  function getPosition(e, position) {
    if ('touches' in e && e.touches.length) return e.touches[0][position];else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0][position];else return e[position];
  }
  const makeSliderProps = propsFactory({
    disabled: {
      type: Boolean,
      default: null
    },
    error: Boolean,
    readonly: {
      type: Boolean,
      default: null
    },
    max: {
      type: [Number, String],
      default: 100
    },
    min: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 0
    },
    thumbColor: String,
    thumbLabel: {
      type: [Boolean, String],
      default: undefined,
      validator: v => typeof v === 'boolean' || v === 'always'
    },
    thumbSize: {
      type: [Number, String],
      default: 20
    },
    showTicks: {
      type: [Boolean, String],
      default: false,
      validator: v => typeof v === 'boolean' || v === 'always'
    },
    ticks: {
      type: [Array, Object]
    },
    tickSize: {
      type: [Number, String],
      default: 2
    },
    color: String,
    trackColor: String,
    trackFillColor: String,
    trackSize: {
      type: [Number, String],
      default: 4
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    reverse: Boolean,
    ...makeRoundedProps(),
    ...makeElevationProps({
      elevation: 2
    }),
    ripple: {
      type: Boolean,
      default: true
    }
  }, 'Slider');
  const useSteps = (vm, props) => {
    const {
      computed
    } = vm.reactivity;
    const min = computed(() => parseFloat(props.min));
    const max = computed(() => parseFloat(props.max));
    const step = computed(() => +props.step > 0 ? parseFloat(props.step) : 0);
    const decimals = computed(() => Math.max(getDecimals(step.value), getDecimals(min.value)));
    function roundValue(value) {
      value = parseFloat(value);
      if (step.value <= 0) return value;
      const clamped = clamp(value, min.value, max.value);
      const offset = min.value % step.value;
      const newValue = Math.round((clamped - offset) / step.value) * step.value + offset;
      return parseFloat(Math.min(newValue, max.value).toFixed(decimals.value));
    }
    return {
      min,
      max,
      step,
      decimals,
      roundValue
    };
  };
  const useSlider = (vm, _ref) => {
    let {
      props,
      steps,
      onSliderStart,
      onSliderMove,
      onSliderEnd,
      getActiveThumb
    } = _ref;
    const {
      computed,
      provide,
      ref,
      shallowRef,
      toRef
    } = vm.reactivity;
    const {
      isRtl
    } = useRtl$1(vm);
    const isReversed = toRef(props, 'reverse');
    const vertical = computed(() => props.direction === 'vertical');
    const indexFromEnd = computed(() => vertical.value !== isReversed.value);
    const {
      min,
      max,
      step,
      decimals,
      roundValue
    } = steps;
    const thumbSize = computed(() => parseInt(props.thumbSize, 10));
    const tickSize = computed(() => parseInt(props.tickSize, 10));
    const trackSize = computed(() => parseInt(props.trackSize, 10));
    const numTicks = computed(() => (max.value - min.value) / step.value);
    const disabled = toRef(props, 'disabled');
    const thumbColor = computed(() => props.error || props.disabled ? undefined : props.thumbColor ?? props.color);
    const trackColor = computed(() => props.error || props.disabled ? undefined : props.trackColor ?? props.color);
    const trackFillColor = computed(() => props.error || props.disabled ? undefined : props.trackFillColor ?? props.color);
    const mousePressed = shallowRef(false);
    const startOffset = shallowRef(0);
    const trackContainerRef = ref();
    const activeThumbRef = ref();
    function parseMouseMove(e) {
      const vertical = props.direction === 'vertical';
      const start = vertical ? 'top' : 'left';
      const length = vertical ? 'height' : 'width';
      const position = vertical ? 'clientY' : 'clientX';
      const {
        [start]: trackStart,
        [length]: trackLength
      } = trackContainerRef.value?.$el.getBoundingClientRect();
      const clickOffset = getPosition(e, position);

      // It is possible for left to be NaN, force to number
      let clickPos = Math.min(Math.max((clickOffset - trackStart - startOffset.value) / trackLength, 0), 1) || 0;
      if (vertical ? indexFromEnd.value : indexFromEnd.value !== isRtl.value) clickPos = 1 - clickPos;
      return roundValue(min.value + clickPos * (max.value - min.value));
    }
    const handleStop = e => {
      onSliderEnd({
        value: parseMouseMove(e)
      });
      mousePressed.value = false;
      startOffset.value = 0;
    };
    const handleStart = e => {
      activeThumbRef.value = getActiveThumb(e);
      if (!activeThumbRef.value) return;
      activeThumbRef.value.focus();
      mousePressed.value = true;
      if (activeThumbRef.value.contains(e.target)) {
        startOffset.value = getOffset(e, activeThumbRef.value, props.direction);
      } else {
        startOffset.value = 0;
        onSliderMove({
          value: parseMouseMove(e)
        });
      }
      onSliderStart({
        value: parseMouseMove(e)
      });
    };
    const moveListenerOptions = {
      passive: true,
      capture: true
    };
    function onMouseMove(e) {
      onSliderMove({
        value: parseMouseMove(e)
      });
    }
    function onSliderMouseUp(e) {
      e.stopPropagation();
      e.preventDefault();
      handleStop(e);
      window.removeEventListener('mousemove', onMouseMove, moveListenerOptions);
      window.removeEventListener('mouseup', onSliderMouseUp);
    }
    function onSliderTouchend(e) {
      handleStop(e);
      window.removeEventListener('touchmove', onMouseMove, moveListenerOptions);
      e.target?.removeEventListener('touchend', onSliderTouchend);
    }
    function onSliderTouchstart(e) {
      handleStart(e);
      window.addEventListener('touchmove', onMouseMove, moveListenerOptions);
      e.target?.addEventListener('touchend', onSliderTouchend, {
        passive: false
      });
    }
    function onSliderMousedown(e) {
      e.preventDefault();
      handleStart(e);
      window.addEventListener('mousemove', onMouseMove, moveListenerOptions);
      window.addEventListener('mouseup', onSliderMouseUp, {
        passive: false
      });
    }
    const position = val => {
      const percentage = (val - min.value) / (max.value - min.value) * 100;
      return clamp(isNaN(percentage) ? 0 : percentage, 0, 100);
    };
    const showTicks = toRef(props, 'showTicks');
    const parsedTicks = computed(() => {
      if (!showTicks.value) return [];
      if (!props.ticks) {
        return numTicks.value !== Infinity ? createRange(numTicks.value + 1).map(t => {
          const value = min.value + t * step.value;
          return {
            value,
            position: position(value)
          };
        }) : [];
      }
      if (Array.isArray(props.ticks)) return props.ticks.map(t => ({
        value: t,
        position: position(t),
        label: t.toString()
      }));
      return Object.keys(props.ticks).map(key => ({
        value: parseFloat(key),
        position: position(parseFloat(key)),
        label: props.ticks[key]
      }));
    });
    const hasLabels = computed(() => parsedTicks.value.some(_ref2 => {
      let {
        label
      } = _ref2;
      return !!label;
    }));
    const data = {
      activeThumbRef,
      color: toRef(props, 'color'),
      decimals,
      disabled,
      direction: toRef(props, 'direction'),
      elevation: toRef(props, 'elevation'),
      hasLabels,
      isReversed,
      indexFromEnd,
      min,
      max,
      mousePressed,
      numTicks,
      onSliderMousedown,
      onSliderTouchstart,
      parsedTicks,
      parseMouseMove,
      position,
      readonly: toRef(props, 'readonly'),
      rounded: toRef(props, 'rounded'),
      roundValue,
      showTicks,
      startOffset,
      step,
      thumbSize,
      thumbColor,
      thumbLabel: toRef(props, 'thumbLabel'),
      ticks: toRef(props, 'ticks'),
      tickSize,
      trackColor,
      trackContainerRef,
      trackFillColor,
      trackSize,
      vertical
    };
    provide(VSliderSymbol, data);
    return data;
  };

  // Styles

  // Types

  const makeVRangeSliderProps = propsFactory({
    ...makeFocusProps(),
    ...makeVInputProps(),
    ...makeSliderProps(),
    ...makeComponentProps(),
    strict: Boolean,
    modelValue: {
      type: Array,
      default: () => [0, 0]
    }
  }, 'VRangeSlider');
  const _RangeSlider = defineComponent({
    name: 'VRangeSlider',
    props: makeVRangeSliderProps(),
    emits: {
      'update:focused': value => true,
      'update:modelValue': value => true,
      end: value => true,
      start: value => true
    },
    slots: makeSlots({
      default: null,
      label: null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      'thumb-label': null,
      'tick-label': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const startThumbRef = ref();
      const stopThumbRef = ref();
      const inputRef = ref();
      const {
        rtlClasses
      } = useRtl$1(vm);
      function getActiveThumb(e) {
        if (!startThumbRef.value || !stopThumbRef.value) return;
        const startOffset = getOffset(e, startThumbRef.value.$el, props.direction);
        const stopOffset = getOffset(e, stopThumbRef.value.$el, props.direction);
        const a = Math.abs(startOffset);
        const b = Math.abs(stopOffset);
        return a < b || a === b && startOffset < 0 ? startThumbRef.value.$el : stopThumbRef.value.$el;
      }
      const steps = useSteps(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue', undefined, arr => {
        if (!arr?.length) return [0, 0];
        return arr.map(value => steps.roundValue(value));
      });
      const {
        activeThumbRef,
        hasLabels,
        max,
        min,
        mousePressed,
        onSliderMousedown,
        onSliderTouchstart,
        position,
        trackContainerRef,
        readonly
      } = useSlider(vm, {
        props,
        steps,
        onSliderStart: () => {
          vm.emit('start', model.value);
        },
        onSliderEnd: _ref => {
          let {
            value
          } = _ref;
          const newValue = activeThumbRef.value === startThumbRef.value?.$el ? [value, model.value[1]] : [model.value[0], value];
          if (!props.strict && newValue[0] < newValue[1]) {
            model.value = newValue;
          }
          vm.emit('end', model.value);
        },
        onSliderMove: _ref2 => {
          let {
            value
          } = _ref2;
          const [start, stop] = model.value;
          if (!props.strict && start === stop && start !== min.value) {
            activeThumbRef.value = value > start ? stopThumbRef.value?.$el : startThumbRef.value?.$el;
            activeThumbRef.value?.focus();
          }
          if (activeThumbRef.value === startThumbRef.value?.$el) {
            model.value = [Math.min(value, stop), stop];
          } else {
            model.value = [start, Math.max(start, value)];
          }
        },
        getActiveThumb
      });
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const trackStart = computed(() => position(model.value[0]));
      const trackStop = computed(() => position(model.value[1]));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => _Input.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-slider', 'v-range-slider', {
        'v-slider--has-labels': vm.hasSlots['tick-label'] || hasLabels.value,
        'v-slider--focused': isFocused.value,
        'v-slider--pressed': mousePressed.value,
        'v-slider--disabled': !!props.disabled
      }, rtlClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          isFocused,
          model,
          min,
          max,
          readonly,
          inputRef,
          inputProps,
          rootClasses,
          rootStyles: styles,
          trackContainerRef,
          trackStart,
          trackStop,
          startThumbRef,
          stopThumbRef,
          activeThumbRef,
          onSliderMousedown,
          onSliderTouchstart,
          blur,
          focus
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ARangeSlider = defineAlpineComponent({
    ..._RangeSlider,
    name: 'ARangeSlider'
  });

  // Styles
  const makeVRatingProps = propsFactory({
    name: String,
    itemAriaLabel: {
      type: String,
      default: '$vuetify.rating.ariaLabel.item'
    },
    activeColor: String,
    color: String,
    clearable: Boolean,
    disabled: Boolean,
    emptyIcon: {
      type: IconValue,
      default: '$ratingEmpty'
    },
    fullIcon: {
      type: IconValue,
      default: '$ratingFull'
    },
    halfIncrements: Boolean,
    hover: Boolean,
    length: {
      type: [Number, String],
      default: 5
    },
    readonly: Boolean,
    modelValue: {
      type: [Number, String],
      default: 0
    },
    itemLabels: Array,
    itemLabelPosition: {
      type: String,
      default: 'top',
      validator: v => ['top', 'bottom'].includes(v)
    },
    ripple: Boolean,
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VRating');
  const _Rating = defineComponent({
    name: 'VRating',
    props: makeVRatingProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      item: null,
      'item-label': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        shallowRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const rating = useProxiedModel(vm, props, 'modelValue');
      const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, +props.length));
      const range = computed(() => createRange(Number(props.length), 1));
      const increments = computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
      const hoverIndex = shallowRef(-1);
      const itemState = computed(() => increments.value.map(value => {
        const isHovering = props.hover && hoverIndex.value > -1;
        const isFilled = normalizedValue.value >= value;
        const isHovered = hoverIndex.value >= value;
        const isFullIcon = isHovering ? isHovered : isFilled;
        const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
        const activeColor = props.activeColor ?? props.color;
        const color = isFilled || isHovered ? activeColor : props.color;
        return {
          isFilled,
          isHovered,
          icon,
          color
        };
      }));
      const eventState = computed(() => [0, ...increments.value].map(value => {
        function onMouseenter() {
          hoverIndex.value = value;
        }
        function onMouseleave() {
          hoverIndex.value = -1;
        }
        function onClick() {
          if (props.disabled || props.readonly) return;
          rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
        }
        return {
          onMouseenter: props.hover ? onMouseenter : undefined,
          onMouseleave: props.hover ? onMouseleave : undefined,
          onClick
        };
      }));
      const name = computed(() => props.name ?? `v-rating-${getUid(vm)}`);
      const rootClasses = computed(() => normalizeClass(['v-rating', {
        'v-rating--hover': props.hover,
        'v-rating--readonly': props.readonly
      }, themeClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          eventState,
          itemState,
          name,
          normalizedValue,
          range,
          rootClasses,
          rootStyles: styles,
          t
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ARating = defineAlpineComponent({
    ..._Rating,
    name: 'ARating'
  });

  // Types

  const AResponsive = defineAlpineComponent({
    ..._Responsive,
    name: 'AResponsive'
  });

  // Types

  const ASelect = defineAlpineComponent({
    ..._Select,
    name: 'ASelect'
  });

  // Types

  const ASelectionControl = defineAlpineComponent({
    ..._SelectionControl,
    name: 'ASelectionControl'
  });

  // Types

  const ASelectionControlGroup = defineAlpineComponent({
    ..._SelectionControlGroup,
    name: 'ASelectionControlGroup'
  });

  // Types

  const ASheet = defineAlpineComponent({
    ..._Sheet,
    name: 'ASheet'
  });

  // Styles
  const makeVSkeletonLoaderProps = propsFactory({
    boilerplate: Boolean,
    color: String,
    loading: Boolean,
    loadingText: {
      type: String,
      default: '$vuetify.loading'
    },
    type: {
      type: [String, Array],
      default: 'ossein'
    },
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeThemeProps()
  }, 'VSkeletonLoader');
  const _SkeletonLoader = defineComponent({
    name: 'VSkeletonLoader',
    props: makeVSkeletonLoaderProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        t
      } = useLocale$1(vm);
      const items = computed(() => wrapInArray(props.type).join(','));
      const rootClasses = computed(() => normalizeClass(['v-skeleton-loader', {
        'v-skeleton-loader--boilerplate': props.boilerplate
      }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value]));
      const loadingText = computed(() => t(props.loadingText));
      return {
        expose: {},
        renderInput: {
          items,
          backgroundColorStyles,
          dimensionStyles,
          rootClasses,
          loadingText
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASkeletonLoader = defineAlpineComponent({
    ..._SkeletonLoader,
    name: 'ASkeletonLoader'
  });

  // Types

  const ASlideGroup = defineAlpineComponent({
    ..._SlideGroup,
    name: 'ASlideGroup'
  });

  // Composables

  // Types

  const makeVSlideGroupItemProps = makeGroupItemProps;
  const _SlideGroupItem = defineComponent({
    name: 'VSlideGroupItem',
    props: makeVSlideGroupItemProps(),
    emits: {
      'group:selected': val => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const slideGroupItem = useGroupItem(vm, props, VSlideGroupSymbol);
      return {
        expose: {},
        renderInput: {
          slideGroupItem
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASlideGroupItem = defineAlpineComponent({
    ..._SlideGroupItem,
    name: 'ASlideGroupItem'
  });

  // Styles

  // Types

  const makeVSliderProps = propsFactory({
    ...makeFocusProps(),
    ...makeSliderProps(),
    ...makeVInputProps(),
    modelValue: {
      type: [Number, String],
      default: 0
    }
  }, 'VSlider');
  const _Slider = defineComponent({
    name: 'VSlider',
    props: makeVSliderProps(),
    emits: {
      'update:focused': value => true,
      'update:modelValue': v => true,
      start: value => true,
      end: value => true
    },
    slots: makeSlots({
      label: null,
      default: null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      'thumb-label': null,
      'tick-label': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref
      } = vm.reactivity;
      const thumbContainerRef = ref();
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);
      const steps = useSteps(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue', undefined, value => {
        return steps.roundValue(value == null ? steps.min.value : value);
      });
      const {
        min,
        max,
        mousePressed,
        roundValue,
        onSliderMousedown,
        onSliderTouchstart,
        trackContainerRef,
        position,
        hasLabels,
        readonly
      } = useSlider(vm, {
        props,
        steps,
        onSliderStart: () => {
          vm.emit('start', model.value);
        },
        onSliderEnd: _ref => {
          let {
            value
          } = _ref;
          const roundedValue = roundValue(value);
          model.value = roundedValue;
          vm.emit('end', roundedValue);
        },
        onSliderMove: _ref2 => {
          let {
            value
          } = _ref2;
          return model.value = roundValue(value);
        },
        getActiveThumb: () => thumbContainerRef.value?.$el
      });
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const trackStop = computed(() => position(model.value));

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => _Input.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-slider', {
        'v-slider--has-labels': vm.hasSlots['tick-label'] || hasLabels.value,
        'v-slider--focused': isFocused.value,
        'v-slider--pressed': mousePressed.value,
        'v-slider--disabled': !!props.disabled
      }, rtlClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles,
          inputProps,
          isFocused,
          min,
          max,
          model,
          readonly,
          trackContainerRef,
          thumbContainerRef,
          trackStop,
          onSliderMousedown,
          onSliderTouchstart,
          focus,
          blur
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASlider = defineAlpineComponent({
    ..._Slider,
    name: 'ASlider'
  });

  // Styles

  // Types

  const makeVSliderThumbProps = propsFactory({
    focused: Boolean,
    max: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    name: String,
    ...makeComponentProps()
  }, 'VSliderThumb');
  const _SliderThumb = defineComponent({
    name: 'VSliderThumb',
    props: makeVSliderThumbProps(),
    emits: {
      'update:modelValue': v => true
    },
    slots: makeSlots({
      'thumb-label': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject
      } = vm.reactivity;
      const slider = inject(VSliderSymbol);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        isRtl,
        rtlClasses
      } = useRtl$1(vm);
      if (!slider) throw new Error('[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider');
      const {
        thumbColor,
        step,
        disabled,
        thumbSize,
        thumbLabel,
        direction,
        isReversed,
        vertical,
        readonly,
        elevation,
        mousePressed,
        decimals,
        indexFromEnd
      } = slider;
      const defaultThumbLabel = computed(() => props.modelValue.toFixed(step.value ? decimals.value : 1));
      const elevationProps = computed(() => !disabled.value ? elevation.value : undefined);
      const {
        elevationClasses
      } = useElevation(vm, elevationProps);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, thumbColor);
      const {
        pageup,
        pagedown,
        end,
        home,
        left,
        right,
        down,
        up
      } = keyValues;
      const relevantKeys = [pageup, pagedown, end, home, left, right, down, up];
      const multipliers = computed(() => {
        if (step.value) return [1, 2, 3];else return [1, 5, 10];
      });
      function parseKeydown(e, value) {
        if (!relevantKeys.includes(e.key)) return;
        e.preventDefault();
        const _step = step.value || 0.1;
        const steps = (props.max - props.min) / _step;
        if ([left, right, down, up].includes(e.key)) {
          const increase = vertical.value ? [isRtl.value ? left : right, isReversed.value ? down : up] : indexFromEnd.value !== isRtl.value ? [left, up] : [right, up];
          const direction = increase.includes(e.key) ? 1 : -1;
          const multiplier = e.shiftKey ? 2 : e.ctrlKey ? 1 : 0;
          value = value + direction * _step * multipliers.value[multiplier];
        } else if (e.key === home) {
          value = props.min;
        } else if (e.key === end) {
          value = props.max;
        } else {
          const direction = e.key === pagedown ? 1 : -1;
          value = value - direction * _step * (steps > 100 ? steps / 10 : 10);
        }
        return Math.max(props.min, Math.min(props.max, value));
      }
      function onKeydown(e) {
        const newValue = parseKeydown(e, props.modelValue);
        newValue != null && vm.emit('update:modelValue', newValue);
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const positionPercentage = computed(() => convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, '%'));
      const rootClasses = computed(() => normalizeClass(['v-slider-thumb', {
        'v-slider-thumb--focused': props.focused,
        'v-slider-thumb--pressed': props.focused && mousePressed.value
      }, classes.value, rtlClasses.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-slider-thumb-position': positionPercentage.value,
        '--v-slider-thumb-size': convertToUnit(thumbSize.value)
      }, styles.value]));
      const thumbSurfaceClasses = computed(() => normalizeClass(['v-slider-thumb__surface', textColorClasses.value, elevationClasses.value]));
      const thumbRippleClasses = computed(() => normalizeClass(['v-slider-thumb__ripple', textColorClasses.value]));
      return {
        expose: {},
        renderInput: {
          direction,
          disabled,
          readonly,
          onKeydown,
          rootClasses,
          rootStyles,
          thumbSurfaceClasses,
          thumbRippleClasses,
          thumbLabel,
          defaultThumbLabel,
          textColorStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASliderThumb = defineAlpineComponent({
    ..._SliderThumb,
    name: 'ASliderThumb'
  });

  // Styles

  // Types

  const makeVSliderTrackProps = propsFactory({
    start: {
      type: Number,
      required: true
    },
    stop: {
      type: Number,
      required: true
    },
    ...makeComponentProps()
  }, 'VSliderTrack');
  const _SliderTrack = defineComponent({
    name: 'VSliderTrack',
    props: makeVSliderTrackProps(),
    emits: {},
    slots: makeSlots({
      'tick-label': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject
      } = vm.reactivity;
      const slider = inject(VSliderSymbol);
      if (!slider) throw new Error('[Vuetify] v-slider-track must be inside v-slider or v-range-slider');
      const {
        color,
        parsedTicks,
        rounded,
        showTicks,
        tickSize,
        trackColor,
        trackFillColor,
        trackSize,
        vertical,
        min,
        max,
        indexFromEnd
      } = slider;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, rounded);
      const {
        backgroundColorClasses: trackFillColorClasses,
        backgroundColorStyles: trackFillColorStyles
      } = useBackgroundColor(vm, trackFillColor);
      const {
        backgroundColorClasses: trackColorClasses,
        backgroundColorStyles: trackColorStyles
      } = useBackgroundColor(vm, trackColor);
      const startDir = computed(() => `inset-${vertical.value ? 'block' : 'inline'}-${indexFromEnd.value ? 'end' : 'start'}`);
      const endDir = computed(() => vertical.value ? 'height' : 'width');
      const backgroundStyles = computed(() => normalizeStyle([{
        [startDir.value]: '0%',
        [endDir.value]: '100%'
      }, trackColorStyles.value]));
      const trackFillWidth = computed(() => props.stop - props.start);
      const trackFillStyles = computed(() => normalizeStyle([{
        [startDir.value]: convertToUnit(props.start, '%'),
        [endDir.value]: convertToUnit(trackFillWidth.value, '%')
      }, trackFillColorStyles.value]));
      const ticks = computed(() => {
        if (!showTicks.value) return [];
        return vertical.value ? parsedTicks.value.slice().reverse() : parsedTicks.value;
      });
      const getTickDirection = tick => {
        return tick.value !== min.value && tick.value !== max.value ? convertToUnit(tick.position, '%') : undefined;
      };

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const rootClasses = computed(() => normalizeClass(['v-slider-track', roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-slider-track-size': convertToUnit(trackSize.value),
        '--v-slider-tick-size': convertToUnit(tickSize.value)
      }, styles.value]));
      const backgroundClasses = computed(() => normalizeClass(['v-slider-track__background', trackColorClasses.value, {
        'v-slider-track__background--opacity': !!color.value || !trackFillColor.value
      }]));
      const trackFillClasses = computed(() => normalizeClass(['v-slider-track__fill', trackFillColorClasses.value]));
      return {
        expose: {},
        renderInput: {
          min,
          max,
          startDir,
          ticks,
          showTicks,
          getTickDirection,
          backgroundClasses,
          backgroundStyles,
          rootClasses,
          rootStyles,
          trackFillClasses,
          trackFillStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASliderTrack = defineAlpineComponent({
    ..._SliderTrack,
    name: 'ASliderTrack'
  });

  // Styles

  // Types

  function useCountdown(vm, milliseconds) {
    const {
      nextTick,
      shallowRef,
      onBeforeUnmount
    } = vm.reactivity;
    const time = shallowRef(milliseconds);
    let timer = -1;
    function clear() {
      clearInterval(timer);
    }
    function reset() {
      clear();
      nextTick(() => time.value = milliseconds);
    }
    function start(el) {
      const style = el ? getComputedStyle(el) : {
        transitionDuration: 0.2
      };
      const interval = parseFloat(style.transitionDuration) * 1000 || 200;
      clear();
      if (time.value <= 0) return;
      const startTime = performance.now();
      timer = window.setInterval(() => {
        const elapsed = performance.now() - startTime + interval;
        time.value = Math.max(milliseconds - elapsed, 0);
        if (time.value <= 0) clear();
      }, interval);
    }

    // NOTE(Alpinui): Replaced `onScopeDispose` with `onBeforeUnmount`
    onBeforeUnmount(clear);
    return {
      clear,
      time,
      start,
      reset
    };
  }
  const makeVSnackbarProps = propsFactory({
    multiLine: Boolean,
    text: String,
    timer: [Boolean, String],
    timeout: {
      type: [Number, String],
      default: 5000
    },
    vertical: Boolean,
    ...makeLocationProps({
      location: 'bottom'
    }),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeVariantProps(),
    ...makeThemeProps(),
    ...omit(makeVOverlayProps({
      transition: 'v-snackbar-transition'
    }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy'])
  }, 'VSnackbar');
  const _Snackbar = defineComponent({
    name: 'VSnackbar',
    props: makeVSnackbarProps(),
    emits: {
      'update:modelValue': v => true
    },
    slots: makeSlots({
      activator: null,
      default: null,
      actions: null,
      text: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject,
        onMounted,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const {
        positionClasses
      } = usePosition(vm, props);
      const {
        scopeId
      } = useScopeId(vm);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        colorClasses,
        colorStyles,
        variantClasses
      } = useVariant(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const countdown = useCountdown(vm, Number(props.timeout));
      const overlay = ref();
      const timerRef = ref();
      const isHovering = shallowRef(false);
      const startY = shallowRef(0);
      const mainStyles = ref();
      const hasLayout = inject(VuetifyLayoutKey, undefined);

      // NOTE(Alpinui): Replaced `useToggleScope` with `watch`
      const layout = useLayout$1(vm);
      watch([() => !!hasLayout, mainStyles, layout.mainStyles], cond => {
        if (!cond) return;
        mainStyles.value = layout.mainStyles.value;
      });
      watch(isActive, startTimeout);
      watch(() => props.timeout, startTimeout);
      onMounted(() => {
        if (isActive.value) startTimeout();
      });
      let activeTimeout = -1;
      function startTimeout() {
        countdown.reset();
        window.clearTimeout(activeTimeout);
        const timeout = Number(props.timeout);
        if (!isActive.value || timeout === -1) return;
        const element = refElement(timerRef.value);
        countdown.start(element);
        activeTimeout = window.setTimeout(() => {
          isActive.value = false;
        }, timeout);
      }
      function clearTimeout() {
        countdown.reset();
        window.clearTimeout(activeTimeout);
      }
      function onPointerenter() {
        isHovering.value = true;
        clearTimeout();
      }
      function onPointerleave() {
        isHovering.value = false;
        startTimeout();
      }
      function onTouchstart(event) {
        startY.value = event.touches[0].clientY;
      }
      function onTouchend(event) {
        if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
          isActive.value = false;
        }
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const locationClasses = computed(() => {
        return props.location.split(' ').reduce((acc, loc) => {
          acc[`v-snackbar--${loc}`] = true;
          return acc;
        }, {});
      });
      const overlayProps = computed(() => _Overlay.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-snackbar', {
        'v-snackbar--active': isActive.value,
        'v-snackbar--multi-line': props.multiLine && !props.vertical,
        'v-snackbar--timer': !!props.timer,
        'v-snackbar--vertical': props.vertical
      }, locationClasses.value, positionClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([mainStyles.value, styles.value]));
      const actionsDefaults = computed(() => ({
        VBtn: {
          variant: 'text',
          ripple: false,
          slim: true
        }
      }));
      const contentProps = computed(() => mergeProps({
        class: normalizeClass(['v-snackbar__wrapper', themeClasses.value, colorClasses.value, roundedClasses.value, variantClasses.value]),
        style: normalizeStyle([colorStyles.value]),
        onPointerenter,
        onPointerleave
      }, overlayProps.value.contentProps));
      return {
        expose: forwardRefs({}, overlay),
        renderInput: {
          countdown,
          isActive,
          isHovering,
          scopeId,
          overlay,
          timerRef,
          actionsDefaults,
          contentProps,
          overlayProps,
          rootClasses,
          rootStyles,
          onTouchstart,
          onTouchend
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASnackbar = defineAlpineComponent({
    ..._Snackbar,
    name: 'ASnackbar'
  });

  // Utilities

  // Types

  const makeLineProps = propsFactory({
    autoDraw: Boolean,
    autoDrawDuration: [Number, String],
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    color: String,
    gradient: {
      type: Array,
      default: () => []
    },
    gradientDirection: {
      type: String,
      validator: val => ['top', 'bottom', 'left', 'right'].includes(val),
      default: 'top'
    },
    height: {
      type: [String, Number],
      default: 75
    },
    labels: {
      type: Array,
      default: () => []
    },
    labelSize: {
      type: [Number, String],
      default: 7
    },
    lineWidth: {
      type: [String, Number],
      default: 4
    },
    id: String,
    itemValue: {
      type: String,
      default: 'value'
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    min: [String, Number],
    max: [String, Number],
    padding: {
      type: [String, Number],
      default: 8
    },
    showLabels: Boolean,
    smooth: Boolean,
    width: {
      type: [Number, String],
      default: 300
    }
  }, 'Line');

  // Utilities

  // Types

  const makeVBarlineProps = propsFactory({
    autoLineWidth: Boolean,
    ...makeLineProps()
  }, 'VBarline');
  const _Barline = defineComponent({
    name: 'VBarline',
    props: makeVBarlineProps(),
    slots: makeSlots({
      default: null,
      label: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const uid = getUid(vm);
      const id = computed(() => props.id || `barline-${uid}`);
      const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || 500);
      const hasLabels = computed(() => {
        return Boolean(props.showLabels || props.labels.length > 0 || vm.hasSlots.label);
      });
      const lineWidth = computed(() => parseFloat(props.lineWidth) || 4);
      const totalWidth = computed(() => Math.max(props.modelValue.length * lineWidth.value, Number(props.width)));
      const boundary = computed(() => {
        return {
          minX: 0,
          maxX: totalWidth.value,
          minY: 0,
          maxY: parseInt(props.height, 10)
        };
      });
      const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)));
      function genBars(values, boundary) {
        const {
          minX,
          maxX,
          minY,
          maxY
        } = boundary;
        const totalValues = values.length;
        let maxValue = props.max != null ? Number(props.max) : Math.max(...values);
        let minValue = props.min != null ? Number(props.min) : Math.min(...values);
        if (minValue > 0 && props.min == null) minValue = 0;
        if (maxValue < 0 && props.max == null) maxValue = 0;
        const gridX = maxX / totalValues;
        const gridY = (maxY - minY) / (maxValue - minValue || 1);
        const horizonY = maxY - Math.abs(minValue * gridY);
        return values.map((value, index) => {
          const height = Math.abs(gridY * value);
          return {
            x: minX + index * gridX,
            y: horizonY - height + +(value < 0) * height,
            height,
            value
          };
        });
      }
      const parsedLabels = computed(() => {
        const labels = [];
        const points = genBars(items.value, boundary.value);
        const len = points.length;
        for (let i = 0; labels.length < len; i++) {
          const item = points[i];
          let value = props.labels[i];
          if (!value) {
            value = typeof item === 'object' ? item.value : item;
          }
          labels.push({
            x: item.x,
            value: String(value)
          });
        }
        return labels;
      });
      const bars = computed(() => genBars(items.value, boundary.value));
      const offsetX = computed(() => (Math.abs(bars.value[0].x - bars.value[1].x) - lineWidth.value) / 2);
      const duration = computed(() => `${autoDrawDuration.value}ms`);
      const gradientData = computed(() => !props.gradient.slice().length ? [''] : props.gradient.slice().reverse());
      return {
        expose: {},
        renderInput: {
          bars,
          parsedLabels,
          gradientData,
          id,
          offsetX,
          lineWidth,
          duration,
          hasLabels
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ABarline = defineAlpineComponent({
    ..._Barline,
    name: 'ABarline'
  });

  // @ts-nocheck
  /* eslint-disable */

  // import { checkCollinear, getDistance, moveTo } from './math'

  /**
   * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
   */
  function genPath(points, radius) {
    let fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 75;
    if (points.length === 0) return "";
    const start = points.shift();
    const end = points[points.length - 1];
    return (fill ? `M${start.x} ${height - start.x + 2} L${start.x} ${start.y}` : `M${start.x} ${start.y}`) + points.map((point, index) => {
      const next = points[index + 1];
      const prev = points[index - 1] || start;
      const isCollinear = next && checkCollinear(next, point, prev);
      if (!next || isCollinear) {
        return `L${point.x} ${point.y}`;
      }
      const threshold = Math.min(getDistance(prev, point), getDistance(next, point));
      const isTooCloseForRadius = threshold / 2 < radius;
      const radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;
      const before = moveTo(prev, point, radiusForPoint);
      const after = moveTo(next, point, radiusForPoint);
      return `L${before.x} ${before.y}S${point.x} ${point.y} ${after.x} ${after.y}`;
    }).join("") + (fill ? `L${end.x} ${height - start.x + 2} Z` : "");
  }
  function int(value) {
    return parseInt(value, 10);
  }

  /**
   * https://en.wikipedia.org/wiki/Collinearity
   * x=(x1+x2)/2
   * y=(y1+y2)/2
   */
  function checkCollinear(p0, p1, p2) {
    return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y);
  }
  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  function moveTo(to, from, radius) {
    const vector = {
      x: to.x - from.x,
      y: to.y - from.y
    };
    const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    const unitVector = {
      x: vector.x / length,
      y: vector.y / length
    };
    return {
      x: from.x + unitVector.x * radius,
      y: from.y + unitVector.y * radius
    };
  }

  // Utilities

  // Types

  // Types

  const makeVTrendlineProps = propsFactory({
    fill: Boolean,
    ...makeLineProps()
  }, 'VTrendline');
  const _Trendline = defineComponent({
    name: 'VTrendline',
    props: makeVTrendlineProps(),
    slots: makeSlots({
      default: null,
      label: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        ref,
        watch
      } = vm.reactivity;
      const uid = getUid(vm);
      const id = computed(() => props.id || `trendline-${uid}`);
      const autoDrawDuration = computed(() => Number(props.autoDrawDuration) || (props.fill ? 500 : 2000));
      const lastLength = ref(0);
      const path = ref(null);
      function genPoints(values, boundary) {
        const {
          minX,
          maxX,
          minY,
          maxY
        } = boundary;
        const totalValues = values.length;
        const maxValue = props.max != null ? Number(props.max) : Math.max(...values);
        const minValue = props.min != null ? Number(props.min) : Math.min(...values);
        const gridX = (maxX - minX) / (totalValues - 1);
        const gridY = (maxY - minY) / (maxValue - minValue || 1);
        return values.map((value, index) => {
          return {
            x: minX + index * gridX,
            y: maxY - (value - minValue) * gridY,
            value
          };
        });
      }
      const hasLabels = computed(() => {
        return Boolean(props.showLabels || props.labels.length > 0 || vm.hasSlots.label);
      });
      const lineWidth = computed(() => {
        return parseFloat(props.lineWidth) || 4;
      });
      const totalWidth = computed(() => Number(props.width));
      const boundary = computed(() => {
        const padding = Number(props.padding);
        return {
          minX: padding,
          maxX: totalWidth.value - padding,
          minY: padding,
          maxY: parseInt(props.height, 10) - padding
        };
      });
      const items = computed(() => props.modelValue.map(item => getPropertyFromItem(item, props.itemValue, item)));
      const parsedLabels = computed(() => {
        const labels = [];
        const points = genPoints(items.value, boundary.value);
        const len = points.length;
        for (let i = 0; labels.length < len; i++) {
          const item = points[i];
          let value = props.labels[i];
          if (!value) {
            value = typeof item === 'object' ? item.value : item;
          }
          labels.push({
            x: item.x,
            value: String(value)
          });
        }
        return labels;
      });
      watch(() => props.modelValue, async () => {
        await nextTick();
        if (!props.autoDraw || !path.value) return;
        const pathRef = path.value;
        const length = pathRef.getTotalLength();
        if (!props.fill) {
          // Initial setup to "hide" the line by using the stroke dash array
          pathRef.style.strokeDasharray = `${length}`;
          pathRef.style.strokeDashoffset = `${length}`;

          // Force reflow to ensure the transition starts from this state
          pathRef.getBoundingClientRect();

          // Animate the stroke dash offset to "draw" the line
          pathRef.style.transition = `stroke-dashoffset ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
          pathRef.style.strokeDashoffset = '0';
        } else {
          // Your existing logic for filled paths remains the same
          pathRef.style.transformOrigin = 'bottom center';
          pathRef.style.transition = 'none';
          pathRef.style.transform = `scaleY(0)`;
          pathRef.getBoundingClientRect();
          pathRef.style.transition = `transform ${autoDrawDuration.value}ms ${props.autoDrawEasing}`;
          pathRef.style.transform = `scaleY(1)`;
        }
        lastLength.value = length;
      }, {
        immediate: true
      });
      function genPath$1(fill) {
        return genPath(genPoints(items.value, boundary.value), props.smooth ? 8 : Number(props.smooth), fill, parseInt(props.height, 10));
      }
      const gradientData = computed(() => !props.gradient.slice().length ? [''] : props.gradient.slice().reverse());
      const strokeWidth = computed(() => parseFloat(props.lineWidth) ?? 4);
      return {
        expose: {},
        renderInput: {
          id,
          gradientData,
          hasLabels,
          lineWidth,
          parsedLabels,
          strokeWidth,
          // NOTE(Alpinui): Type must be set to avoid following TypeScript error:
          // TS7056: The inferred type of this node exceeds the maximum length the compiler will serialize.
          path: path,
          genPath: genPath$1
        }
      };
    },
    renderHeadless: () => null
  });

  // Components

  // Types

  const makeVSparklineProps = propsFactory({
    type: {
      type: String,
      default: 'trend'
    },
    ...makeVBarlineProps(),
    ...makeVTrendlineProps()
  }, 'VSparkline');
  const _Sparkline = defineComponent({
    name: 'VSparkline',
    props: makeVSparklineProps(),
    slots: makeSlots({
      default: null,
      label: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(vm, toRef(props, 'color'));
      const hasLabels = computed(() => {
        return Boolean(props.showLabels || props.labels.length > 0 || vm.hasSlots?.label);
      });
      const totalHeight = computed(() => {
        let height = parseInt(props.height, 10);
        if (hasLabels.value) height += parseInt(props.labelSize, 10) * 1.5;
        return height;
      });
      const viewBox = computed(() => `0 0 ${props.width} ${parseInt(totalHeight.value, 10)}`);
      const lineProps = computed(() => props.type === 'trend' ? _Trendline.filterProps(props) : _Barline.filterProps(props));
      return {
        expose: {},
        renderInput: {
          lineProps,
          textColorClasses,
          textColorStyles,
          viewBox
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASparkline = defineAlpineComponent({
    ..._Sparkline,
    name: 'ASparkline'
  });

  // Types

  const ATrendline = defineAlpineComponent({
    ..._Trendline,
    name: 'ATrendline'
  });

  // Styles
  const makeVSpeedDialProps = propsFactory({
    ...makeComponentProps(),
    ...makeVMenuProps({
      offset: 8,
      minWidth: 0,
      openDelay: 0,
      closeDelay: 100,
      location: 'top center',
      transition: 'scale-transition'
    })
  }, 'VSpeedDial');
  const _SpeedDial = defineComponent({
    name: 'VSpeedDial',
    props: makeVSpeedDialProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const menuRef = ref();
      const location = computed(() => {
        const [y, x = 'center'] = props.location.split(' ');
        return `${y} ${x}`;
      });
      const locationClasses = computed(() => ({
        [`v-speed-dial__content--${location.value.replace(' ', '-')}`]: true
      }));
      const menuProps = computed(() => _Menu.filterProps(props));
      const contentClasses = computed(() => normalizeClass(['v-speed-dial__content', locationClasses.value]));
      const defaults = computed(() => ({
        VBtn: {
          size: 'small'
        }
      }));
      return {
        expose: {},
        renderInput: {
          contentClasses,
          defaults,
          location,
          model,
          menuProps,
          menuRef,
          rootClasses: classes,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASpeedDial = defineAlpineComponent({
    ..._SpeedDial,
    name: 'ASpeedDial'
  });

  // Types

  const VStepperSymbol = Symbol.for('vuetify:v-stepper');

  // Composables

  // Types

  const makeVStepperActionsProps = propsFactory({
    color: String,
    disabled: {
      type: [Boolean, String],
      default: false
    },
    prevText: {
      type: String,
      default: '$vuetify.stepper.prev'
    },
    nextText: {
      type: String,
      default: '$vuetify.stepper.next'
    }
  }, 'VStepperActions');
  const _StepperActions = defineComponent({
    name: 'VStepperActions',
    props: makeVStepperActionsProps(),
    emits: {
      'click:prev': () => true,
      'click:next': () => true
    },
    slots: makeSlots({
      prev: null,
      next: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        t
      } = useLocale$1(vm);
      function onClickPrev() {
        vm.emit('click:prev');
      }
      function onClickNext() {
        vm.emit('click:next');
      }
      const prevDefaults = computed(() => ({
        VBtn: {
          disabled: ['prev', true].includes(props.disabled),
          text: t(props.prevText),
          variant: 'text'
        }
      }));
      const nextDefaults = computed(() => ({
        VBtn: {
          color: props.color,
          disabled: ['next', true].includes(props.disabled),
          text: t(props.nextText),
          variant: 'tonal'
        }
      }));
      return {
        expose: {},
        renderInput: {
          nextDefaults,
          prevDefaults,
          onClickNext,
          onClickPrev
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles

  // Types

  const makeStepperProps = propsFactory({
    altLabels: Boolean,
    bgColor: String,
    completeIcon: String,
    editIcon: String,
    editable: Boolean,
    errorIcon: String,
    hideActions: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemTitle: {
      type: String,
      default: 'title'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    nonLinear: Boolean,
    flat: Boolean,
    ...makeDisplayProps()
  }, 'Stepper');
  const makeVStepperProps = propsFactory({
    ...makeStepperProps(),
    ...makeGroupProps({
      mandatory: 'force',
      selectedClass: 'v-stepper-item--selected'
    }),
    ...makeVSheetProps(),
    ...only(makeVStepperActionsProps(), ['prevText', 'nextText'])
  }, 'VStepper');
  const _Stepper = defineComponent({
    name: 'VStepper',
    props: makeVStepperProps(),
    emits: {
      'update:modelValue': v => true
    },
    slots: makeSlots({
      actions: null,
      default: null,
      header: null,
      'header-item': null,
      icon: null,
      title: null,
      subtitle: null,
      item: null,
      prev: null,
      next: null,
      // TODO - How to handle this?
      'header-item.<name>': null,
      'item.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRefs
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        items: _items,
        next,
        prev,
        selected
      } = useGroup(vm, props, VStepperSymbol);
      const {
        displayClasses,
        mobile
      } = useDisplay$1(vm, props);
      const {
        completeIcon,
        editIcon,
        errorIcon,
        color,
        editable,
        prevText,
        nextText
      } = toRefs(props);
      const items = computed(() => props.items.map((item, index) => {
        const title = getPropertyFromItem(item, props.itemTitle, item);
        const value = getPropertyFromItem(item, props.itemValue, index + 1);
        return {
          title,
          value,
          raw: item
        };
      }));
      const activeIndex = computed(() => {
        return _items.value.findIndex(item => selected.value.includes(item.id));
      });
      const disabled = computed(() => {
        if (props.disabled) return props.disabled;
        if (activeIndex.value === 0) return 'prev';
        if (activeIndex.value === _items.value.length - 1) return 'next';
        return false;
      });
      provideDefaults(vm, {
        VStepperItem: {
          editable,
          errorIcon,
          completeIcon,
          editIcon,
          prevText,
          nextText
        },
        VStepperActions: {
          color,
          disabled,
          prevText,
          nextText
        }
      });
      const sheetProps = computed(() => _Sheet.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-stepper', {
        'v-stepper--alt-labels': props.altLabels,
        'v-stepper--flat': props.flat,
        'v-stepper--non-linear': props.nonLinear,
        'v-stepper--mobile': mobile.value
      }, displayClasses.value, classes.value]));
      return {
        expose: {
          prev,
          next
        },
        renderInput: {
          items,
          sheetProps,
          rootClasses,
          rootStyles: styles,
          prev,
          next
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AStepper = defineAlpineComponent({
    ..._Stepper,
    name: 'AStepper'
  });

  // Types

  const AStepperActions = defineAlpineComponent({
    ..._StepperActions,
    name: 'AStepperActions'
  });

  // Composables

  // Types

  const klass = 'v-stepper-header';
  const _StepperHeader = createSimpleFunctionalHeadless(klass);

  // Types

  const AStepperHeader = defineAlpineComponent({
    ..._StepperHeader,
    name: 'AStepperHeader'
  });

  // Styles

  // Types

  const makeStepperItemProps = propsFactory({
    color: String,
    title: String,
    subtitle: String,
    complete: Boolean,
    completeIcon: {
      type: String,
      default: '$complete'
    },
    editable: Boolean,
    editIcon: {
      type: String,
      default: '$edit'
    },
    error: Boolean,
    errorIcon: {
      type: String,
      default: '$error'
    },
    icon: String,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    rules: {
      type: Array,
      default: () => []
    }
  }, 'StepperItem');
  const makeVStepperItemProps = propsFactory({
    ...makeStepperItemProps(),
    ...makeGroupItemProps()
  }, 'VStepperItem');
  const _StepperItem = defineComponent({
    name: 'VStepperItem',
    props: makeVStepperItemProps(),
    emits: {
      'group:selected': val => true
    },
    slots: makeSlots({
      default: null,
      icon: null,
      title: null,
      subtitle: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const group = useGroupItem(vm, props, VStepperSymbol, true);
      const step = computed(() => group?.value.value ?? props.value);
      const isValid = computed(() => props.rules.every(handler => handler() === true));
      const isClickable = computed(() => !props.disabled && props.editable);
      const canEdit = computed(() => !props.disabled && props.editable);
      const hasError = computed(() => props.error || !isValid.value);
      const hasCompleted = computed(() => props.complete || props.rules.length > 0 && isValid.value);
      const icon = computed(() => {
        if (hasError.value) return props.errorIcon;
        if (hasCompleted.value) return props.completeIcon;
        if (group.isSelected.value && props.editable) return props.editIcon;
        return props.icon;
      });
      const slotProps = computed(() => ({
        canEdit: canEdit.value,
        hasError: hasError.value,
        hasCompleted: hasCompleted.value,
        title: props.title,
        subtitle: props.subtitle,
        step: step.value,
        value: props.value
      }));
      function onClick() {
        group?.toggle();
      }
      const hasColor = computed(() => (!group || group.isSelected.value || hasCompleted.value || canEdit.value) && !hasError.value && !props.disabled);
      const rootClasses = computed(() => normalizeClass(['v-stepper-item', {
        'v-stepper-item--complete': hasCompleted.value,
        'v-stepper-item--disabled': props.disabled,
        'v-stepper-item--error': hasError.value
      }, group?.selectedClass.value]));
      return {
        expose: {},
        renderInput: {
          icon,
          step,
          hasColor,
          isClickable,
          slotProps,
          rootClasses,
          onClick
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AStepperItem = defineAlpineComponent({
    ..._StepperItem,
    name: 'AStepperItem'
  });

  // Components

  // Types

  const makeVStepperWindowProps = propsFactory({
    ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory'])
  }, 'VStepperWindow');
  const _StepperWindow = defineComponent({
    name: 'VStepperWindow',
    props: makeVStepperWindowProps(),
    emits: {
      'update:modelValue': v => true
    },
    slots: makeSlots({
      default: null,
      additional: null,
      prev: null,
      next: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject
      } = vm.reactivity;
      const group = inject(VStepperSymbol, null);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const _model = useProxiedModel(vm, props, 'modelValue');
      const model = computed({
        get() {
          // Always return modelValue if defined
          // or if not within a VStepper group
          if (_model.value != null || !group) return _model.value;

          // If inside of a VStepper, find the currently selected
          // item by id. Item value may be assigned by its index
          return group.items.value.find(item => group.selected.value.includes(item.id))?.value;
        },
        set(val) {
          _model.value = val;
        }
      });
      const windowProps = computed(() => _Window.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-stepper-window', classes.value]));
      return {
        expose: {},
        renderInput: {
          model,
          rootClasses,
          rootStyles: styles,
          windowProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AStepperWindow = defineAlpineComponent({
    ..._StepperWindow,
    name: 'AStepperWindow'
  });

  // Components

  // Types

  const makeVStepperWindowItemProps = propsFactory({
    ...makeVWindowItemProps()
  }, 'VStepperWindowItem');
  const _StepperWindowItem = defineComponent({
    name: 'VStepperWindowItem',
    props: makeVStepperWindowItemProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const windowItemProps = computed(() => _WindowItem.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-stepper-window-item', classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles,
          windowItemProps
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AStepperWindowItem = defineAlpineComponent({
    ..._StepperWindowItem,
    name: 'AStepperWindowItem'
  });

  // Styles

  // Types

  const makeVSwitchProps = propsFactory({
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    loading: {
      type: [Boolean, String],
      default: false
    },
    ...makeVInputProps(),
    ...makeVSelectionControlProps()
  }, 'VSwitch');
  const _Switch = defineComponent({
    name: 'VSwitch',
    inheritAttrs: false,
    props: makeVSwitchProps(),
    emits: {
      'update:focused': focused => true,
      'update:modelValue': value => true,
      'update:indeterminate': value => true
    },
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      details: null,
      message: null,
      label: null,
      input: null,
      loader: null,
      thumb: null,
      'track-false': null,
      'track-true': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const indeterminate = useProxiedModel(vm, props, 'indeterminate');
      const model = useProxiedModel(vm, props, 'modelValue');
      const {
        loaderClasses
      } = useLoader(vm, props);
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const control = ref();
      const isForcedColorsModeActive = IN_BROWSER && window.matchMedia('(forced-colors: active)').matches;
      const loaderColor = computed(() => {
        return typeof props.loading === 'string' && props.loading !== '' ? props.loading : props.color;
      });
      const uid = getUid(vm);
      const id = computed(() => props.id || `switch-${uid}`);
      function onChange() {
        if (indeterminate.value) {
          indeterminate.value = false;
        }
      }
      function onTrackClick(e) {
        e.stopPropagation();
        e.preventDefault();
        control.value?.input?.click();
      }

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => _Input.filterProps(props));
      const controlProps = computed(() => _SelectionControl.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-switch', {
        'v-switch--flat': props.flat
      }, {
        'v-switch--inset': props.inset
      }, {
        'v-switch--indeterminate': indeterminate.value
      }, loaderClasses.value, classes.value]));
      const genThumbDefaults = icon => ({
        VIcon: {
          icon,
          size: 'x-small'
        }
      });
      return {
        expose: {},
        renderInput: {
          control,
          model,
          id,
          isFocused,
          isForcedColorsModeActive,
          indeterminate,
          loaderColor,
          controlProps,
          inputProps,
          rootClasses,
          rootStyles: styles,
          genThumbDefaults,
          filterInputAttrs,
          onChange,
          focus,
          blur,
          onTrackClick
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASwitch = defineAlpineComponent({
    ..._Switch,
    name: 'ASwitch'
  });

  // Styles

  // Types

  const makeVSystemBarProps = propsFactory({
    color: String,
    height: [Number, String],
    window: Boolean,
    ...makeComponentProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VSystemBar');
  const _SystemBar = defineComponent({
    name: 'VSystemBar',
    props: makeVSystemBarProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        shallowRef,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'color'));
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        roundedClasses
      } = useRounded(vm, props);
      const {
        ssrBootStyles
      } = useSsrBoot(vm);
      const height = computed(() => props.height ?? (props.window ? 32 : 24));
      const {
        layoutItemStyles
      } = useLayoutItem(vm, {
        id: props.name,
        order: computed(() => parseInt(props.order, 10)),
        position: shallowRef('top'),
        layoutSize: height,
        elementSize: height,
        active: computed(() => true),
        absolute: toRef(props, 'absolute')
      });
      const rootClasses = computed(() => normalizeClass(['v-system-bar', {
        'v-system-bar--window': props.window
      }, themeClasses.value, backgroundColorClasses.value, elevationClasses.value, roundedClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ASystemBar = defineAlpineComponent({
    ..._SystemBar,
    name: 'ASystemBar'
  });

  // Styles

  // Types

  const makeVTabProps = propsFactory({
    fixed: Boolean,
    sliderColor: String,
    hideSlider: Boolean,
    direction: {
      type: String,
      default: 'horizontal'
    },
    ...omit(makeVBtnProps({
      selectedClass: 'v-tab--selected',
      variant: 'text'
    }), ['active', 'block', 'flat', 'location', 'position', 'symbol'])
  }, 'VTab');
  const _Tab = defineComponent({
    name: 'VTab',
    props: makeVTabProps(),
    slots: makeSlots({
      default: null,
      prepend: null,
      append: null,
      loader: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        textColorClasses: sliderColorClasses,
        textColorStyles: sliderColorStyles
      } = useTextColor(vm, props, 'sliderColor');
      const rootEl = ref();
      const sliderEl = ref();
      const isHorizontal = computed(() => props.direction === 'horizontal');
      const isSelected = computed(() => rootEl.value?.group?.isSelected.value ?? false);
      function updateSlider(_ref) {
        let {
          value
        } = _ref;
        if (value) {
          const prevEl = rootEl.value?.$el.parentElement?.querySelector('.v-tab--selected .v-tab__slider');
          const nextEl = sliderEl.value;
          if (!prevEl || !nextEl) return;
          const color = getComputedStyle(prevEl).color;
          const prevBox = prevEl.getBoundingClientRect();
          const nextBox = nextEl.getBoundingClientRect();
          const xy = isHorizontal.value ? 'x' : 'y';
          const XY = isHorizontal.value ? 'X' : 'Y';
          const rightBottom = isHorizontal.value ? 'right' : 'bottom';
          const widthHeight = isHorizontal.value ? 'width' : 'height';
          const prevPos = prevBox[xy];
          const nextPos = nextBox[xy];
          const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
          const origin = Math.sign(delta) > 0 ? isHorizontal.value ? 'right' : 'bottom' : Math.sign(delta) < 0 ? isHorizontal.value ? 'left' : 'top' : 'center';
          const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
          const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
          const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
          const sigma = 1.5;
          animate(nextEl, {
            backgroundColor: [color, 'currentcolor'],
            transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, 'none'],
            transformOrigin: Array(3).fill(origin)
          }, {
            duration: 225,
            easing: standardEasing
          });
        }
      }
      const btnProps = computed(() => _Btn.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-tab', classes.value]));
      const sliderClasses = computed(() => normalizeClass(['v-tab__slider', sliderColorClasses.value]));
      return {
        expose: forwardRefs({}, rootEl),
        renderInput: {
          btnProps,
          isSelected,
          sliderEl,
          sliderClasses,
          sliderColorStyles,
          rootEl,
          rootClasses,
          rootStyles: styles,
          updateSlider
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATab = defineAlpineComponent({
    ..._Tab,
    name: 'ATab'
  });

  // Styles

  // Types

  function parseItems(items) {
    if (!items) return [];
    return items.map(item => {
      if (!isObject(item)) return {
        text: item,
        value: item
      };
      return item;
    });
  }
  const makeVTabsProps = propsFactory({
    alignTabs: {
      type: String,
      default: 'start'
    },
    color: String,
    fixedTabs: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    stacked: Boolean,
    bgColor: String,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined
    },
    hideSlider: Boolean,
    sliderColor: String,
    ...makeVSlideGroupProps({
      mandatory: 'force',
      selectedClass: 'v-tab-item--selected'
    }),
    ...makeDensityProps(),
    ...makeTagProps()
  }, 'VTabs');
  const _Tabs = defineComponent({
    name: 'VTabs',
    props: makeVTabsProps(),
    emits: {
      'update:modelValue': v => true
    },
    slots: makeSlots({
      default: null,
      tab: null,
      item: null,
      window: null,
      // TODO - How to handle these?
      'tab.<name>': null,
      'item.<name>': null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const items = computed(() => parseItems(props.items));
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        backgroundColorClasses,
        backgroundColorStyles
      } = useBackgroundColor(vm, toRef(props, 'bgColor'));
      const {
        scopeId
      } = useScopeId(vm);
      provideDefaults(vm, {
        VTab: {
          color: toRef(props, 'color'),
          direction: toRef(props, 'direction'),
          stacked: toRef(props, 'stacked'),
          fixed: toRef(props, 'fixedTabs'),
          sliderColor: toRef(props, 'sliderColor'),
          hideSlider: toRef(props, 'hideSlider')
        }
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const slideGroupProps = computed(() => _SlideGroup.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-tabs', `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
        'v-tabs--fixed-tabs': props.fixedTabs,
        'v-tabs--grow': props.grow,
        'v-tabs--stacked': props.stacked
      }, densityClasses.value, backgroundColorClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-tabs-height': convertToUnit(props.height)
      }, backgroundColorStyles.value, styles.value]));
      return {
        expose: {},
        renderInput: {
          items,
          model,
          slideGroupProps,
          rootClasses,
          rootStyles,
          scopeId
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATabs = defineAlpineComponent({
    ..._Tabs,
    name: 'ATabs'
  });

  // Types

  const VTabsSymbol = Symbol.for('vuetify:v-tabs');

  // Components
  const makeVTabsWindowProps = propsFactory({
    ...omit(makeVWindowProps(), ['continuous', 'nextIcon', 'prevIcon', 'showArrows', 'touch', 'mandatory'])
  }, 'VTabsWindow');
  const _TabsWindow = defineComponent({
    name: 'VTabsWindow',
    props: makeVTabsWindowProps(),
    emits: {
      'update:modelValue': v => true
    },
    slots: makeSlots({
      default: null,
      additional: null,
      prev: null,
      next: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        inject
      } = vm.reactivity;
      const group = inject(VTabsSymbol, null);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const _model = useProxiedModel(vm, props, 'modelValue');
      const model = computed({
        get() {
          // Always return modelValue if defined
          // or if not within a VTabs group
          if (_model.value != null || !group) return _model.value;

          // If inside of a VTabs, find the currently selected
          // item by id. Item value may be assigned by its index
          return group.items.value.find(item => group.selected.value.includes(item.id))?.value;
        },
        set(val) {
          _model.value = val;
        }
      });
      const windowProps = computed(() => _Window.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-tabs-window', classes.value]));
      return {
        expose: {},
        renderInput: {
          model,
          windowProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATabsWindow = defineAlpineComponent({
    ..._TabsWindow,
    name: 'ATabsWindow'
  });

  // Components

  // Types

  const makeVTabsWindowItemProps = propsFactory({
    ...makeVWindowItemProps()
  }, 'VTabsWindowItem');
  const _TabsWindowItem = defineComponent({
    name: 'VTabsWindowItem',
    props: makeVTabsWindowItemProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const windowItemProps = computed(() => _WindowItem.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-tabs-window-item', classes.value]));
      return {
        expose: {},
        renderInput: {
          windowItemProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATabsWindowItem = defineAlpineComponent({
    ..._TabsWindowItem,
    name: 'ATabsWindowItem'
  });

  // Types

  const ATable = defineAlpineComponent({
    ..._Table,
    name: 'ATable'
  });

  // Styles

  // Types

  const makeVTextareaProps = propsFactory({
    autoGrow: Boolean,
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 5,
      validator: v => !isNaN(parseFloat(v))
    },
    maxRows: {
      type: [Number, String],
      validator: v => !isNaN(parseFloat(v))
    },
    suffix: String,
    modelModifiers: Object,
    ...omit(makeVInputProps(), ['centerAffix']),
    ...omit(makeVFieldProps(), ['centerAffix'])
  }, 'VTextarea');
  const _Textarea = defineComponent({
    name: 'VTextarea',
    inheritAttrs: false,
    props: makeVTextareaProps(),
    emits: {
      'click:control': e => true,
      'mousedown:control': e => true,
      'update:focused': focused => true,
      'update:modelValue': val => true
    },
    slots: makeSlots({
      prepend: null,
      append: null,
      details: null,
      message: null,
      clear: null,
      'prepend-inner': null,
      'append-inner': null,
      label: null,
      loader: null,
      counter: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        nextTick,
        onBeforeUnmount,
        onMounted,
        ref,
        shallowRef,
        watch,
        watchEffect
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const model = useProxiedModel(vm, props, 'modelValue');
      const {
        isFocused,
        focus,
        blur
      } = useFocus(vm, props);
      const counterValue = computed(() => {
        return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
      });
      const max = computed(() => {
        if (vm.attrs.maxlength) return vm.attrs.maxlength;
        if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
        return props.counter;
      });
      function onIntersect(isIntersecting, entries) {
        if (!props.autofocus || !isIntersecting) return;
        entries[0].target?.focus?.();
      }
      const vInputRef = ref();
      const vFieldRef = ref();
      const controlHeight = shallowRef('');
      const textareaRef = ref();
      const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
      function onFocus() {
        if (textareaRef.value !== document.activeElement) {
          textareaRef.value?.focus();
        }
        if (!isFocused.value) focus();
      }
      function onControlClick(e) {
        onFocus();
        vm.emit('click:control', e);
      }
      function onControlMousedown(e) {
        vm.emit('mousedown:control', e);
      }
      function onClear(e) {
        e.stopPropagation();
        onFocus();
        nextTick(() => {
          model.value = '';
          callEvent(props['onClick:clear'], e);
        });
      }
      function onInput(e) {
        const el = e.target;
        model.value = el.value;
        if (props.modelModifiers?.trim) {
          const caretPosition = [el.selectionStart, el.selectionEnd];
          nextTick(() => {
            el.selectionStart = caretPosition[0];
            el.selectionEnd = caretPosition[1];
          });
        }
      }
      const sizerRef = ref();
      const rows = ref(+props.rows);
      const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
      watchEffect(() => {
        if (!props.autoGrow) rows.value = +props.rows;
      });
      function calculateInputHeight() {
        if (!props.autoGrow) return;
        nextTick(() => {
          if (!sizerRef.value || !vFieldRef.value) return;
          const style = getComputedStyle(sizerRef.value);
          const fieldStyle = getComputedStyle(vFieldRef.value.$el);
          const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) + parseFloat(style.getPropertyValue('--v-input-padding-top')) + parseFloat(style.getPropertyValue('--v-field-padding-bottom'));
          const height = sizerRef.value.scrollHeight;
          const lineHeight = parseFloat(style.lineHeight);
          const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue('--v-input-control-height')));
          const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
          const newHeight = clamp(height ?? 0, minHeight, maxHeight);
          rows.value = Math.floor((newHeight - padding) / lineHeight);
          controlHeight.value = convertToUnit(newHeight);
        });
      }
      onMounted(calculateInputHeight);
      watch(model, calculateInputHeight);
      watch(() => props.rows, calculateInputHeight);
      watch(() => props.maxRows, calculateInputHeight);
      watch(() => props.density, calculateInputHeight);
      let observer;
      watch(sizerRef, val => {
        if (val) {
          observer = new ResizeObserver(calculateInputHeight);
          observer.observe(sizerRef.value);
        } else {
          observer?.disconnect();
        }
      });
      onBeforeUnmount(() => {
        observer?.disconnect();
      });

      // ////////////////////////////
      // Rendering variables
      // ////////////////////////////

      const inputProps = computed(() => {
        const {
          modelValue: _,
          ...inputProps
        } = _Input.filterProps(props);
        return inputProps;
      });
      const fieldProps = computed(() => filterFieldProps(props));
      const rootClasses = computed(() => normalizeClass(['v-textarea v-text-field', {
        'v-textarea--prefixed': !!props.prefix,
        'v-textarea--suffixed': !!props.suffix,
        'v-text-field--prefixed': !!props.prefix,
        'v-text-field--suffixed': !!props.suffix,
        'v-textarea--auto-grow': props.autoGrow,
        'v-textarea--no-resize': props.noResize || props.autoGrow,
        'v-input--plain-underlined': isPlainOrUnderlined.value
      }, classes.value]));
      const fieldStyles = computed(() => normalizeStyle({
        '--v-textarea-control-height': controlHeight.value
      }));
      return {
        expose: forwardRefs({}, vInputRef, vFieldRef, textareaRef),
        renderInput: {
          isActive,
          isFocused,
          counterValue,
          max,
          model,
          inputProps,
          fieldProps,
          vInputRef,
          vFieldRef,
          textareaRef,
          fieldStyles,
          rootClasses,
          rootStyles: styles,
          sizerRef,
          onControlMousedown,
          onControlClick,
          onClear,
          onInput,
          onIntersect,
          onFocus,
          blur,
          filterInputAttrs
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATextarea = defineAlpineComponent({
    ..._Textarea,
    name: 'ATextarea'
  });

  // Types

  const ATextField = defineAlpineComponent({
    ..._TextField,
    name: 'ATextField'
  });

  // Styles

  // Types

  const makeVThemeProviderProps = propsFactory({
    withBackground: Boolean,
    ...makeComponentProps(),
    ...makeThemeProps(),
    ...makeTagProps()
  }, 'VThemeProvider');
  const _ThemeProvider = defineComponent({
    name: 'VThemeProvider',
    props: makeVThemeProviderProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const rootClasses = computed(() => normalizeClass(['v-theme-provider', themeClasses.value, classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AThemeProvider = defineAlpineComponent({
    ..._ThemeProvider,
    name: 'AThemeProvider'
  });

  // Composables

  // Types

  const makeVTimelineItemProps = propsFactory({
    density: String,
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: undefined
    },
    icon: IconValue,
    iconColor: String,
    lineInset: [Number, String],
    ...makeComponentProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps()
  }, 'VTimelineItem');
  const _TimelineItem = defineComponent({
    name: 'VTimelineItem',
    props: makeVTimelineItemProps(),
    slots: makeSlots({
      default: null,
      icon: null,
      opposite: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        ref,
        shallowRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const dotSize = shallowRef(0);
      const dotRef = ref();
      watch(dotRef, newValue => {
        if (!newValue) return;
        dotSize.value = newValue.$el.querySelector('.v-timeline-divider__dot')?.getBoundingClientRect().width ?? 0;
      }, {
        flush: 'post'
      });
      const rootClasses = computed(() => normalizeClass(['v-timeline-item', {
        'v-timeline-item--fill-dot': props.fillDot
      }, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-timeline-dot-size': convertToUnit(dotSize.value),
        '--v-timeline-line-inset': props.lineInset ? `calc(var(--v-timeline-dot-size) / 2 + ${convertToUnit(props.lineInset)})` : convertToUnit(0)
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          dotRef,
          dimensionStyles,
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Styles
  const makeVTimelineProps = propsFactory({
    align: {
      type: String,
      default: 'center',
      validator: v => ['center', 'start'].includes(v)
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    justify: {
      type: String,
      default: 'auto',
      validator: v => ['auto', 'center'].includes(v)
    },
    side: {
      type: String,
      validator: v => v == null || ['start', 'end'].includes(v)
    },
    lineThickness: {
      type: [String, Number],
      default: 2
    },
    lineColor: String,
    truncateLine: {
      type: String,
      validator: v => ['start', 'end', 'both'].includes(v)
    },
    ...only(makeVTimelineItemProps({
      lineInset: 0
    }), ['dotColor', 'fillDot', 'hideOpposite', 'iconColor', 'lineInset', 'size']),
    ...makeComponentProps(),
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  }, 'VTimeline');
  const _Timeline = defineComponent({
    name: 'VTimeline',
    props: makeVTimelineProps(),
    slots: {},
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        densityClasses
      } = useDensity(vm, props);
      const {
        rtlClasses
      } = useRtl$1(vm);
      provideDefaults(vm, {
        VTimelineDivider: {
          lineColor: toRef(props, 'lineColor')
        },
        VTimelineItem: {
          density: toRef(props, 'density'),
          dotColor: toRef(props, 'dotColor'),
          fillDot: toRef(props, 'fillDot'),
          hideOpposite: toRef(props, 'hideOpposite'),
          iconColor: toRef(props, 'iconColor'),
          lineColor: toRef(props, 'lineColor'),
          lineInset: toRef(props, 'lineInset'),
          size: toRef(props, 'size')
        }
      });
      const sideClasses = computed(() => {
        const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
        return side && `v-timeline--side-${side}`;
      });
      const truncateClasses = computed(() => {
        const classes = ['v-timeline--truncate-line-start', 'v-timeline--truncate-line-end'];
        switch (props.truncateLine) {
          case 'both':
            return classes;
          case 'start':
            return classes[0];
          case 'end':
            return classes[1];
          default:
            return null;
        }
      });
      const rootClasses = computed(() => normalizeClass(['v-timeline', `v-timeline--${props.direction}`, `v-timeline--align-${props.align}`, `v-timeline--justify-${props.justify}`, truncateClasses.value, {
        'v-timeline--inset-line': !!props.lineInset
      }, themeClasses.value, densityClasses.value, sideClasses.value, rtlClasses.value, classes.value]));
      const rootStyles = computed(() => normalizeStyle([{
        '--v-timeline-line-thickness': convertToUnit(props.lineThickness)
      }, styles.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATimeline = defineAlpineComponent({
    ..._Timeline,
    name: 'ATimeline'
  });

  // Components

  // Types

  const makeVTimelineDividerProps = propsFactory({
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    icon: IconValue,
    iconColor: String,
    lineColor: String,
    ...makeComponentProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps()
  }, 'VTimelineDivider');
  const _TimelineDivider = defineComponent({
    name: 'VTimelineDivider',
    props: makeVTimelineDividerProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        sizeClasses,
        sizeStyles
      } = useSize(vm, props, 'v-timeline-divider__dot');
      const {
        backgroundColorStyles,
        backgroundColorClasses
      } = useBackgroundColor(vm, toRef(props, 'dotColor'));
      const {
        roundedClasses
      } = useRounded(vm, props, 'v-timeline-divider__dot');
      const {
        elevationClasses
      } = useElevation(vm, props);
      const {
        backgroundColorClasses: lineColorClasses,
        backgroundColorStyles: lineColorStyles
      } = useBackgroundColor(vm, toRef(props, 'lineColor'));
      const rootClasses = computed(() => normalizeClass(['v-timeline-divider', {
        'v-timeline-divider--fill-dot': props.fillDot
      }, classes.value]));
      const beforeClasses = computed(() => normalizeClass(['v-timeline-divider__before', lineColorClasses.value]));
      const afterClasses = computed(() => normalizeClass(['v-timeline-divider__after', lineColorClasses.value]));
      const dotClasses = computed(() => normalizeClass(['v-timeline-divider__dot', elevationClasses.value, roundedClasses.value, sizeClasses.value]));
      const dotInnerClasses = computed(() => normalizeClass(['v-timeline-divider__inner-dot', backgroundColorClasses.value, roundedClasses.value]));
      const defaults = computed(() => ({
        VIcon: {
          color: props.iconColor,
          icon: props.icon,
          size: props.size
        }
      }));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles,
          beforeClasses,
          afterClasses,
          lineColorStyles,
          dotClasses,
          sizeStyles,
          dotInnerClasses,
          backgroundColorStyles,
          defaults
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATimelineDivider = defineAlpineComponent({
    ..._TimelineDivider,
    name: 'ATimelineDivider'
  });

  // Types

  const ATimelineItem = defineAlpineComponent({
    ..._TimelineItem,
    name: 'ATimelineItem'
  });

  // Types

  const AToolbar = defineAlpineComponent({
    ..._Toolbar,
    name: 'AToolbar'
  });

  // Composables

  // Types

  const makeVToolbarItemsProps = propsFactory({
    ...makeComponentProps(),
    ...makeVariantProps({
      variant: 'text'
    })
  }, 'VToolbarItems');
  const _ToolbarItems = defineComponent({
    name: 'VToolbarItems',
    props: makeVToolbarItemsProps(),
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        toRef
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      provideDefaults(vm, {
        VBtn: {
          color: toRef(props, 'color'),
          height: 'inherit',
          variant: toRef(props, 'variant')
        }
      });
      const rootClasses = computed(() => normalizeClass(['v-toolbar-items', classes.value]));
      return {
        expose: {},
        renderInput: {
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AToolbarItems = defineAlpineComponent({
    ..._ToolbarItems,
    name: 'AToolbarItems'
  });

  // Types

  const AToolbarTitle = defineAlpineComponent({
    ..._ToolbarTitle,
    name: 'AToolbarTitle'
  });

  // Styles

  // Types

  const makeVTooltipProps = propsFactory({
    id: String,
    text: String,
    ...omit(makeVOverlayProps({
      closeOnBack: false,
      location: 'end',
      locationStrategy: 'connected',
      eager: true,
      minWidth: 0,
      offset: 10,
      openOnClick: false,
      openOnHover: true,
      origin: 'auto',
      scrim: false,
      scrollStrategy: 'reposition',
      transition: false
    }), ['absolute', 'persistent'])
  }, 'VTooltip');
  const _Tooltip = defineComponent({
    name: 'VTooltip',
    props: makeVTooltipProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null,
      activator: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        mergeProps,
        ref
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const isActive = useProxiedModel(vm, props, 'modelValue');
      const {
        scopeId
      } = useScopeId(vm);
      const uid = getUid(vm);
      const id = computed(() => props.id || `v-tooltip-${uid}`);
      const overlay = ref();
      const location = computed(() => {
        return props.location.split(' ').length > 1 ? props.location : props.location + ' center';
      });
      const origin = computed(() => {
        return props.origin === 'auto' || props.origin === 'overlap' || props.origin.split(' ').length > 1 || props.location.split(' ').length > 1 ? props.origin : props.origin + ' center';
      });
      const transition = computed(() => {
        if (props.transition) return props.transition;
        return isActive.value ? 'scale-transition' : 'fade-transition';
      });
      const activatorProps = computed(() => mergeProps({
        'aria-describedby': id.value
      }, props.activatorProps));
      const overlayProps = computed(() => _Overlay.filterProps(props));
      const rootClasses = computed(() => normalizeClass(['v-tooltip', classes.value]));
      return {
        expose: forwardRefs({}, overlay),
        renderInput: {
          id,
          isActive,
          location,
          origin,
          scopeId,
          transition,
          activatorProps,
          overlay,
          overlayProps,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const ATooltip = defineAlpineComponent({
    ..._Tooltip,
    name: 'ATooltip'
  });

  // Composables
  const makeVValidationProps = makeValidationProps;
  const _Validation = defineComponent({
    name: 'VValidation',
    props: makeVValidationProps(),
    emits: {
      'update:modelValue': value => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const validation = useValidation(vm, props, 'validation');
      return {
        expose: {},
        renderInput: {
          validation
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AValidation = defineAlpineComponent({
    ..._Validation,
    name: 'AValidation'
  });

  // Styles

  // Types

  // NOTE(Alpinui): Removed the conditional type
  //                Also used `TemplateRef` instead of `Ref<HTMLElement>`

  const makeVVirtualScrollProps = propsFactory({
    items: {
      type: Array,
      default: () => []
    },
    renderless: Boolean,
    ...makeVirtualProps(),
    ...makeComponentProps(),
    ...makeDimensionProps()
  }, 'VVirtualScroll');
  const _VirtualScroll = defineComponent({
    name: 'VVirtualScroll',
    props: makeVVirtualScrollProps(),
    slots: {},
    setupHeadless(props, vm) {
      const {
        computed,
        onMounted,
        ref,
        toRef,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        dimensionStyles
      } = useDimension(vm, props);
      const {
        containerRef,
        markerRef,
        handleScroll,
        handleScrollend,
        handleItemResize,
        scrollToIndex,
        paddingTop,
        paddingBottom,
        computedItems
      } = useVirtual(vm, props, toRef(props, 'items'));
      function handleListeners() {
        let add = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        const method = add ? 'addEventListener' : 'removeEventListener';
        if (containerRef.value === document.documentElement) {
          document[method]('scroll', handleScroll, {
            passive: true
          });
          document[method]('scrollend', handleScrollend);
        } else {
          containerRef.value?.[method]('scroll', handleScroll, {
            passive: true
          });
          containerRef.value?.[method]('scrollend', handleScrollend);
        }
      }

      // NOTE(Alpinui): Replaced `useToggleScope`
      const isMounted = ref(false);
      const areListenersSet = ref(false);
      onMounted(() => isMounted.value = true);
      watch([() => props.renderless, isMounted], () => {
        if (!isMounted.value) return;

        // NOTE(Alpinui): This block was previously inside `onMounted`
        if (props.renderless && !areListenersSet.value) {
          containerRef.value = getScrollParent(vm.el, true);
          handleListeners(true);
          areListenersSet.value = true;
        } else if (!props.renderless && areListenersSet.value) {
          // NOTE(Alpinui): This block was previously inside `onScopeDispose`
          handleListeners();
        }
      });
      const scrollClasses = computed(() => normalizeClass(['v-virtual-scroll', classes.value]));
      const scrollStyles = computed(() => normalizeStyle([dimensionStyles.value, styles.value]));
      const markerStyles = computed(() => normalizeStyle({
        paddingTop: convertToUnit(paddingTop.value),
        paddingBottom: convertToUnit(paddingBottom.value)
      }));
      return {
        expose: {
          scrollToIndex
        },
        renderInput: {
          computedItems,
          containerRef,
          markerRef,
          markerStyles,
          paddingBottom,
          paddingTop,
          scrollClasses,
          scrollStyles,
          handleItemResize,
          handleScroll,
          handleScrollend
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AVirtualScroll = defineAlpineComponent({
    ..._VirtualScroll,
    name: 'AVirtualScroll'
  });

  // Composables

  // Types

  const makeVVirtualScrollItemProps = propsFactory({
    renderless: Boolean,
    ...makeComponentProps()
  }, 'VVirtualScrollItem');
  const _VirtualScrollItem = defineComponent({
    name: 'VVirtualScrollItem',
    inheritAttrs: false,
    props: makeVVirtualScrollItemProps(),
    emits: {
      'update:height': height => true
    },
    slots: makeSlots({
      default: null
    }),
    setupHeadless(props, vm) {
      const {
        computed,
        watch
      } = vm.reactivity;
      const {
        classes,
        styles
      } = useComponent(vm, props);
      const {
        resizeRef,
        contentRect
      } = useResizeObserver(vm, undefined, 'border');
      const rootClasses = computed(() => normalizeClass(['v-virtual-scroll__item', classes.value]));
      watch(() => contentRect.value?.height, height => {
        if (height != null) vm.emit('update:height', height);
      });
      return {
        expose: {},
        renderInput: {
          resizeRef,
          rootClasses,
          rootStyles: styles
        }
      };
    },
    renderHeadless: () => null
  });

  // Types

  const AVirtualScrollItem = defineAlpineComponent({
    ..._VirtualScrollItem,
    name: 'AVirtualScrollItem'
  });

  // Types

  const AWindow = defineAlpineComponent({
    ..._Window,
    name: 'AWindow'
  });

  // Types

  const AWindowItem = defineAlpineComponent({
    ..._WindowItem,
    name: 'AWindowItem'
  });

  // // export * from '@/components/transitions' // NOT AVAILABLE FOR ALPINE

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    AAlert: AAlert,
    AAlertTitle: AAlertTitle,
    AApp: AApp,
    AAppBar: AAppBar,
    AAppBarNavIcon: AAppBarNavIcon,
    AAppBarTitle: AAppBarTitle,
    AAutocomplete: AAutocomplete,
    AAvatar: AAvatar,
    ABadge: ABadge,
    ABanner: ABanner,
    ABannerActions: ABannerActions,
    ABannerText: ABannerText,
    ABarline: ABarline,
    ABottomNavigation: ABottomNavigation,
    ABottomSheet: ABottomSheet,
    ABreadcrumbs: ABreadcrumbs,
    ABreadcrumbsDivider: ABreadcrumbsDivider,
    ABreadcrumbsItem: ABreadcrumbsItem,
    ABtn: ABtn,
    ABtnGroup: ABtnGroup,
    ABtnToggle: ABtnToggle,
    ACard: ACard,
    ACardActions: ACardActions,
    ACardItem: ACardItem,
    ACardSubtitle: ACardSubtitle,
    ACardText: ACardText,
    ACardTitle: ACardTitle,
    ACarousel: ACarousel,
    ACarouselControls: ACarouselControls,
    ACarouselItem: ACarouselItem,
    ACheckbox: ACheckbox,
    ACheckboxBtn: ACheckboxBtn,
    AChip: AChip,
    AChipGroup: AChipGroup,
    AClassIcon: AClassIcon,
    ACode: ACode,
    ACol: ACol,
    AColorPicker: AColorPicker,
    AColorPickerCanvas: AColorPickerCanvas,
    AColorPickerEdit: AColorPickerEdit,
    AColorPickerPreview: AColorPickerPreview,
    AColorPickerSwatches: AColorPickerSwatches,
    ACombobox: ACombobox,
    AComponentIcon: AComponentIcon,
    AConfirmEdit: AConfirmEdit,
    AContainer: AContainer,
    ACounter: ACounter,
    ADataIterator: ADataIterator,
    ADataTable: ADataTable,
    ADataTableColumn: ADataTableColumn,
    ADataTableFooter: ADataTableFooter,
    ADataTableGroupHeaderRow: ADataTableGroupHeaderRow,
    ADataTableHeaders: ADataTableHeaders,
    ADataTableRow: ADataTableRow,
    ADataTableRows: ADataTableRows,
    ADataTableServer: ADataTableServer,
    ADataTableVirtual: ADataTableVirtual,
    ADatePicker: ADatePicker,
    ADatePickerControls: ADatePickerControls,
    ADatePickerHeader: ADatePickerHeader,
    ADatePickerMonth: ADatePickerMonth,
    ADatePickerMonths: ADatePickerMonths,
    ADatePickerYears: ADatePickerYears,
    ADefaultsProvider: ADefaultsProvider,
    ADialog: ADialog,
    ADivider: ADivider,
    AEmptyState: AEmptyState,
    AExpansionPanel: AExpansionPanel,
    AExpansionPanelText: AExpansionPanelText,
    AExpansionPanelTitle: AExpansionPanelTitle,
    AExpansionPanels: AExpansionPanels,
    AFa4Icon: AFa4Icon,
    AFab: AFab,
    AField: AField,
    AFieldLabel: AFieldLabel,
    AFileInput: AFileInput,
    AFooter: AFooter,
    AForm: AForm,
    AHover: AHover,
    AIcon: AIcon,
    AImg: AImg,
    AInfiniteScroll: AInfiniteScroll,
    AInput: AInput,
    AItem: AItem,
    AItemGroup: AItemGroup,
    AKbd: AKbd,
    ALabel: ALabel,
    ALayout: ALayout,
    ALayoutItem: ALayoutItem,
    ALazy: ALazy,
    ALigatureIcon: ALigatureIcon,
    AList: AList,
    AListChildren: AListChildren,
    AListGroup: AListGroup,
    AListGroupActivator: AListGroupActivator,
    AListImg: AListImg,
    AListItem: AListItem,
    AListItemAction: AListItemAction,
    AListItemMedia: AListItemMedia,
    AListItemSubtitle: AListItemSubtitle,
    AListItemTitle: AListItemTitle,
    AListSubheader: AListSubheader,
    ALoaderSlot: ALoaderSlot,
    ALocaleProvider: ALocaleProvider,
    AMain: AMain,
    AMdIcon: AMdIcon,
    AMdiIcon: AMdiIcon,
    AMenu: AMenu,
    AMessages: AMessages,
    ANavigationDrawer: ANavigationDrawer,
    ANoSsr: ANoSsr,
    AOtpInput: AOtpInput,
    AOverlay: AOverlay,
    APagination: APagination,
    AParallax: AParallax,
    AProgressCircular: AProgressCircular,
    AProgressLinear: AProgressLinear,
    ARadio: ARadio,
    ARadioGroup: ARadioGroup,
    ARangeSlider: ARangeSlider,
    ARating: ARating,
    AResponsive: AResponsive,
    ARow: ARow,
    ASelect: ASelect,
    ASelectionControl: ASelectionControl,
    ASelectionControlGroup: ASelectionControlGroup,
    ASheet: ASheet,
    ASkeletonLoader: ASkeletonLoader,
    ASlideGroup: ASlideGroup,
    ASlideGroupItem: ASlideGroupItem,
    ASlider: ASlider,
    ASliderThumb: ASliderThumb,
    ASliderTrack: ASliderTrack,
    ASnackbar: ASnackbar,
    ASpacer: ASpacer,
    ASparkline: ASparkline,
    ASpeedDial: ASpeedDial,
    AStepper: AStepper,
    AStepperActions: AStepperActions,
    AStepperHeader: AStepperHeader,
    AStepperItem: AStepperItem,
    AStepperWindow: AStepperWindow,
    AStepperWindowItem: AStepperWindowItem,
    ASvgIcon: ASvgIcon,
    ASwitch: ASwitch,
    ASystemBar: ASystemBar,
    ATab: ATab,
    ATable: ATable,
    ATabs: ATabs,
    ATabsWindow: ATabsWindow,
    ATabsWindowItem: ATabsWindowItem,
    ATextField: ATextField,
    ATextarea: ATextarea,
    AThemeProvider: AThemeProvider,
    ATimeline: ATimeline,
    ATimelineDivider: ATimelineDivider,
    ATimelineItem: ATimelineItem,
    AToolbar: AToolbar,
    AToolbarItems: AToolbarItems,
    AToolbarTitle: AToolbarTitle,
    ATooltip: ATooltip,
    ATrendline: ATrendline,
    AValidation: AValidation,
    AVirtualScroll: AVirtualScroll,
    AVirtualScrollItem: AVirtualScrollItem,
    AWindow: AWindow,
    AWindowItem: AWindowItem,
    Alpinui: Alpinui
  });

  /**
   * Returns:
   *  - 'null' if the node is not attached to the DOM
   *  - the root node (HTMLDocument | ShadowRoot) otherwise
   */
  function attachedRoot(node) {
    /* istanbul ignore next */
    if (typeof node.getRootNode !== 'function') {
      // Shadow DOM not supported (IE11), lets find the root of this node
      while (node.parentNode) node = node.parentNode;

      // The root parent is the document if the node is attached to the DOM
      if (node !== document) return null;
      return document;
    }
    const root = node.getRootNode();

    // The composed root node is the document if the node is attached to the DOM
    if (root !== document && root.getRootNode({
      composed: true
    }) !== document) return null;
    return root;
  }

  // Utilities

  // Types

  function defaultConditional() {
    return true;
  }
  function checkEvent(e, el, binding) {
    // The include element callbacks below can be expensive
    // so we should avoid calling them when we're not active.
    // Explicitly check for false to allow fallback compatibility
    // with non-toggleable components
    if (!e || checkIsActive(e, binding) === false) return false;

    // If we're clicking inside the shadowroot, then the app root doesn't get the same
    // level of introspection as to _what_ we're clicking. We want to check to see if
    // our target is the shadowroot parent container, and if it is, ignore.
    const root = attachedRoot(el);
    if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot && root.host === e.target) return false;

    // Check if additional elements were passed to be included in check
    // (click must be outside all included elements, if any)
    const elements = (typeof binding.value === 'object' && binding.value.include || (() => []))();
    // Add the root element for the component this directive was defined on
    elements.push(el);

    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occur before
    // the bubbling click event on any outside elements.
    return !elements.some(el => el?.contains(e.target));
  }
  function checkIsActive(e, binding) {
    const isActive = typeof binding.value === 'object' && binding.value.closeConditional || defaultConditional;
    return isActive(e);
  }
  function directive(e, el, binding) {
    const handler = typeof binding.value === 'function' ? binding.value : binding.value?.handler;
    el._clickOutsideMeta?.lastMousedownWasOutside && checkEvent(e, el, binding) && setTimeout(() => {
      checkIsActive(e, binding) && handler?.(e);
    }, 0);
  }
  function handleShadow(el, callback) {
    const root = attachedRoot(el);
    callback(document);
    if (typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot) {
      callback(root);
    }
  }
  const ClickOutsideDirective = {
    // [data-app] may not be found
    // if using bind, inserted makes
    // sure that the root element is
    // available, iOS does not support
    // clicks on body
    mounted(el, binding) {
      const onClick = e => directive(e, el, binding);
      const onMousedown = e => {
        el._clickOutsideMeta = el._clickOutsideMeta || {
          lastMousedownWasOutside: false
        };
        el._clickOutsideMeta.lastMousedownWasOutside = checkEvent(e, el, binding);
      };
      handleShadow(el, app => {
        app.addEventListener('click', onClick, true);
        app.addEventListener('mousedown', onMousedown, true);
      });
      el._clickOutside = el._clickOutside || new Map();
      el._clickOutsideMeta = el._clickOutsideMeta || {
        lastMousedownWasOutside: false
      };
      el._clickOutside.set(el, {
        onClick,
        onMousedown
      });
    },
    unmounted(el, binding) {
      if (!el._clickOutside) return;
      handleShadow(el, app => {
        if (!app || !el._clickOutside?.has(el)) return;
        const {
          onClick,
          onMousedown
        } = el._clickOutside.get(el);
        app.removeEventListener('click', onClick, true);
        app.removeEventListener('mousedown', onMousedown, true);
      });
      el._clickOutside.delete(el);
    }
  };

  const ClickOutside = createAlpineDirective(ClickOutsideDirective);

  // Utilities

  // Types

  function mounted$4(el, binding) {
    if (!SUPPORTS_INTERSECTION) return;
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      handler,
      options
    } = typeof value === 'object' ? value : {
      handler: value,
      options: {}
    };
    const observer = new IntersectionObserver(function () {
      let entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let observer = arguments.length > 1 ? arguments[1] : undefined;
      const _observe = el._observe?.get(el);
      if (!_observe) return; // Just in case, should never fire

      const isIntersecting = entries.some(entry => entry.isIntersecting);

      // If is not quiet or has already been
      // initted, invoke the user callback
      if (handler && (!modifiers.quiet || _observe.init) && (!modifiers.once || isIntersecting || _observe.init)) {
        handler(isIntersecting, entries, observer);
      }
      if (isIntersecting && modifiers.once) unmounted$4(el);else _observe.init = true;
    }, options);
    el._observe = el._observe ?? new Map();
    el._observe.set(el, {
      init: false,
      observer
    });
    observer.observe(el);
  }
  function unmounted$4(el, binding) {
    const observe = el._observe?.get(el);
    if (!observe) return;
    observe.observer.unobserve(el);
    el._observe.delete(el);
  }
  const IntersectDirective = {
    mounted: mounted$4,
    unmounted: unmounted$4
  };

  const Intersect = createAlpineDirective(IntersectDirective);

  // Types

  function mounted$3(el, binding) {
    const modifiers = binding.modifiers || {};
    const value = binding.value;
    const {
      once,
      immediate,
      ...modifierKeys
    } = modifiers;
    const defaultValue = !Object.keys(modifierKeys).length;
    const {
      handler,
      options
    } = typeof value === 'object' ? value : {
      handler: value,
      options: {
        attributes: modifierKeys?.attr ?? defaultValue,
        characterData: modifierKeys?.char ?? defaultValue,
        childList: modifierKeys?.child ?? defaultValue,
        subtree: modifierKeys?.sub ?? defaultValue
      }
    };
    const observer = new MutationObserver(function () {
      let mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      let observer = arguments.length > 1 ? arguments[1] : undefined;
      handler?.(mutations, observer);
      if (once) unmounted$3(el);
    });
    if (immediate) handler?.([], observer);
    el._mutate = el._mutate ?? new Map();
    el._mutate.set(el, {
      observer
    });
    observer.observe(el, options);
  }
  function unmounted$3(el, binding) {
    if (!el._mutate?.has(el)) return;
    el._mutate.get(el).observer.disconnect();
    el._mutate.delete(el);
  }
  const MutateDirective = {
    mounted: mounted$3,
    unmounted: unmounted$3
  };

  const Mutate = createAlpineDirective(MutateDirective);

  // Types

  function mounted$2(el, binding) {
    const handler = binding.value;
    const options = {
      passive: !binding.modifiers?.active
    };
    window.addEventListener('resize', handler, options);
    el._onResize = el._onResize ?? new Map();
    el._onResize.set(el, {
      handler,
      options
    });
    if (!binding.modifiers?.quiet) {
      handler();
    }
  }
  function unmounted$2(el, binding) {
    if (!el._onResize?.has(el)) return;
    const {
      handler,
      options
    } = el._onResize.get(el);
    window.removeEventListener('resize', handler, options);
    el._onResize.delete(el);
  }
  const ResizeDirective = {
    mounted: mounted$2,
    unmounted: unmounted$2
  };

  const Resize = createAlpineDirective(ResizeDirective);

  // Styles

  // Types

  const stopSymbol = Symbol('rippleStop');
  const DELAY_RIPPLE = 80;
  function transform(el, value) {
    el.style.transform = value;
    el.style.webkitTransform = value;
  }
  function isTouchEvent(e) {
    return e.constructor.name === 'TouchEvent';
  }
  function isKeyboardEvent(e) {
    return e.constructor.name === 'KeyboardEvent';
  }
  const calculate = function (e, el) {
    let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let localX = 0;
    let localY = 0;
    if (!isKeyboardEvent(e)) {
      const offset = el.getBoundingClientRect();
      const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
      localX = target.clientX - offset.left;
      localY = target.clientY - offset.top;
    }
    let radius = 0;
    let scale = 0.3;
    if (el._ripple?.circle) {
      scale = 0.15;
      radius = el.clientWidth / 2;
      radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    } else {
      radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    }
    const centerX = `${(el.clientWidth - radius * 2) / 2}px`;
    const centerY = `${(el.clientHeight - radius * 2) / 2}px`;
    const x = value.center ? centerX : `${localX - radius}px`;
    const y = value.center ? centerY : `${localY - radius}px`;
    return {
      radius,
      scale,
      x,
      y,
      centerX,
      centerY
    };
  };
  const ripples = {
    /* eslint-disable max-statements */
    show(e, el) {
      let value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!el?._ripple?.enabled) {
        return;
      }
      const container = document.createElement('span');
      const animation = document.createElement('span');
      container.appendChild(animation);
      container.className = 'v-ripple__container';
      if (value.class) {
        container.className += ` ${value.class}`;
      }
      const {
        radius,
        scale,
        x,
        y,
        centerX,
        centerY
      } = calculate(e, el, value);
      const size = `${radius * 2}px`;
      animation.className = 'v-ripple__animation';
      animation.style.width = size;
      animation.style.height = size;
      el.appendChild(container);
      const computed = window.getComputedStyle(el);
      if (computed && computed.position === 'static') {
        el.style.position = 'relative';
        el.dataset.previousPosition = 'static';
      }
      animation.classList.add('v-ripple__animation--enter');
      animation.classList.add('v-ripple__animation--visible');
      transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
      animation.dataset.activated = String(performance.now());
      setTimeout(() => {
        animation.classList.remove('v-ripple__animation--enter');
        animation.classList.add('v-ripple__animation--in');
        transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
      }, 0);
    },
    hide(el) {
      if (!el?._ripple?.enabled) return;
      const ripples = el.getElementsByClassName('v-ripple__animation');
      if (ripples.length === 0) return;
      const animation = ripples[ripples.length - 1];
      if (animation.dataset.isHiding) return;else animation.dataset.isHiding = 'true';
      const diff = performance.now() - Number(animation.dataset.activated);
      const delay = Math.max(250 - diff, 0);
      setTimeout(() => {
        animation.classList.remove('v-ripple__animation--in');
        animation.classList.add('v-ripple__animation--out');
        setTimeout(() => {
          const ripples = el.getElementsByClassName('v-ripple__animation');
          if (ripples.length === 1 && el.dataset.previousPosition) {
            el.style.position = el.dataset.previousPosition;
            delete el.dataset.previousPosition;
          }
          if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode);
        }, 300);
      }, delay);
    }
  };
  function isRippleEnabled(value) {
    return typeof value === 'undefined' || !!value;
  }
  function rippleShow(e) {
    const value = {};
    const element = e.currentTarget;
    if (!element?._ripple || element._ripple.touched || e[stopSymbol]) return;

    // Don't allow the event to trigger ripples on any other elements
    e[stopSymbol] = true;
    if (isTouchEvent(e)) {
      element._ripple.touched = true;
      element._ripple.isTouch = true;
    } else {
      // It's possible for touch events to fire
      // as mouse events on Android/iOS, this
      // will skip the event call if it has
      // already been registered as touch
      if (element._ripple.isTouch) return;
    }
    value.center = element._ripple.centered || isKeyboardEvent(e);
    if (element._ripple.class) {
      value.class = element._ripple.class;
    }
    if (isTouchEvent(e)) {
      // already queued that shows or hides the ripple
      if (element._ripple.showTimerCommit) return;
      element._ripple.showTimerCommit = () => {
        ripples.show(e, element, value);
      };
      element._ripple.showTimer = window.setTimeout(() => {
        if (element?._ripple?.showTimerCommit) {
          element._ripple.showTimerCommit();
          element._ripple.showTimerCommit = null;
        }
      }, DELAY_RIPPLE);
    } else {
      ripples.show(e, element, value);
    }
  }
  function rippleStop(e) {
    e[stopSymbol] = true;
  }
  function rippleHide(e) {
    const element = e.currentTarget;
    if (!element?._ripple) return;
    window.clearTimeout(element._ripple.showTimer);

    // The touch interaction occurs before the show timer is triggered.
    // We still want to show ripple effect.
    if (e.type === 'touchend' && element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit();
      element._ripple.showTimerCommit = null;

      // re-queue ripple hiding
      element._ripple.showTimer = window.setTimeout(() => {
        rippleHide(e);
      });
      return;
    }
    window.setTimeout(() => {
      if (element._ripple) {
        element._ripple.touched = false;
      }
    });
    ripples.hide(element);
  }
  function rippleCancelShow(e) {
    const element = e.currentTarget;
    if (!element?._ripple) return;
    if (element._ripple.showTimerCommit) {
      element._ripple.showTimerCommit = null;
    }
    window.clearTimeout(element._ripple.showTimer);
  }
  let keyboardRipple = false;
  function keyboardRippleShow(e) {
    if (!keyboardRipple && (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space)) {
      keyboardRipple = true;
      rippleShow(e);
    }
  }
  function keyboardRippleHide(e) {
    keyboardRipple = false;
    rippleHide(e);
  }
  function focusRippleHide(e) {
    if (keyboardRipple) {
      keyboardRipple = false;
      rippleHide(e);
    }
  }
  function updateRipple(el, binding, wasEnabled) {
    const {
      value,
      modifiers
    } = binding;
    const enabled = isRippleEnabled(value);
    if (!enabled) {
      ripples.hide(el);
    }
    el._ripple = el._ripple ?? {};
    el._ripple.enabled = enabled;
    el._ripple.centered = modifiers.center;
    el._ripple.circle = modifiers.circle;
    if (isObject(value) && value.class) {
      el._ripple.class = value.class;
    }
    if (enabled && !wasEnabled) {
      if (modifiers.stop) {
        el.addEventListener('touchstart', rippleStop, {
          passive: true
        });
        el.addEventListener('mousedown', rippleStop);
        return;
      }
      el.addEventListener('touchstart', rippleShow, {
        passive: true
      });
      el.addEventListener('touchend', rippleHide, {
        passive: true
      });
      el.addEventListener('touchmove', rippleCancelShow, {
        passive: true
      });
      el.addEventListener('touchcancel', rippleHide);
      el.addEventListener('mousedown', rippleShow);
      el.addEventListener('mouseup', rippleHide);
      el.addEventListener('mouseleave', rippleHide);
      el.addEventListener('keydown', keyboardRippleShow);
      el.addEventListener('keyup', keyboardRippleHide);
      el.addEventListener('blur', focusRippleHide);

      // Anchor tags can be dragged, causes other hides to fail - #1537
      el.addEventListener('dragstart', rippleHide, {
        passive: true
      });
    } else if (!enabled && wasEnabled) {
      removeListeners(el);
    }
  }
  function removeListeners(el) {
    el.removeEventListener('mousedown', rippleShow);
    el.removeEventListener('touchstart', rippleShow);
    el.removeEventListener('touchend', rippleHide);
    el.removeEventListener('touchmove', rippleCancelShow);
    el.removeEventListener('touchcancel', rippleHide);
    el.removeEventListener('mouseup', rippleHide);
    el.removeEventListener('mouseleave', rippleHide);
    el.removeEventListener('keydown', keyboardRippleShow);
    el.removeEventListener('keyup', keyboardRippleHide);
    el.removeEventListener('dragstart', rippleHide);
    el.removeEventListener('blur', focusRippleHide);
  }
  const RippleDirective = {
    mounted: (el, binding) => {
      updateRipple(el, binding, false);
    },
    updated(el, binding) {
      if (binding.value === binding.oldValue) {
        return;
      }
      const wasEnabled = isRippleEnabled(binding.oldValue);
      updateRipple(el, binding, wasEnabled);
    },
    unmounted: el => {
      delete el._ripple;
      removeListeners(el);
    }
  };

  const Ripple = createAlpineDirective(RippleDirective);

  // Types

  function mounted$1(el, binding) {
    const {
      self = false
    } = binding.modifiers ?? {};
    const value = binding.value;
    const options = typeof value === 'object' && value.options || {
      passive: true
    };
    const handler = typeof value === 'function' || 'handleEvent' in value ? value : value.handler;
    const target = self ? el : binding.arg ? document.querySelector(binding.arg) : window;
    if (!target) return;
    target.addEventListener('scroll', handler, options);
    el._onScroll = el._onScroll ?? new Map();
    el._onScroll.set(el, {
      handler,
      options,
      // Don't reference self
      target: self ? undefined : target
    });
  }
  function unmounted$1(el, binding) {
    if (!el._onScroll?.has(el)) return;
    const {
      handler,
      options,
      target = el
    } = el._onScroll.get(el);
    target.removeEventListener('scroll', handler, options);
    el._onScroll.delete(el);
  }
  function updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    unmounted$1(el);
    mounted$1(el, binding);
  }
  const ScrollDirective = {
    mounted: mounted$1,
    unmounted: unmounted$1,
    updated
  };

  const Scroll = createAlpineDirective(ScrollDirective);

  // Utilities

  // Types

  const handleGesture = wrapper => {
    const {
      touchstartX,
      touchendX,
      touchstartY,
      touchendY
    } = wrapper;
    const dirRatio = 0.5;
    const minDistance = 16;
    wrapper.offsetX = touchendX - touchstartX;
    wrapper.offsetY = touchendY - touchstartY;
    if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
      wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
      wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
    }
    if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
      wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
      wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
    }
  };
  function touchstart(event, wrapper) {
    const touch = event.changedTouches[0];
    wrapper.touchstartX = touch.clientX;
    wrapper.touchstartY = touch.clientY;
    wrapper.start?.({
      originalEvent: event,
      ...wrapper
    });
  }
  function touchend(event, wrapper) {
    const touch = event.changedTouches[0];
    wrapper.touchendX = touch.clientX;
    wrapper.touchendY = touch.clientY;
    wrapper.end?.({
      originalEvent: event,
      ...wrapper
    });
    handleGesture(wrapper);
  }
  function touchmove(event, wrapper) {
    const touch = event.changedTouches[0];
    wrapper.touchmoveX = touch.clientX;
    wrapper.touchmoveY = touch.clientY;
    wrapper.move?.({
      originalEvent: event,
      ...wrapper
    });
  }
  function createHandlers() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const wrapper = {
      touchstartX: 0,
      touchstartY: 0,
      touchendX: 0,
      touchendY: 0,
      touchmoveX: 0,
      touchmoveY: 0,
      offsetX: 0,
      offsetY: 0,
      left: value.left,
      right: value.right,
      up: value.up,
      down: value.down,
      start: value.start,
      move: value.move,
      end: value.end
    };
    return {
      touchstart: e => touchstart(e, wrapper),
      touchend: e => touchend(e, wrapper),
      touchmove: e => touchmove(e, wrapper)
    };
  }
  function mounted(el, binding) {
    const touchOptions = binding.value;
    const target = touchOptions?.parent ? el.parentElement : el;
    const options = touchOptions?.options ?? {
      passive: true
    };
    if (!target) return;
    const handlers = createHandlers(touchOptions);
    target._touchHandlers = target._touchHandlers ?? new Map();
    target._touchHandlers.set(el, handlers);
    keys(handlers).forEach(eventName => {
      target.addEventListener(eventName, handlers[eventName], options);
    });
  }
  function unmounted(el, binding) {
    const touchOptions = binding.value;
    const target = touchOptions?.parent ? el.parentElement : el;
    if (!target?._touchHandlers) return;
    const handlers = target._touchHandlers.get(el) ?? {};
    keys(handlers).forEach(eventName => {
      target.removeEventListener(eventName, handlers[eventName]);
    });
    target._touchHandlers.delete(el);
  }
  const TouchDirective = {
    mounted,
    unmounted
  };

  const Touch = createAlpineDirective(TouchDirective);

  // export { Tooltip } from '@/directives/tooltip/a-tooltip';

  var directives = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ClickOutside: ClickOutside,
    Intersect: Intersect,
    Mutate: Mutate,
    Resize: Resize,
    Ripple: Ripple,
    Scroll: Scroll,
    Touch: Touch
  });

  /*
   * PUBLIC INTERFACES ONLY
   * Imports in our code should be to the composable directly, not this file
   */

  const useDate = createAlpineComposable(useDate$1);
  const useDefaults = createAlpineComposable(useDefaults$1);
  const useDisplay = createAlpineComposable(useDisplay$1);
  const useGoTo = createAlpineComposable(useGoTo$1);
  const useLayout = createAlpineComposable(useLayout$1);
  const useLocale = createAlpineComposable(useLocale$1);
  const useRtl = createAlpineComposable(useRtl$1);
  const useTheme = createAlpineComposable(useTheme$1);

  // Utilities
  // Alpinui adds `$aliasName` to the Alpine components
  const aliasNamePlugin = (vm, _ref) => {
    let {
      options
    } = _ref;
    const {
      aliasName
    } = options;
    Object.defineProperty(vm, '$aliasName', {
      get() {
        return aliasName;
      }
    });
  };

  /** Register Alpinui components with Alpine */
  function createAlpinui$1() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      aliases = {},
      components: components$1 = components,
      directives: directives$1 = directives
    } = options;
    const {
      registerComponent
    } = alpineComposition.createAlpineComposition({
      plugins: [aliasNamePlugin, ...(options?.plugins ?? [])]
    });

    // Allow users to provide their own instance of Alpine via install()
    const install = Alpine => {
      for (const key in directives$1) {
        Alpine.directive(key, directives$1[key]);
      }
      for (const key in components$1) {
        const component = components$1[key];
        registerComponent(Alpine, component);
      }
      for (const key in aliases) {
        const aliasComp = alpineComposition.defineComponent({
          ...aliases[key],
          name: key,
          aliasName: aliases[key].name
        });
        registerComponent(Alpine, aliasComp);
      }
      getUid.reset();
    };
    return {
      install,
      registerComponent
    };
  }
  const version$1 = "0.0.1";
  createAlpinui$1.version = version$1;

  /* eslint-disable local-rules/sort-imports */


  // Types

  const createAlpinui = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return createAlpinui$1({
      components,
      directives,
      ...options
    });
  };
  const version = "0.0.1";
  createAlpinui.version = version;
  setIcons({
    // NOTE: In Alpine we return the name of the components to be passed to `x-data`,
    // e.g. `x-data="ASvgIcon"` or `x-data="AMdiIcon"`
    icons: {
      class: AClassIcon.name,
      component: AComponentIcon.name,
      svg: ASvgIcon.name
    },
    fallbackIconset: {
      name: 'mdi',
      iconset: mdi
    }
  });

  // TODO
  // TODO
  // TODO - DOCUMENT USAGE
  // TODO
  // TODO

  //
  // ```sh
  // npm install alpinui
  // ```
  //
  // ```ts
  // import Alpine from 'alpinejs'
  // import { createAlpinui } from 'alpinui';
  //
  // createAlpinui({
  //   components,
  //   aliases,
  // }).install(Alpine)
  //
  // window.Alpine = Alpine
  // window.Alpine.start()
  // ```

  // AND IF USING CDN:
  //
  // ```html
  // <script defer src="https://cdn.jsdelivr.net/npm/alpinui@0.x.x/dist/alpinui.min.js"></script>
  // <script defer src="https://cdn.jsdelivr.net/npm/alpinui@0.x.x/dist/alpinui.min.css"></script>
  // ```
  //
  // ```ts
  // const { createAlpinui } = Alpinui;
  //
  // document.addEventListener('alpine:init', () => {
  //   createAlpinui({
  //     // components,
  //     // aliases,
  //   }).install(window.Alpine)
  // });
  // ```

  exports.blueprints = blueprints;
  exports.components = components;
  exports.createAlpinui = createAlpinui;
  exports.directives = directives;
  exports.useDate = useDate;
  exports.useDefaults = useDefaults;
  exports.useDisplay = useDisplay;
  exports.useGoTo = useGoTo;
  exports.useLayout = useLayout;
  exports.useLocale = useLocale;
  exports.useRtl = useRtl;
  exports.useTheme = useTheme;
  exports.version = version;

}));
//# sourceMappingURL=alpinui.js.map
