# Knowledge-record
record  important knowledge
Start to learn english and managed code// 正式开启学习英语和代码托管之旅
first:rember at the last time save the code//记得在结束的时候保存好代码，然后退出浏览器，否则代码将不会被保存
node.js安装
http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html

知乎
https://www.zhihu.com/question/19793473
Node 在什么情况下是一个好的解决方案
http://www.ibm.com/developerworks/cn/opensource/os-nodejs/index.html?ca=drs#ibm-pcon


了解nodejs
node公开宣称的目标是：构建可伸缩网络程序     （的方法）（提供一种）（一种简单的方法）
1.现在您有了一个能处理数万个并发连接的程序，那么您能通过 Node 实际构建什么呢？
 
2. Node 的工作原理以及它的设计运行方式。
    2.1 node肯定不是什么
            Node 是一个服务器程序。但是，基础 Node 产品肯定不 像 Apache 或 Tomcat。本质上，那些服务器 “安装就绪型” 服             务器产品，支持立即部署应用程序。

7.更常见的是通过node.exe来执行xxx.js文件。下面我们就要进入windows真正的命令行了。
8.启动nodejs服务 需要在cmd中地址精确到helllo.js所在的文件夹下
http://jingyan.baidu.com/article/91f5db1b3e1f991c7f05e395.html
http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html




命令行里输入某个硬盘内的文件路径时要加cd如：cd D:\environment\Node\nodejs-6.9.1\node.js\scripts\controller否则报错
cd，定位到目录
ls，列出文件列表

helloworld.js 所在的文件夹放在哪里都行，只要命令行中路径指对了就可以
只有helloworld.js 中console出来的才能在命令行中显示，其他代码命令行中是不可见的
关掉命令行窗口之后服务器即停止

2.编写http服务器
/**
 * Created by ls-pc on 2017/2/6.
 */
var http=require("http");//此处的require是node自带的http模块，我们把它赋值给http变量
http.createServer(function(request,response){//此处我们调用http模块提供的方法createServer
                                            // ，这个函数会返回一个对象，这个对象有一个叫
                                            // listen的方法，这个方法有一个数值参数，指定
                                            // 这个http服务器监听的端口号
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("hello world");
    response.end();
}).listen(8888);

//进行函数传递http.createServer(function(request,response){}）
//实际上，function(request,response){}这个函数定义是createServer（）
//的第一个也是唯一一个参数，因为在JavaScript中，函数和其他变量一样都
//是可以被传递的
//用下面的代码和上面效果一样：
var http=require("http");
function onRequest(request,response){
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("hello world");
    response.end();
}
http.createServer(onRequest).listen(8888);
