const { init, addlist, deletelist, alldone, changecheck } = require('../dao/todoDao')

module.exports.init = async function () {
  // 在Dao持久层查看是否有该用户
  const data = await init()
  // 如果成功了，就把数据发给表现层

  return data
}
//添加
module.exports.addlist = async function (list) {
  // 在Dao持久层
  const data = await addlist(list)
  // 如果成功了，就把数据发给表现层

  return data
}
//删除
module.exports.deletelist = async function (i) {
  // 在Dao持久层
  const data = await deletelist(i)
  // 如果成功了，就把数据发给表现层

  return data
}
//全部完成
module.exports.alldone = async function () {
  // 在Dao持久层
  const data = await alldone()
  // 如果成功了，就把数据发给表现层
  console.log('alldone!', data)

  return data
}
//修改完成
module.exports.changecheck = async function (li) {
  // 在Dao持久层
  const data = await changecheck(li)
  // 如果成功了，就把数据发给表现层
  console.log('changecheck!', data)

  return data
}
