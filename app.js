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
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料，也可以傳入參數
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos:todos })) // 取得陣列叫todos，將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
