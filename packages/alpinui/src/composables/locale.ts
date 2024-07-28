// Utilities
import { computed, ref } from 'alpine-reactivity';
import { createAlpinuiAdapter } from '@/locale/adapters/alpinui';

// Types
import type { AlpineInstance, Data, EmitsOptions } from 'alpine-composition';
import type { ComputedRef, Ref } from 'alpine-reactivity';
import type { InjectionKey } from 'vue';

export interface LocaleMessages {
  [key: string]: LocaleMessages | string;
}

export interface LocaleOptions {
  messages?: LocaleMessages;
  locale?: string;
  fallback?: string;
  adapter?: LocaleInstance;
}

export interface LocaleInstance {
  name: string;
  messages: Ref<LocaleMessages>;
  current: Ref<string>;
  fallback: Ref<string>;
  t: (key: string, ...params: unknown[]) => string;
  n: (value: number) => string;
  provide: (vm: AlpineInstance<Data, Data, EmitsOptions>, props: LocaleOptions) => LocaleInstance;
}

export const LocaleSymbol: InjectionKey<LocaleInstance & RtlInstance> = Symbol.for('alpinui:locale');

function isLocaleInstance(obj: any): obj is LocaleInstance {
  return obj.name != null;
}

export function createLocale(options?: LocaleOptions & RtlOptions) {
  const i18n = options?.adapter && isLocaleInstance(options?.adapter)
    ? options?.adapter
    : createAlpinuiAdapter(options);
  const rtl = createRtl(i18n, options);

  return { ...i18n, ...rtl };
}

export function useLocale(vm: AlpineInstance<Data, Data, EmitsOptions>) {
  const locale = vm.$inject(LocaleSymbol);

  if (!locale) throw new Error('[Alpinui] Could not find injected locale instance');

  return locale;
}

export function provideLocale(
  vm: AlpineInstance<Data, Data, EmitsOptions>,
  props: LocaleOptions & RtlProps,
) {
  const locale = vm.$inject(LocaleSymbol);

  if (!locale) throw new Error('[Alpinui] Could not find injected locale instance');

  const i18n = locale.provide(vm, props);
  const rtl = provideRtl(i18n, locale.rtl, props);

  const data = { ...i18n, ...rtl };

  vm.$provide(LocaleSymbol, data);

  return data;
}

// RTL

export interface RtlOptions {
  rtl?: Record<string, boolean>;
}

export interface RtlProps {
  rtl?: boolean;
}

export interface RtlInstance {
  isRtl: ComputedRef<boolean>;
  rtl: Ref<Record<string, boolean>>;
  rtlClasses: ComputedRef<string>;
}

export const RtlSymbol: InjectionKey<RtlInstance> = Symbol.for('alpinui:rtl');

function genDefaults() {
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
    zhHant: false,
  };
}

export function createRtl(i18n: LocaleInstance, options?: RtlOptions): RtlInstance {
  const rtl = ref<Record<string, boolean>>(options?.rtl ?? genDefaults());
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);

  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  };
}

export function provideRtl(
  locale: LocaleInstance,
  rtl: RtlInstance['rtl'],
  props: RtlProps,
): RtlInstance {
  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);

  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`),
  };
}

export function useRtl(vm: AlpineInstance<Data, Data, EmitsOptions>) {
  const locale = vm.$inject(LocaleSymbol);

  if (!locale) throw new Error('[Alpinui] Could not find injected rtl instance');

  return { isRtl: locale.isRtl, rtlClasses: locale.rtlClasses };
}
