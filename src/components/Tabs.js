const React = require('react');
const styles = require('./Tabs.scss');

function Tabs(props) {
  return <div className={styles.root}>{props.children}</div>;
}

module.exports = Tabs;
