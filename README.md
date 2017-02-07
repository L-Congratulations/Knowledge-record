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
============================================================================================================================

second-->server.js  server.js是服务器处理逻辑的函数，在这里我们做的就是将URL解析，并传递给route（）函数，完成上述工作后将服务启动----简言之就是在启动服务的时候同时启动route（）函数，让服务能处理逻辑

/**
 * Created by ls-pc on 2017/2/6.
 */
//var http=require("http");//此处的require是node自带的http模块，我们把它赋值给http变量
//http.createServer(function(request,response){//此处我们调用http模块提供的方法createServer
//                                            // ，这个函数会返回一个对象，这个对象有一个叫
//                                            // listen的方法，这个方法有一个数值参数，指定
//                                            // 这个http服务器监听的端口号
//    response.writeHead(200,{"Content-Type":"text/plain"});
//    response.write("hello world");
//    response.end();
//}).listen(8888);

//进行函数传递http.createServer(function(request,response){}）
//实际上，function(request,response){}这个函数定义是createServer（）
//的第一个也是唯一一个参数，因为在JavaScript中，函数和其他变量一样都
//是可以被传递的
//用下面的代码和上面效果一样：
//var http=require("http");
//function onRequest(request,response){
//    console.log("Request recevied");
//    response.writeHead(200,{"Content-Type":"text/plain"});
//    response.write("hello world");
//    response.end();
//}
//http.createServer(onRequest).listen(8888);
//console.log("server has started");
//服务器是如何处理请求的：
//回调函数onRequest()函数的主体部分
//当回调启动，我们的onRequest()函数被触发的时候，有两个参数被传入：
//request和response他们是对象，可以使用它们的方法来处理Htt请求的细节
// ，并且响应请求（比如向发出请求的浏览器发回一些东西）。所以我们的代码就是：：：
// 当收到请求时，使用response。writeHead（）函数发送一个HTTP状态200和http头
// 的内容类型（content-type），使用response。write（）函数在http相应主体中
// 发送文本“hello world”。。。最后调用response。end（）完成响应。
// 目前来说，我们对请求的细节并不在意，所以我们没有使用request对象


//服务端的模块放在哪里？
// 我们现在回到如何组织应用这个问题上，我们现在在server。js文件中有一个
// 非常基础的http服务器代码，而且我提到通常我们会有一个叫index。js的文
// 件去调用应用的其他模块（如server。js中的http服务器模块）来引导和启动应用

//我们现在来谈谈怎么把server。js变成一个真正的node。js模块（就像http），使他
// 可以被我们的index。js主文件使用 也许你已经注意到，我们已经在代码中使用模块了
// ，像这样：var http=require("http");
//       ...
    //     http.createServer(...)
//因为node中自带了一个叫做“http”的模块，我们在我们的代码中请求他并把返回值
// 赋给一个本地变量，这把我们的本地变量变成了一个拥有所用http模块所提供的的公
// 共方法的对象。。。给这种本地变量起一个和模块名称一样的名字是一种惯例，但是
// 你也可以按照自己的喜好来：
// var foo=require("http");
//...
    //foo.createServer(...)

//很好，怎么使用node内部模块已经很清楚了：先require找到模块并赋给
// 本地变量var http=require("http");然后调用模块的
// 方法 http.createServer(onRequest).listen(8888);


//我们把我们的服务器脚本放到一个叫做start的函数里，然后我们会导出这个函数：
//var http=require("http");
//function start(){
//    function onRequest(request,response){
//        console.log("request")
//        response.writeHead(200,{"Content-Type":"text/plain"});
//        response.write("hello world");
//        response.end();
//    }
//    http.createServer(onRequest).listen(8888);
//    console.log("server has start")
//}
//exports.start=start;//作用是把start函数暴露出去   export意思是出口



//给onRequest（）函数加上一些逻辑，找出浏览器请求的URL路径：
//var http=require("http");
//var url=require("url");

//function start(){
//    function onRequest(request,response){
//        var pathname=url.parse(request.url).pathname;
//        console.log("request for"+pathname+"received.");
//        response.writeHead(200,{"Content-Type":"text/plain"});
//        response.write("hello world");
//        response.end();
//    }
//    http.createServer(onRequest).listen(8888);
//    console.log("server has start");
//}
//exports.start=start;
//好了，我们的应用现在可以通过请求的URL路径来区别不同请求了--这
// 使我们得以使用路由来将请求以url路径为基准映射到处理程序上
// 在我们所要构建的应用中，意味着来自/start和/upload的请求可以使
// 用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的
// 现在我们可以来编写路由了，建立一个名为router。js的文件。
// 。



//首先，我们先来扩展一下服务器的start（）函数，以便将路由函数作
// 为参数传递过去：见server。js
//var http=require("http");
//var url=require("url");
//function start(route){//将路由函数作为参数传递进来，，，将函数作为参数传递并不仅仅出于技术上的考量，对软件设计来说，
//    function onRequest(request,response){
//        var pathname=url.parse(request.url).pathname;
//        console.log("request for " + pathname + " received.");
//        route(pathname);
//        response.writeHead(200,{"Content-Type":"text/plain"});
//        response.write("hello world");
//        response.end();
//    }
//    http.createServer(onRequest).listen(8888)
//    console.log("server has started")
//}
//exports.start=start;

//同时我们会相应扩展index。js，使得路由函数可以被注入到服务器中：见index。js


// 在完成了对象的定义后，我们把它作为额外的参数传递给服务器，为此将
// server。js修改如下：见server。js。
//var http=require("http");
//var url=require("url");
//function start(route,handle){
//    function onRequest(request,response){
//        var pathname=url.parse(request.url).pathname;
//        console.log("request for "+pathname+" received.");
//        route(handle,pathname);
//
//        response.writeHead(200,{"Content-Type":"text/plain"});
//        response.write("hello world");
//        response.end();
//    }
//    http.createServer(onRequest).listen(8888);
//    console.log("server has started.");
//}
//exports.start=start;
//这样我们就在start（）函数里添加了handle参数，并且把handle对象作
// 为第一个参数传递给了route（）回调函数
//
// 然后我们相应地在router。js文件中修改route（）函数：见router。js。


//以非阻塞操作进行请求响应
//
//我刚刚提到了这样一个短语--“正确的方式”而事实上通常“正确的方式”
// 一般都不简单
// 不过node。js就有这样一种实现方案：函数传递。下面就让我们来具体看
// 看如何实现
// 到目前为止，我们的应用已经可以通过应用各层之间传递值的方式（请求处
// 理程序--》请求路由--》服务器）将请求处理程序返回的内容（请求处理程
// 序最终要显示给用户的内容）传递给http服务器
//
// 现在我们采用如下这种新的实现方式：相对于采用将内容传递给服务器的方式
// ，我们这次采用将服务器“传递”给内容的方式。从实践角度来说，就是将response
// 对象（从服务器的回调函数onRequest（）获取）通过请求路由传递给请求处理
// 程序。随后，处理程序就可以采用该对象上的函数来对请求作出响应
//
// 原理就是如此，接下来我们来一步步实现这种方案
// 先从server。js开始：：

var http=require("http");
var url=require("url");
function start(route,handle){
    function onRequest(request,response){
        var pathname=url.parse(request.url).pathname;
        console.log("request for "+ pathname+" received");

        route(handle,pathname,response);
    }
    http.createServer(onRequest).listen(8888);
    console.log("server has started.")
}
exports.start=start;
//相对此前从route（）函数获取返回值的做法，这次我们将response对象
// 作为第三个参数传递给route（）函数，并且，我们将onRequest（）处理
// 程序中所有有关response的函数都移除，因为我们希望这部分工作让route（）
// 函数来完成
//
// 下面就来看看我们的route。js：：见route。js

=============================================================================================================================

third--->route.js   route.js是路由函数在这里我们将对URL解析出来的字符串进行判断并分配，然后启动请求处理程序handle[pathname]()，我们将在handle[pathname]()中对不同的URL地址进行不同的操作-------简言之就是分配路由


/**
 * Created by ls-pc on 2017/2/6.
 */
//function route(pathname){
//    console.log("about to route a request for "+pathname)
//}
//exports.route=route;
//如你所见，这段代码什么也没干，不过对于现在来说这是应该的。
// 在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来

//我们的服务器应当知道路由的存在并加以有效利用。我们当然可以通
// 过硬编码的方式将这一依赖绑定到服务器上，但是其他语言的编程经验
// 告诉我们这会是一个非常痛苦的事，因此我们将使用依赖注入的方式较
// 松散地添加路由模块


//首先，我们先来扩展一下服务器的start（）函数，以便将路由函数作
// 为参数传递过去：见server。js


// 然后我们相应地在router。js文件中修改route（）函数：见router。js。
//function route(handle,pathname){
//    console.log("about to route a request for "+pathname);
//    if (typeof handle[pathname]==='function'){
//        handle[pathname]();
//    }else{
//        console.log("no request handler found for "+pathname);
//    }
//}
//exports.route=route;

//通过以上代码，我们首先检查给定的路径对应的请求处理程序是否存在
// handle是对象handle[pathname]则是判断index。js中的
// handele["/"]=requestHandlers.start;而reqyestHandlers.start
// 则是函数。如果存在的话直接调用相应地函数。我们可以用从关联数组
// 中获取元素一样的方式从传递的对象中获取请求处理函数，因此就有了
// 简洁流畅的形如handle[pathname]()。的表达式，这个感觉就像在前
// 方中提到的那样：“嗨，请帮我处理了这个路径”
//
// 有了这些，我们就把服务器、路由和请求处理程序在一起了。现在我们
// 启动应用程序并在浏览器中访问http://localhost:8888/start，以下
// 日志可以说明系统调用了正确的请求处理程序：
//Server has started.
//Request for /start received.
//About to route a request for /start
//Request handler 'start' was called.

// 。


// 下面就来看看我们的route。js：：见route。js
function route(handel,pathname,response){
    console.log("aboute to route a request for "+pathname);
    if(typeof handel[pathname]==='function'){
        handel[pathname](response);
    }else {
        console.log("no request handlers found for "+pathname);
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route=route;
//同样的模式：相对此前从请求处理程序中获取返回值，这次取而代之的事直
// 接传递response对象
// 如果没有对应的请求处理器处理，我们就直接返回404
//
// 最后我们将requestHandlers。js修改为如下形式：见requestHandlers。js。

=============================================================================================================================

fourth-->requestHandlers.js   requestHandlers.js是请求处理程序，我们在这里处理不同路由所对应的的具体操作并进行响应将结果返回-----简言之就是请求的具体处理过程和返回结果

/**
 * Created by ls-pc on 2017/2/7.
 */
//function start(){
//    console.log("request handler 'start' was called.");
//}
//function upload(){
//    console.log("request handler 'upload' was called");
//}
//exports.start=start;
//exports.upload=upload;
//这样我们就可以吧请求处理程序和路由模块连接起来，让路由有路可寻
// 虽然和其他模块一样，依赖注入不应该仅仅为使用而使用，但在现在
// 这个情况下，使用依赖注入可以让路由和请求处理程序之间的耦合更
// 加松散，也因此能让路由的重用性提高
//
// 那么我们要怎么传递这些请求处理程序呢？别看现在我们只有2个处理
// 程序，在一个真实的应用中，请求处理程序的数量会不断增加，我们当然
// 不想每次都有一个新的URL或请求处理程序时，都要为了在路由里完成请求
// 到处理程序的映射而反复折腾。除此之外，在路由里有一大堆ifrequest==
// x then call handler y也使得系统丑陋不堪
//
// 如果JavaScript的对象仅仅是键/值对的集合，它又怎么会拥有方法呢？
// 好吧，这里的值可以是字符串、数字或。。。函数
//
// 好了，最后再回到代码上来。现在我们已经确定将一系列请求处理程序通过
// 一个对象来传递，而且需要使用松耦合的方式将这个对象注入到route（）函
// 数中
//
// 我们先将这个对象引入到主文件index。js中：见index。js。


// 最后我们将requestHandlers。js修改为如下形式：
// 见requestHandlers。js。

var exec=require("child_process").exec;
function start(response){
    console.log("request handler 'start' was called");
    exec("ls-lah",function(error,stdout,stderr){
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write(stdout);
        response.end();
    })
}
function upload(response){
    console.log("request handle 'upload' was called");
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("hello upload");
    response.end();
}
exports.start=start;
exports.upload=upload;

//我们处理程序函数需要接受response参数，为了对请求作出直接的响应
//
// start处理程序在exec（）的匿名回调函数中做请求响应的操作，而
// upload处理程序仍然是见到的回复“hello upload”，只是这次是
// 使用response对象而已
//
// 这次我们启动应用（node。js），以前都会工作的很好
//
//
// 更有用的场景。

