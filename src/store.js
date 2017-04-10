/**
 * Created by nick on 2017/4/10.
 */
const STORAGE_KEY = 'todos-vuejs';
// 输出两个方法，其中方法的设置也是ES6的语法
export default {
  fetch(){
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save(items){
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}
