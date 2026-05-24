module.exports = (bot) => {

  const {

    openLogs

  } = require(
    '../handlers/logHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | LOGS
  |--------------------------------------------------------------------------
  */

  bot.command(

    'logs',

    async (ctx) => {

      try {

        await openLogs(
          ctx
        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}