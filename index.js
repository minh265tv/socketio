const Koa = require("koa");
const app = new Koa();
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)
const socket = require('./src/socket');

global.io = io;

const appConfig = require('./config/app.json');
const apiRoute = require('./routes/api');
const bodyParse = require('koa-bodyparser');
const fs = require('./libs/fs');

global.basePath = __dirname;
if (appConfig.showLog) {
    const logger = require('koa-logger');
    app.use(logger());
}

app.use(bodyParse());
app
    .use(apiRoute.routes())
    .use(apiRoute.allowedMethods());;

socket.login();

server.on('close', function() {
  fs.write(__dirname,'/src/socket/DB.json',[]);
  console.log('Stopping....')
});

process.on('SIGINT', function() {
    server.close();
});

server.listen(appConfig.port);