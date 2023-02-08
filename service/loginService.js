const { login, register, isAccess } = require('../dao/loginDao')
const jwt = require('jsonwebtoken')
module.exports.login = async function (user) {
  // 在Dao持久层查看是否有该用户
  const data = await login(user)
  console.log(data.length > 0)
  console.log(data)

  
  // 如果成功了，就把数据发给表现层
  if (data.length > 0) {
    // 生成token
    const token = jwt.sign(
      { user },
      'qwertyuiop', //密钥字符串
      { expiresIn: 20000 } //设置token有效期，单位默认秒s h
    )

    return {
      message: '登录成功!!!!!!!!!!！',
      status: 1,
      token,
    }
  } else {
    return {
      message: '登录失败！',
      status: 0,
    }
  }
}

// 验证账号是否存在
module.exports.isAccess = async function (username) {
  const data = await isAccess(username)
  if (data.length > 0) {
    return {
      message: '该账号已被注册！',
      status: 0,
    }
  } else {
    return {
      message: '该账号可使用！',
      status: 1,
    }
  }
}

// 注册
module.exports.register = async function (user) {
  const data = await register(user)
}
