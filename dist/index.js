import React, { useRef } from 'react';
import useVisible from './hooks/useVisible';
const ScrollLoad = ({ placeholder, children, offset, onLoad, }) => {
    const placeholderElem = useRef(null);
    const visible = useVisible(placeholderElem, { offset, onLoad });
    return (React.createElement(React.Fragment, null, visible ? children : React.createElement("div", { ref: placeholderElem }, placeholder)));
};
export default ScrollLoad;
