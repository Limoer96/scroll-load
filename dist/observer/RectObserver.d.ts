import BaseOberver from './BaseObserver';
declare class RectObserver extends BaseOberver {
    constructor(current: Element, parent: Element | Window, setVisible: (visible: boolean) => void);
    checkVisible(): void;
    observe(): void;
    cancelObservation(): void;
}
export default RectObserver;
