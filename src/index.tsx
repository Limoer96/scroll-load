import * as React from 'react'
import { findDOMNode } from 'react-dom'
import throttle from 'lodash/throttle'
import ReactPlaceHolder from 'react-placeholder'
import { getScrollParent } from './utils/getScrollParent'
import { getNodeOffsetTop } from './utils/getNodeOffsetTop'

function noop() {}

interface ScrollLoadState {
  visible: boolean
}

interface ScrollLoadProps {
  placeholder: JSX.Element
  offset?: number
}

class ScrollLoad extends React.Component<ScrollLoadProps, ScrollLoadState> {
  state: ScrollLoadState = {
    visible: false,
  }
  parent: any
  scrollHandler: () => void
  resizeHandler: () => void

  componentDidMount() {
    let dom = findDOMNode(this) // 取得当前节点
    let parent = getScrollParent(dom as any)
    this.parent = parent
    let visible = this.checkVisible(dom as Element, parent as Element) // 初始化检查是否可见
    visible()
    this.scrollHandler = throttle(visible, 100)
    this.resizeHandler = () => {
      if (!this.state.visible) {
        this.checkVisible(dom as Element, parent as Element)()
      }
    }
    parent.addEventListener('scroll', this.scrollHandler, { passive: true })
    // 在window resize时再次进行检测
    window.addEventListener('resize', this.resizeHandler)
  }
  componentWillUnmount() {
    this.parent.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.resizeHandler)
  }

  checkVisible = (node: Element, parent: Element | Window) => {
    if (!node || !parent) {
      this.setState({ visible: true })
      return noop
    }
    let { offset } = this.props
    // null or undefined
    if (offset == undefined) {
      offset = 0
    }
    if (typeof offset !== 'number') {
      console.warn(
        `"offset" can be only used as number, but got"${typeof offset}"`
      )
      offset = 0
    }
    let currentNode = findDOMNode(this)
    let offsetTop = getNodeOffsetTop(
      currentNode as HTMLElement,
      parent as HTMLElement
    )
    let seenHeight =
      parent === window ? parent.innerHeight : (parent as Element).clientHeight
    return () => {
      const { visible } = this.state
      const scrollTop =
        parent === window
          ? document.documentElement.scrollTop
          : (parent as Element).scrollTop
      if (visible) {
        this.parent.removeEventListener('scroll', this.scrollHandler)
        return // 直接返回不执行当次eventListener
      }
      if (offsetTop + offset! <= seenHeight + scrollTop) {
        this.setState({ visible: true })
      }
    }
  }

  render() {
    const { visible } = this.state
    const { placeholder } = this.props
    return (
      <ReactPlaceHolder ready={visible} customPlaceholder={placeholder}>
        {this.props.children}
      </ReactPlaceHolder>
    )
  }
}

export default ScrollLoad
