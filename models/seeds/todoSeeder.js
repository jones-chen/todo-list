//種子資料產生器
const mongoose = require('mongoose')
const Todo = require('../todo') // 載入 todo model, 沒有給副檔名的時候，Node會自動幫你加上.js , .json,  .node

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
    for (let i = 0; i < 10; i++) {
      Todo.create({name:`name-${i}`})
    }
    console.log('done')
})