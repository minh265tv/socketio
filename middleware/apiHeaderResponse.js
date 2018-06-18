const apiHeaderResponse = async (ctx, next) => {
    ctx.set('Content-Type', 'application/json');
    await next();
}

module.exports = apiHeaderResponse;