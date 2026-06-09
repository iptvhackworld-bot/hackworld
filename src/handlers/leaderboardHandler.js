const User =
require(
  '../models/User'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| LEADERBOARDS
|--------------------------------------------------------------------------
*/

const openLeaderboards =
async (ctx) => {

  try {

    const users =
      await User.find()

    /*
    |--------------------------------------------------------------------------
    | MONEY
    |--------------------------------------------------------------------------
    */

    const richest =
      [...users]

      .sort(

        (a, b) =>

          (b.money || 0)

          -

          (a.money || 0)

      )

      .slice(0, 5)

    /*
    |--------------------------------------------------------------------------
    | MESSAGES
    |--------------------------------------------------------------------------
    */

    const messages =
      [...users]

      .sort(

        (a, b) =>

          (b.messages || 0)

          -

          (a.messages || 0)

      )

      .slice(0, 5)

    /*
    |--------------------------------------------------------------------------
    | CASINO
    |--------------------------------------------------------------------------
    */

    const casino =
      [...users]

      .sort(

        (a, b) =>

          (b.casinoWon || 0)

          -

          (a.casinoWon || 0)

      )

      .slice(0, 5)

    /*
    |--------------------------------------------------------------------------
    | TEXT
    |--------------------------------------------------------------------------
    */

    let richText = ''

    richest.forEach(

      (user, index) => {

        richText +=
`
${index + 1}. @${user.username || 'unknown'}

💰 ${user.money || 0}$

`

      }

    )

    let msgText = ''

    messages.forEach(

      (user, index) => {

        msgText +=
`
${index + 1}. @${user.username || 'unknown'}

💬 ${user.messages || 0}

`

      }

    )

    let casinoText = ''

    casino.forEach(

      (user, index) => {

        casinoText +=
`
${index + 1}. @${user.username || 'unknown'}

🎰 ${user.casinoWon || 0}$

`

      }

    )

    logInfo(
      `LEADERBOARDS ${ctx.from.id}`
    )

    await ctx.reply(
`
🏆 HACKWORLD LEADERBOARDS

━━━━━━━━━━━━━━━━━━

💰 TOP RICHES

${richText}

━━━━━━━━━━━━━━━━━━

💬 TOP MESSAGES

${msgText}

━━━━━━━━━━━━━━━━━━

🎰 TOP CASINO

${casinoText}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'LEADERBOARDS',
      error
    )

  }

}

module.exports = {

  openLeaderboards

}