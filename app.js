// 一、導入模組Include express from node_modules and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')

const mongoose = require('mongoose') // 載入 mongoose
const Todo = require('./models/todo') // 載入 Todo model

const app = express()
const port = 3000

//  僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//Bady-parser
app.use(express.urlencoded({ extended: true }))

// 二、資料庫設定 - check DB 取得資料庫連線狀態
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 三、視覺模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname : '.hbs'}))  //讀取main.handlebars作為樣板佈局/主要佈局
app.set('view engine', 'hbs') //根據這裡的設定當作副檔名


// 四、設定路由
// 首頁
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料，也可以傳入參數
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos:todos })) // 取得陣列叫todos，將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})
// 建立：進入 New To do
app.get('/todos/new', (req, res) => {
  return res.render('new')
})
// 建立：按下送出按鈕，接住表單資料，把資料送往資料庫。這個步驟就是 CRUD 裡的 Create 動作。
app.post('/todos', (req, res) => {
  const name = req.body.name
  const todo = new Todo({name: name})  //資料庫的model在伺服器端的實體
  return todo.save()  //將資料寫回伺服器端
  .then(todo => res.redirect('/'))
  .catch(error => console.error(error))
})

// 查看：進入 Detail頁面
app.get('/todos/:id', (req, res) => {  //動態參數
  const id = req.params.id 
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo:todo })) //todo為抓出來的那筆資料
    .catch(error => console.log(error))
})

// 編輯：進入 edit頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// 編輯：將edit頁面的參數丟入資料庫存檔
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name  //更新後的資料
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save() //return不能省，先存入資料庫後，再進行下個then
    })
    .then(()=> res.redirect(`/todos/${id}`)) //導入查看頁面
    
    .catch(error => console.log(error))
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
