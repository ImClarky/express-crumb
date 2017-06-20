module.exports = (paths, useSeparators, separatorLabel) => {

  var tags = [];
  paths.forEach((crumb) => {
    var html = "<li class='crumb'>"
    if (typeof crumb.url != "undefined") {
      html += "<a href='" + crumb.url + "'>" + crumb.label + "</a>"
    } else {
      html += crumb.label
    }
    html += "</li>"

    tags.push(html);
  })

  return "<ul class='crumbs'>" + tags.join((useSeparators) ? "<li class='separator'>" + separatorLabel + "</li>" : "") + "</ul>"
}
