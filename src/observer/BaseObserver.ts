abstract class BaseOberver {
  protected current: Element
  protected parent: Element | Window
  protected setVisible: (visible: boolean) => void
  constructor(
    current: Element,
    parent: Element | Window,
    setVisible: (visible: boolean) => void
  ) {
    this.current = current
    this.parent = parent
    this.setVisible = setVisible
  }
  abstract observe(): void
  abstract cancelObservation(): void
}

export default BaseOberver
