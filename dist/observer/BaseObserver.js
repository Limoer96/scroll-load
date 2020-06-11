class BaseOberver {
    constructor(current, parent, setVisible, config) {
        this.current = current;
        this.parent = parent;
        this.setVisible = setVisible;
        this.config = config;
    }
}
export default BaseOberver;
