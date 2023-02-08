## express 项目结构

- bin
- app.js 入口文件
- node_modules 项目依赖
- dao 数据层
- routes 路由层
- service 处理层
- utils 插件、自定义方法

## 怎么操作数据库？

三步走 1.连接（库） dao/database.js 2.配置（表） dao/model/usersModel.js 3.操作（集） dao/userDao.js

### 连接 mongodb 数据库

- 通常情况下，我们会在 dao 文件放置操作数据库文件

`database.js`

```javascript
/*mongodb数据库*/
const mongoose = require("mongoose");
const dbName = "user"; //数据库名
const dbURL = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(dbURL);

mongoose.connection.on("connected", () => {
  console.log(dbURL + "数据库连接成功！");
});
module.exports = mongoose;
```

### 配置（表）

- 通常情况下，我们会在 dao\model 文件放置配置表的文件

`usersModel.js`

```javascript
/* 配置数据库集合*/
const { Schema, model } = require("mongoose");
const usersSchema = new Schema({
  username: Boolean,
  pwd: String,
  id: String,
});
/*定义数据结构集合的模型：将schema和数据库中的集合关联起来
model('模型名称',usersSchema,'数据库中的集合名称')
*/
const userModel = model("userModel", usersSchema, "userlist");

module.exports = userModel;
```

## 操作（集）

- 演示增删改查
  我们将增删改查先进行封装,主要这里涉及对 mongodb 基本使用：[mongoose.js 官方文档](https://mongoosejs.com/docs/guide.html)，[MDN 中文 mongoose.js](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/mongoose)

`usersDao.js`

```javascript
const usersModel = require("./Model/usersModel");
// 查
module.exports.find = async function () {
  const data = await usersModel.find();
  console.log(data);
  return data;
};
// 增
module.exports.add = async function (list) {
  const { value, type, id } = list;
  const data = await usersModel.create({ value, type, _id: id });
  return data;
};
// 删除
module.exports.delete = async function (i) {
  console.log(i);
  const data = await usersModel.deleteOne({ _id: i });
  return data;
};
// 单个修改
module.exports.updateOne = async function (li) {
  const { id, type } = li;
  const data = await userslistModel.updateOne({ id }, { $set: { type } });
  return data;
};
// 批量修改
module.exports.updateMany = async function () {
  const data = await usersModel.updateMany(
    {
      id: {//根据id进行匹配
        // $in: reqData.map((v) => v.id),
        $in: [1, 2],//当id为1和2时,将集合的type改为 "root"
      },
    },
    {
      $set: { type: "root" },
    }
  );
  return data;
};
```

#### 单独讲讲updateMany使用
updateMany使用(过滤，更新，选项)
你需要知道(MongoDB 聚合管道)[https://www.geeksforgeeks.org/mongoose-updatemany-function/?ref=lbp]

