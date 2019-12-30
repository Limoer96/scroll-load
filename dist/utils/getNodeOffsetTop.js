export function getNodeOffsetTop(node, parent) {
    let current = node;
    let offsetTop = 0;
    while (current && current !== parent) {
        offsetTop += current.offsetTop;
        current = current.parentElement;
    }
    return offsetTop;
}
