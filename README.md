# Knowledge-record
record  important knowledge
Start to learn english and managed code// 正式开启学习英语和代码托管之旅
first---index.js
index.js中首先引入依赖的模块（依赖的js文件，需要用到的或者可以说是搭建服务器所有的js文件）--》然后建立一个对象用来储存链接中的不同地址--》启动服务--》流程如下：
/**
 * Created by ls-pc on 2017/2/6.
 */
//var server=require("./server");
//server.start();
//正如你看到的，我们可以像使用任何其他的内置模块一样使用
// server模块（server。js模块）：
// 请求这个文件require("./server")并把它指向一个变量，
// 其中已导出的函数就可以被我们使用了



//非常好，我们现在可以把我们的应用的不同部分放入不同的
// 文件里，并且通过生成模块的方式把它们连接到一起了
// 我们仍然只拥有整个应用的最初部分：我们可以接收http请求。
// 但是我们得做点什么，对于不同的URL请求，服务器应该有不同的反应


//对于一个非常简单的应用来说，你可以直接在回调函数onRequest（）
// 中做这件事情。不过我们应该加入一些抽象的元素，让我们的例子变得
// 更有趣   处理不同的http请求在我们的代码中是一个不同的部分，
// 叫做“路由选择”--那么我们接下来就创造一个叫做路由的模板吧

//如何来进行请求的“路由”？
//我们要为路由提供请求的URL和其他需要的get及post参数，随后路由需
// 要根据这些数据来执行相应的代码（这里“代码”对应整个应用的第三部分：
// 一系列在接受到请求时真正工作的处理程序）

//因此，我们需要查看http请求，从中提取出请求的
// url以及get、post参数。这里暂定为我们的http服务器的功能

//我们需要的所有数据都会包含在request对象中，改对象作为onRequest（）
// 回调函数的第一个参数传递，但是为了解析这些数据，我们需要额外的node模块，
// 他们分别是URL和querystring模块
//以http://localhost:8888/start?foo=bar&hello=world为例：
// url。parse（string）。pathname对应start
// url。parse（string）。query对应foo=bar&hello=world
// 而querystring（string）["foo"]对应bar
// querystring（string）[“hello”]对应world

//当然我们也可以用querystring模块来解析post请求体中的参数
//现在我们来给onRequest（）函数加上一些逻辑，用来找出浏览器请求的URL路径：
//见server。js



//同时我们会相应扩展index。js，使得路由函数可以被注入到服务器中：见index。js
//var server=require("./server");
//var router=require("./router");
//
//server.start(router.route);
//如果现在启动应用（node index。js），随后请求一个url，你将会看到应用输出
// 相应的信息，这表明我们http服务器已经在使用路由模块了，并会将请求的路径传
// 递给路由：bash$ node index.js   Request for /foo received.
//    About to route a request for /foo
// （以上输出已经去掉了比较烦人的/favicon.ico请求相关的部分）。

//行为驱动执行
//在这里谈一谈函数式编程
// 将函数作为参数传递并不仅仅出于技术上的考量，对软件设计说，这其实是个哲学问题
// 。想一想这样的场景：在index文件中，我们可以将router对象传递进去，服务器随后
// 可以调用这个对象的route函数
//
// 像这样，我们传递一个东西，然后服务器利用这个东西来完成一些事。嗨那个叫路由的
// 东西，能帮我把这个路由一下吗
//
// 但是服务器其实不需要这样的东西。他只需要把事情做完就行，其实为了把事情做完，
// 你根本不需要东西，你需要的是动作，也就是说，你不需要名词，你需要动词
//
// 理解了这个概念里最核心，最基本的思想转换后，我自然而然地理解了函数编程
// 我是在读了Steve Yegge的大作名词王国中的死刑之后理解函数编程。你也去读
// 一读这本书吧，真的。这是曾给予我阅读的快乐的关于软件的书籍之一。
//
// 路由给真正的请求处理程序
//
// 回到正题，现在我们的http服务器和请求路由模块已经如我们的期望，可以互相交
// 流了
// 当然这还远远不够，路由，顾名思义，是指我们要针对不同的URL有不同的处理方式
// 例如处理/start的“业务逻辑”就应该和处理/upload的不同
//
// 在现在的实现下，路由过程会在路由模块中“结束”，并且路由模块并不是真正针对
// 请求“采取行动”的模块，否则当我们的应用程序变得更为复杂时，将无法很好地进
// 行扩展
//
// 我们暂且把作为路由目标的函数称为请求处理程序。现在我们不要急着来开发路由模
// 块，因为如果请求处理程序没有就绪的话，再怎么完善路由模块也没有多大意义
// 应用程序需要新的部件，因此加入新的模块。我们来创建一个叫做requestHandlers
// 的模块，并对于每一个请求处理程序，添加一个占位用函数，随后将这些函数作为模
// 块的方法导出：
// 见requestHandlers。js。

//我们先将这个对象引入到主文件index。js中
var server=require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers");

var handle={};
handle["/"]=requestHandlers.start;
handle["/start"]=requestHandlers.start;
handle["/upload"]=requestHandlers.upload;

server.start(router.route,handle);
//虽然handle并不仅仅是一个“东西”（一些请求处理程序的集合），
// 我还是建议以一个动词作为其命名，这样做可以让我们在路由中使用
// 更流畅的表达式，稍后会有说明
//
// 正如所见，将不同的URL映射到相同的请求处理程序上是很容易的：只
// 要在对象中添加一个键为“/”的属性，对应requestHandlers。start
// 即可，这样我们就可以干净简洁的配置/start和/的请求都交由start这
// 一处理程序处理
//
// 在完成了对象的定义后，我们把它作为额外的参数传递给服务器，为此将
// server。js修改如下：见server。js。
