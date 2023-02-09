const usersModel = require('./Model/usersModel')

module.exports.login = async function (user) {
  const data = await usersModel.find(user)
  return data
}
module.exports.register = async function (user) {
  // const data = await usersModel.find(user)
  const data = await usersModel.create({ username: user.username, password: user.password, nealname: user.nealname })
  return data
}
module.exports.isAccess = async function (user) {
  const data = await usersModel.find({ username: user })
  return data
}
