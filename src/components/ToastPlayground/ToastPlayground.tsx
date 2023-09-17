import React, { FormEvent } from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf'
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'] as const;

type Variants = typeof VARIANT_OPTIONS[number]

export type IToast = {
  id: string;
  variant: Variants;
  message: string;
}

const INITIAL_VARIANT = 'notice'

function ToastPlayground() {
  const [message, setMessage] = React.useState('')
  const [variant, setVariant] = React.useState<Variants>(INITIAL_VARIANT)

  const [toasts, setToasts] = React.useState([] as IToast[]);

  function handleCreateToast(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(!message) return

    const newToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    }

    setToasts(toasts => [...toasts, newToast])
    setMessage('')

    setVariant(INITIAL_VARIANT)
  }

  function handleDismissToast(id: string) {
    const filteredToasts = toasts.filter(toast => toast.id !== id) 

    setToasts(filteredToasts)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismissToast={handleDismissToast} />

      <form onSubmit={handleCreateToast} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea 
              value={message} 
              onChange={(event) => setMessage(event.target.value)} 
              id="message" 
              className={styles.messageInput} 
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;

              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={option === variant}
                    onChange={(event) => {
                      setVariant(event.target.value as Variants);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
