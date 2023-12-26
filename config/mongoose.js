// 1. 載入外部套件
const mongoose = require('mongoose') // 載入 mongoose

// 2.取得資料庫連線狀態
// (1-1) 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

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

module.exports = db