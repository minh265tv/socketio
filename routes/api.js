const Router = require("koa-router");
const PatientCtrl = require('../controllers/PatientCtrl');
const mdwAddHeaderJson = require('../middleware/apiHeaderResponse');

let apiRouter = new Router({
    prefix: '/api/v1'
});

apiRouter.use(mdwAddHeaderJson);

apiRouter.post('/sendMessage', async ctx => { await new PatientCtrl(ctx).sendMessage() });


module.exports = apiRouter;