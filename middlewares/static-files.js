const path = require("path");
const mime = require("mime");
const fs = require("mz/fs");

function staticFiles(url, dir) {
  return async function (ctx, next) {
    const rpath = ctx.request.path;
    if (rpath.startsWith(url)) {
      const fp = path.join(dir, rpath.substring(url.length));
      const isExist = await fs.exists(fp);
      if (isExist) {
        ctx.response.type = mime.getType(rpath);
        ctx.response.body = await fs.readFile(fp);
      } else {
        ctx.response.status = 404;
      }
    } else {
      // 不是指定前缀的 url, 继续处理下一个middleware
      await next();
    }
  };
}
module.exports = staticFiles;
