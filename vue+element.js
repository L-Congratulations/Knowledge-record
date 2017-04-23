一、编码环境webstrom2017+es6
二、对vue理解：
  vue是什么：Vue.js 是一种MVVM框架，其中html是view层，js是model层（MVVM是Model-View-ViewModel的简写，因此在View和Model之间没有联系，
  通过ViewModel进行交互，而且Model和ViewModel之间的交互是双向的）
  vue的精髓：响应的数据绑定+组合的视图组件

三、vue基本语法：
  Vue构造函数开启Vue之旅（每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例 启动的）
  一个 Vue 实例其实正是一个 MVVM 模式中所描述的 ViewModel - 因此在文档中经常会使用 vm 这个变量名。
  1、  Vue.js 的是核心通过模板语法将数据渲染进 DOM 的系统（声明式的将数据渲染进 DOM 的系统）
  ------------------------------------------------------------------------------------------------------------------------------
  声明式编程和命令式编程区别：声明式编程是把命令式编程的处理过程抽出来形成一个函数，只需要给他传参数就能得到结果，不用去考虑中间的运算逻辑过程，
  命令式编程是考虑如何实现的过程。声明式编程是考虑想要什么结果，根据需求调用什么函数的过程，层次更高一点。如果我们花时间去学习(或发现)声明式的
  可以归纳抽离的部分，它们能为我们的编程带来巨大的便捷
  -----------------------------------------------------------------------------------------------------------------------------
  ：如下
  <div id="app">
    {{ message }}
  </div>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
  现在数据和 DOM 已经被绑定在一起，所有的元素都是响应式的
  
  3.1.1 vue构造器
    
    在实例化 Vue 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。全部的选项可以在 API 文档中查看。
    var vm = new Vue({
      // 选项此处的{}即为选项对象，它里面可以包含多个选项，可在api中查看
    })

  3.1.2 可以扩展 Vue 构造器（目前理解为就是组件），从而用预定义选项创建可复用的组件构造器（相当于自己自定义一个vue根实例的选项，用来满足api中没有但是自己需求的要求
      说白了就是自己自定义添加一个api中没有的选项，通过下面的方法创建并使用）：
    var MyComponent = Vue.extend({
      // 扩展选项
    })
    // 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
    var myComponentInstance = new MyComponent()
    尽管可以命令式地创建扩展实例，不过在多数情况下建议将组件构造器注册为一个自定义元素，然后声明式地用在模板中。我们将在后面详细说明组件系统。
    现在你只需知道所有的 Vue.js 组件其实都是被扩展的 Vue 实例。
    ---------------------------------------------------------------------------------------------------------------
    应该将扩展的选项注册为一个自定义元素（抽象为一个函数），方便在模板中使用，所有的vue组件其实都是被扩展的vue实例
    使用Vue构造函数创建一个Vue实例，然后通过Vue实例的el接口实现和HTML元素的挂载
    ----------------------------------------------------------------------------------------------------------------


  3.1.3 属性与方法
  只有data里的属性是响应式的，即通信是双向的
  Vue被实例化后，再创建的属性，将不会触发视图更新
  Vue实例将代理data对象的所有属性，也就是说部署在data对象上的所有属性和方法都将直接成为Vue实例的属性和方法
    var app = new Vue({
      el:'#app',
      data:{
        message:'hello world!',
        sayHello:function(){// data中也可以是函数
            console.log(1)
        }
    }
    })
    
    //如果想要获取到app这一实例中选项的对象，Vue提供$进行获取
    app.$el === document.getElementById('app')//true
    app.$data.message//hello world
    ------------------------------------------------------------------------------------------------------------------
    var data = { a: 1 }
    var vm = new Vue({
      data: data
    })
    vm.a === data.a // -> true

    // 设置属性也会影响到原始数据
    vm.a = 2
    data.a // -> 2

    // ... 反之亦然
    data.a = 3
    vm.a // -> 3

     只有data里的属性是响应式的，即通信是双向的，如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。
    我们将在后面详细讨论响应系统。
    
    也就是说如果var data = { a: 1 }是在实例创建之后定义的那么就不会是双向绑定，即vue实例作为viewmodel的意义也就消失了
    
    除了这些数据属性，Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与data代理的数据区分。例如：

    var data = { a: 1 }
    var vm = new Vue({
     el: '#example',
     data: data
    })

    vm.$data === data // -> true
    vm.$el === document.getElementById('example') // -> true

    // $watch 是一个实例方法
    vm.$watch('a', function (newVal, oldVal) {
     // 这个回调将在 `vm.a` 改变后调用
    })
    在vue实例外引用修改实例的属性和方法
    ------------------------------------------------------------------------------------------------------------------


  3.1.4
  每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，
  然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 生命周期钩子 ，这就给我们提供了执行自定义逻辑的机会。例如，created 
  这个钩子在实例被创建之后被调用：
  var vm = new Vue({
    data: {
      a: 1
    },
    created: function () {
      // `this` 指向 vm 实例
      console.log('a is: ' + this.a)
    }
  })
  // -> "a is: 1"
  也有一些其它的钩子，在实例生命周期的不同阶段调用，如 mounted, updated, and destroyed 。钩子的 this 指向调用它的 Vue 实例。
  一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。
  --------------------------------------------------------------------------------------------------------------------
  生命周期钩子作用：在整个执行过程的不同阶段插入自己想要执行的函数，具体想在哪里插入函数参考生命周期图示
  --------------------------------------------------------------------------------------------------------------------
  
  

四、组件
在大型的应用中，为了分工、复用和可维护性，我们不可避免地需要将应用抽象为多个相对独立的模块。在较为传统的开发模式中，我们只有在考虑
复用时才会将某一部分做成组件；但实际上，应用类 UI 完全可以看作是全部由组件树构成的
--------------------------------------------------------------------------------------------------------------------------
    <body>
        <div id="example">
          <my-component></my-component>
        </div>
    <script>
    // 定义
    var MyComponent = Vue.extend({
      template: '<div>A custom component!</div>'
    })
    // 注册
    Vue.component('my-component', MyComponent)



    /*
    Vue.component('my-component',{ 
               template : '<div>My name is vue.</div>'
           });
     */



    // 创建根实例
    new Vue({
      el: '#example'
    })
    </script>
    </body>

    Vue.js的组件可以理解为预先定义好了行为的ViewModel类。一个组件可以预定义很多选项，但最核心的是以下几个：

    模板（template）：模板声明了数据和最终展现给用户的DOM之间的映射关系。
    初始数据（data）：一个组件的初始数据状态。对于可复用的组件来说，这通常是私有的状态。
    接受的外部参数(props)：组件之间通过参数来进行数据的传递和共享。参数默认是单向绑定（由上至下），但也可以显式地声明为双向绑定。
    方法（methods）：对数据的改动操作一般都在组件的方法内进行。可以通过v-on指令将用户输入事件和组件方法进行绑定。
    生命周期钩子函数（lifecycle hooks）：一个组件会触发多个生命周期钩子函数，比如created，attached，destroyed等等。在这些钩子函数中，
    我们可以封装一些自定义的逻辑。和传统的MVC相比，可以理解为 Controller的逻辑被分散到了这些钩子函数中。
    私有资源（assets）：Vue.js当中将用户自定义的指令、过滤器、组件等统称为资源。由于全局注册资源容易导致命名冲突，一个组件可以声明自己
    的私有资源。私有资源只有该组件和它的子组件可以调用。
    除此之外，同一颗组件树之内的组件之间还可以通过内建的事件API来进行通信。Vue.js提供了完善的定义、复用和嵌套组件的API，让开发者可以像搭积木一样用组件拼出整个应用的界面。
    组件大大提高了代码的效率和维护性以及复用率

---------------------------------------------------------------------------------------------------------------------------
4.1.1
组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码
利用组件能够很好的把一个你正在构建的具有复杂接口的应用拆分开来，同时，组件也具有很高的复用性，即使是在你正在开发的是不同的项目也能封装复用。
在大型的应用中，为了分工、复用和可维护性，我们不可避免地需要将应用抽象为多个相对独立的模块。在较为传统的开发模式中，我们只有在考虑复用时才
会将某一部分做成组件；但实际上，应用类 UI 完全可以看作是全部由组件树构成的：
在Vue中你，可以使用Vue.component()来创建和注册你的组件，这个构造器有两个参数：

组件的名字
包含组件参数的对象
这个对象有点像Vue()构造器里的对象，它也有类似于Vue()里的el属性和data属性，但是又有点不一样。

Vue()构造器的el和data可以是对象。
Vue.component()构造器的el和data只能是函数。

4.2、组件探索
    万能组件写法（单独写一个组件demo.vue可以在任意地方引用）:
    第一步：写组件view和model并把它暴露出去，使得其他位置能够引用的到
    如自定义组件firstcomponent.vue:
    
    <template>
      <div id="firstcomponent">
        <h1>这是一个组件嘛</h1>
        <a href="">作者是谁{{author}}</a>
      </div>
    </template> //组件的view层
    <script>
      export default{//将组件暴露出去
        data(){// Vue()构造器的el和data可以是对象。Vue.component()构造器的el和data只能是函数。
          return{
            author:'测试的'//组件的数据绑定
          }
        }
      }
    </script>
  第二步：局部注册
  不必在全局注册每个组件。通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用：
  在mint.vue中引入firstcomponent.vue组件：
    <template>
      <div id="first">
          <h1>这是一个组件</h1>
          <a href="">作者是{{author}}</a>
          <firstcomponent></firstcomponent>//在view中的合适位置引入组件
        </div>
    </template>
    <script>
        import firstcomponent from './firstcomponent.vue'//将firstcomponent.vue引入到mint.vue中便于引用
        export default{                                 //此处的路径./代表当前文件夹，（../上一级文件夹）要注意
          data(){
                return{
                    author:'测试'
                }
            },
          
          components:{
            // <firstcomponent> 将只在父模板可用
            //局部注册firstcomponent组件，使其在mint的作用域中使用
            //原理：在父组件实例内部注册组件，使其仅在该实例作用域中可用
            firstcomponent
            //要是打算引入多个组件前边一样只需要在这里再添加一项就可以
             //firstcomponent，
             //first2注意要先用import引入然后再在这里注册就行了
          }
        }
    </script>
    其实和下面的等同，不过此处的firstcomponent是从外部引入的而下边的child则是直接在页面内定义的
    var Child = {//Vue.component('my-component', {  template: '<div>A custom component!</div>'})child的写法相当于把template存进了一个变量
      //而component支持'my-component', {  template: '<div>A custom component!</div>'}所以不用vue.extend()也可以

      template: '<div>A custom component!</div>'
    }
    new Vue({
      // ...
      components: {
        
        'my-component': Child
      }
    })
-------------------------------------------------------------------------------------------------------------
（1）、一个组件里只能有一个并列的div
    （2）、data应该是个函数,数据要写在 return 里面：
      export default {
        data(){
          return{
            msg:'hello vue'
        }
      }
       

-------------------------------------------------------------------------------------------------------------
4.3 组件通信
稍后写
-------------------------------------------------------------------------------------------------------------
        
-------------------------------------------------------------------------------------------------------------

五、路由
    Vue.js 路由允许我们通过不同的 URL 访问不同的内容。
    通过 Vue.js 可以实现多视图的单页Web应用（single page web application，SPA）。
    Vue.js 路由需要载入 vue-router 库
    中文文档地址：vue-router文档 http://router.vuejs.org/zh-cn/。
   （1）、修改 main.js，引入并注册 vue-router

      import Router from "vue-router";
      Vue.use(Router);    //使用前需注册vue-router
   （2）、创建路由实例并配置路由映射
      //path:'*',redirect:'/home'重定向到path是/home的映射
      //这里的路径还可以使用另外一种表达方式：先将组件引入文件import first2 from '../components/first2.vue'
      // 然后在路径中直接引用：routes:[{path:'/first2',component:first2}]
      //页面内直接定义的组件同理const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
      //routes:[{path:'/First',component:First}]
      const router=new Router({
        routes:[
          {
            path:'/main',component:require('../components/main.vue')
          },
          {
            path:'/Hello',component:require('../components/Hello.vue')
          },         
          {
            path:'*', redirect:'/Hello'
          }
        ]
      });
      export default router;    //将路由暴露出去
     （3）、 现在我们可以启动应用了！
    // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
    const app = new Vue({
      router: router,
      render: h => h(App)
    }).$mount('#app')
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

    以下实例中我们将 vue-router 加进来，然后配置组件和路由映射，再告诉 vue-router 在哪里渲染它们。代码如下所示：
    HTML 代码
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

    <div id="app">
      <h1>Hello App!</h1>
      <p>
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
      </p>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </div>

    JavaScript 代码
    // 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

    // 1. 定义（路由）组件。
    // 可以从其他文件 import 进来
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }

    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点再讨论嵌套路由。
    const routes = [
      { path: '/foo', component: Foo },
      { path: '/bar', component: Bar }
    ]

    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数, 不过先这么简单着吧。
    const router = new VueRouter({
      routes // （缩写）相当于 routes: routes
    })

    // 4. 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const app = new Vue({
      router
    }).$mount('#app')

    // 现在，应用已经启动了！        








1、引入element库
  在项目目录下D:\environment\vue\vueEle输入npm i element-ui -S 看到D:\environment\vue\vueEle\node_modules文件夹下有element-ui表示引入成功
2、引入整个element
  在main.js中写入：
  //引入elementUI
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(ElementUI)
3、（报错是由于我们引入了index.css这个 CSS 文件，但是 webpack 打包的时候无法识别并转换成 js，所以就需要配置才能读取 css 和字体文件，
    运行命令安装下面三个东西(如果之前安装过就不需要了)）
    在命令行中输入：
    npm install style-loader --save-dev
    npm install css-loader --save-dev
    npm install file-loader --save-dev
4、在 webpack.config.js 中的 loaders 数组加入以下配置，记得该加逗号的地方加逗号!
  {
    test: /\\.css$/,
    loader: "style!css"
  },
  {
      test: /\\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
      loader: "file"
  },
  
