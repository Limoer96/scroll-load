function execCallback(callback?: () => void) {
  if (typeof callback === 'function') {
    callback()
  }
}

export default execCallback
