class BaseOberver {
    constructor(current, parent, setVisible) {
        this.current = current;
        this.parent = parent;
        this.setVisible = setVisible;
    }
}
export default BaseOberver;
