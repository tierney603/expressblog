var express = require('express')
var router = express.Router()
// const { init } = require('../service/todoService')

// router.post('/init', async function (req, res) {
//   console.log('init!')
//   const data = await init()
//   console.log(data)
//   res.send(data)
// })

// 数据库集合配置
const { Schema, model } = require('mongoose')
let studentsSchema = new Schema({
  name: String,
  grade: String,
})

// 将模型关联
const studentsModel = model('studentsModel', studentsSchema, 'students')

router.get('/init', async function (req, res) {
  //   const data = await init()
    console.log(req.header.authorization)

  // console.log(req)
  const data = await studentsModel.find()
  console.log(data)
  res.send({ msg: '接收', data })
})
module.exports = router
