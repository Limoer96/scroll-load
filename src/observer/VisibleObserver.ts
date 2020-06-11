import BaseOberver from './BaseObserver'
import { IConfig } from '../hooks/useVisible'
import execCallback from '../utils/execCallback'
import warn from '../utils/warn'

class VisibleObserver extends BaseOberver {
  observer: IntersectionObserver
  constructor(
    current: Element,
    parent: Element,
    setVisible: (visible: boolean) => void,
    config: IConfig
  ) {
    super(current, parent, setVisible, config)
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > this.getCurrentRatio()) {
          setVisible(true)
          execCallback(this.config.onLoad)
          // 一旦可见就取消观测
          this.cancelObservation()
        }
      },
      {
        root: parent,
        rootMargin: this.getRootMargin(),
        threshold: [this.getCurrentRatio()],
      }
    )
  }
  getCurrentRatio() {
    const { offset } = this.config
    if (!offset) {
      return 0
    }
    const off = typeof offset === 'number' ? offset : offset[0]
    if (off > 0) {
      const placeholderHeight = this.current.clientHeight
      return Number((off / placeholderHeight).toFixed(2))
    }
    return 0
  }
  getRootMargin() {
    const { offset } = this.config
    if (!offset) {
      return '0px'
    }
    const off = typeof offset === 'number' ? offset : offset[0]
    if (off < 0) {
      const offAbs = Math.abs(off)
      const pHeight = this.current.clientHeight
      const pWidth = this.current.clientWidth
      warn(
        'offset 设置应小于placeholder对应宽高的1/2',
        offAbs * 2 >= pHeight || offAbs * 2 >= pWidth
      )
      const marginVertical =
        offAbs * 2 >= pHeight ? Math.floor(pHeight / 2) - 1 : offAbs
      const marginHorizontal =
        offAbs * 2 >= pWidth ? Math.floor(pWidth / 2) - 1 : offAbs
      return `${marginVertical}px ${marginHorizontal}px ${marginVertical}px ${marginHorizontal}px`
    }
    return '0px'
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
