import React from 'react'

type Callback = () => void

export function useEscapeKey(callback: Callback) {
  React.useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        callback()
      }
    }

    window.addEventListener('keydown', handleEscKey)

    return () => {
      window.removeEventListener('keydown', handleEscKey)
    }
  }, [callback])
}