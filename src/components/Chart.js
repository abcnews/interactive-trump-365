const React = require('react');
const styles = require('./Chart.scss');

function Chart(props) {
  return <div className={styles.root}>{props.children}</div>;
}

module.exports = Chart;
