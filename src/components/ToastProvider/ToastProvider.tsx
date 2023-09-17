import * as React from 'react';
import { Variants } from '../ToastPlayground';

export type IToast = {
  id: string;
  variant: Variants;
  message: string;
}

interface CreateNewToastProps {
  variant: Variants
  message: string
}

interface ToastContextProps {
  toasts: IToast[]
  createNewToast: (props: CreateNewToastProps) => void
  handleDismissToast: (id: string) => void
}

export const ToastContext = React.createContext({} as ToastContextProps)

function ToastProvider({ children }: React.PropsWithChildren) {
  const [toasts, setToasts] = React.useState([] as IToast[]);
  
  function createNewToast({ variant, message }: CreateNewToastProps) {
    if(!message) return

    const newToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    }

    setToasts(toasts => [...toasts, newToast])
  }

  const handleDismissToast = React.useCallback((id: string) => {
    const filteredToasts = toasts.filter(toast => toast.id !== id) 

    setToasts(filteredToasts)
  }, [toasts])

  const value = React.useMemo(() => {
    return { toasts, createNewToast, handleDismissToast }
  }, [toasts, handleDismissToast])


  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}


export function useToasts() {
  return React.useContext(ToastContext)
}

export default ToastProvider;
