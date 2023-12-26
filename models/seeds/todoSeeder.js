//種子資料產生器

//載入內部模組討間
const db = require('../../config/mongoose')
const Todo = require('../todo') // 載入 todo model, 沒有給副檔名的時候，Node會自動幫你加上.js , .json,  .node

db.once('open', () => {
    for (let i = 0; i < 10; i++) {
      Todo.create({name:`name-${i}`})
    }
    console.log('done')
})