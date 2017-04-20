一、编码环境webstrom2017+es6
二、熟悉vue语法：
  vue的精髓：响应的数据绑定+组合的视图组件
  （1）、构造器
  每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例 启动的：
  在实例化 Vue 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。全部的选项可以在 API 文档中查看。












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
  
