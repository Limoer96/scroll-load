import React from 'react'
import { mount, render } from 'enzyme'
import ScrollLoad from '../dist/index'

const Comp = ({ prevHeight }) => (
  <div id="root" style={{ width: 400, height: 600, overflow: 'auto' }}>
    <div style={{ height: prevHeight }}>
    </div>
    <ScrollLoad placeholder={<div style={{ height: 200 }}>placeholder</div>}>
      <div style={{height: 200 }}>ScrollElement</div>
    </ScrollLoad>
  </div>
)

describe('init not show', () => {
  test.only('render placeholder', () => {
    const wrapper = render(<Comp prevHeight={800} />)
    expect(wrapper.children()).toHaveLength(2)
    expect(wrapper.text()).toBe('placeholder')
  })
  test('render content', () => {
    const wrapper = mount(<Comp prevHeight={800} />)
    const child = wrapper.find('#root').childAt(1)
    expect(wrapper.find('#root').children().length).toBe(2)
    expect(child.state('visible')).toBeFalsy()
    child.setState({ visible: true })
    expect(wrapper.text()).toBe('ScrollElement')
  })
})