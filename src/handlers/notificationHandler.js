const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const User =
require(
  '../models/User'
)

const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| PANEL
|--------------------------------------------------------------------------
*/

const openNotifications =
async (ctx) => {

  try {

    await ctx.reply(

`
🔔 NOTIFICATIONS

Choisir une notification :
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '🔧 Maintenance',
            'notify_maintenance'
          )

        ],

        [

          Markup.button.callback(
            '🚀 Update',
            'notify_update'
          )

        ],

        [

          Markup.button.callback(
            '🎁 Promo',
            'notify_promo'
          )

        ],

        [

          Markup.button.callback(
            '⚠️ Sécurité',
            'notify_security'
          )

        ],

        [

          Markup.button.callback(
            '📢 Personnalisée',
            'notify_custom'
          )

        ]

      ])

    )

  }

  catch (error) {

    logError(
      'NOTIFICATIONS',
      error
    )

  }

}

const sendNotification =
async (

  ctx,

  message

) => {

  try {

    const users =
      await User.find()

    let success = 0

    let failed = 0

    for (const user of users) {

      try {

        await ctx.telegram.sendMessage(

          user.id,

          message

        )

        success++

      }

      catch {

        failed++

      }

    }

    await ctx.reply(
`
✅ Notification envoyée

📨 Succès :
${success}

❌ Erreurs :
${failed}
`
    )

  }

  catch (error) {

    logError(
      'SEND_NOTIFICATION',
      error
    )

  }

}

const sendMaintenance =
async (ctx) => {

  await sendNotification(

    ctx,

`
🔧 MAINTENANCE

Le bot est temporairement en maintenance.

Merci de votre patience.
`

  )

}

const sendUpdate =
async (ctx) => {

  await sendNotification(

    ctx,

`
🚀 NOUVELLE MISE À JOUR

De nouvelles fonctionnalités ont été ajoutées sur HackWorld.

Profitez-en !
`

  )

}

const sendPromo =
async (ctx) => {

  await sendNotification(

    ctx,

`
🎁 PROMOTION

Des offres spéciales sont disponibles sur HackWorld !

Ne les manquez pas.
`

  )

}

const sendSecurity =
async (ctx) => {

  await sendNotification(

    ctx,

`
⚠️ ALERTE SÉCURITÉ

Un message important concernant la sécurité a été publié.

Merci de rester vigilant.
`

  )

}

/*
|--------------------------------------------------------------------------
| CUSTOM
|--------------------------------------------------------------------------
*/

const startCustomNotification =
async (ctx) => {

  try {

    global.broadcastMode =
      true

    global.broadcastAdmin =
      ctx.from.id

    await ctx.reply(
`
📢 NOTIFICATION PERSONNALISÉE

Envoie maintenant le message à diffuser.

❌ /cancel pour annuler.
`
    )

  }

  catch (error) {

    logError(
      'CUSTOM_NOTIFICATION',
      error
    )

  }

}

module.exports = {

  openNotifications,

  sendMaintenance,

  sendUpdate,

  sendPromo,

  sendSecurity,

  startCustomNotification

}