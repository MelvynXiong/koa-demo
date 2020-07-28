const Koa = require("koa");
const fs = require("fs");
const path = require("path");
const logger = require("./middlewares/logger");
const time = require("./middlewares/time");
const controller = require("./middlewares/controller");
const bodyParser = require("koa-bodyparser");
const staticFiles = require("./middlewares/static-files");

const app = new Koa();
app.use(logger);
app.use(time);
app.use(bodyParser());
app.use(staticFiles("/static/", path.join(__dirname, "static")));
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log("app started at port 3000...");
