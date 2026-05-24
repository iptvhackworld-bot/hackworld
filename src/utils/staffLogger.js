const fs =
require('fs')

const path =
require('path')

/*
|--------------------------------------------------------------------------
| STAFF LOG FILE
|--------------------------------------------------------------------------
*/

const logsDir =
path.join(

  __dirname,

  '../logs'

)

if (

  !fs.existsSync(logsDir)

) {

  fs.mkdirSync(logsDir)

}

const staffLogFile =
path.join(

  logsDir,

  'staff.log'

)

/*
|--------------------------------------------------------------------------
| WRITE STAFF LOG
|--------------------------------------------------------------------------
*/

const logStaffAction =
(

  action,

  adminId,

  targetId

) => {

  const time =
    new Date()

    .toISOString()

  const line =
`[${time}] ${action} | ADMIN: ${adminId} | TARGET: ${targetId}\n`

  console.log(line)

  fs.appendFileSync(

    staffLogFile,

    line

  )

}

module.exports = {

  logStaffAction

}