# todolist

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 一个简单的基于todomvc模板的todolist
1. 前期项目配置：
  * 用todomvc-app-template中的index.html替换vue原有的html
  * 在项目中npm install todomvc-app-css引入样式<br>
  至此项目的静态资源配置完毕
2. 项目的功能实现：
 * 设置title<br>
 在data中添加title属性，绑定到h1上
 * 设置todo的遍历项<br>
  用v-for语法（保留index留作它用）遍历data中的todos数组，数组每一个元素都是一个对象。<br>
  第一个字段为content，代表当前内容；<br>
  第二个字段为completed，标识是否完成；
 * 根据todos是否为空来确定最后一行是否展示，利用v-show实现
 * 添加item的功能<br>
 在data上添加newTodo属性，在input输入框中进行双向绑定，利用trim修饰符去掉输入的前后空格;<br>
   添加键盘监听事件keyup.enter，响应事件为addTodo：addTodo对newTodo进行检测，如果为空则返回；否则添加到data的todos数组中；清空newTodo字段
 * 删除item的功能<br>
  点击'x'按钮删除，传入当前todo的index，用splice方法从datas中删除对应项
 * 标记item已完成的功能<br>
  在checkbox上用v-model绑定todo的completed字段，用于标识是否完成；<br>
  用:class语法在对应li上根据todo.completed的值来确定是否添加；completed类名
 * 双击item进行编辑，回车/blur 确认修改，esc取消<br>
 编辑：在对应项的label上添加双击事件，edtiTodo，传入当前todo；方法中执行的操作：用editCache缓存当前todo.content，以备撤销编辑；用editedTodo存储当前被编辑的todo；在对应li中通过todo是否是editedTodo决定是否添加类名editing；在input中根据相同的条件决定是否聚焦，这里同时设置了自定义指令v-focus控制聚焦事件。<br>
 确认修改：添加blur和enter事件，对应的事件都是doneEdit(todo,index)：将editedTodo置空，也就取消了编辑状态；同时对内容进行了检测，如果此时内容为false，用removeTodo方法移除此条。<br>
 esc取消：keyup.esc事件，将editedTodo置空取消编辑；然后用editCache将缓存的内容赋值给todo.content
 * 下方item left对未完成item进行统计<br>
 利用计算属性监听remain，注册一个全局过滤器filter，根据todo的completed的状态返回数组，这里获取了返回的active状态的数组的长度<br>
 在标签内利用{{表达式}}进行三目运算，用于确定显示item/items
 * 点击左侧下拉箭头进行状态切换：全部完成／全部未完成<br>
 在checkbox上绑定isAll计算属性，这个计算属性既设置了get，又设置了set。<br>
 个人理解，isAll的值是通过get获取的，通过判断remain是否为0<br>
 点击input的时候，value发生了变化，这里的set方法中的value应该是勾选状态，然后传入之后，isAll根据勾选状态修改todos中的completed状态，同时isAll的值也就发生了变化。
 * clear completed按钮将已完成选项删除<br>
 简单的监听click事件，将todos数组替换为用active过滤器过滤的数组
 * All／Active／Completed 进行路由选择，查看对应选项<br>
 给window添加hashchange监听事件，通过地址栏中hash值的变化来更改vue对象中的hashName的值，然后在计算属性中其返回对应的数组，同时在v-for指令中将todos换为计算属性filteredTodos<br>
 在对应的li中对selected类名根据hashName进行设置
 * 利用localStorage添加保存的功能
 添加store.js，对localstorage进行封装<br>
 todos的初始化是通过Store.fetch获取内容<br>
 在watch字段中检测todo的变化，发生变化时保存到storage中
3. 未完成
 * 过渡效果
 * watch能否用computed代替
