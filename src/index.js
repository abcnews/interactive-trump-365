import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import React from 'react';
import { render } from 'react-dom';
import AmericanApprovalCharts from './components/AmericanApprovalCharts';
import PartyApprovalChart from './components/PartyApprovalChart';
import PartyIdentificationCharts from './components/PartyIdentificationCharts';
import PollAggregationChart from './components/PollAggregationChart';

const components = {
  AmericanApprovalCharts,
  PartyApprovalChart,
  PartyIdentificationCharts,
  PollAggregationChart
};

whenOdysseyLoaded.then(() => {
  selectMounts('trump365').forEach(el => {
    const [, componentName] = getMountValue(el).split(':');
    const Component = components[componentName];
    console.debug({ componentName, Component });

    if (Component) {
      render(<Component />, el);
    }
  });
});
