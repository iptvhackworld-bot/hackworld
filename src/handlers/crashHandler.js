const { Markup } =
require('telegraf')

const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

if (!global.crashSessions) {

  global.crashSessions = {}

}

/*
|--------------------------------------------------------------------------
| OPEN CRASH
|--------------------------------------------------------------------------
*/

const openCrash =
async (ctx) => {

  global.crashSessions[
    ctx.from.id
  ] = {

    action:
    'bet'

  }

  await ctx.reply(
`
📈 CRASH GAME

━━━━━━━━━━━━━━━━━━

💰 Entrez votre mise :
`
  )

}

/*
|--------------------------------------------------------------------------
| RANDOM CRASH
|--------------------------------------------------------------------------
*/

const generateCrashPoint =
() => {

  return Number(

    (

      Math.random()

      * 10

      +

      1

    ).toFixed(2)

  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleCrashInput =
async (ctx) => {

  const session =

    global.crashSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  /*
  |--------------------------------------------------------------------------
  | BET
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'bet'

  ) {

    const amount =
      Number(
        ctx.message.text
      )

    if (

      isNaN(amount) ||

      amount <= 0

    ) {

      return ctx.reply(
`
❌ Mise invalide.
`
      )

    }

    const paid =
      await removeMoney(

        ctx.from.id,

        amount,

        'Crash bet'

      )

    if (!paid) {

      return ctx.reply(
`
❌ Fonds insuffisants.
`
      )

    }

    session.action =
      'game'

    session.bet =
      amount

    session.multiplier =
      1

    session.crashPoint =
      generateCrashPoint()

    await ctx.reply(

`
📈 CRASH STARTED

━━━━━━━━━━━━━━━━━━

💰 Mise :
${amount}$

📈 x1.00
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '💰 CASHOUT',
      'crash_cashout'
    )

  ]

])

    )

    /*
    |--------------------------------------------------------------------------
    | LOOP
    |--------------------------------------------------------------------------
    */

    const interval =
      setInterval(

        async () => {

          const current =

            global.crashSessions[
              ctx.from.id
            ]

          if (!current) {

            clearInterval(
              interval
            )

            return

          }

          current.multiplier +=
            0.2

          /*
          |--------------------------------------------------------------------------
          | CRASH
          |--------------------------------------------------------------------------
          */

          if (

            current.multiplier >=
            current.crashPoint

          ) {

            clearInterval(
              interval
            )

            delete global.crashSessions[
              ctx.from.id
            ]

            return ctx.reply(
`
💥 CRASH

📈 x${current.crashPoint}

❌ Perdu :
${current.bet}$
`
            )

          }

        },

        2000

      )

  }

}

/*
|--------------------------------------------------------------------------
| CASHOUT
|--------------------------------------------------------------------------
*/

const crashCashout =
async (ctx) => {

  const session =

    global.crashSessions[
      ctx.from.id
    ]

  if (

    !session ||

    session.action !==
    'game'

  ) {

    return

  }

  const winnings =

    Math.floor(

      session.bet *

      session.multiplier

    )

  await addMoney(

    ctx.from.id,

    winnings,

    'Crash cashout'

  )

  await ctx.reply(
`
✅ CASHOUT

💰 ${winnings}$

📈 x${session.multiplier.toFixed(2)}
`
  )

  delete global.crashSessions[
    ctx.from.id
  ]

}

module.exports = {

  openCrash,

  handleCrashInput,

  crashCashout

}