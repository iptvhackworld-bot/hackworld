module.exports = (bot) => {

  const {

    enableUserNotifications,

    disableUserNotifications

  } = require(
    '../handlers/notificationHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | ENABLE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'notifications_on',

    async (ctx) => {

      try {

        await enableUserNotifications(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DISABLE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'notifications_off',

    async (ctx) => {

      try {

        await disableUserNotifications(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}