const mongoose = require('mongoose')  //載入套件
const Schema = mongoose.Schema //Mongoose 提供的 mongoose.Schema 模組
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
 done: {
  type: Boolean
  }
})
module.exports = mongoose.model('Todo', todoSchema)   //透過mongoose 幫我們建model，並exports輸出命名為 Todo
