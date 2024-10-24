/*
 * PUBLIC INTERFACES ONLY
 * Imports in our code should be to the composable directly, not this file
 */

import { createVueComposable } from '@/engines/vue';
import { useDate as _useDate } from './date';
import { useDefaults as _useDefaults } from './defaults';
import { useDisplay as _useDisplay } from './display';
import { useGoTo as _useGoTo } from './goto';
import { useLayout as _useLayout } from './layout';
import { useLocale as _useLocale, useRtl as _useRtl } from './locale';
import { useTheme as _useTheme } from './theme';

export type { DateInstance } from './date';
export type { DefaultsInstance } from './defaults';
export type { DisplayBreakpoint, DisplayInstance, DisplayThresholds } from './display';
export type { SubmitEventPromise } from './form';
export type { GoToInstance } from './goto';
export type { IconAliases, IconProps, IconSet, IconOptions } from './icons';
export type { LocaleInstance, LocaleMessages, RtlInstance, LocaleOptions, RtlOptions } from './locale';
export type { ThemeDefinition, ThemeInstance } from './theme';

export const useDate = createVueComposable(_useDate);
export const useDefaults = createVueComposable(_useDefaults);
export const useDisplay = createVueComposable(_useDisplay);
export const useGoTo = createVueComposable(_useGoTo);
export const useLayout = createVueComposable(_useLayout);
export const useLocale = createVueComposable(_useLocale);
export const useRtl = createVueComposable(_useRtl);
export const useTheme = createVueComposable(_useTheme);
