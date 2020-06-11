import React, { useRef } from 'react'
import useVisible from './hooks/useVisible'

interface ScrollLoadProps {
  placeholder: JSX.Element
  offset?: number
  onLoad?: () => void
}

const ScrollLoad: React.FC<ScrollLoadProps> = ({
  placeholder,
  children,
  offset,
  onLoad,
}) => {
  const placeholderElem = useRef(null)
  const visible = useVisible(placeholderElem, { offset, onLoad })
  return (
    <>{visible ? children : <div ref={placeholderElem}>{placeholder}</div>}</>
  )
}

export default ScrollLoad
