const fs = require("fs");
const path = require("path");
const router = require("koa-router")();

// 注册路由处理函数
function registerUrl(router, urlMap) {
  for (const [key, value] of Object.entries(urlMap)) {
    if (key.startsWith("GET")) {
      const path = key.substring(4);
      router.get(path, urlMap[key]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (key.startsWith("POST")) {
      const path = key.substring(5);
      router.post(path, urlMap[key]);
    } else {
      console.log(`invalid URL: ${key}`);
    }
  }
}

function readControllerFile(router, dir) {
  const files = fs.readdirSync(dir);
  const jsFiles = files.filter((item) => item.endsWith(".js"));
  for (let file of jsFiles) {
    console.log(`开始处理controller：${file}...`);
    const mappping = require(path.join(dir, file));
    registerUrl(router, mappping);
  }
}

module.exports = (dir) => {
  const real_dir = dir || path.resolve(__dirname, "../controllers");
  readControllerFile(router, real_dir);
  return router.routes();
};
