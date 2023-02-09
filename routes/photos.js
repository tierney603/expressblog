var express = require("express");
var router = express.Router();
const upload = require("../utils/upload");


// 随机数id
const uuidv4 = require("node-uuid").v4;

// 数据库集合配置
const { Schema, model } = require("mongoose");
let photoSchema = new Schema({
  value: String,
  id: String,
  type: String,
  title: String,
  createTime: Date,
  url: String,
});
// 将模型关联
const photoModel = model("photoModel", photoSchema, "todo");

// 上传图片接口
router.post("/uploadImage", (req, res) => {
  upload(req, res)
    .then(async (imgsrc) => {
      // 上传成功 存储文件路径 到数据库中
      const data = await photoModel.create({
        url: uuidv4(),
        // createTime: new Date(),
      });
      console.log(data);
      res.send({
        code: "ok",
        message: "上传成功",
        data: {
          url: imgsrc,
        },
      });
    })
    .catch((err) => {
        console.log(err)
      formatErrorMessage(res, err.error);
    });
});

// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    code: "error",
    message: message || "",
  });
}

router.post('/upload', function(req, res) {
    console.log(req.files.files.name); // the uploaded file object
  });

module.exports = router;
