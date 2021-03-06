# react-scroll-load

> 一个用于懒加载(滚动加载)的 React 组件
> [![Build Status](https://travis-ci.com/Limoer96/scroll-load.svg?branch=master)](https://travis-ci.com/Limoer96/scroll-load)

- 基于`IntersectionObserver`实现(兼容低版本浏览器)
- 不添加额外`DOM`结构，不影响布局
- 局部/全局懒加载

```html
  <div>
    <div>prev content</div>
    <ScrollLoad placeholder={<PlaceholderComponent />}>
      <LazyComponent />
    </ScrollLoad>
    <div>next content</div>
  </div>
```

## 安装

```bash
$ yarn add react-scroll-load
```

## 使用

> 一个简易的[demo](http://212.64.77.74:8080/scrollload/index.html) _打开开发者工具查看 DOM 变化_

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import ScrollLoad from 'react-scroll-load'
class App extends Component {
  render() {
    return (
      <div style={{ width: 600, height: 400, overflow: 'auto' }}>
        <div style={{ height: 200, backgroundColor: 'gray' }}></div>
        <ScrollLoad
          placeholder={<div style={{ height: 100 }}>placeholder</div>}
        >
          <div>content</div>
        </ScrollLoad>
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
```

## <ScrollLoad> props

```js
{
	// 未加载前占位组件，默认为null
  placeholder: JSX.Element,

	// 设置滚动方向上的偏移
	// 正数：增加触发距离(可见后再滚动`offset`距离)
	// 负数：减少触发距离，提前加载(注意：指定负数offset不要超过placeholder对应宽高的1/2)
	offset?: number,
	// 加载内容时的回调
	onLoad?: () => void
}
```

## 更新日志

见[ChangeLog](./CHANGELOG.md)
