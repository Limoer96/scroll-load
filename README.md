# react-scroll-load

> 一个用于懒加载(滚动加载)的React组件

* 容器组件，不额外添加`DOM`
* 相对于最近可滚动父级元素，适用于局部滚动

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

```js
import React, { Component } from 'react'
import { render } from 'react-dom'
import ScrollLoad from 'react-scroll-load'
class App extends Component {
	render() {
		return <div style={{width: 600, height: 400, overflow: 'auto'}}>
			<div style={{ height: 200, backgroundColor: 'gray' }}></div>
			<ScrollLoad placeholder={<div style={{ height: 100 }}>placeholder</div>}>
				<div>123</div>
			</ScrollLoad>
		</div>
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
	// 负数：减少触发距离(滚动 `offsetTop - offset`距离触发)，提前加载
  offset?: number
}
```