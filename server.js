const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const Message = require('./Message');

const port = process.env.PORT || 7070;
const app = new Koa();
const router = new Router();

function getRandomNumber(min, max) {
  const randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
}

app.use(async (ctx, next) => {
  const headers = { 'Access-Control-Allow-Origin': '*', };
  ctx.response.set({...headers});
  try {
    return await next();
  } catch (e) {
    e.headers = {...e.headers, ...headers};
    throw e;
  }
})
app.use(router.routes());

router.get('/messages/unread', (ctx) => {
  const responseObj = {
    status: 'ok',
    timestamp: Date.now(),
    messages: [],
  };

  for (let i = 0; i <= getRandomNumber(-1, 2); i += 1) {
    responseObj.messages.push(new Message());
  }
  ctx.response.body = JSON.stringify(responseObj);
});

const server = http.createServer(app.callback());
server.listen(port, () => {
  console.log('server started');
});
