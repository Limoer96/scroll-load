"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseObserver_1 = __importDefault(require("./BaseObserver"));
var VisibleObserver_1 = __importDefault(require("./VisibleObserver"));
var RectObserver_1 = __importDefault(require("./RectObserver"));
var Observer = /** @class */ (function (_super) {
    __extends(Observer, _super);
    function Observer(current, parent, setVisible) {
        var _this = _super.call(this, current, parent, setVisible) || this;
        if ('IntersectionObserver' in window && parent !== window) {
            _this.observer = new VisibleObserver_1.default(current, parent, setVisible);
        }
        else {
            _this.observer = new RectObserver_1.default(current, parent, setVisible);
        }
        return _this;
    }
    Observer.prototype.observe = function () {
        this.observer.observe();
    };
    Observer.prototype.cancelObservation = function () {
        this.observer.cancelObservation();
    };
    return Observer;
}(BaseObserver_1.default));
exports.default = Observer;
