var pathToRegex = require('path-to-regexp')

module.exports = function(url, paths) {
  for (var i in paths) {
    var regex = pathToRegex(paths[i])
    if (regex.test(url)) {
      return true
    }
  }

  return false
}
