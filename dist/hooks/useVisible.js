"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var index_1 = __importDefault(require("../observer/index"));
function useVisible(current, parent) {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    react_1.useEffect(function () {
        var observer = new index_1.default(current, parent, setVisible);
        observer.observe();
        return observer.cancelObservation();
    }, [current, parent]);
    return visible;
}
exports.default = useVisible;
