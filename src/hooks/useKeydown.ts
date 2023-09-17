import React from 'react'

type Callback = () => void

export function useKeydown(key: string, callback: Callback) {
  React.useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.code === key) {
        callback()
      }
    }

    window.addEventListener('keydown', handleEscKey)

    return () => {
      window.removeEventListener('keydown', handleEscKey)
    }
  }, [key, callback])
}
