const Log =
require(
  '../models/Log'
)

/*
|--------------------------------------------------------------------------
| CREATE LOG
|--------------------------------------------------------------------------
*/

const createLog =
async (

  type,

  message

) => {

  return await Log.create({

    type,

    message

  })

}

/*
|--------------------------------------------------------------------------
| GET LOGS
|--------------------------------------------------------------------------
*/

const getLogs =
async () => {

  return await Log.find()
  .sort({

    createdAt: -1

  })

}

module.exports = {

  createLog,

  getLogs

}