// 获取（格式化偏移）
export function getOffset(offset) {
    const result = {
        vertical: 0,
        horizontal: 0,
    };
    if (!offset) {
        return result;
    }
    if (typeof offset === 'number') {
        result.vertical = offset;
        return result;
    }
    else if (Object.prototype.toString.call(offset) === '[object Array]' &&
        offset.length >= 2) {
        result.vertical = offset[0];
        result.horizontal = offset[1];
        return result;
    }
    return result;
}
