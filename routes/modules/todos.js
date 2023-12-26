// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()  //Express 提供的路由器模組

//----------------------------------------------------------------
// 引用 Todo model 
const Todo = require('../../models/todo')

//----------------------------------------------------------------
// 準備引入路由模組

// 建立：進入 New To do
router.get('/new', (req, res) => {
    return res.render('new')
})

// 建立：按下送出按鈕，接住表單資料，把資料送往資料庫。這個步驟就是 CRUD 裡的 Create 動作。
router.post('/', (req, res) => {
const name = req.body.name
const todo = new Todo({name: name})  //資料庫的model在伺服器端的實體
return todo.save()  //將資料寫回伺服器端
.then(todo => res.redirect('/'))
.catch(error => console.error(error))
})

// 查看：進入 Detail頁面
router.get('/:id', (req, res) => {  //動態參數
const id = req.params.id 
return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo:todo })) //todo為抓出來的那筆資料
    .catch(error => console.log(error))
})
  
// 編輯：進入 edit頁面
router.get('/:id/edit', (req, res) => {
const id = req.params.id
return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
  
// 編輯：將edit頁面的參數丟入資料庫存檔
router.put('/:id', (req, res) => {
const id = req.params.id
const { name, isDone } = req.body  //取出更新後的資料，使用“解構賦值”
return Todo.findById(id)
    .then(todo => {
    todo.name = name
    todo.isDone = isDone === 'on'    //todo.isDone = true，<input checked>  就會啟動
    return todo.save() //return不能省，先存入資料庫後，再進行下個then
    })
    .then(()=> res.redirect(`/todos/${id}`)) //導入查看頁面
    .catch(error => console.log(error))
})
  
// 刪除：將edit頁面的參數丟入資料庫存檔
router.delete('/:id', (req, res) => {
const id = req.params.id
return Todo.findById(id)
    .then(todo => {return todo.remove()})  //
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//----------------------------------------------------------------

// 匯出路由器
module.exports = router