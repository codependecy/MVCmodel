封装 Model View Controller
完整代码：https://github.com/FrankFang/resume-15-8

controller === object
controller.init(view, model)
controller.init.call(controller, view, model)
那么 controller.init 里面的 this 当然 TM 是 controller
也就是这个1里面的object
controller.init 里面的 this 就是 object
object.init 里面的 this 就是 object
initB.call(this)
initB 里面的 this === call 后面的this
call 后面 this === 第二条里的 this
第二条里面的 this === object
=> initB 里面的 this 就是 object
复习 this
button.onclick = function f1(){
    console.log(this) // 触发事件的元素。  button
}

button.onclick.call({name: 'frank'})



button.addEventListener('click', function(){
    console.log(this) // 该元素的引用 button
}
2 结果


$('ul').on('click', 'li' /*selector*/, function(){
    console.log(this) //this 则代表了与 selector 相匹配的元素。
    // li 元素
})
3 结果
去看 on 的源码呀 -> 做不到
jQuery 的开发者知道 onclick 的源码，f1.call(???)
jQuery 的开发者写了文档
看文档呀
function X(){
    return object = {
        name: 'object',
        options: null,
        f1(x){
            this.options = x
            this.f2()
        },
        f2(){
            this.options.f2.call(this)
        }
    }
}

var options = {
    name: 'options',
    f1(){},
    f2(){
        console.log(this) // this 是啥 ?
    }
}

var x = X()
x.f1(options)
new 的作用
https://zhuanlan.zhihu.com/p/23987456

var object = new Object()

自有属性 空
object.proto === Object.prototype

var array = new Array('a','b','c')

自有属性 0:'a' 1:'b' 2:'c',length:3
array.proto === Array.prototype
Array.prototype.proto === Object.prototype

var fn = new Function('x', 'y', 'return x+y')
自有属性 length:2, 不可见的函数体: 'return x+y'
fn.proto === Function.prototype

Array is a function
Array = function(){...}
Array.proto === Function.prototype