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

  userId,

  username,

  action,

  details

) => {

  try {

    return await Log.create({

      userId,

      username,

      action,

      details

    })

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| GET LOGS
|--------------------------------------------------------------------------
*/

const getLogs =
async () => {

  try {

    return await Log.find()

    .sort({

      createdAt: -1

    })

    .limit(50)

  } catch (error) {

    console.log(error)

    return []

  }

}

module.exports = {

  createLog,

  getLogs

}