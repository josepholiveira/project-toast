import React, { PropsWithChildren } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';
import { useToasts } from '../ToastProvider';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

interface ToastProps extends PropsWithChildren {
  id: string;
  variant: keyof typeof ICONS_BY_VARIANT
}

function Toast({ children, id, variant }: ToastProps) {
  const { handleDismissToast } = useToasts()
  const Icon = ICONS_BY_VARIANT[variant]

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        {<Icon />}
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} -</VisuallyHidden>
        {children}
      </p>
      <button 
        className={styles.closeButton} 
        onClick={() => handleDismissToast(id)} 
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} />
      </button>
    </div>
  );
}


export default Toast;
