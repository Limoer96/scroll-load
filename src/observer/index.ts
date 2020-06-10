import BaseOberver from './BaseObserver'
import VisibleObserver from './VisibleObserver'
import RectObserver from './RectObserver'

class Observer extends BaseOberver {
  private observer: BaseOberver
  constructor(
    current: Element,
    parent: Element | Window,
    setVisible: (visible: boolean) => void
  ) {
    super(current, parent, setVisible)
    if ('IntersectionObserver' in window && parent !== window) {
      this.observer = new VisibleObserver(
        current,
        parent as Element,
        setVisible
      )
    } else {
      this.observer = new RectObserver(current, parent, setVisible)
    }
  }
  observe() {
    this.observer.observe()
  }
  cancelObservation() {
    this.observer.cancelObservation()
  }
}

export default Observer
