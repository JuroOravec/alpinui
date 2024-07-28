/*!
* Vuetify v0.0.1
* Forged by John Leider
* Released under the MIT License.
*/

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('alpine-composition'), require('alpine-reactivity')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'alpine-composition', 'alpine-reactivity'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Alpinui = {}, global.Vue, global.AlpineComposition, global.AlpineReactivity));
})(this, (function (exports, vue, alpineComposition, alpineReactivity) { 'use strict';

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
  alpineComposition.defineComponent({
    name: 'VComponentIcon',
    props: makeIconProps(),
    setup(props, vm) {
      const slots = {}; // TODO

      return () => {
        const Icon = props.icon;
        return vue.createVNode(props.tag, null, {
          default: () => [props.icon ? vue.createVNode(Icon, null, null) : slots.default?.()]
        });
      };
    }
  });
  const VSvgIcon = alpineComposition.defineComponent({
    name: 'VSvgIcon',
    inheritAttrs: false,
    props: makeIconProps(),
    setup(props, vm) {
      const attrs = {}; // TODO

      return () => {
        return vue.createVNode(props.tag, vue.mergeProps(attrs, {
          "style": null
        }), {
          default: () => [vue.createVNode("svg", {
            "class": "v-icon__svg",
            "xmlns": "http://www.w3.org/2000/svg",
            "viewBox": "0 0 24 24",
            "role": "img",
            "aria-hidden": "true"
          }, [Array.isArray(props.icon) ? props.icon.map(path => Array.isArray(path) ? vue.createVNode("path", {
            "d": path[0],
            "fill-opacity": path[1]
          }, null) : vue.createVNode("path", {
            "d": path
          }, null)) : vue.createVNode("path", {
            "d": props.icon
          }, null)])]
        });
      };
    }
  });
  alpineComposition.defineComponent({
    name: 'VLigatureIcon',
    props: makeIconProps(),
    setup(props, vm) {
      return () => {
        return vue.createVNode(props.tag, null, {
          default: () => [props.icon]
        });
      };
    }
  });
  const VClassIcon = alpineComposition.defineComponent({
    name: 'VClassIcon',
    props: makeIconProps(),
    setup(props) {
      return () => {
        return vue.createVNode(props.tag, {
          "class": props.icon
        }, null);
      };
    }
  });

  // @ts-nocheck // TODO // TODO // TODO


  // Types

  const aliases = {
    collapse: 'mdi-chevron-up',
    complete: 'mdi-check',
    cancel: 'mdi-close-circle',
    close: 'mdi-close',
    delete: 'mdi-close-circle',
    // delete (e.g. v-chip close)
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
  const mdi = {
    // Not using mergeProps here, functional components merge props by default (?)
    component: props => vue.h(VClassIcon, {
      ...props,
      class: 'mdi'
    })
  };

  // Icons

  // Types

  const md1 = {
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
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi
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

  // Types

  const md2 = {
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
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi
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

  // Types

  const md3 = {
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
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi
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

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    md1: md1,
    md2: md2,
    md3: md3
  });

  const IN_BROWSER = typeof window !== 'undefined';
  const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);

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
  function getObjectValueByPath(obj, path, fallback) {
    // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
    if (obj == null || !path || typeof path !== 'string') return fallback;
    if (obj[path] !== undefined) return obj[path];
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, ''); // strip a leading dot
    return getNestedValue(obj, path.split('.'), fallback);
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
  function clamp(value) {
    let min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    let max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.max(min, Math.min(max, value));
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

  // Only allow a single return type

  /**
   * Convert a computed ref to a record of refs.
   * The getter function must always return an object with the same keys.
   */

  function destructComputed(getter) {
    const refs = alpineReactivity.reactive({});
    const base = alpineReactivity.computed(getter);
    // TODO: REMOVED "flush: sync" option
    alpineReactivity.watchEffect(() => {
      for (const key in base.value) {
        refs[key] = base.value[key];
      }
    });
    return alpineReactivity.toRefs(refs);
  }

  // Utilities

  // Types

  // TODO
  // TODO
  // TODO - HAVE A LOOK AT THIS AGAIN! BECAUSE WE WILL NEED TO EXPLICTLY
  //        HANDLE EVENTS AS CALLBACKS FOR THIS TO WORK!
  // TODO
  // TODO

  // Composables
  function useProxiedModel(vm, props, prop, defaultValue) {
    let transformIn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
    let transformOut = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : v => v;
    const internal = alpineReactivity.ref(props[prop] !== undefined ? props[prop] : defaultValue);
    const kebabProp = toKebabCase(prop);
    const checkKebab = kebabProp !== prop;
    const isControlled = checkKebab ? alpineReactivity.computed(() => {
      void props[prop];
      return !!((vm.$props?.hasOwnProperty(prop) || vm.$props?.hasOwnProperty(kebabProp)) && (vm.$props?.hasOwnProperty(`onUpdate:${prop}`) || vm.$props?.hasOwnProperty(`onUpdate:${kebabProp}`)));
    }) : alpineReactivity.computed(() => {
      void props[prop];
      return !!(vm.$props?.hasOwnProperty(prop) && vm.$props?.hasOwnProperty(`onUpdate:${prop}`));
    });
    alpineReactivity.watch([() => props[prop], isControlled], _ref => {
      let [propVal, newIsControlled] = _ref;
      if (newIsControlled) return;
      internal.value = propVal;
    });
    const model = alpineReactivity.writableComputed({
      get() {
        const externalValue = props[prop];
        return transformIn(isControlled.value ? externalValue : internal.value);
      },
      set(internalValue) {
        const newValue = transformOut(internalValue);
        const value = alpineReactivity.toRaw(isControlled.value ? props[prop] : internal.value);
        if (value === newValue || transformIn(value) === internalValue) {
          return;
        }
        internal.value = newValue;
        vm?.$dispatch(`update:${prop}`, newValue);
      }
    });
    Object.defineProperty(model, 'externalValue', {
      get: () => isControlled.value ? props[prop] : internal.value
    });
    return model;
  }

  /* eslint-disable no-console */

  const warn = msg => console.warn(msg);
  function consoleWarn(message) {
    warn(`Alpinui: ${message}`);
  }
  function consoleError(message) {
    warn(`Alpinui error: ${message}`);
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

  const LANG_PREFIX = '$alpinui.';
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
    const internal = useProxiedModel(vm, props, prop, props[prop] ?? provided.value);

    // TODO(from Vuetify): Remove when defaultValue works
    internal.value = props[prop] ?? provided.value;
    alpineReactivity.watch(provided, v => {
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
  function createAlpinuiAdapter(options) {
    const messages = alpineReactivity.ref({
      en,
      ...options?.messages
    });
    const current = alpineReactivity.shallowRef(options?.locale ?? 'en');
    const fallback = alpineReactivity.shallowRef(options?.fallback ?? 'en');
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
  }

  // Utilities

  // Types

  const LocaleSymbol = Symbol.for('alpinui:locale');
  function isLocaleInstance(obj) {
    return obj.name != null;
  }
  function createLocale(options) {
    const i18n = options?.adapter && isLocaleInstance(options?.adapter) ? options?.adapter : createAlpinuiAdapter(options);
    const rtl = createRtl(i18n, options);
    return {
      ...i18n,
      ...rtl
    };
  }
  function useLocale(vm) {
    const locale = vm.$inject(LocaleSymbol);
    if (!locale) throw new Error('[Alpinui] Could not find injected locale instance');
    return locale;
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
  function createRtl(i18n, options) {
    const rtl = alpineReactivity.ref(options?.rtl ?? genDefaults$3());
    const isRtl = alpineReactivity.computed(() => rtl.value[i18n.current.value] ?? false);
    return {
      isRtl,
      rtl,
      rtlClasses: alpineReactivity.computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
    };
  }
  function useRtl(vm) {
    const locale = vm.$inject(LocaleSymbol);
    if (!locale) throw new Error('[Alpinui] Could not find injected rtl instance');
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
  class AlpinuiDateAdapter {
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
  function createDate(options, locale) {
    const _options = mergeDeep({
      adapter: AlpinuiDateAdapter,
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
      instance: createInstance(_options, locale)
    };
  }
  function createInstance(options, locale) {
    const instance = alpineReactivity.reactive(typeof options.adapter === 'function'
    // eslint-disable-next-line new-cap
    ? new options.adapter({
      locale: options.locale[locale.current.value] ?? locale.current.value,
      formats: options.formats
    }) : options.adapter);
    alpineReactivity.watch(locale.current, value => {
      instance.locale = options.locale[value] ?? value ?? instance.locale;
    });
    return instance;
  }
  function useDate(vm) {
    const options = vm.$inject(DateOptionsSymbol);
    if (!options) throw new Error('[Alpinui] Could not find injected date options');
    const locale = useLocale(vm);
    return createInstance(options, locale);
  }

  // Utilities

  // Types

  const DefaultsSymbol = Symbol.for('alpinui:defaults');
  function createDefaults(options) {
    return alpineReactivity.ref(options);
  }
  function injectDefaults(vm) {
    const defaults = vm.$inject(DefaultsSymbol);
    if (!defaults) throw new Error('[Alpinui] Could not find defaults instance');
    return defaults;
  }
  function propIsDefined(props, prop) {
    return typeof props[prop] !== 'undefined' ||
    // TODO - Keep this?
    typeof props?.[toKebabCase(prop)] !== 'undefined';
  }
  function internalUseDefaults(vm) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let name = arguments.length > 2 ? arguments[2] : undefined;
    let defaults = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : injectDefaults(vm);
    name = name ?? vm.$name;
    if (!name) {
      throw new Error('[Alpinui] Could not determine component name');
    }
    const componentDefaults = alpineReactivity.computed(() => defaults.value?.[props._as ?? name]);
    const _props = new Proxy(props, {
      get(target, prop) {
        const propValue = Reflect.get(target, prop);
        if (prop === 'class' || prop === 'style') {
          return [componentDefaults.value?.[prop], propValue].filter(v => v != null);
        } else if (typeof prop === 'string' && !propIsDefined(vm.$props, prop)) {
          return componentDefaults.value?.[prop] !== undefined ? componentDefaults.value?.[prop] : defaults.value?.global?.[prop] !== undefined ? defaults.value?.global?.[prop] : propValue;
        }
        return propValue;
      }
    });
    const _subcomponentDefaults = alpineReactivity.shallowRef(undefined);
    alpineReactivity.watchEffect(() => {
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
      const injected = vm.$injectSelf(DefaultsSymbol);
      vm.$provide(DefaultsSymbol, alpineReactivity.computed(() => {
        return _subcomponentDefaults.value ? mergeDeep(injected?.value ?? {}, _subcomponentDefaults.value) : injected?.value;
      }));
    }
    return {
      props: _props,
      provideSubDefaults
    };
  }
  function useDefaults(vm) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let name = arguments.length > 2 ? arguments[2] : undefined;
    const {
      props: _props,
      provideSubDefaults
    } = internalUseDefaults(vm, props, name);
    provideSubDefaults();
    return _props;
  }

  // Utilities

  // Types

  function getCurrentInstanceName(vm) {
    return vm?.$aliasName || vm?.$name;
  }
  let _uid = 0;
  let _map = new WeakMap();
  function getUid(vm) {
    if (_map.has(vm)) return _map.get(vm);else {
      const uid = _uid++;
      _map.set(vm, uid);
      return uid;
    }
  }
  getUid.reset = () => {
    _uid = 0;
    _map = new WeakMap();
  };

  // Utilities

  const DisplaySymbol = Symbol.for('alpinui:display');
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
  function createDisplay(options, ssr) {
    const {
      thresholds,
      mobileBreakpoint
    } = parseDisplayOptions(options);
    const height = alpineReactivity.shallowRef(getClientHeight(ssr));
    const platform = alpineReactivity.shallowRef(getPlatform(ssr));
    const width = alpineReactivity.shallowRef(getClientWidth(ssr));
    const state = alpineReactivity.reactive({});
    function updateSize() {
      height.value = getClientHeight();
      width.value = getClientWidth();
    }
    function update() {
      updateSize();
      platform.value = getPlatform();
    }

    // eslint-disable-next-line max-statements
    alpineReactivity.watchEffect(() => {
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
      ...alpineReactivity.toRefs(state),
      update,
      ssr: !!ssr
    };
  }
  function useDisplay(vm) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getCurrentInstanceName(vm);
    const display = vm.$inject(DisplaySymbol);
    if (!display) throw new Error('Could not find Alpinui display injection');
    const mobile = alpineReactivity.computed(() => {
      if (props.mobile != null) return props.mobile;
      if (!props.mobileBreakpoint) return display.mobile.value;
      const breakpointValue = typeof props.mobileBreakpoint === 'number' ? props.mobileBreakpoint : display.thresholds.value[props.mobileBreakpoint];
      return display.width.value < breakpointValue;
    });
    const displayClasses = alpineReactivity.computed(() => {
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

  const GoToSymbol = Symbol.for('alpinui:goto');
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
    return getTarget(el) ?? (document.scrollingElement || document.body);
  }
  function getTarget(el) {
    return typeof el === 'string' ? document.querySelector(el) : refElement(el);
  }
  function getOffset(target, horizontal, rtl) {
    if (typeof target === 'number') return horizontal && rtl ? -target : target;
    let el = getTarget(target);
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
    const target = (typeof _target === 'number' ? _target : getTarget(_target)) ?? 0;
    const container = options.container === 'parent' && target instanceof HTMLElement ? target.parentElement : getContainer(options.container);
    const ease = typeof options.easing === 'function' ? options.easing : options.patterns[options.easing];
    if (!ease) throw new TypeError(`Easing function "${options.easing}" not found.`);
    let targetLocation;
    if (typeof target === 'number') {
      targetLocation = getOffset(target, horizontal, rtl);
    } else {
      targetLocation = getOffset(target, horizontal, rtl) - getOffset(container, horizontal, rtl);
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
  function useGoTo(vm) {
    let _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const goToInstance = vm.$inject(GoToSymbol);
    const {
      isRtl
    } = useRtl(vm);
    if (!goToInstance) throw new Error('[Alpinui] Could not find injected goto instance');
    const goTo = {
      ...goToInstance,
      // can be set via VLocaleProvider
      rtl: alpineReactivity.computed(() => goToInstance.rtl.value || isRtl.value)
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

  // @ts-nocheck // TODO // TODO // TODO

  const IconSymbol = Symbol.for('alpinui:icons');
  function genDefaults$1() {
    return {
      svg: {
        component: VSvgIcon
      },
      class: {
        component: VClassIcon
      }
    };
  }

  // Composables
  function createIcons(options) {
    const sets = genDefaults$1();
    const defaultSet = options?.defaultSet ?? 'mdi';
    if (defaultSet === 'mdi' && !sets.mdi) {
      sets.mdi = mdi;
    }
    return mergeDeep({
      defaultSet,
      sets,
      aliases: {
        ...aliases,
        /* eslint-disable max-len */
        alpinui: ['M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z', ['M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z', 0.6]],
        'alpinui-outline': 'svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z',
        'alpinui-play': ['m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z', ['M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z', 0.6]]
        /* eslint-enable max-len */
      }
    }, options);
  }

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

    // TODO: warn about poor color selections
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

  const ThemeSymbol = Symbol.for('alpinui:theme');
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
  function createTheme(options) {
    const parsedOptions = parseThemeOptions(options);
    const name = alpineReactivity.ref(parsedOptions.defaultTheme);
    const themes = alpineReactivity.ref(parsedOptions.themes);
    const computedThemes = alpineReactivity.computed(() => {
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
    const current = alpineReactivity.computed(() => computedThemes.value[name.value]);
    const styles = alpineReactivity.computed(() => {
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
          id: 'alpinui-theme-stylesheet',
          nonce: parsedOptions.cspNonce || false
        }]
      };
    }
    function install(head) {
      if (parsedOptions.isDisabled) return;

      // TODO - Check if this works?
      if (head) {
        if (head.push) {
          const entry = head.push(getHead());
          if (IN_BROWSER) {
            alpineReactivity.watch(styles, () => {
              entry.patch(getHead());
            });
          }
        } else {
          if (IN_BROWSER) {
            head.addHeadObjs(getHead());
            alpineReactivity.watchEffect(() => head.updateDOM());
          } else {
            head.addHeadObjs(getHead());
          }
        }
      } else {
        let styleEl = IN_BROWSER ? document.getElementById('alpinui-theme-stylesheet') : null;
        if (IN_BROWSER) {
          alpineReactivity.watch(styles, updateStyles, {
            immediate: true
          });
        } else {
          updateStyles();
        }
        function updateStyles() {
          if (typeof document !== 'undefined' && !styleEl) {
            const el = document.createElement('style');
            el.type = 'text/css';
            el.id = 'alpinui-theme-stylesheet';
            if (parsedOptions.cspNonce) el.setAttribute('nonce', parsedOptions.cspNonce);
            styleEl = el;
            document.head.appendChild(styleEl);
          }
          if (styleEl) styleEl.innerHTML = styles.value;
        }
      }
    }
    const themeClasses = alpineReactivity.computed(() => ({
      [`v-theme--${name.value}`]: !parsedOptions.isDisabled
    }));
    const nameReadonly = alpineReactivity.computed(() => name.value);
    return {
      install,
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
    const theme = vm.$inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Alpinui theme injection');
    const name = alpineReactivity.computed(() => {
      return props.theme ?? theme.name.value;
    });
    const current = alpineReactivity.computed(() => theme.themes.value[name.value]);
    const themeClasses = alpineReactivity.computed(() => ({
      [`v-theme--${name.value}`]: !theme.isDisabled
    }));
    const newTheme = {
      ...theme,
      name,
      current,
      themeClasses
    };
    vm.$provide(ThemeSymbol, newTheme);
    return newTheme;
  }
  function useTheme(vm) {
    const theme = vm.$inject(ThemeSymbol, null);
    if (!theme) throw new Error('Could not find Alpinui theme injection');
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

  // TODO - The entrypoint is that, at 'alpine:init' event, we define this Alpineui
  // component. And then, when user uses it, user can tweak what components it uses,
  // and those will be registered afterwards.
  // `document.addEventListener('alpine:init', () => {})`
  const Alpinui = alpineComposition.defineComponent({
    /* eslint-disable vue/multi-word-component-names */
    name: 'Alpinui',
    props: {
      options: {
        type: Object,
        default: () => ({})
      }
    },
    emits: {
      hello: data => true
    },
    // TODO - Convert this to component, so that instead of users defining
    // `createVuetify()`, they declare the top-level component as
    // `<div x-data="alpinui" ></div>`
    setup: (props, vm) => {
      const {
        blueprint,
        ...rest
      } = props.options;
      const options = mergeDeep(blueprint, rest);
      const defaults = createDefaults(options.defaults);
      const display = createDisplay(options.display, options.ssr);
      const theme = createTheme(options.theme);
      const icons = createIcons(options.icons);
      const locale = createLocale(options.locale);
      const date = createDate(options.date, locale);
      const goTo = createGoTo(options.goTo, locale);
      vm.$provide(DefaultsSymbol, defaults);
      vm.$provide(DisplaySymbol, display);
      vm.$provide(ThemeSymbol, theme);
      vm.$provide(IconSymbol, icons);
      vm.$provide(LocaleSymbol, locale);
      vm.$provide(DateOptionsSymbol, date.options);
      vm.$provide(DateAdapterSymbol, date.instance);
      vm.$provide(GoToSymbol, goTo);

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

      const hello = 'world';
      const triggerEmit = () => {
        vm.$emit('hello', {
          a: 1
        });
      };
      return {
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
      };
    }
  });

  // Utilities

  // Types

  // Composables
  function useColor(colors) {
    return destructComputed(() => {
      const classes = {};
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
          classes[`bg-${colors.value.background}`] = true;
        }
      }
      if (colors.value.text) {
        if (isCssColor(colors.value.text)) {
          styles.color = colors.value.text;
          styles.caretColor = colors.value.text;
        } else {
          classes[`text-${colors.value.text}`] = true;
        }
      }
      return {
        colorClasses: classes,
        colorStyles: styles
      };
    });
  }
  function useTextColor(props, name) {
    const colors = alpineReactivity.computed(() => ({
      text: alpineReactivity.isRef(props) ? props.value : name ? props[name] : null
    }));
    const {
      colorClasses: textColorClasses,
      colorStyles: textColorStyles
    } = useColor(colors);
    return {
      textColorClasses,
      textColorStyles
    };
  }

  // Utilities

  // Types

  // Composables
  const makeComponentProps = propsFactory({
    class: Object,
    style: {
      type: Object,
      default: null
    }
  }, 'component');

  // Composables

  // Types

  // TODO
  // TODO
  // TODO - TODO - USE THIS INSTEAD OF @/alpine/component !!!
  // TODO
  // TODO

  // Implementation
  function defineComponent(options) {
    options._setup = options._setup ?? options.setup;
    if (!options.name) {
      consoleWarn('The component is missing an explicit name, unable to generate default prop value');
      return options;
    }
    if (options._setup) {
      options.props = propsFactory(options.props ?? {}, options.name)();
      const propKeys = Object.keys(options.props).filter(key => key !== 'class' && key !== 'style');
      options.filterProps = function filterProps(props) {
        return pick(props, propKeys);
      };
      options.props._as = String;
      options.setup = (props, vm) => {
        const defaults = injectDefaults(vm);

        // Skip props proxy if defaults are not provided
        if (!defaults.value) return options._setup(props, vm);
        const {
          props: _props,
          provideSubDefaults
        } = internalUseDefaults(vm, props, props._as ?? options.name, defaults);
        const setupBindings = options._setup(_props, vm);
        provideSubDefaults();
        return setupBindings;
      };
    }
    return options;
  }

  // TODO
  // TODO
  // TODO - TODO - IS THIS NEEDED?
  // TODO
  // TODO

  // https://github.com/vuejs/core/pull/10557

  // not a vue Component

  const makeVDividerProps = propsFactory({
    color: String,
    inset: Boolean,
    length: [Number, String],
    opacity: [Number, String],
    thickness: [Number, String],
    vertical: Boolean,
    ...makeComponentProps(),
    ...makeThemeProps()
  }, 'ADivider');
  const ADivider = defineComponent({
    name: 'ADivider',
    props: makeVDividerProps(),
    setup(props, vm) {

      const {
        themeClasses
      } = provideTheme(vm, props);
      const {
        textColorClasses,
        textColorStyles
      } = useTextColor(alpineReactivity.toRef(props, 'color'));
      const dividerStyles = alpineReactivity.computed(() => {
        const styles = {};
        if (props.length) {
          styles[props.vertical ? 'height' : 'width'] = convertToUnit(props.length);
        }
        if (props.thickness) {
          styles[props.vertical ? 'borderRightWidth' : 'borderTopWidth'] = convertToUnit(props.thickness);
        }
        return styles;
      });

      // Rendering variables
      const hrClasses = alpineReactivity.computed(() => ({
        'a-divider': true,
        'a-divider--inset': props.inset,
        'a-divider--vertical': props.vertical,
        ...themeClasses.value,
        ...textColorClasses.value,
        ...props.class
      }));
      const hrStyles = alpineReactivity.computed(() => ({
        ...dividerStyles.value,
        ...textColorStyles.value,
        ...(props.opacity != null ? {
          '--v-border-opacity': props.opacity
        } : {}),
        ...props.style
      }));
      const hrAriaOrient = alpineReactivity.computed(() => !vm.$attrs.role || vm.$attrs.role === 'separator' ? props.vertical ? 'vertical' : 'horizontal' : undefined);
      const hrRole = alpineReactivity.computed(() => `${vm.$attrs.role || 'separator'}`);
      alpineReactivity.computed(() => ({
        'a-divider__wrapper': true,
        'a-divider__wrapper--vertical': props.vertical,
        'a-divider__wrapper--inset': props.inset
      }));
      return {
        hrClasses,
        hrStyles,
        hrAriaOrient,
        hrRole
      };
    }
  });

  // export * from './VEmptyState'
  // export * from './VExpansionPanel'
  // export * from './VFab'
  // export * from './VField'
  // export * from './VFileInput'
  // export * from './VFooter'
  // export * from './VForm'
  // export * from './VGrid'
  // export * from './VHover'
  // export * from './VIcon'
  // export * from './VImg'
  // export * from './VInfiniteScroll'
  // export * from './VInput'
  // export * from './VItemGroup'
  // export * from './VKbd'
  // export * from './VLabel'
  // export * from './VLayout'
  // export * from './VLazy'
  // export * from './VList'
  // export * from './VLocaleProvider'
  // export * from './VMain'
  // export * from './VMenu'
  // export * from './VMessages'
  // export * from './VNavigationDrawer'
  // export * from './VNoSsr'
  // export * from './VOtpInput'
  // // export * from './VOverflowBtn'
  // export * from './VOverlay'
  // export * from './VPagination'
  // export * from './VParallax'
  // export * from './VProgressCircular'
  // export * from './VProgressLinear'
  // export * from './VRadio'
  // export * from './VRadioGroup'
  // export * from './VRangeSlider'
  // export * from './VRating'
  // export * from './VResponsive'
  // export * from './VSelect'
  // export * from './VSelectionControl'
  // export * from './VSelectionControlGroup'
  // export * from './VSheet'
  // export * from './VSkeletonLoader'
  // export * from './VSlideGroup'
  // export * from './VSlider'
  // export * from './VSnackbar'
  // export * from './VSparkline'
  // export * from './VSpeedDial'
  // export * from './VStepper'
  // export * from './VSwitch'
  // export * from './VSystemBar'
  // export * from './VTabs'
  // export * from './VTable'
  // export * from './VTextarea'
  // export * from './VTextField'
  // export * from './VThemeProvider'
  // export * from './VTimeline'
  // // export * from './VTimePicker'
  // export * from './VToolbar'
  // export * from './VTooltip'
  // // export * from './VTreeview'
  // export * from './VValidation'
  // export * from './VVirtualScroll'
  // export * from './VWindow'
  // export * from './transitions'

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADivider: ADivider,
    Alpinui: Alpinui
  });

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
      components: components$1 = components
    } = options;
    const {
      registerComponent
    } = alpineComposition.createAlpineComposition({
      plugins: [aliasNamePlugin, ...(options?.plugins ?? [])]
    });

    // Allow users to provide their own instance of Alpine via install()
    const install = Alpine => {
      for (const key in components$1) {
        registerComponent(Alpine, components$1[key]);
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

  // TODO
  // TODO
  // TODO - CHECK IF THESE ARE SET TO GLOBAL_THIS IF IMPORTED VIA CDN
  // TODO   -> SHOULD BE SO - WORKS FOR VUETIFY AND VUE
  // TODO

  const createAlpinui = function () {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return createAlpinui$1({
      components,
      ...options
    });
  };
  const version = "0.0.1";
  createAlpinui.version = version;

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

  exports.blueprints = index;
  exports.components = components;
  exports.createAlpinui = createAlpinui;
  exports.useDate = useDate;
  exports.useDefaults = useDefaults;
  exports.useDisplay = useDisplay;
  exports.useGoTo = useGoTo;
  exports.useLocale = useLocale;
  exports.useRtl = useRtl;
  exports.useTheme = useTheme;
  exports.version = version;

}));
//# sourceMappingURL=alpinui.js.map
