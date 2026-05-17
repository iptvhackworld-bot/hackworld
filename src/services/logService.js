const {

  addLog

} = require(
  '../handlers/logHandler'
)

const createLog =
async (

  telegram,

  username,

  action,

  details

) => {

  await addLog(

    telegram,

    username,

    action,

    details

  )
}

module.exports = {

  createLog

}