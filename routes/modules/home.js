// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()  //Express 提供的路由器模組
//-----------------
// 準備引入路由模組
// 引用 Todo model 
const Todo = require('../../models/todo')
// 定義首頁路由
router.get('/', (req, res) => {   //原本是app.get，改成router.get
  Todo.find()
    .lean()
    .sort({ name: 'asc' }) // desc
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})
//-----------------

// 匯出路由器
module.exports = router
