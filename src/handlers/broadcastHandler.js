const {

  userService

} = require('../data/userData')

/*
|--------------------------------------------------------------------------
| START BROADCAST
|--------------------------------------------------------------------------
*/

const startBroadcast = async (ctx) => {

  if (
    ctx.from.id.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | SESSION
  |--------------------------------------------------------------------------
  */

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.step =
    'broadcast_waiting'

  /*
  |--------------------------------------------------------------------------
  | ASK CONTENT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
📢 BROADCAST PANEL

━━━━━━━━━━━━━━━━━━

📝 Envoyez :

• Texte
• Photo
• Vidéo

Le bot diffusera à tous
les utilisateurs.
`
  )
}

/*
|--------------------------------------------------------------------------
| HANDLE TEXT BROADCAST
|--------------------------------------------------------------------------
*/

const handleBroadcastText =
async (ctx) => {

  if (
    ctx.session.step !==
    'broadcast_waiting'
  ) return

  const users = userService()

  const message =
    ctx.message.text

  let success = 0

  let failed = 0

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  for (const user of users) {

    try {

      await ctx.telegram.sendMessage(
        user.id,
`
📢 HACKWORLD NEWS

━━━━━━━━━━━━━━━━━━

${message}
`
      )

      success++

    }

    catch {

      failed++

    }

  }

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  ctx.session.step = null

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
✅ BROADCAST TERMINÉ

━━━━━━━━━━━━━━━━━━

📨 Envoyés : ${success}

❌ Échecs : ${failed}
`
  )
}

/*
|--------------------------------------------------------------------------
| HANDLE MEDIA BROADCAST
|--------------------------------------------------------------------------
*/

const handleBroadcastMedia =
async (ctx) => {

  if (
    ctx.session.step !==
    'broadcast_waiting'
  ) return

  const users = userService()

  const caption =
    ctx.message.caption || ''

  let success = 0

  let failed = 0

  /*
  |--------------------------------------------------------------------------
  | PHOTO
  |--------------------------------------------------------------------------
  */

  if (ctx.message.photo) {

    const photo =
      ctx.message.photo[
        ctx.message.photo.length - 1
      ].file_id

    for (const user of users) {

      try {

        await ctx.telegram.sendPhoto(
          user.id,
          photo,
          {
            caption:
`
📢 HACKWORLD NEWS

━━━━━━━━━━━━━━━━━━

${caption}
`
          }
        )

        success++

      }

      catch {

        failed++

      }

    }

  }

  /*
  |--------------------------------------------------------------------------
  | VIDEO
  |--------------------------------------------------------------------------
  */

  else if (ctx.message.video) {

    const video =
      ctx.message.video.file_id

    for (const user of users) {

      try {

        await ctx.telegram.sendVideo(
          user.id,
          video,
          {
            caption:
`
📢 HACKWORLD NEWS

━━━━━━━━━━━━━━━━━━

${caption}
`
          }
        )

        success++

      }

      catch {

        failed++

      }

    }

  }

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  ctx.session.step = null

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
✅ BROADCAST MÉDIA TERMINÉ

━━━━━━━━━━━━━━━━━━

📨 Envoyés : ${success}

❌ Échecs : ${failed}
`
  )
}

module.exports = {

  startBroadcast,

  handleBroadcastText,

  handleBroadcastMedia

}