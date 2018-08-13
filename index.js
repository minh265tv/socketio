const Koa = require("koa");
const app = new Koa();
const appConfig = require('./config/app.json');
const apiRoute = require('./routes/api');
const bodyParse = require('koa-bodyparser');

global.basePath = __dirname;

app.use(bodyParse());
app.use(apiRoute.routes());
  
app.listen(appConfig.port);