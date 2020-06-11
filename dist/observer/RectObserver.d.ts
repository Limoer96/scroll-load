import BaseOberver from './BaseObserver';
import { IConfig } from '../hooks/useVisible';
declare class RectObserver extends BaseOberver {
    constructor(current: Element, parent: Element | Window, setVisible: (visible: boolean) => void, config: IConfig);
    private wait;
    private throttleCheck;
    checkVisible(): void;
    observe(): void;
    cancelObservation(): void;
}
export default RectObserver;
