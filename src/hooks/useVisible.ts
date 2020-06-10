import { useState, useEffect } from 'react'
import Observer from '../observer/index'

function useVisible(current: Element, parent: Element | Window) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new Observer(current, parent, setVisible)
    observer.observe()
    return observer.cancelObservation()
  }, [current, parent])
  return visible
}

export default useVisible
