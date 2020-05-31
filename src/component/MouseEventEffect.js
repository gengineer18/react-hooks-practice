import React, { useState, useEffect } from 'react'

export const MouseEventEffect = () => {
  console.log('mouseEventEffect')
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const getMousePosition = e => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('effected')
    document.addEventListener('mousemove', getMousePosition)
    return () => { document.removeEventListener('mousemove', getMousePosition) }
  }, [])

  return (
    <div>
      <p>X: {x}</p>
      <p>Y: {y}</p>
    </div>
  )
}
