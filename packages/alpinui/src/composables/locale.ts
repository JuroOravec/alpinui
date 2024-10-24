// Utilities
import { createVuetifyAdapter } from '@/locale/adapters/vuetify';

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { ClassValue } from './component';
import type { HeadlessInstance } from '@/engines/types';

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
  provide: (vm: HeadlessInstance, props: LocaleOptions) => LocaleInstance;
}

export const LocaleSymbol: InjectionKey<LocaleInstance & RtlInstance> = Symbol.for('vuetify:locale');

function isLocaleInstance(obj: any): obj is LocaleInstance {
  return obj.name != null;
}

export function createLocale(vm: HeadlessInstance, options?: LocaleOptions & RtlOptions) {
  const i18n = options?.adapter && isLocaleInstance(options?.adapter)
    ? options?.adapter
    : createVuetifyAdapter(vm, options);
  const rtl = createRtl(vm, i18n, options);

  return { ...i18n, ...rtl };
}

export function useLocale(vm: HeadlessInstance) {
  const locale = vm.reactivity.inject(LocaleSymbol);

  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');

  return locale;
}

export function provideLocale(
  vm: HeadlessInstance,
  props: LocaleOptions & RtlProps,
) {
  const locale = vm.reactivity.inject(LocaleSymbol);

  if (!locale) throw new Error('[Vuetify] Could not find injected locale instance');

  const i18n = locale.provide(vm, props);
  const rtl = provideRtl(vm, i18n, locale.rtl, props);

  const data = { ...i18n, ...rtl };

  vm.reactivity.provide(LocaleSymbol, data);

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
  rtlClasses: ComputedRef<ClassValue>;
}

export const RtlSymbol: InjectionKey<RtlInstance> = Symbol.for('vuetify:rtl');

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

export function createRtl(
  vm: HeadlessInstance,
  i18n: LocaleInstance,
  options?: RtlOptions,
): RtlInstance {
  const { computed, ref } = vm.reactivity;

  const rtl = ref<Record<string, boolean>>(options?.rtl ?? genDefaults());
  const isRtl = computed(() => rtl.value[i18n.current.value] ?? false);

  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => {
      const rtlValue = isRtl.value ? 'rtl' : 'ltr';
      return {
        [`v-locale--is-${rtlValue}`]: true,
      };
    }),
  };
}

export function provideRtl(
  vm: HeadlessInstance,
  locale: LocaleInstance,
  rtl: RtlInstance['rtl'],
  props: RtlProps,
): RtlInstance {
  const { computed } = vm.reactivity;

  const isRtl = computed(() => props.rtl ?? rtl.value[locale.current.value] ?? false);

  return {
    isRtl,
    rtl,
    rtlClasses: computed(() => {
      const rtlValue = isRtl.value ? 'rtl' : 'ltr';
      return {
        [`v-locale--is-${rtlValue}`]: true,
      };
    }),
  };
}

export function useRtl(vm: HeadlessInstance) {
  const locale = vm.reactivity.inject(LocaleSymbol);

  if (!locale) throw new Error('[Vuetify] Could not find injected rtl instance');

  return { isRtl: locale.isRtl, rtlClasses: locale.rtlClasses };
}
