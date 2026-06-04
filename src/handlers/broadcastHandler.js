const User =
require(
  '../models/User'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const startBroadcast =
async (ctx) => {

  try {

    global.broadcastMode = true

    global.broadcastAdmin =
      ctx.from.id

    await ctx.reply(
`
📢 MODE BROADCAST

Envoie maintenant le message à diffuser.

❌ /cancel pour annuler.
`
    )

  }

  catch (error) {

    logError(
      'START_BROADCAST',
      error
    )

  }

}

const sendBroadcast =
async (

  ctx,

  message

) => {

  try {

    const users =
      await User.find({

        banned: false

      })

    let success = 0

    let failed = 0

    let removed = 0

    for (const user of users) {

      try {

        await ctx.telegram.sendMessage(

          user.id,

          message

        )

        success++

      }

      catch (error) {

        failed++

        /*
        |--------------------------------------------------------------------------
        | REMOVE DEAD USER
        |--------------------------------------------------------------------------
        */

        try {

          await User.deleteOne({

            id: user.id

          })

          removed++

        }

        catch {}

      }

    }

    logInfo(
      `BROADCAST ${success}/${users.length}`
    )

    await ctx.reply(
`
✅ Broadcast terminé

━━━━━━━━━━━━━━━━━━

📨 Envoyés :
${success}

❌ Erreurs :
${failed}

🗑 Supprimés :
${removed}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'SEND_BROADCAST',
      error
    )

  }

}

module.exports = {

  startBroadcast,

  sendBroadcast

}