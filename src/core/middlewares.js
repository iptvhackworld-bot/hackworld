const {

  session

} = require('telegraf')

const checkBan =
require(
  '../middlewares/checkBan'
)

const antiSpam =
require(
  '../middlewares/antiSpam'
)

const {

  registerUser

} = require(
  '../handlers/userHandler'
)

const registerMiddlewares =
(bot) => {

  /*
  |--------------------------------------------------------------------------
  | SESSION
  |--------------------------------------------------------------------------
  */

  bot.use(
    session()
  )

  /*
  |--------------------------------------------------------------------------
  | SECURITY
  |--------------------------------------------------------------------------
  */

  bot.use(
    checkBan
  )

  bot.use(
    antiSpam
  )

  /*
  |--------------------------------------------------------------------------
  | USER ACTIVITY
  |--------------------------------------------------------------------------
  */

  bot.use(
    async (
      ctx,
      next
    ) => {

      if (ctx.from) {

        await registerUser(ctx)

      }

      return next()

    }
  )

}

module.exports =
registerMiddlewares