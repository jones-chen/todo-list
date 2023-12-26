// 一、導入外部模組(Include express from node_modules and define server related variables)
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override') 

// 二、導入內部模組
require('./config/mongoose')
const routes = require('./routes')   //就是上面的index.js ，相對目錄，也可以簡寫成require('./routes') ，會自動讀取index.js

// 三、套件產生的內容
const app = express()
const port = 3000

// 四、引擎設定engine、set設定、use設定

app.engine('hbs', exphbs({ defaultLayout: 'main' , extname : '.hbs'}))  //視覺模板引擎，讀取main.handlebars作為樣板佈局/主要佈局
app.set('view engine', 'hbs') //根據這裡的設定當作副檔名
app.use(express.urlencoded({ extended: true })) // Bady-parser
app.use(methodOverride('_method')) // post 改變成 delete, put，設定每一筆請求都會透過 methodOverride 進行前置處理

// 四、設定路由
app.use(routes)

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
