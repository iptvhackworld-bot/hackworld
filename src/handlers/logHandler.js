const {

  getLogs

} = require(
  '../services/logService'
)

const env =
require(
  '../config/env'
)

/*
|--------------------------------------------------------------------------
| OPEN LOGS
|--------------------------------------------------------------------------
*/

const openLogs =
async (ctx) => {

  try {

    if (

      ctx.from.id.toString()

      !==

      env.ownerId

    ) {

      return
    }

    const logs =
      await getLogs()

    if (!logs.length) {

      return ctx.reply(
`
❌ Aucun log.
`
      )

    }

    let message =
`
📜 ADMIN LOGS

━━━━━━━━━━━━━━━━━━
`

    logs.forEach(

      (log) => {

        message +=
`
👤 ${log.username}

⚡ ${log.action}

📝 ${log.details}

📅 ${log.createdAt
.toLocaleDateString()}

━━━━━━━━━━━━━━━━━━
`

      }

    )

    await ctx.reply(
      message
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openLogs

}