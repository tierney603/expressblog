const expressJWT = require('express-jwt')
const dotenv = require("dotenv");
let { SecretKey } = dotenv.config().parsed;

const varifyToken = () => {
  return expressJWT({
    secret: SecretKey, //生成的token时的配置密钥
    algorithms: ['HS256'], //设置jwt的算法为HS256
    // credentialsRequired: false, //没有token的请求不进行解析
  }).unless({
    //用于设置不需要验证的token的路径
    path: ['/users/login', '/users/register', '/users/isAccess', '/users/islogin'],
  })
}

// 失败处理--放到最后一个app.use()

const errorTokenList = {
  "jwt malformed": {
    massage: '请先登录！',
    code: 401,
  },
  "jwt expired": {
    massage: "验证已过期，请重新登录！",
    code: 401,
  },
  "invalid token": {
    massage: "错误令牌！",
    code: 401,
  }


}
const errorToken = (err, req, res, next) => {
  console.log(err.name)
  if (err.name === 'UnauthorizedError') {

    //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
    let obj = {
    };
    obj.msg = 'token验证失败';
    obj.code = '606';
    obj.error = err;
    res.send(obj); //返回失败信息
  }


  if(err){
    let resError=errorTokenList[err.message]
    return res.send(resError)
  }else{
    return res.send({message: 'token未知错误', status: 500})
  }
  // if (err && err.message === 'jwt malformed')
  //   return res.send({ message: '还未登录，请先登录！', status: 0 })
  // if (err && err.message === 'jwt expired')
  //   return res.send({ message: '验证已过期，请重新登录！', status: 0 })
  // if (err && err.message === 'invalid token')
  //   return res.send({ message: '错误令牌！', status: 0 })
};

module.exports = { varifyToken, errorToken }


