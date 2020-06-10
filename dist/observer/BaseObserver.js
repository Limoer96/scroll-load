"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseOberver = /** @class */ (function () {
    function BaseOberver(current, parent, setVisible) {
        this.current = current;
        this.parent = parent;
        this.setVisible = setVisible;
    }
    return BaseOberver;
}());
exports.default = BaseOberver;
