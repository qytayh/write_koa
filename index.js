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

app.use((req,res)=>{
    res.writeHead(200)
    res.end('hello world!')
})
app.listen(300,()=>{
    console.log('server start at 3000')
})