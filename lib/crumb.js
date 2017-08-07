const pathfinder = require('express-pathfinder')
const titleize = require('titleize')
const urlmatcher = require('./url-matcher')
const makeCrumbs = require('./make-crumbs')
const url = require('url')

const crumb = function(){
  let self = this

  self._defaults = {
    includeHome: true,
    homeLabel: "Home",
    includeSeparators: true,
    separatorLabel: "-",
    includeNonRoutes: false,
    linkLastCrumb: false,
  }

  self.routes = []

  self.getRoutes = app => {
    self.routes = pathfinder(app._router.stack, "GET").map(r => {
      return r.path
    })
  }

  self.generateCrumbs = options => {
    options = Object.assign(self._defaults, options)

    return (req, res, next) => {
      let paths = []
      let uri = url.parse(req.originalUrl).pathname

      if(uri.charAt(0) === "/"){
        uri = uri.slice(1)
      }

      let segments = uri.split("/")

      if(options.includeHome){
        paths.push({url: "/", label: options.homeLabel})
      }

      let path = "/"

      segments.forEach(segment => {
        path += segment

        if(urlmatcher(path, self.routes)){
          paths.push({
            url: path,
            label: titleize(segment.replace(/[\-\_]/g, " "))
          })
        } else {
          if(options.includeNonRoutes){
            paths.push({
              label: titleize(segment.replace(/[\-\_]/g, " "))
            })
          }
        }

        path += "/"
      })

      if(!options.linkLastCrumb){
        delete paths[paths.length - 1].url
      }

      res.locals.crumbs = makeCrumbs(paths, options.includeSeparators, options.separatorLabel)

      next()
    }
  }
}

module.exports = crumb
