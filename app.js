// Include express from node_modules and define server related variables
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

//  僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 資料庫設定 - check DB 取得資料庫連線狀態
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

// 設定模板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main' , extname : '.hbs'}))  //讀取main.handlebars作為樣板佈局/主要佈局
app.set('view engine', 'hbs') //根據這裡的設定當作副檔名

// 設定路由
app.get('/', (req, res) => {
    res.render('index')   //原本是send，改成render 佈局＋index的局部佈局
})

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
