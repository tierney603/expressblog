/*mongodb数据库*/
const mongoose = require('mongoose')
const dbURL = 'mongodb://localhost:27017/todo'
mongoose.connect(dbURL)
/*监听*/

mongoose.connection.on('connected', () => {
  console.log(dbURL + '数据库连接成功！')
})
module.exports = mongoose
