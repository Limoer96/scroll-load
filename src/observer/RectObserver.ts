import BaseOberver from './BaseObserver'
import throttle from 'lodash.throttle'
import { IConfig } from '../hooks/useVisible'
import { getOffset } from '../utils/getOffset'
import execCallback from '../utils/execCallback'

interface IParentRect<T> {
  width: T
  height: T
  top: T
  bottom: T
  left: T
  right: T
  x: T
  y: T
}

class RectObserver extends BaseOberver {
  constructor(
    current: Element,
    parent: Element | Window,
    setVisible: (visible: boolean) => void,
    config: IConfig
  ) {
    super(current, parent, setVisible, config)
  }
  private wait: number = 200
  private throttleCheck: () => void = throttle(
    () => this.checkVisible(),
    this.wait
  )
  checkVisible() {
    const parent = this.parent
    const currentRect = this.current.getBoundingClientRect()
    let parentRect: IParentRect<number> | ClientRect
    if (parent === window) {
      const iWidth = (parent as Window).innerWidth
      const iHeight = (parent as Window).innerHeight
      parentRect = {
        width: iWidth,
        height: iHeight,
        top: 0,
        bottom: iHeight,
        left: 0,
        right: iWidth,
        x: 0,
        y: 0,
      }
    } else {
      parentRect = (parent as Element).getBoundingClientRect()
    }
    const { offset, onLoad } = this.config
    const off = getOffset(offset)
    if (
      currentRect.top + off.vertical <= parentRect.bottom &&
      currentRect.left + off.horizontal <= parentRect.right
    ) {
      this.setVisible(true)
      execCallback(onLoad)
      this.cancelObservation()
    }
  }
  observe() {
    this.checkVisible()
    this.parent.addEventListener('scroll', this.throttleCheck)
  }
  cancelObservation() {
    this.parent.removeEventListener('scroll', this.throttleCheck)
  }
}

export default RectObserver
