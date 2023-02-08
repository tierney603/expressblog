const { Schema, model } = require('mongoose')
const usersSchema = new Schema({
  username: String,
  password: String,
})
/*定义数据结构集合的模型：将schema和数据库中的集合关联起来
model('模型名称',usersSchema,'数据库中的集合名称')
*/

const usersModel = model('usersModel', usersSchema, 'user')
module.exports = usersModel
