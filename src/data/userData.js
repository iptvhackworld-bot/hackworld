const path = require('path')

const {

  read,

  write

} = require(
  '../database/jsonDatabase'
)

const filePath = path.join(

  __dirname,

  'users.json'

)

const loadUsers = () => {

  return read(filePath)

}

const saveUsers = (
  users
) => {

  write(
    filePath,
    users
  )

}

module.exports = {

  loadUsers,

  saveUsers

}