// Utilities
import { computed, isRef } from 'alpine-reactivity';
import { getForeground, isCssColor, isParsableColor, parseColor } from '@/util/colorUtils';
import { destructComputed } from '@/util/helpers';

// Types
import type { ComputedRef, Ref } from 'alpine-reactivity';
import type { CSSProperties } from 'vue';

type ColorValue = string | false | null | undefined

export interface TextColorData {
  textColorClasses: ComputedRef<Record<string, boolean>>;
  textColorStyles: ComputedRef<CSSProperties>;
}

export interface BackgroundColorData {
  backgroundColorClasses: ComputedRef<Record<string, boolean>>;
  backgroundColorStyles: ComputedRef<CSSProperties>;
}

// Composables
export function useColor(colors: Ref<{ background?: ColorValue, text?: ColorValue }>) {
  return destructComputed(() => {
    const classes: Record<string, boolean> = {};
    const styles: CSSProperties = {};

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

    return { colorClasses: classes, colorStyles: styles };
  });
}

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): TextColorData
export function useTextColor <T extends Record<K, ColorValue>, K extends string>(
  props: T | Ref<ColorValue>,
  name?: K
): TextColorData {
  const colors = computed(() => ({
    text: isRef<ColorValue>(props) ? props.value : (name ? (props as T)[name] : null),
  }));

  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles,
  } = useColor(colors);

  return { textColorClasses, textColorStyles };
}

export function useBackgroundColor (color: Ref<ColorValue>): BackgroundColorData
export function useBackgroundColor <T extends Record<K, ColorValue>, K extends string> (props: T, name: K): BackgroundColorData
export function useBackgroundColor <T extends Record<K, ColorValue>, K extends string>(
  props: T | Ref<ColorValue>,
  name?: K
): BackgroundColorData {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : (name ? props[name] : null),
  }));

  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles,
  } = useColor(colors);

  return { backgroundColorClasses, backgroundColorStyles };
}
