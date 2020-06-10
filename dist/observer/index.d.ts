import BaseOberver from './BaseObserver';
declare class Observer extends BaseOberver {
    private observer;
    constructor(current: Element, parent: Element | Window, setVisible: (visible: boolean) => void);
    observe(): void;
    cancelObservation(): void;
}
export default Observer;
