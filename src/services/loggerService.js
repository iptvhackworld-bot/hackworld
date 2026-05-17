const env =
require(
  '../config/env'
)

const logger =
require(
  '../utils/logger'
)

const {

  addLog

} = require(
  '../handlers/logHandler'
)

/*
|--------------------------------------------------------------------------
| LOG INFO
|--------------------------------------------------------------------------
*/

const logInfo = (
  message
) => {

  logger(
    `ℹ️ ${message}`
  )

}

/*
|--------------------------------------------------------------------------
| LOG ERROR
|--------------------------------------------------------------------------
*/

const logError = (
  message,
  error = null
) => {

  logger(
    `❌ ${message}`
  )

  if (error) {

    console.log(error)

  }

}

/*
|--------------------------------------------------------------------------
| ADMIN LOG
|--------------------------------------------------------------------------
*/

const adminLog =
async (

  telegram,

  admin,

  action,

  details = ''

) => {

  /*
  |--------------------------------------------------------------------------
  | SAVE LOG
  |--------------------------------------------------------------------------
  */

  addLog(

    admin,

    action,

    details

  )

  /*
  |--------------------------------------------------------------------------
  | TELEGRAM LOG
  |--------------------------------------------------------------------------
  */

  if (
    env.logChannelId
  ) {

    try {

      await telegram.sendMessage(

        env.logChannelId,

`
📜 ADMIN LOG

━━━━━━━━━━━━━━━━━━

👤 ${admin}

⚡ ${action}

📌 ${details}
`

      )

    } catch (err) {

      logError(
        'Erreur log Telegram',
        err
      )

    }

  }

}

module.exports = {

  logInfo,

  logError,

  adminLog

}