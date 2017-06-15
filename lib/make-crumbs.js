module.exports = (paths) => {
  var html = "<ul class='crumbs'>"

  paths.forEach((crumb) => {
    html += "<li class='crumb'>"
    if(typeof crumb.url != "undefined"){
      html += "<a href='" + crumb.url + "'>" + crumb.label + "</a>"
    } else {
      html += crumb.label
    }
    html += "</li>"
  })

  return html + "</ul>"
}
