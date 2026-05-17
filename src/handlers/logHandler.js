const {

  loadLogs,

  saveLogs

} = require(
  '../data/logData'
)

const formatDate =
require(
  '../utils/formatDate'
)

const errors =
require(
  '../messages/errors'
)

/*
|--------------------------------------------------------------------------
| ADD LOG
|--------------------------------------------------------------------------
*/

const addLog = (
  admin,
  action,
  details = ''
) => {

  const logs =
    loadLogs()

  logs.unshift({

    admin,

    action,

    details,

    createdAt:
      new Date().toISOString()

  })

  saveLogs(logs)

}

/*
|--------------------------------------------------------------------------
| SHOW LOGS
|--------------------------------------------------------------------------
*/

const showLogs =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | LOAD LOGS
  |--------------------------------------------------------------------------
  */

  const logs =
    loadLogs()

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    logs.length === 0
  ) {

    return ctx.reply(
      errors.noLogs
    )

  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT
  |--------------------------------------------------------------------------
  */

  let message =
`
📜 ADMIN LOGS

━━━━━━━━━━━━━━━━━━

`

  logs
    .slice(0, 20)
    .forEach((log) => {

      message +=
`
👤 ${log.admin}

⚡ ${log.action}

📌 ${log.details}

🕒 ${formatDate(
  log.createdAt
)}

`

    })

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
    message
  )

}

module.exports = {

  addLog,

  showLogs

}