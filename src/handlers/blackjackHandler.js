const { Markup } =
require('telegraf')

const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

if (!global.blackjackSessions) {

  global.blackjackSessions = {}

}

/*
|--------------------------------------------------------------------------
| CARDS
|--------------------------------------------------------------------------
*/

const cards = [

  2,3,4,5,6,7,8,9,10,

  10,10,10,

  11

]

const drawCard = () => {

  return cards[
    Math.floor(

      Math.random()

      *

      cards.length

    )
  ]

}

/*
|--------------------------------------------------------------------------
| TOTAL
|--------------------------------------------------------------------------
*/

const getTotal =
(cards) => {

  let total =

    cards.reduce(

      (a, b) => a + b,

      0

    )

  /*
  |--------------------------------------------------------------------------
  | ACE FIX
  |--------------------------------------------------------------------------
  */

  let aces =

    cards.filter(

      (x) => x === 11

    ).length

  while (

    total > 21 &&

    aces > 0

  ) {

    total -= 10

    aces--

  }

  return total

}

/*
|--------------------------------------------------------------------------
| OPEN
|--------------------------------------------------------------------------
*/

const openBlackjack =
async (ctx) => {

  global.blackjackSessions[
    ctx.from.id
  ] = {

    action:
    'bet'

  }

  await ctx.reply(
`
🃏 BLACKJACK

━━━━━━━━━━━━━━━━━━

💰 Entrez votre mise :
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleBlackjackInput =
async (ctx) => {

  const session =

    global.blackjackSessions[
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

        'Blackjack bet'

      )

    if (!paid) {

      return ctx.reply(
`
❌ Fonds insuffisants.
`
      )

    }

    const playerCards = [

      drawCard(),

      drawCard()

    ]

    const dealerCards = [

      drawCard(),

      drawCard()

    ]

    session.action =
      'game'

    session.bet =
      amount

    session.playerCards =
      playerCards

    session.dealerCards =
      dealerCards

    return ctx.reply(

`
🃏 BLACKJACK

━━━━━━━━━━━━━━━━━━

🎴 Vos cartes :

${playerCards.join(' | ')}

💰 Total :
${getTotal(playerCards)}

━━━━━━━━━━━━━━━━━━

🎴 Dealer :

${dealerCards[0]} | ❓
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '➕ HIT',
      'blackjack_hit'
    ),

    Markup.button.callback(
      '✋ STAND',
      'blackjack_stand'
    )

  ]

])

    )

  }

}

/*
|--------------------------------------------------------------------------
| HIT
|--------------------------------------------------------------------------
*/

const blackjackHit =
async (ctx) => {

  const session =

    global.blackjackSessions[
      ctx.from.id
    ]

  if (

    !session ||

    session.action !==
    'game'

  ) {

    return

  }

  session.playerCards.push(
    drawCard()
  )

  const total =
    getTotal(
      session.playerCards
    )

  /*
  |--------------------------------------------------------------------------
  | BUST
  |--------------------------------------------------------------------------
  */

  if (

    total > 21

  ) {

    delete global.blackjackSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
❌ BUST

💰 Perdu :
${session.bet}$
`
    )

  }

  await ctx.reply(

`
🃏 Vos cartes :

${session.playerCards.join(' | ')}

💰 Total :
${total}
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '➕ HIT',
      'blackjack_hit'
    ),

    Markup.button.callback(
      '✋ STAND',
      'blackjack_stand'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| STAND
|--------------------------------------------------------------------------
*/

const blackjackStand =
async (ctx) => {

  const session =

    global.blackjackSessions[
      ctx.from.id
    ]

  if (

    !session ||

    session.action !==
    'game'

  ) {

    return

  }

  /*
  |--------------------------------------------------------------------------
  | DEALER AI
  |--------------------------------------------------------------------------
  */

  while (

    getTotal(
      session.dealerCards
    ) < 17

  ) {

    session.dealerCards.push(
      drawCard()
    )

  }

  const player =
    getTotal(
      session.playerCards
    )

  const dealer =
    getTotal(
      session.dealerCards
    )

  let won =
    false

  /*
  |--------------------------------------------------------------------------
  | WIN CONDITIONS
  |--------------------------------------------------------------------------
  */

  if (

    dealer > 21 ||

    player > dealer

  ) {

    won = true

  }

  /*
  |--------------------------------------------------------------------------
  | PAYOUT
  |--------------------------------------------------------------------------
  */

  let winnings =
    0

  if (won) {

    winnings =
      session.bet * 2

    await addMoney(

      ctx.from.id,

      winnings,

      'Blackjack win'

    )

  }

  /*
  |--------------------------------------------------------------------------
  | CLEAN
  |--------------------------------------------------------------------------
  */

  delete global.blackjackSessions[
    ctx.from.id
  ]

  /*
  |--------------------------------------------------------------------------
  | RESULT
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🃏 BLACKJACK

━━━━━━━━━━━━━━━━━━

🎴 Joueur :

${session.playerCards.join(' | ')}

💰 ${player}

━━━━━━━━━━━━━━━━━━

🎴 Dealer :

${session.dealerCards.join(' | ')}

💰 ${dealer}

━━━━━━━━━━━━━━━━━━

${won
? `✅ Gagné : ${winnings}$`
: `❌ Perdu : ${session.bet}$`}
`
  )

}

module.exports = {

  openBlackjack,

  handleBlackjackInput,

  blackjackHit,

  blackjackStand

}