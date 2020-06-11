import React from 'react';
interface ScrollLoadProps {
    placeholder: JSX.Element;
    offset?: number;
    onLoad?: () => void;
}
declare const ScrollLoad: React.FC<ScrollLoadProps>;
export default ScrollLoad;
