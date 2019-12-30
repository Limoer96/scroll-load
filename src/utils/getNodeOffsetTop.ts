export function getNodeOffsetTop(node: HTMLElement, parent: HTMLElement) {
  let current: HTMLElement = node;
  let offsetTop = 0;
  while (current && current !== parent) {
    offsetTop += current.offsetTop;
    current = current.parentElement!;
  }
  return offsetTop;
}