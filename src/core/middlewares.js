const {

  checkBan,

  antiSpam

} = require(
  '../middlewares/checkBan'
)

const {

  registerUser

} = require(
  '../handlers/userHandler'
)

/*
|--------------------------------------------------------------------------
| REGISTER MIDDLEWARES
|--------------------------------------------------------------------------
*/

const registerMiddlewares =
(bot) => {

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

        await registerUser(
          ctx
        )

      }

      return next()

    }

  )

}

module.exports =
registerMiddlewares