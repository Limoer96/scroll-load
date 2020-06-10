import BaseOberver from './BaseObserver';
declare class VisibleObserver extends BaseOberver {
    observer: IntersectionObserver;
    constructor(current: Element, parent: Element, setVisible: (visible: boolean) => void);
    observe(): void;
    cancelObservation(): void;
}
export default VisibleObserver;
