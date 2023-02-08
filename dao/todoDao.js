const  todoModel  = require('./Model/todoModel')
// 初始化
module.exports.init = async function () {
  const data = await todoModel.find()
  console.log(data)
  return data
}
module.exports.addlist = async function (list) {
  const { value, check, id } = list
  console.log('11111111111111111111', value)
  console.log('-------------------------------', todoModel)
  const data = await todoModel.create({ value: value, check: check, _id: id })
  return data
}
module.exports.deletelist = async function (i) {
  console.log(i)
  const data = await todoModel.deleteOne({ _id: i })
  return data
}
module.exports.alldone = async function () {
  const data = await todoModel.updateMany({ $set: { check: true } })
  console.log(data)
  return data
}
module.exports.changecheck = async function (li) {
  const { id, check } = li
  const data = await todolistModel.updateOne({ _id: id }, { $set: { check: !check } })
  console.log(data)
  return data
}
