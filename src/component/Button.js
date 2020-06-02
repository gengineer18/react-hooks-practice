import React from 'react'

export const Button = React.memo(({ handleClick, children }) => {
  console.log('button component -', children)
  return (
    <div>
      <button onClick={handleClick}>
        {children}
      </button>
    </div>
  )
})
