// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//引入样式
import 'todomvc-app-css/index.css'

//引入Vue
import Vue from 'vue/dist/vue.js'
import Store from'./store'

//定义过滤器，根据完成状态进行渲染
var filters = {
  all(todos){
    return todos
  },
  active(todos){
    return todos.filter((todo) => {
      return !todo.completed;
    })
  },
  completed(todos){
    return todos.filter((todo) => {
      return todo.completed;
    })
  },
};

var vm = new Vue({
  el: '.todoapp',
  data: {
    title: 'todos',
    newTodo: '',
    todos: Store.fetch(),
    editedTodo: null,
    // remain:this.todos.length
    //表示路由的哈希值
    hashName: 'all'
  },
  methods: {
    addTodo(){
      if (!this.newTodo) {
        return;
      }
      this.todos.push({
        content: this.newTodo,
        completed: false
      });
      this.newTodo = '';
    },
    removeTodo(index){
      this.todos.splice(index, 1);
    },
    editTodo(todo){
      this.editCache = todo.content;
      this.editedTodo = todo;
    },
    doneEdit(todo, index){
      //取消编辑状态
      this.editedTodo = null;
      if (!todo.content) {
        this.removeTodo(index);
      }
    },
    cancelEdit(todo){
      this.editedTodo = null;
      todo.content = this.editCache;
    },
    clearCompleted(){
      this.todos = filters.active(this.todos)
    }

  },
  //计算属性，监听
  computed: {
    remain(){
      return filters.active(this.todos).length;
    },
    //isAll监听全选状态
    isAll: {
      get() {
        return this.remain === 0
      },
      set(value){
        // console.log(value);
        this.todos.forEach((todos) => {
          todos.completed = value;
        })
      }
    },
    //  路由过滤
    filteredTodos(){
      return filters[this.hashName](this.todos);
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        Store.save(todos)
      },
      deep: true
    }
  },
  directives: {
    focus(el, value){
      if (value) {
        el.focus()
      }
    }
  }
});
function hashChange() {
  let hashName = location.hash.replace(/#\/?/, '');
  if (filters[hashName]) {
    vm.hashName = hashName;
  } else {
    location.hash = '';
    vm.hashName = 'all';
  }
}
//全局监听
window.addEventListener('hashchange', hashChange);
