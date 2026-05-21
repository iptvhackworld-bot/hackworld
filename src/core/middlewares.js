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

const antiSpamMiddleware =
require(
  '../middlewares/antiSpam'
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

  /*
  |--------------------------------------------------------------------------
  | ANTI SPAM
  |--------------------------------------------------------------------------
  */
  
  bot.use(
  antiSpamMiddleware
)

bot.use(
  checkBan
)



module.exports =
registerMiddlewares