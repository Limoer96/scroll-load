import BaseOberver from './BaseObserver';
import VisibleObserver from './VisibleObserver';
import RectObserver from './RectObserver';
class Observer extends BaseOberver {
    constructor(current, parent, setVisible) {
        super(current, parent, setVisible);
        if ('IntersectionObserver' in window && parent !== window) {
            this.observer = new VisibleObserver(current, parent, setVisible);
        }
        else {
            this.observer = new RectObserver(current, parent, setVisible);
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
