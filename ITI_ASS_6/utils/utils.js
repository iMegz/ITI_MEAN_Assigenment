const { access, rm, unlink, constants } = require("fs");
const { join } = require("path");
exports.isUrl = (url) => {
  const regex = /http[s]*:\/\//;
  return regex.test(url);
};
exports.deleteIfExists = (filename) => {
  const dir = join(__dirname, "../", "public", "img", filename);
  access(dir, constants.F_OK, (err) => {
    if (!err) rm(dir, (err) => {});
  });
};
