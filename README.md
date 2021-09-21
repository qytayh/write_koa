# koa原理

⼀个基于nodejs的⼊⻔级http服务，类似下⾯代码：
```js
const http = require('http')
const server = http.createServer((req, res) => {
    // 业务逻辑
    res.writeHead(200)
    res.end('hello world!')
})
server.listen(3000,()=>{
    console.log('server listen at 3000')
})
```
koa的⽬标是⽤更简单化、流程化、模块化的⽅式实现回调部分

```js
// 创建 koa.js
const http = require('http')
class Koa {
    listen(...args){
        const server = http.createServer((req,res)=>{
            this.callback(req,res)
        })
        server.listen(...args)
    }
    use(callback){
        this.callback = callback
    }
}

module.exports =  Koa

// 使用 在inde.js中
const Koa = require('./koa')
const app = new Koa()

app.use((req,res)=>{
    res.writeHead(200)
    res.end('hello world!')
})
app.listen(300,()=>{
    console.log('server start at 3000')
})
```
> ⽬前为⽌，Koa只是个⻢甲，要真正实现⽬标还需要引⼊上下⽂（context）和中间件机制

# context

koa为了能够简化API，引⼊上下⽂context概念，将原始请求对象req和响应对象res封装并挂载到context上，并且在context上设置getter和setter，从⽽简化操作。

```js 
// demo
app.use(ctx=>{
    ctx.body = 'hehe'
})
```
封装 context、request、response

```js
// request.js
module.exports = {
    get url(){
        return this.req.url
    },
    get method(){
        return this.req.method.toLowerCase()
    },
}

// response.js
module.exports = {
    get body() {
        return this._body
    },
    set body(val) {
        this._body = val
    }
}

// context.js
module.exports = {
    get url(){
        return this.req.url
    },
    get method(){
        return this.req.method.toLowerCase()
    },
    get body() {
        return this._body
    },
    set body(val) {
        this._body = val
    }
}
```
在koa.js中引入
```js
const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
    listen(...args){
        const server = http.createServer((req,res)=>{
            // this.callback(req,res)
            // 创建上下文
            const ctx = this.createContext(req,res)
            this.callback(ctx)
            // 相应
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    ...
    createContext(req,res){
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}
```

