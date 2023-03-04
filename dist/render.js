function render(data) {
  const source = $("#recipes-template").html();
  const template = Handlebars.compile(source);
  let newHtml = template(data);
  $("#resipes").empty().append(newHtml);
}
