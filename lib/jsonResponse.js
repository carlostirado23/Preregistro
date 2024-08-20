const _ = require("lodash");

exports.jsonResponse = function (statusCode, body) {
  return _.pick(
    {
      statusCode,
      body,
    },
    ["statusCode", "body"]
  );
};
