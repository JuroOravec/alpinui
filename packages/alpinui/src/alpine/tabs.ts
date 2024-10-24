// @ts-nocheck // TODO // TODO // TODO

import { computed, ref } from 'alpine-reactivity';
import { defineComponent } from 'alpine-composition';

// TODO
// TODO
// TODO - USE THIS AS EXAMPLE USAGE
// TODO
// TODO

const Baz = defineComponent({
  name: 'ABaz',
  props: {
    theTab: {
      // TODO - See https://stackoverflow.com/questions/472418/why-is-4-not-an-instance-of-number
      type: Number,
      // default: () => 22,
    },
  },
  setup: () => {
    return {
      baz: 'baz!',
    };
  },
});

const Tabs = defineComponent({
  name: 'ATabs',
  props: {
    key: {
      // TODO - See https://stackoverflow.com/questions/472418/why-is-4-not-an-instance-of-number
      // type: Number,
      default: () => 22,
    },
  },
  setup: (props, vm) => {
    // Variables
    const name = ref(null);
    const openTab = ref(1);

    const tabQueryName = computed(() => {
      return `tabs-${name.value}`;
    });

    /**
     * Set the current open tab and push the info to query params.
     *
     * @param {number} tabIndex
     */
    const setOpenTab = (tabIndex: number) => {
      openTab.value = tabIndex;

      if (name.value) {
        // @ts-expect-error
        dliver.query.setParams({ [tabQueryName.value]: tabIndex });
      }
    };

    /** Handle tab change from URL */
    const onTabQueryParamChange = (newValue: any, oldValue: any) => {
      if (newValue == null) return;

      const newValNum = typeof newValue === 'number' ? newValue : Number.parseInt(newValue);
      if (newValNum === openTab.value) return;

      setOpenTab(newValNum);
    };

    // If we provided the `name` argument to the "tabs" component, then
    // we register a listener for the query param `tabs-{name}`.
    // The value of this query param is the current active tab (index).
    //
    // When user changes the currently-open tab, we push that info to the URL
    // by updating the `tabs-{name}` query param.
    //
    // And when we navigate to a URL that already had `tabs-{name}` query param
    // set, we load that tab.
    if (name.value) {
      // @ts-expect-error
      dliver.query.registerParam(
        tabQueryName.value,
        (newVal: any, oldVal: any) => onTabQueryParamChange(newVal, oldVal),
      );
    }

    // Sometimes, the scrollable tab content area is scrolled to the bottom
    // when the page loads. So we ensure here that the we scroll to the top if not already
    // Also see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
    const containerEl = vm.$refs.container;
    if (containerEl.scrollTop) {
      vm.$refs.container.scrollTop = 0;
    }

    return {
      openTab,
    };
  },
});
