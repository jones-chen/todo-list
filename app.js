// 一、導入模組Include express from node_modules and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 
const mongoose = require('mongoose') // 載入 mongoose
const Todo = require('./models/todo') // 載入 Todo model
const routes = require('./routes')   //就是上面的index.js ，相對目錄，也可以簡寫成require('./routes') ，會自動讀取index.js
const app = express()
const port = 3000


// 二、前置處理
// 1 -  USE
// (1-1) 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// (1-2) Bady-parser
app.use(express.urlencoded({ extended: true }))

// (1-3) post 改變成 delete, put
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

// 2 -  check DB 取得資料庫連線狀態
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection
// (2-1) 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// (2-2)連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 3 - 視覺模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname : '.hbs'}))  //讀取main.handlebars作為樣板佈局/主要佈局
app.set('view engine', 'hbs') //根據這裡的設定當作副檔名

// 四、設定路由
app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
