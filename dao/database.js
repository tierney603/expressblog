const dotenv = require("dotenv");
let { dbUrl } = dotenv.config().parsed;
/*mongodb数据库*/
const mongoose = require("mongoose");
// const dbUrl = 'mongodb://localhost:27017/todo'
mongoose.connect(dbUrl);
/*监听*/
mongoose.connection.on("connected", () => {
  console.log(dbUrl + "数据库连接成功！");
});
module.exports = mongoose;
