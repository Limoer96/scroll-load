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
var RectObserver = /** @class */ (function (_super) {
    __extends(RectObserver, _super);
    function RectObserver(current, parent, setVisible) {
        return _super.call(this, current, parent, setVisible) || this;
    }
    RectObserver.prototype.checkVisible = function () {
        var parent = this.parent;
        var currentRect = this.current.getBoundingClientRect();
        var parentRect = parent.getBoundingClientRect();
        if (parent === window) {
            var iWidth = parent.innerWidth;
            var iHeight = parent.innerHeight;
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
        if (currentRect.top <= parentRect.bottom ||
            currentRect.left <= parentRect.right) {
            this.setVisible(true);
            this.cancelObservation();
        }
    };
    RectObserver.prototype.observe = function () {
        this.checkVisible();
        this.parent.addEventListener('scroll', this.checkVisible);
    };
    RectObserver.prototype.cancelObservation = function () {
        this.parent.removeEventListener('scroll', this.checkVisible);
    };
    return RectObserver;
}(BaseObserver_1.default));
exports.default = RectObserver;
