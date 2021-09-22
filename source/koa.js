const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')

class Koa {
    constructor(){
        this.middlewares = []
    }

    listen(...args){
        const server = http.createServer(async (req,res)=>{
            // this.callback(req,res)
            // 创建上下文
            const ctx = this.createContext(req,res)
            // this.callback(ctx)

            //中间件合成
            const fn = this.compose(this.middlewares)
            await fn(ctx)

            // 相应
            res.end(ctx.body)
        })
        server.listen(...args)
    }
    // use(callback){
    //     this.callback = callback
    // }
    use(middleware){
        this.middlewares.push(middleware)
    }
    // 构建上下⽂, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
    createContext(req,res){
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
    // 合成函数
    compose(middlewares){
        return function(ctx){ // 传入上下文
            return dispatch(0)
            function dispatch(i){
                let fn = middlewares[i]
                if(!fn){
                    return Promise.resolve()
                }
                return Promise.resolve(
                    fn(ctx,function next(){
                        // promise完成后，再执⾏下⼀个
                        return dispatch(i+1)
                    })
                )
            }
        }
    }
}

module.exports =  Koa