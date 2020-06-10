"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * get scroll parent element
 * @param element current node
 */
function getScrollParent(element) {
    var style = function (elem, prop) {
        if (getComputedStyle !== undefined) {
            return getComputedStyle(elem, null).getPropertyValue(prop);
        }
        return elem.style[prop];
    };
    var overflow = function (node) { return style(node, 'overflow') + style(node, 'overflow-x') + style(node, 'overflow-y'); };
    // 循环判断父节点是否可滚动这里暂不添加，直接去直接父元素
    if (!(element instanceof HTMLElement)) {
        return window;
    }
    var parent = element;
    while (parent) {
        // 当前节点是body或者document
        if (parent === document.body || parent === document.documentElement) {
            break;
        }
        // 当期元素无父节点
        if (!parent.parentElement) {
            break;
        }
        // 判断节点是否含有overflow等属性的值
        if (/(scroll|auto|inherit)/.test(overflow(parent))) {
            return parent;
        }
        parent = parent.parentElement;
    }
    return window;
}
exports.getScrollParent = getScrollParent;
