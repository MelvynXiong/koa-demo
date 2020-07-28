const nunjucks = require("nunjucks");

function createEnv(path, opts) {
  const autoescape = opts.autoescape === undefined ? true : opts.autoescape;
  const noCache = opts.noCache || false;
  const watch = opts.watch || false;
  const throwOnUndefined = opts.throwOnUndefined || false;
  // 从 path 中搜索 template 文件
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      noCache,
      watch,
    }),
    {
      autoescape,
      throwOnUndefined,
    }
  );
  if (opts.filters) {
    for (const [key, value] of Object.entries(opts.filters)) {
      env.addFilter(key, value);
    }
  }
  return env;
}

const env = createEnv("views", {
  watch: true,
  filters: {
    hex: function (n) {
      return "0x" + n.toString(16);
    },
  },
});

console.log(
  env.render("extend.html", {
    header: "Hello",
    body: "bla bla bla...",
  })
);
