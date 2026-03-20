import React from 'react';
import styles from './TopBar.module.css';

export default function TopBar() {
  return (
    <div className={styles.topbar}>
      Free shipping on orders over $150 &nbsp;·&nbsp; New arrivals every Friday &nbsp;·&nbsp; Members get 15% off
    </div>
  );
}
