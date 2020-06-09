import * as React from 'react';
declare function noop(): void;
interface ScrollLoadState {
    visible: boolean;
}
interface ScrollLoadProps {
    placeholder: JSX.Element;
    offset?: number;
    onLoad?: (current: Element | Text | null) => void;
}
declare class ScrollLoad extends React.Component<ScrollLoadProps, ScrollLoadState> {
    state: ScrollLoadState;
    parent: any;
    scrollHandler: () => void;
    resizeHandler: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    checkVisible: (node: Element, parent: Element | Window) => typeof noop;
    render(): JSX.Element;
}
export default ScrollLoad;
