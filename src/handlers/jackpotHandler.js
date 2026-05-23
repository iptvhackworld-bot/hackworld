const { Markup } =
require('telegraf')

const Jackpot =
require(
  '../models/Jackpot'
)

const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| GET ACTIVE JACKPOT
|--------------------------------------------------------------------------
*/

const getActiveJackpot =
async () => {

  let jackpot =
    await Jackpot.findOne({

      active: true

    })

  if (!jackpot) {

    jackpot =
      await Jackpot.create({

        amount: 0,

        players: []

      })

  }

  return jackpot

}

/*
|--------------------------------------------------------------------------
| OPEN JACKPOT
|--------------------------------------------------------------------------
*/

const openJackpot =
async (ctx) => {

  const jackpot =
    await getActiveJackpot()

  await ctx.reply(

`
🏆 JACKPOT

━━━━━━━━━━━━━━━━━━

💰 Pot :

${jackpot.amount}$

👥 Joueurs :

${jackpot.players.length}

━━━━━━━━━━━━━━━━━━

🎟 Ticket :
10$
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '🎟 Participer',
      'join_jackpot'
    )

  ],

  [

    Markup.button.callback(
      '🎲 Tirage',
      'draw_jackpot'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| JOIN JACKPOT
|--------------------------------------------------------------------------
*/

const joinJackpot =
async (ctx) => {

  const jackpot =
    await getActiveJackpot()

  /*
  |--------------------------------------------------------------------------
  | PAYMENT
  |--------------------------------------------------------------------------
  */

  const paid =
    await removeMoney(

      ctx.from.id,

      10,

      'Jackpot ticket'

    )

  if (!paid) {

    return ctx.reply(
`
❌ Fonds insuffisants.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | ADD POT
  |--------------------------------------------------------------------------
  */

  jackpot.amount +=
    10

  /*
  |--------------------------------------------------------------------------
  | PLAYER
  |--------------------------------------------------------------------------
  */

  const existing =

    jackpot.players.find(

      (x) =>

        x.userId ===
        ctx.from.id

    )

  if (existing) {

    existing.tickets +=
      1

  }

  else {

    jackpot.players.push({

      userId:
      ctx.from.id,

      username:
      ctx.from.username,

      tickets: 1

    })

  }

  await jackpot.save()

  await ctx.reply(
`
✅ Participation enregistrée.

🎟 +1 ticket

🏆 Pot :
${jackpot.amount}$
`
  )

}

/*
|--------------------------------------------------------------------------
| DRAW JACKPOT
|--------------------------------------------------------------------------
*/

const drawJackpot =
async (ctx) => {

  const jackpot =
    await getActiveJackpot()

  if (

    jackpot.players.length === 0

  ) {

    return ctx.reply(
`
❌ Aucun joueur.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | TICKETS
  |--------------------------------------------------------------------------
  */

  const tickets = []

  jackpot.players.forEach((p) => {

    for (

      let i = 0;

      i < p.tickets;

      i++

    ) {

      tickets.push(p)

    }

  })

  /*
  |--------------------------------------------------------------------------
  | RANDOM WINNER
  |--------------------------------------------------------------------------
  */

  const winner =

    tickets[
      Math.floor(

        Math.random()

        *

        tickets.length

      )
    ]

  /*
  |--------------------------------------------------------------------------
  | PAYOUT
  |--------------------------------------------------------------------------
  */

  await addMoney(

    winner.userId,

    jackpot.amount,

    'Jackpot win'

  )

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🏆 JACKPOT WINNER

━━━━━━━━━━━━━━━━━━

👤 @${winner.username}

💰 ${jackpot.amount}$

🎟 Tickets :
${winner.tickets}

━━━━━━━━━━━━━━━━━━

🎉 Félicitations
`
  )

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  jackpot.amount =
    0

  jackpot.players =
    []

  await jackpot.save()

}

module.exports = {

  openJackpot,

  joinJackpot,

  drawJackpot

}