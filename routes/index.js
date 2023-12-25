// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()  //Express 提供的路由器模組

// 引入 home 模組程式碼
const home = require('./modules/home')  // 就是上面的xxx.js , ooo.js
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)

// 匯出路由器
module.exports = router
