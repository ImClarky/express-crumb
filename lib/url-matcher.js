const pathToRegex = require('path-to-regexp')

module.exports = (url, paths) => {
  for (let i in paths) {
    let regex = pathToRegex(paths[i])
    if (regex.test(url)) {
      return true
    }
  }

  return false
}
