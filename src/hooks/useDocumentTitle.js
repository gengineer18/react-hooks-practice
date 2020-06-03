import { useEffect } from 'react'

export const useDocumentTitle = (count) => {
  useEffect(() => {
    document.title = `カウント ${count}`
  }, [count])
}
