var Handlebars = require("handlebars");

// use inc to add plus 1 to a value. used for the @index to avoid displaying a zero
Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});
