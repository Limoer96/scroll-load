import BaseOberver from './BaseObserver';
import VisibleObserver from './VisibleObserver';
import RectObserver from './RectObserver';
class Observer extends BaseOberver {
    constructor(current, parent, setVisible, config) {
        super(current, parent, setVisible, config);
        if ('IntersectionObserver' in window && parent !== window) {
            this.observer = new VisibleObserver(current, parent, setVisible, config);
        }
        else {
            this.observer = new RectObserver(current, parent, setVisible, config);
        }
    }
    observe() {
        this.observer.observe();
    }
    cancelObservation() {
        this.observer.cancelObservation();
    }
}
export default Observer;
