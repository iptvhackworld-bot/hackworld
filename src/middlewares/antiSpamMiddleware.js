const spamMap =
new Map()

/*
|--------------------------------------------------------------------------
| ANTI SPAM
|--------------------------------------------------------------------------
*/

const antiSpamMiddleware =
async (

  ctx,

  next

) => {

  try {

    const userId =
      ctx.from?.id

    if (!userId) {

      return next()

    }

    /*
    |--------------------------------------------------------------------------
    | USER DATA
    |--------------------------------------------------------------------------
    */

    const now =
      Date.now()

    if (

      !spamMap.has(userId)

    ) {

      spamMap.set(

        userId,

        {

          messages: 1,

          lastMessage: now,

          warns: 0

        }

      )

      return next()

    }

    const data =
      spamMap.get(userId)

    /*
    |--------------------------------------------------------------------------
    | RESET
    |--------------------------------------------------------------------------
    */

    if (

      now - data.lastMessage

      > 5000

    ) {

      data.messages = 0

    }

    data.messages += 1

    data.lastMessage = now

    /*
    |--------------------------------------------------------------------------
    | LIMIT
    |--------------------------------------------------------------------------
    */

    if (

      data.messages >= 8

    ) {

      data.warns += 1

      /*
      |--------------------------------------------------------------------------
      | AUTO BLOCK
      |--------------------------------------------------------------------------
      */

      if (

        data.warns >= 3

      ) {

        return ctx.reply(
`
🚫 Spam détecté.

Accès temporairement bloqué.
`
        )

      }

      return ctx.reply(
`
⚠️ Merci de ralentir.
`
      )

    }

    return next()

  } catch (error) {

    console.log(error)

  }

}

module.exports =
antiSpamMiddleware