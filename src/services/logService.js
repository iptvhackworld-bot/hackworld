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

  admin,

  target,

  reason = 'Aucune raison'

) => {

  await Log.create({

    type,

    adminId:
    admin.id,

    adminUsername:
    admin.username || 'Unknown',

    targetId:
    target.id,

    targetUsername:
    target.username || 'Unknown',

    reason

  })

}

/*
|--------------------------------------------------------------------------
| GET USER LOGS
|--------------------------------------------------------------------------
*/

const getUserLogs =
async (userId) => {

  return await Log.find({

    targetId: userId

  })

  .sort({

    createdAt: -1

  })

  .limit(20)

}

module.exports = {

  createLog,

  getUserLogs

}