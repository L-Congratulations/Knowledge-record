1、引入element库
  在项目目录下D:\environment\vue\vueEle输入npm i element-ui -S 看到D:\environment\vue\vueEle\node_modules文件夹下有element-ui表示引入成功
2、引入整个element
  在main.js中写入：
  //引入elementUI
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(ElementUI)
  以上代码便完成了 Element 的引入。需要注意的是，样式文件需要单独引入。
