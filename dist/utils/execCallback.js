function execCallback(callback) {
    if (typeof callback === 'function') {
        callback();
    }
}
export default execCallback;
