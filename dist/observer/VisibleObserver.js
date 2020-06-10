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
var VisibleObserver = /** @class */ (function (_super) {
    __extends(VisibleObserver, _super);
    function VisibleObserver(current, parent, setVisible) {
        var _this = _super.call(this, current, parent, setVisible) || this;
        _this.observer = new IntersectionObserver(function (entries) {
            if (entries[0].intersectionRatio > 0) {
                setVisible(true);
                // 一旦可见就取消观测
                _this.cancelObservation();
            }
        }, { root: parent });
        return _this;
    }
    VisibleObserver.prototype.observe = function () {
        if (this.current) {
            this.observer.observe(this.current);
        }
    };
    VisibleObserver.prototype.cancelObservation = function () {
        this.observer.disconnect();
    };
    return VisibleObserver;
}(BaseObserver_1.default));
exports.default = VisibleObserver;
