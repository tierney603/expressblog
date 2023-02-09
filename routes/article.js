var express = require("express");
var router = express.Router();

// 数据库集合配置
const { Schema, model } = require("mongoose");
let articlesSchema = new Schema({
  value: String,
  id: String,
  type: String,
  title: String,
  createTime: Date,
  // title: String,
});
// 将模型关联
const articlesModel = model("articlesModel", articlesSchema, "todo");

// 随机数id
const uuidv4 = require("node-uuid").v4;

console.log(uuidv4()); //'110ec58a-a0f2-4ac4-8393-c866d813b8d1'

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
  });
});

router.post("/addArticle", async function (req, res, next) {
  console.log(req.body);
  const { value, type } = req.body;
  //   const data = await articlesModel.find()
  if (title && value) {
    const data = await articlesModel.create({
      value,
      id: uuidv4(),
      type: type ? type : null,
      title,
      createTime: new Date(),
    });
    res.send({ msg: "接收", data });
  }
});

router.get("/getArticle", async function (req, res, next) {
  console.log(req.body);
  const { id } = req.query;
  const data = await articlesModel.find({ id });
  console.log(data, id);
  res.send({ msg: "接收", data });
});

router.post("/testFun", async function (req, res, next) {
  console.log(req.body);
  const { id } = req.body;
  const data = await articlesModel.updateMany(
    { id },
    { $set: { type: "后端" } }
  );
  console.log("id", id);
  //   const data = await articlesModel.updateMany([{id:1},{id:2}],{$set: { type: "lj" }});
  //   let reqData=[
  //       {id:1},
  //       {id:2},
  //   ]
  //   // const data = await articlesModel.updateMany({$in:reqData.map(v=>v.id) },{$set: { type: "hwj" }});
  //   const data = await articlesModel.updateMany(
  //     {
  //       id: {
  //         // $in: reqData.map((v) => v.id),
  //         $in:[1,2]
  //       },
  //     },
  //     {
  //     //   $set: { type: "abc" },
  //       $set: { type: ["root","admin"] },
  //     }
  //   );

  console.log("data", data);
  // if(data.length)return res.send({ msg: "", data });
  return res.send({ msg: "", data });
});

module.exports = router;
