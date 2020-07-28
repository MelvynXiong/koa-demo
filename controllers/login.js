const homeController = async (ctx, next) => {
  ctx.render("index.html", { title: "welcome xmh" });
};

const signController = async (ctx, next) => {
  const name = ctx.request.body.name || "";
  const password = ctx.request.body.password || "";
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === "koa" && password === "12345") {
    ctx.render("sign-ok.html", {
      title: "sign in ok",
      name: "xiong",
    });
  } else {
    ctx.render("sign-fail.html", {
      title: "fail with error",
    });
  }
};

module.exports = {
  "GET /": homeController,
  "POST /signin": signController,
};
