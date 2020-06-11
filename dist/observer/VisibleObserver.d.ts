import BaseOberver from './BaseObserver';
import { IConfig } from '../hooks/useVisible';
declare class VisibleObserver extends BaseOberver {
    observer: IntersectionObserver;
    constructor(current: Element, parent: Element, setVisible: (visible: boolean) => void, config: IConfig);
    getCurrentRatio(): number;
    getRootMargin(): string;
    observe(): void;
    cancelObservation(): void;
}
export default VisibleObserver;
