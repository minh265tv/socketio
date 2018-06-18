const Router = require("koa-router");
const userCtrl = require('../controllers/userCtrl');
const mdwAddHeaderJson = require('../middleware/apiHeaderResponse');

let apiRouter = new Router({
    prefix: '/api/v1'
});

apiRouter.use(mdwAddHeaderJson);

apiRouter.get('/user', async ctx => { await new userCtrl(ctx).userInfo() });

module.exports = apiRouter;