# express-crumb

A simple breadcrumb generator for Express applications.

## Installation
```
npm install express-crumb
```

## Usage
First, require the module in your main .js file (`app.js` for example)
```js
var Crumb = require('express-crumb')
```

Then an instance of express-crumb needs to be created

```js
var crumb = new Crumb()
```

Now you need to use the `getRoutes()` function to get all of the `GET` routes of your application.
This needs to be added ***after*** you have declared your routes, and mounted any router modules.

```js
app.get("/", function(req, res, next){
  // do some stuff
})

app.use("/foo", foo)
app.use("/bar", bar)

crumb.getRoutes(app)
```

To generate the breadcrumb, you can do the following:
```js
app.use(crumb.generateCrumbs(options))
```

This will generate a breadcrumb on all requests made on the server.

Or, if you want to use it on a specific route, you can add it to the middleware stack when declaring a route, like so:
```js
app.get("/blog/post/123456", crumb.generateCrumbs(options), function(req, res, next){
  // do stuff
})
```

#### Mounted Router Modules

If you are using a mounted router module, you can pass the instance of `express-crumb` when you `require` the module.
```js
var blog = require('./routes/foo')(crumb)
```

then in your router:
```js
module.exports = function(crumb){
  var express = require('express')
  var router = express.Router()

  router.get("/bar", crumb.generateCrumbs(options), function(req, res, next){
    // do stuff
  })

  return router;
}
```

#### Generated Labels
One minor issue that you may find is the generated labels. This module will replace any `-` and `_` and replace them with spaces. Then each word is capitalized. For example:

```js
"/foo-bar"  // -> Foo Bar
"/fooBar"   // -> FooBar
```

### Options
There are currently 6 options that can be altered to your liking. These options are passed as an object to the `generateCrumbs()` function. For example:

```js
app.use(crumb.generateCrumbs({
  includeNonRoutes: true
}))
```

`generateCrumbs(options)`

| Option | Description | Default Value |
| --- | --- | --- |
| includeHome | Includes a clickable link to the home page (assumed at '/') | `true` |
| homeLabel | The label that should be displayed if `includeHome` is enabled <sup>1</sup> | "Home" |
| includeNonRoutes | Include routes that are present in the path, but do not exist in the application <sup>2</sup> | `false` |
| linkLastCrumb | Make the last link in the crumb - the page you are on - clickable | `false` |
| includeSeparators | Include separators - as separate `li` elements - into the markup | `true` |
| separatorLabel | The label used in the separators <sup>1</sup> | "-" |

1. HTML is supported, meaning html-based icons, like FortAwesome or Glyphicon, can be used.

2. For example, if you have a route like: `/foo/bar/baz`, but only have routes linking to `/foo` and `/foo/bar/baz`, and you leave `includeNonRoutes` as its default value, the breadcrumb will look something like: `Home - Foo - Baz`. Whereas, if you set `includeNonRoutes` to `true` you will get: `Home - Foo - Bar - Baz`, and `Bar` will not be clickable.

### Views
`generateCrumbs()` will store the breadcrumbs in a `<ul><li>` structure in  `res.locals.crumbs` variable; making it accessible in the template files. Below is the generated markup and some examples of how inject it into your template.

```html
<!-- Crumbs with includeSeparators as FALSE -->
<ul class='crumbs'>
  <li class='crumb'><a href='/'>Home</a></li>
  <li class='crumb'><a href='/tutorials'>Tutorials</a></li>
  <li class='crumb'><a href='/tutorials/javascript'>Javascript</a></li>
  <li class='crumb'>Create Breadcrumbs For Express</li>
</ul>
```

```html
<!-- Crumbs with includeSeparators as TRUE -->
<ul class='crumbs'>
  <li class='crumb'><a href='/'>Home</a></li>
  <li class='separator'>-</li>
  <li class='crumb'><a href='/tutorials'>Tutorials</a></li>
  <li class='separator'>-</li>
  <li class='crumb'><a href='/tutorials/javascript'>Javascript</a></li>
  <li class='separator'>-</li>
  <li class='crumb'>Create Breadcrumbs For Express</li>
</ul>
```

Using Jade/Pug
```jade
!{crumbs}
```

Using EJS
```ejs
<%- crumbs %>
```

Using Handlebars
```
{{{crumbs}}}
```


## Changelog
- 1.1.0
  - Added support for separators in the generated markup
- 1.0.1
  - Initial Release
