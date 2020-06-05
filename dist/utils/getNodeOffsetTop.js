export function getNodeOffsetTop(node, parent) {
    if ('getBoundingClientRect' in document.documentElement) {
        let vpTopParent;
        if (parent === window) {
            vpTopParent = 0;
        }
        else {
            vpTopParent = parent.getBoundingClientRect().top;
        }
        const vpTopNode = node.getBoundingClientRect().top;
        return vpTopNode - vpTopParent;
    }
    const style = (elem, prop) => {
        if (getComputedStyle !== undefined) {
            return getComputedStyle(elem, null).getPropertyValue(prop);
        }
        return elem.style[prop];
    };
    const positions = ['relative', 'absolute', 'fixed'];
    if (positions.includes(style(parent, 'position'))) {
        let current = node;
        let offsetTop = 0;
        while (current && current !== parent) {
            offsetTop += current.offsetTop;
            current = current.parentElement;
        }
        return offsetTop;
    }
    else {
        return node.offsetTop - parent.offsetTop;
    }
}
