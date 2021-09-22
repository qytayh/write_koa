// const http = require('http')
// const server = http.createServer((req, res) => {
//     // 业务逻辑
//     res.writeHead(200)
//     res.end('hello world!')
// })
// server.listen(3000,()=>{
//     console.log('server listen at 3000')
// })

const Koa = require('./source/koa')
const app = new Koa()

const Router = require('./source/router')
const router = new Router();


router.get('/index', async ctx => {
    console.log('index,xx')
    ctx.body = 'index page';
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });


app.use(router.routes())


// const delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     await next();
//     ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "2";
//     await delay();
//     await next();
//     ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//     ctx.body += "3";
// });
app.listen(3000, () => {
    console.log('server start at 3000')
})