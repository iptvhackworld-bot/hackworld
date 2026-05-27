module.exports = (bot) => {

  const {

    enableUserNotifications,

    disableUserNotifications

  } = require(
    '../handlers/notificationHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATION PANEL
  |--------------------------------------------------------------------------
  */

  bot.action(

    'notifications_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await ctx.reply(
`
🔔 NOTIFICATIONS

━━━━━━━━━━━━━━━━━━

Choisissez une option :
`,

          {

            reply_markup: {

              inline_keyboard: [

                [

                  {

                    text:
                    '✅ Activer',

                    callback_data:
                    'notifications_enable'

                  },

                  {

                    text:
                    '❌ Désactiver',

                    callback_data:
                    'notifications_disable'

                  }

                ]

              ]

            }

          }

        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | ENABLE
  |--------------------------------------------------------------------------
  */

  bot.action(

    'notifications_enable',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await enableUserNotifications(
          ctx
        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DISABLE
  |--------------------------------------------------------------------------
  */

  bot.action(

    'notifications_disable',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await disableUserNotifications(
          ctx
        )

      }

      catch (error) {

        console.log(error)

      }

    }

  )

}