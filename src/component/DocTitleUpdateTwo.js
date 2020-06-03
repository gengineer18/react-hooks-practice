import React, { useState } from 'react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const DocTitleUpdateTwo = () => {
  const [count, setCount] = useState(0)
  useDocumentTitle(count)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        count {count}
      </button>
    </div>
  )
}
