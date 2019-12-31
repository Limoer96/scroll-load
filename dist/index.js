import * as React from 'react';
import { findDOMNode } from 'react-dom';
import throttle from 'lodash/throttle';
import ReactPlaceHolder from 'react-placeholder';
import { getScrollParent } from './utils/getScrollParent';
import { getNodeOffsetTop } from './utils/getNodeOffsetTop';
function noop() { }
class ScrollLoad extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: false,
        };
        this._setParentScrollop = (height) => {
            this.parent.scrollTop = height;
            console.log('height123', this.parent.scrollTop);
        };
        this.checkVisible = (node, parent) => {
            if (!node || !parent) {
                this.setState({ visible: true });
                return noop;
            }
            let { offset } = this.props;
            if (offset !== undefined && typeof offset !== 'number') {
                console.warn(`"offset" can be only used as number, but got"${typeof offset}"`);
                offset = 0;
            }
            let seenHeight = parent.clientHeight;
            return () => {
                const { visible } = this.state;
                const scrollTop = parent.scrollTop;
                if (visible) {
                    this.parent.removeEventListener('scroll', this.scrollHandler);
                    return; // 直接返回不执行当次eventListener
                }
                let currentNode = findDOMNode(this); // 获取最新的dom结构
                let offsetTop = getNodeOffsetTop(currentNode, parent);
                if (offsetTop + offset <= seenHeight + scrollTop) {
                    this.setState({ visible: true });
                }
            };
        };
    }
    componentDidMount() {
        let dom = findDOMNode(this); // 取得当前节点
        let parent = getScrollParent(dom);
        this.parent = parent;
        let visible = this.checkVisible(dom, parent); // 初始化检查是否可见
        visible();
        this.scrollHandler = throttle(visible, 100);
        parent.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
    componentWillUnmount() {
        this.parent.removeEventListener('scroll', this.scrollHandler);
    }
    render() {
        const { visible } = this.state;
        const { placeholder } = this.props;
        return (React.createElement(ReactPlaceHolder, { ready: visible, customPlaceholder: placeholder }, this.props.children));
    }
}
export default ScrollLoad;
