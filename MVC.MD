window.View = function(selector){
    return document.querySelector(selector)  //返回被操作的View视图
}
window.Model = function(){
    return {
        init: function(){}, //初始化数据
        fetch: function(){}, // 获取数据
        save: function(){} //保存数据
    }
}
//Controller会一直监视View视图，并且负责调用model，所以需要init。
//之后再去进行model的调用以及执行绑定的函数bindEvents
window.Controller = function(options){
    var init = options.init
    let object = {
        view: null,
        model: null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.model.init()
            init.call(this,view,model)
            this.bindEvents(this)
        },
    }
    //遍历传入的参数，开始处理业务。
    for(let key in options){
        if(key !== 'init'){
            object[key] = options[key]
        }
    }
    return object
}