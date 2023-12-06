var Handlebars = require("handlebars");
//helper to limit the amount of scores shown. use {{#each_upto scores 5}} to limit to 5
Handlebars.registerHelper("each_upto", function(ary, max, options) {
  if (!ary || ary.length == 0) return options.inverse(this);

  var result = [];
  for (var i = 0; i < max && i < ary.length; ++i)
    result.push(options.fn(ary[i]));
  return result.join("");
});
// use inc to add plus 1 to a value. used for the @index to avoid displaying a zero
Handlebars.registerHelper("inc", function(value, options) {
  return parseInt(value) + 1;
});
