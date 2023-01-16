import React from 'react';
import styles from './Tabs.scss';

export default function Tabs(props) {
  return <div className={styles.root}>{props.children}</div>;
}
