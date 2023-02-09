var express = require('express');
var router = express.Router();
const { login } = require('../service/loginService')
const { register } = require('../service/loginService')
const { isAccess } = require('../service/loginService')

const md5 = require('md5')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");
let { SecretKey } = dotenv.config().parsed;
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 验证是否登录
router.get('/islogin', async (req, res) => {

  //拿到token
  const token = req.headers.authorization;
  // 1.有没有token
  if (!token) return res.send({ message: '该请求需要token！', status: 0 })
  //2.对不对
  jwt.verify(token,SecretKey, (err, data) => {
    // jwt expired  验证过期
    // jwt malformed 没有令牌不存在，应该是未登录
    // invalid token 错误令牌

    if (err && err.message === 'jwt malformed')
      return res.send({ message: '还未登录，请先登录！', status: 0 })
    if (err && err.message === 'jwt expired')
      return res.send({ message: '验证已过期，请重新登录！', status: 0 })
    if (err && err.message === 'invalid token')
      return res.send({ message: '错误令牌！', status: 0 })
    res.send({ message: '验证通过！', status: 1 })

  })
});


// 登录
router.post('/login', async function (req, res, next) {

  let  { username, password } = req.body
  password = md5(password)
  const data = await login({  username,  password })
  console.log(data)
  res.send(data)
});
// 注册
router.post('/register', function (req, res) {
  const { username, password, emil } = req.body
  password = md5(password)

  register({ username, password,  emil })
  res.send({ message: '成功!', status: 1 })

})
// 验证账号是否存在
router.post('/isAccess', async function (req, res) {
  const { username } = req.body
  const data = await isAccess(username)
  res.send(data)

  // const result = user.some(item => item.username == username)
  // if (result) {
  //   res.send({ message: '账号已存在', status: 0 })
  // } else {
  //   res.send({ message: '账号合法', status: 1 })
  // }
  // register({ username: username, password: newpwd, nealname: nealname })
  // 将数据发送的到第二层

})



module.exports = router;
