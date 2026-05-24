const env =
require(
  '../config/env'
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

  console.log(
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

  console.error(
    `❌ ${message}`
  )

  if (error) {

    console.error(error)

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

      console.error(
        'Erreur log Telegram'
      )

      console.error(err)

    }

  }

}

module.exports = {

  logInfo,

  logError,

  adminLog

}