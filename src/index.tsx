import React, { useRef } from 'react'
import useVisible from './hooks/useVisible'

interface ScrollLoadProps {
  placeholder: JSX.Element
  offset?: number
  onLoad?: (current: Element | Text | null) => void
}

const ScrollLoad: React.FC<ScrollLoadProps> = ({ placeholder, children }) => {
  const placeholderElem = useRef(null)
  const visible = useVisible(placeholderElem)
  return (
    <>{visible ? children : <div ref={placeholderElem}>{placeholder}</div>}</>
  )
}

export default ScrollLoad
