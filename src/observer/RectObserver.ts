import BaseOberver from './BaseObserver'

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
  checkVisible() {
    const parent = this.parent
    const currentRect = this.current.getBoundingClientRect()
    let parentRect:
      | IParentRect<number>
      | ClientRect = (parent as Element).getBoundingClientRect()
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
    }
    if (
      currentRect.top <= parentRect.bottom ||
      currentRect.left <= parentRect.right
    ) {
      this.setVisible(true)
      this.cancelObservation()
    }
  }
  observe() {
    this.checkVisible()
    this.parent.addEventListener('scroll', this.checkVisible)
  }
  cancelObservation() {
    this.parent.removeEventListener('scroll', this.checkVisible)
  }
}

export default RectObserver
