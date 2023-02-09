// 1. 引入配置好的multerConfig
const multerConfig = require("./multerConfig");
const dotenv = require("dotenv");

// 2. 定义静态变量
let { serverAddress } = dotenv.config().parsed;
const updateBaseUrl = serverAddress; // 上传到服务器地址
const imgPath = "/images/avatar"; // 上传到服务器的虚拟目录

function upload(req, res) {
  return new Promise((resolve, reject) => {
    let fileName = "avatar";

    // let fileType = req.path.slice(1, req.path.length);//根据接口名称放入对应地址

    multerConfig.single(fileName)(req, res, function (err) {
      if (err) {
        reject(err);
      } else {
        // `req.file.filename`  请求文件名称后缀
        // `updateBaseUrl + imgPath + req.file.filename` 完整的服务器虚拟目录
        console.log('imgPath',imgPath)
        resolve(imgPath + req.file.filename);
      }
    });
  });
}

module.exports = upload;
