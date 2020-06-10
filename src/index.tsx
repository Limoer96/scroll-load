import React, { useRef } from 'react'
import useVisible from './hooks/useVisible'
import { getScrollParent } from './utils/getScrollParent'

interface ScrollLoadProps {
  placeholder: JSX.Element
  offset?: number
  onLoad?: (current: Element | Text | null) => void
}

const ScrollLoad: React.FC<ScrollLoadProps> = ({ placeholder, children }) => {
  const placeholderElement = useRef(null)
  const parent = getScrollParent(placeholderElement.current!)
  const visible = useVisible(placeholderElement.current!, parent)
  return (
    <>
      {visible ? children : <div ref={placeholderElement}>{placeholder}</div>}
    </>
  )
}

export default ScrollLoad
