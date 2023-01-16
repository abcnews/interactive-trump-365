import React from 'react';
import styles from './Chart.scss';

export default function Chart(props) {
  return (
    <div className={styles.root}>
      {props.children}
      {props.source ? <p className={styles.source}>{`(Source: ${props.source})`}</p> : null}
    </div>
  );
}
