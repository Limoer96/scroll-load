"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("d:/www/examples/scroll_load/node_modules/react/index"));
var getScrollParent_1 = require("./utils/getScrollParent");

var ScrollLoad = function (_a) {
    var placeholder = _a.placeholder, children = _a.children;
    var placeholderElement = react_1.useRef(null);
    var parent = getScrollParent_1.getScrollParent(placeholderElement.current);
    // const visible = useVisible(placeholderElement.current!, parent)
    var visible = true;
    return (react_1.default.createElement(react_1.default.Fragment, null, visible ? children : react_1.default.createElement("div", { ref: placeholderElement }, placeholder)));
};
exports.default = ScrollLoad;
