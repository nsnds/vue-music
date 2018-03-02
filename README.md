# vue-music

#### 安装vue-cli
```js
cnpm i vue-cli -g
```

#### 创建项目
```js
vue init webpack music
// vue-router & eslink yes
```

#### 添加项目依赖
```js
// package.json
"dependencies": {
  // 对es6语法进行转义，不需要在项目中引用
  "babel-runtime": "^6.0.0",
  // 解决移动端点击延迟300ms，需要在项目中引用
  "fastclick": "^1.0.6"
},
"devDependencies": {
  // babel的补丁，Promise等es6语法进行转译，需要在项目中引用
  "babel-polyfill": "^6.2.0",
}
```

```js
// main.js
import "babel-polyfill"
import fastclick from "fastclick"

fastclick.attach(document)
```

<font color="red">import 语句要用单引号('')</font>

#### 修改目录结构
```
// src
api: 跟后端请求相关的代码目录
common: 通用的静态资源目录，字体文件、公用图片、通用js、通用样式
	base.styl: 基础样式文件
	icon.styl: 
	mixin.styl: 方法样式文件
	variable.styl: 颜色、字体大小定义规范样式文件
components: 组件目录
router: 路由目录
store: vuex相关代码目录
```

#### 配置.eslintrc.js
```js
// 不检测文件末尾是否有空行
"eol-last": 0

// 检测function左括号前面是否要加space
"space-before-function-paren": 0

// 是否允许空格和tab混用,0 & off: 不验证、1 & warn: 验证，不满足时警告、2 & error: 验证，不满足时报错
"no-mixed-spaces-and-tabs": 0
```

<font color="red">不可以用tab代替空格，会被警告</font>

#### 配置webpack.base.conf.js
```js
module.exports = {
  resolve: {
  	alias: {
  	  // 添加项目中common路径的配置
  	  'common': resolve("src/common"),
  	  // 添加项目中components路径的配置
  	  "components": resolve("src/components")
  	}
  }
}
```
```js
// 以下都是配置了alias的前提下

// css中@import common的路径需要加上~
@import "~common/stylus/base.sytl"

// js中improt common的路径不需要加~
import 'common/stylus/index.styl'
```

#### header组件
```js
// .vue后缀可以省略、需要用单引号('')
import MHeader from 'components/m-header/m-header'

// 注册组件
export default {
  components: {
    MHeader
  }
}
```

#### 顶部导航组件
```html
<router-link tag="div" class="tab-item" to="/rank"></router-link>
<!==
tag: 最后渲染出的元素类型
to: 跳转的路由
==>
```

```css
.tab-item
  ...
  &.router-link-active
/*
.router-link-active: 处于当前路由的激活样式
*/
```

#### 路由配置
```js
// src/router/index.js
import Recommend from 'components/recommend/recommend'
export default new Router({
  routes: [
    {
      path: '/',		//首页路由
      redirect: '/recommend'	//重定向到/recommend，使tab初始化时能选中推荐选项
    },
    {
      path: '/recommend',		//推荐页面路由
      component: Recommend
    }
  ]
})
```

#### chrome json-view

[github地址](https://github.com/gildas-lormeau/JSONView-for-Chrome/tree/master/WebContent)

#### 封装jsonp
```js
// package.json
"dependencies": {
  ...
  "jsonp": "0.2.1"
}

encodeURIComponent: 对字符串进行编码，不会对字母、数字、标点符号编码
					但会对;/?:@&=+$,#进行编码

encodeURI: 对字符串进行编码，不会对字母、数字、标点符号和;/?:@&=+$,#进行编码
```

#### 推荐页面slider组件

base文件夹: 基础组件库

components文件夹: 业务组件库

props: 父组件传递的数据

```js
// slider.vue
props: {
  // 循环轮播
  loop: {
    type: Boolean,
    default: true
  },
  // 自动轮播
  autoPlay: {
    type: Boolean,
    default: true
  },
  // 自动轮播间隔
  interval: {
    type: Number,
    default: 4000
  }
}
```

移动端轮播插件：[better-scroll](https://github.com/ustbhuangyi/better-scroll)

mounted: el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子

浏览器刷新需要17毫秒

ref: 元素或子组件的引用信息。注册在父组件的$refs对象上。在DOM元素上使用，引用指向的是DOM元素；在子组件上，引用指向组件实例
```html
<p ref="p">hello world!</p>

<child ref="child">hello world!</child>
```

若是循环轮播，slider-group的宽度需再加两个slider的宽度

当子组件依赖父组件传递的数据时，需要等数据初始化了才能加载子组件
```html
<slider v-if="dataList.length">
	...
<slider>

<!-- 或者是在子组件中watch父组件传递的数据，变化后重新初始化子组件的方法或变量 -->
```

better-scroll和fastclick冲突导致单击失灵：给点击的元素加上class名needsclick

```js
new Bscroll(this.$refs.slider, {
  scrollX: true,	//是否可以横向滚动
  scrollY: false,	//是否可以竖向滚动
  momentum: false,	//惯性
  snap: true,	//是否为slider组件
  snapLoop: this.loop,	//是否可以循环轮播
  snapThreshold: 0.3,	//
  snapSpeed: 400,	//贴合速度
  click: true	//是否可点击
})

// 滑动结束时的回调
new Bscroll().on('scrollEnd', () => {})

// 获取当前页面的信息，返回值{x: posX, y: posY, pageX: x, pageY: y}，x和y表示偏移的坐标值，pageX和pageY表示横轴方向和纵轴方向的页面数(从1开始)
new Bscroll().getCurrentPage()

// loop为true时，初始化scroll会在前后各增一个dom，所以pageX会比实际大1
let pageIndex = new Bscroll().getCurrentPage().pageX
if (this.loop) {
  pageIndex -= 1
}

// 滚动到指定页面，x: 横轴的页数，y: 纵轴的页数，time: 动画执行时间(切换间隔)，easing: 缓动函数
new Bscroll().goToPage(x, y time, easing)
```

当页面尺寸放生变化或dom结构发生变化时，需要重新计算better-scroll
```js
window.addEventListener('resize', () => {
  if (!this.slider){
  	return
  }
  this._setSliderWidth(true)

  // 重新计算better-scroll
  this.slider.refresh()
})

// 重新计算slider的宽度，不用再加上两个slider-item的宽度
if (this loop && !isResize) {
  width += 2 * sliderWidth
}
```

将dom缓存到内存中，保存当前页面状态，防止路由切换时重新发送请求
```html
<keep-alive>
  <router-link></router-link>
</keep-alive>
```

#### 推荐页面歌单部分
```js
const a = {x: 1, y: 2}

// 对象的拷贝，后置位的属性会覆盖前置位
Object.assign({}, a, {z: 3, x: 4})		// {x: 4, y: 2, z: 3}
```

新版vue-cli没有dev-server.js，模拟请求可以在webpack-dev-conf.js中配置
```js
// 在const portfinder后加：
const express = require('express')
const app = express()
const apiRouters = express.Router()
app.use('/api', apiRouters)

devServer: {
  ...
  // 添加before
  before(app) {
    app.get('/api/list', (req, res) => {})
  }
}

```

#### sceoll组件
```html
<!-- scroll.vue -->
<tamplate>
	<div ref="warpper">
		<slot></slot>
	</div>
</tamplate>

<!-- recommend.vue -->
<scroll>
	<!-- 必须有一个容器包裹，不能两个组件标签连在一起 -->
	<div>
		<silder></slider>
		<div></div>
		...
	</div>
<scroll>
```

#### 图片懒加载

插件：vue-lazyload
```js
// main.js
VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('components/m-header/logo@2x.png')
})
```

```html
<img v-lazy="imgUrl">
```

#### 歌手页面

先对Findex做聚合，相同的作为一组数据。热门数据为前十条

ES6: Class
```
ES6引入了Class，作为对象的模版

constructor函数就是构造函数
```

```js
export default class Singer {
  construCtor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/5233${id}.jpg`
  }
}
```

正则匹配与升序排列
```js
// 正则匹配是否全是字母
str.match(/[a-zA-Z]/)	//是字母构成的字符串返回true

// 对字母进行排序：升序
ret.sort((a, b) => {
  return a.title.charCodeAt(0) - b.title.charCodeAt(0)	//charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
})
```

map()
```js
// 作用: 将调用的数组中每个元素传递给指定函数，返回一个数组。
// 注意：map应该有返回值，返回新数组但不改变原数组
```

事件对象获取对应元素dom
```
click(e) {
  let dom = e.target
}
```

关于stop、prevent修饰符
```html
<!-- 阻止冒泡、阻止默认事件，项目中是为了阻止屏幕随手指滑动 -->
<div @touchmove.stop.prevent="">
```

获取touch事件的移动的距离
```js
const touch = {}

touchStart(e) {
  let firstTouch = e.touches[0]   //获取第一个手指touchStart的信息
  touch.y1 = firstTouch.pageY   //获取当前位置的纵坐标
}
touchMove(e) {
  let firstTouch = e.touches[0]   //获取第一个手指touchMove的信息
  touch.y2 = firstTouch.pageY   //获取当前位置的纵坐标
  let delta = touch.y2 - touch.y1   //获取滑动的距离
}
```

向下取整
```js
let a = num | 0
```

子组件向父组件传值
```js
// 子组件
this.$emit('scroll', 5233)

```

#### 关于better-scroll

scrollToElement(el, time, offsetX, offsetY, easing)
```
{DOM | String} el 滚动到的目标元素, 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象。
{Number} time 滚动动画执行的时长（单位 ms）
{Number | Boolean} offsetX 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置
{Number | Boolean} offsetY 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置
{Object} easing 缓动函数，一般不建议修改，如果想修改，参考源码中的 ease.js 里的写法
```

#### 关于GitHub

[GitHub汉化](https://github.com/52cik/github-hans)

上传忽略node_modules文件夹
```
.gitignore

node_modules/
```


#### 关于eslink的坑

```js
import {getRecommend} from 'api/recommend'
// improt进的getRecommend要使用，否则报错
// 路径要用单引号

if () {
  ...
} else {
  ...
}
//if else语句必须用这样的格式，否则报错
```
