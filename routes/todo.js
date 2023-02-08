var express = require('express')
var router = express.Router()
const { init, addlist, deletelist, alldone, changecheck } = require('../service/todoService')

// 操作todo
router.post('/init', async function (req, res) {
  console.log('init!!!!!!!!!!!!!!!!!!')
  const data = await init()
  console.log(data)
  res.send(data)
})
router.post('/addlist', async function (req, res) {
  const data = await addlist(req.body)
  res.send({ message: '添加成功！' })
})
router.post('/deletelist', async function (req, res) {
  const data = await deletelist(req.body.id)
  res.send({ message: '删除成功！' })
})
router.post('/alldone', async function (req, res) {
  const data = await alldone()
  console.log('alldone!')
  res.send({ message: '修改成功！' })
})
router.post('/changecheck', async function (req, res) {
  const data = await changecheck(req.body)
  console.log('changecheck!')
  res.send({ message: 'change成功！' })
})
module.exports = router
