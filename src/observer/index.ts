import BaseOberver from './BaseObserver'
import VisibleObserver from './VisibleObserver'
import RectObserver from './RectObserver'
import { IConfig } from '../hooks/useVisible'

class Observer extends BaseOberver {
  private observer: BaseOberver
  constructor(
    current: Element,
    parent: Element | Window,
    setVisible: (visible: boolean) => void,
    config: IConfig
  ) {
    super(current, parent, setVisible, config)
    if ('IntersectionObserver' in window && parent !== window) {
      this.observer = new VisibleObserver(
        current,
        parent as Element,
        setVisible,
        config
      )
    } else {
      this.observer = new RectObserver(current, parent, setVisible, config)
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
