function compose(middlewares){
    return function(){
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if(!fn){
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next(){
                    // promise完成后，再执⾏下⼀个
                    return dispatch(i+1)
                })
            )
        }
    }
}