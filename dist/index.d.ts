import React from 'react';
interface ScrollLoadProps {
    placeholder: JSX.Element;
    offset?: number;
    onLoad?: (current: Element | Text | null) => void;
}
declare const ScrollLoad: React.FC<ScrollLoadProps>;
export default ScrollLoad;
