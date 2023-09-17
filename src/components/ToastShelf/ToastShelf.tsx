import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { IToast } from '../ToastPlayground';

interface ToastShelfProps {
  toasts: IToast[]
  handleDismissToast: (id: string) => void
}

function ToastShelf({ toasts, handleDismissToast }: ToastShelfProps) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map(toast => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast 
            handleDismissToast={handleDismissToast} 
            id={toast.id} 
            variant={toast.variant}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
