import  * as React from 'react';
import { findDOMNode } from 'react-dom';
import throttle from 'lodash/throttle';
import ReactPlaceHolder from 'react-placeholder';
import { getScrollParent } from './utils/getScrollParent'
import { getNodeOffsetTop } from './utils/getNodeOffsetTop'

function noop() {}

interface ScrollLoadState {
  visible: boolean
}

interface ScrollLoadProps {
  placeholder: JSX.Element,
  offset?: number
}

class ScrollLoad extends React.Component<ScrollLoadProps, ScrollLoadState> {
  state: ScrollLoadState = {
    visible: false,
  };
  parent: any
  scrollHandler: () => void
  componentDidMount() {
    let dom = findDOMNode(this); // 取得当前节点
    let parent = getScrollParent(dom as any);
    this.parent = parent;
    let visible = this.checkVisible(dom as Element, parent as Element); // 初始化检查是否可见
    visible();
    this.scrollHandler = throttle(visible, 100);
    parent.addEventListener('scroll', this.scrollHandler, { passive: true });
  }
  componentWillUnmount() {
    this.parent.removeEventListener('scroll', this.scrollHandler);
  }
  _setParentScrollop = (height: number) => {
    (this.parent as HTMLElement).scrollTop = height
    console.log('height123', this.parent.scrollTop)
  }
  checkVisible = (node: Element, parent: Element) => {
    if (!node || !parent) {
      this.setState({ visible: true });
      return noop;
    }
    let { offset } = this.props
    if (offset!== undefined && typeof offset !== 'number') {
      console.warn(`"offset" can be only used as number, but got"${typeof offset}"`)
      offset = 0
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
      let offsetTop = getNodeOffsetTop(currentNode as HTMLElement, parent as HTMLElement);
      if (offsetTop + offset! <= seenHeight + scrollTop) {
        this.setState({ visible: true });
      }
    };
  };
  render() {
    const { visible } = this.state;
    const { placeholder } = this.props;
    return (
      <ReactPlaceHolder
        ready={visible}
        customPlaceholder={placeholder}
      >
        {this.props.children}
      </ReactPlaceHolder>
    );
  }
}

export default ScrollLoad;