import BaseOberver from './BaseObserver'
import throttle from 'lodash/throttle'

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
    setVisible: (visible: boolean) => void
  ) {
    super(current, parent, setVisible)
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
    if (
      currentRect.top <= parentRect.bottom &&
      currentRect.left <= parentRect.right
    ) {
      this.setVisible(true)
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
