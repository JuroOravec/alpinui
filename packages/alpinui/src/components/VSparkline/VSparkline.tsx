// Components
import { VBarline } from './VBarline';
import { VTrendline } from './VTrendline';

// Utilities
import { _Sparkline } from './VSparkline.base';
import { genericVueComponent } from '@/engines/vue';

// Types
import type { VSparklineSlots } from './VSparkline.base';

export { makeVSparklineProps, VSparklineSlots } from './VSparkline.base';

export const VSparkline = genericVueComponent<VSparklineSlots>()({
  ..._Sparkline,
  renderHeadless: (
    vm,
    { lineProps, viewBox, textColorClasses, textColorStyles },
    { props, slots },
  ) => {
    const Tag = props.type === 'trend' ? VTrendline : VBarline;

    return (
      <Tag
        key={ props.type }
        class={ textColorClasses.value }
        style={ textColorStyles.value }
        viewBox={ viewBox.value }
        { ...lineProps.value }
        v-slots={ slots }
      />
    );
  },
});

export type VSparkline = InstanceType<typeof VSparkline>;
