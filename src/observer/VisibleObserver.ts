import BaseOberver from './BaseObserver'

class VisibleObserver extends BaseOberver {
  observer: IntersectionObserver
  constructor(
    current: Element,
    parent: Element,
    setVisible: (visible: boolean) => void
  ) {
    super(current, parent, setVisible)
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0) {
          setVisible(true)
          // 一旦可见就取消观测
          this.cancelObservation()
        }
      },
      { root: parent }
    )
  }
  observe() {
    if (this.current) {
      this.observer.observe(this.current)
    }
  }
  cancelObservation() {
    this.observer.disconnect()
  }
}

export default VisibleObserver