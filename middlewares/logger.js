module.exports = async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
};
