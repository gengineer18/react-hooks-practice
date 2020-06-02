import React from 'react'

export const Count = React.memo(({text, count}) => {
  console.log('count component -', text)
  return (
    <div>
      {text}: {count}
    </div>
  )
})
