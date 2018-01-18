const React = require('react');
const { render } = require('react-dom');

const roots = [...document.querySelectorAll(`[data-interactive-trump-365-root]`)];

function init() {
  const AmericanApprovalCharts = require('./components/AmericanApprovalCharts');
  const PartyApprovalChart = require('./components/PartyApprovalChart');
  const PartyIdentificationCharts = require('./components/PartyIdentificationCharts');
  const PollAggregationChart = require('./components/PollAggregationChart');

  roots.forEach(root => {
    switch (root.getAttribute('data-interactive-trump-365-root')) {
      case 'AmericanApprovalCharts':
        render(<AmericanApprovalCharts />, root);
        break;
      case 'PollAggregationChart':
        render(<PollAggregationChart />, root);
        break;
      case 'PartyIdentificationCharts':
        render(<PartyIdentificationCharts />, root);
        break;
      case 'PartyApprovalChart':
        render(<PartyApprovalChart />, root);
        break;
      default:
        break;
    }
  });
}

init();

if (module.hot) {
  const reInit = () => {
    try {
      init();
    } catch (err) {
      const ErrorBox = require('./components/ErrorBox');

      roots.forEach((root, index) => {
        render(index === 0 ? <ErrorBox error={err} /> : <div />, root);
      });
    }
  };

  module.hot.accept('./components/AmericanApprovalCharts', reInit);
  module.hot.accept('./components/PartyApprovalChart', reInit);
  module.hot.accept('./components/PartyIdentificationCharts', reInit);
  module.hot.accept('./components/PollAggregationChart', reInit);
}
