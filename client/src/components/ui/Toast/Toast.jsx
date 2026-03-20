import React from 'react';
import { useToast } from '../../../hooks/useToast.js';
import styles from './Toast.module.css';

export default function Toast() {
  const { toast } = useToast();

  return (
    <div className={`${styles.toast} ${toast.visible ? styles.show : ''}`}>
      {toast.message}
    </div>
  );
}
