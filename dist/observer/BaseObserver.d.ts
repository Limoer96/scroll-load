declare abstract class BaseOberver {
    protected current: Element;
    protected parent: Element | Window;
    protected setVisible: (visible: boolean) => void;
    constructor(current: Element, parent: Element | Window, setVisible: (visible: boolean) => void);
    abstract observe(): void;
    abstract cancelObservation(): void;
}
export default BaseOberver;
