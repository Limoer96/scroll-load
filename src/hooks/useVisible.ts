import { useState, useEffect } from 'react'
import Observer from '../observer/index'
import { getScrollParent } from '../utils/getScrollParent'

export interface IConfig {
  offset?: number | number[]
  onLoad?: () => void
}

function useVisible(
  currentElem: React.MutableRefObject<Element | null>,
  config: IConfig
) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!currentElem.current) {
      return
    }
    const parent: Element | Window = getScrollParent(currentElem.current)
    const observer = new Observer(
      currentElem.current,
      parent,
      setVisible,
      config
    )
    observer.observe()
    return () => observer.cancelObservation()
  }, [currentElem.current])
  return visible
}

export default useVisible
