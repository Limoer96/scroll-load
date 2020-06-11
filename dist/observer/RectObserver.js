import BaseOberver from './BaseObserver';
import throttle from 'lodash/throttle';
class RectObserver extends BaseOberver {
    constructor(current, parent, setVisible) {
        super(current, parent, setVisible);
        this.wait = 200;
        this.throttleCheck = throttle(() => this.checkVisible(), this.wait);
    }
    checkVisible() {
        const parent = this.parent;
        const currentRect = this.current.getBoundingClientRect();
        let parentRect;
        if (parent === window) {
            const iWidth = parent.innerWidth;
            const iHeight = parent.innerHeight;
            parentRect = {
                width: iWidth,
                height: iHeight,
                top: 0,
                bottom: iHeight,
                left: 0,
                right: iWidth,
                x: 0,
                y: 0,
            };
        }
        else {
            parentRect = parent.getBoundingClientRect();
        }
        if (currentRect.top <= parentRect.bottom &&
            currentRect.left <= parentRect.right) {
            this.setVisible(true);
            this.cancelObservation();
        }
    }
    observe() {
        this.checkVisible();
        this.parent.addEventListener('scroll', this.throttleCheck);
    }
    cancelObservation() {
        this.parent.removeEventListener('scroll', this.throttleCheck);
    }
}
export default RectObserver;
