const Koa = require("koa");
const logger = require("./middlewares/logger");
const time = require("./middlewares/time");
const bodyParser = require("koa-bodyparser");
const router = require("koa-router")();

const app = new Koa();

router.get("/", async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
      <form action="/signin" method="post">
          <p>Name: <input name="name" value="koa"></p>
          <p>Password: <input name="password" type="password"></p>
          <p><input type="submit" value="Submit"></p>
      </form>`;
});

router.post("/signin", async (ctx, next) => {
  var name = ctx.request.body.name || "",
    password = ctx.request.body.password || "";
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === "koa" && password === "12345") {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
      <p><a href="/">Try again</a></p>`;
  }
});

// add url-route:
router.get("/hello/:name", async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

app.use(logger);
app.use(time);
app.use(bodyParser());
app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
console.log("app started at port 3000...");
