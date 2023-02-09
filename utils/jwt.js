const expressJWT = require('express-jwt')
const dotenv = require("dotenv");
let { SecretKey } = dotenv.config().parsed;
const jwtAuth = expressJWT({
  secret: SecretKey, //生成的token时的配置密钥
  algorithms: ['HS256'], //设置jwt的算法为HS256
  // credentialsRequired: false, //没有token的请求不进行解析
}).unless({
  //用于设置不需要验证的token的路径
  path: ['/users/login', '/users/register', '/users/isAccess', '/users/islogin'],
})
module.exports = jwtAuth
