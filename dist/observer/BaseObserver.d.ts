import { IConfig } from '../hooks/useVisible';
declare abstract class BaseOberver {
    protected current: Element;
    protected parent: Element | Window;
    protected setVisible: (visible: boolean) => void;
    protected config: IConfig;
    constructor(current: Element, parent: Element | Window, setVisible: (visible: boolean) => void, config: IConfig);
    abstract observe(): void;
    abstract cancelObservation(): void;
}
export default BaseOberver;
