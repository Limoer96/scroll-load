import BaseOberver from './BaseObserver';
import { IConfig } from '../hooks/useVisible';
declare class Observer extends BaseOberver {
    private observer;
    constructor(current: Element, parent: Element | Window, setVisible: (visible: boolean) => void, config: IConfig);
    observe(): void;
    cancelObservation(): void;
}
export default Observer;
