const bannedWords = [

  'scam',

  'arnaque',

  'hack',

  'ddos',

  'discord.gg',

  'http://',

  'https://'

]

const moderationMap =
new Map()

/*
|--------------------------------------------------------------------------
| AUTO MODERATION
|--------------------------------------------------------------------------
*/

const autoModerationMiddleware =
async (

  ctx,

  next

) => {

  try {

    /*
    |--------------------------------------------------------------------------
    | MESSAGE
    |--------------------------------------------------------------------------
    */

    if (

      !ctx.message ||

      !ctx.message.text

    ) {

      return next()

    }

    const text =
      ctx.message.text
      .toLowerCase()

    const userId =
      ctx.from.id

    /*
    |--------------------------------------------------------------------------
    | DETECTION
    |--------------------------------------------------------------------------
    */

    const detected =
      bannedWords.some(

        (word) =>

          text.includes(word)

      )

    if (!detected) {

      return next()

    }

    /*
    |--------------------------------------------------------------------------
    | USER DATA
    |--------------------------------------------------------------------------
    */

    if (

      !moderationMap.has(userId)

    ) {

      moderationMap.set(

        userId,

        {

          warns: 0

        }

      )

    }

    const data =
      moderationMap.get(userId)

    data.warns += 1

    /*
    |--------------------------------------------------------------------------
    | AUTO MUTE
    |--------------------------------------------------------------------------
    */

    if (

      data.warns >= 3

    ) {

      return ctx.reply(
`
🚫 Auto-modération

Utilisateur temporairement bloqué.
`
      )

    }

    /*
    |--------------------------------------------------------------------------
    | WARNING
    |--------------------------------------------------------------------------
    */

    return ctx.reply(
`
⚠️ Message détecté comme dangereux.

Warn :
${data.warns}/3
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports =
autoModerationMiddleware