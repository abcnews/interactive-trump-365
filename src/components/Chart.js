const React = require('react');
const styles = require('./Chart.scss');

function Chart(props) {
  return (
    <div className={styles.root}>
      {props.children}
      {props.source ? <p className={styles.source}>{`(Source: ${props.source})`}</p> : null}
    </div>
  );
}

module.exports = Chart;
