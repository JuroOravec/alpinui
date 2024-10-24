// /* eslint-disable local-rules/sort-imports */

// // Styles
// import '@/styles/main.sass';

// // Icons
// import { VClassIcon, VComponentIcon, VSvgIcon } from '@/components/VIcon/icons';
// import { mdi } from '@/iconsets/mdi';
// import { setIcons } from '@/engines/util/icons';

// import * as blueprints from '@/blueprints';
/* eslint-disable-next-line local-rules/no-components-index */
// import * as components from '@/components';
// import * as directives from '@/directives';
// import { createVuetify as _createVuetify } from './framework';

import * as components from '../alpine/components';

const allProps = Object.entries(components)
  .flatMap(([compName, comp]) => {
    return Object.entries(comp.props).map(([propName, prop]) => ({
      name: `${compName}__${propName}`,
      prop,
    }));
  })
  .reduce<Record<string, any>>((agg, { name, prop }) => {
    agg[name] = prop;
    return agg;
  }, {});
// const allDefaults = Object.values(components).map((comp) => comp.props);
console.log({ allProps });
