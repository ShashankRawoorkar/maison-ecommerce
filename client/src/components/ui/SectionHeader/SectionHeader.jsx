import React from 'react';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ eyebrow, title, align = 'center' }) {
  return (
    <div className={styles.sectionHeader} style={{ textAlign: align }}>
      <div className={styles.sectionEyebrow}>{eyebrow}</div>
      <h2
        className={styles.sectionTitle}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className={styles.sectionDivider}
        style={{ margin: align === 'center' ? '20px auto 0' : '20px 0 0' }}
      />
    </div>
  );
}
