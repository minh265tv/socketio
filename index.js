const Koa = require("koa");
const app = new Koa();
const appConfig = require('./config/app.json');
const apiRoute = require('./routes/api');

app.use(apiRoute.routes());
  
app.listen(appConfig.port);