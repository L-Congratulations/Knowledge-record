一、let和const命令
let是对变量的声明，const是对常量的声明
0、const一旦声明变量，就必须立即初始化，不能留到以后赋值。
1、仅在块级作用域内有效
2、声明的变量一定要在声明后使用，否则报错。
3、暂时性死区
    只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
    var tmp = 123;
    if (true) {
      tmp = 'abc'; // ReferenceError
      let tmp;
    }
 4、let不允许在相同作用域内，重复声明同一个变量。
    // 报错
    function () {
      let a = 10;
      var a = 1;
    }
    // 报错
    function () {
      let a = 10;
      let a = 1;
    }
 5、let实际上为 JavaScript 新增了块级作用域。
    function f1() {
      let n = 5;
      if (true) {
        let n = 10;
      }
      console.log(n); // 5
    }
    上面的函数有两个代码块，都声明了变量n，运行后输出5。这表示外层代码块不受内层代码块的影响。如果两次都使用var定义变量n，最后输出的值才是10。
    ES6 允许块级作用域的任意嵌套。
    {{{{{let insane = 'Hello World'}}}}};
    上面代码使用了一个五层的块级作用域。外层作用域无法读取内层作用域的变量。
    {{{{
      {let insane = 'Hello World'}
      console.log(insane); // 报错
    }}}};   
二、do 表达式
本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值。

{
  let t = f();
  t = t * t + 1;
}
上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到t的值，因为块级作用域不返回值，除非t是全局变量。

现在有一个提案，使得块级作用域可以变为表达式，也就是说可以返回值，办法就是在块级作用域之前加上do，使它变为do表达式。

let x = do {
  let t = f();
  t * t + 1;
};
上面代码中，变量x会得到整个块级作用域的返回值。

三、class
ES6提供了更接近传统语言的写法，引入了Class（类）这个概念。新的class写法让对象原型的写法更加清晰、更像面向对象编程的语法，也更加通俗易懂。
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
上面代码首先用class定义了一个“类”，可以看到里面有一个constructor方法，这就是构造方法，而this关键字则代表实例对象。
简单地说，constructor内定义的方法和属性是实例对象自己的，而constructor外定义的方法和属性则是所有实例对象可以共享的。

Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。上面定义了一个Cat类，
该类通过extends关键字，继承了Animal类的所有属性和方法。

super关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。
这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。

ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

四、箭头函数
arrow function
这个恐怕是ES6最最常用的一个新特性了，用它来写function比原来的写法要简洁清晰很多:

function(i){ return i + 1; } //ES5
(i) => i + 1 //ES6
简直是简单的不像话对吧...
如果方程比较复杂，则需要用{}把代码包起来：

function(x, y) {
    x++;
    y--;
    return x + y;
}
(x, y) => {x++; y--; return x+y}
当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。并不是因为箭头函数内部有绑定this的机制，
实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。

五、特性模板字符串``

六、解构：
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
看下面的例子：

let cat = 'ken'
let dog = 'lili'
let zoo = {cat: cat, dog: dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
用ES6完全可以像下面这么写：

let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}

七、default, rest
default很简单，意思就是默认值。大家可以看下面的例子，调用animal()方法时忘了传参数，传统的做法就是加上这一句type = type || 'cat' 来指定默认值。

function animal(type){
    type = type || 'cat'  
    console.log(type)
}
animal()
如果用ES6我们而已直接这么写：

function animal(type = 'cat'){
    console.log(type)
}
animal()
最后一个rest语法也很简单，直接看例子：

function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
而如果不用ES6的话，我们则得使用ES5的arguments。

八、import export

那CommonJS是怎么写的呢？

//index.js
var animal = require('./content.js')

//content.js
module.exports = 'A cat'
ES6的写法

//index.js
import animal from './content'

//content.js
export default 'A cat'
