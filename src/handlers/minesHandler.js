const { Markup } =
require('telegraf')

const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

if (!global.minesSessions) {

  global.minesSessions = {}

}

/*
|--------------------------------------------------------------------------
| OPEN MINES
|--------------------------------------------------------------------------
*/

const openMines =
async (ctx) => {

  global.minesSessions[
    ctx.from.id
  ] = {

    action:
    'bet'

  }

  await ctx.reply(
`
💣 MINES

━━━━━━━━━━━━━━━━━━

💰 Entrez votre mise :
`
  )

}

/*
|--------------------------------------------------------------------------
| CREATE BOARD
|--------------------------------------------------------------------------
*/

const createBoard = () => {

  const board = []

  for (

    let i = 0;

    i < 9;

    i++

  ) {

    board.push('safe')

  }

  /*
  |--------------------------------------------------------------------------
  | RANDOM MINES
  |--------------------------------------------------------------------------
  */

  let mines = 0

  while (

    mines < 3

  ) {

    const index =

      Math.floor(

        Math.random()

        * 9

      )

    if (

      board[index] !==
      'mine'

    ) {

      board[index] =
        'mine'

      mines++

    }

  }

  return board

}

/*
|--------------------------------------------------------------------------
| RENDER BOARD
|--------------------------------------------------------------------------
*/

const renderBoard =
(session) => {

  const buttons = []

  for (

    let i = 0;

    i < 9;

    i += 3

  ) {

    const row = []

    for (

      let j = i;

      j < i + 3;

      j++

    ) {

      const opened =

        session.opened.includes(j)

      row.push(

        Markup.button.callback(

          opened
          ? '💎'
          : '❓',

          `mine_${j}`

        )

      )

    }

    buttons.push(row)

  }

  /*
  |--------------------------------------------------------------------------
  | CASHOUT
  |--------------------------------------------------------------------------
  */

  buttons.push([

    Markup.button.callback(
      '💰 CASHOUT',
      'mines_cashout'
    )

  ])

  return Markup.inlineKeyboard(
    buttons
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleMinesInput =
async (ctx) => {

  const session =

    global.minesSessions[
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

        'Mines bet'

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

    session.board =
      createBoard()

    session.opened = []

    session.multiplier =
      1

    return ctx.reply(

`
💣 MINES

━━━━━━━━━━━━━━━━━━

💰 Mise :
${amount}$

📈 Multiplicateur :
x1
`,

renderBoard(session)

    )

  }

}

/*
|--------------------------------------------------------------------------
| PICK TILE
|--------------------------------------------------------------------------
*/

const pickMineTile =
async (

  ctx,

  index

) => {

  const session =

    global.minesSessions[
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
  | ALREADY OPENED
  |--------------------------------------------------------------------------
  */

  if (

    session.opened.includes(
      index
    )

  ) {

    return ctx.answerCbQuery(
      'Déjà ouverte'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | MINE
  |--------------------------------------------------------------------------
  */

  if (

    session.board[index] ===
    'mine'

  ) {

    delete global.minesSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
💣 BOOM

❌ Perdu :
${session.bet}$
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | SAFE
  |--------------------------------------------------------------------------
  */

  session.opened.push(index)

  session.multiplier +=
    0.5

  await ctx.reply(

`
💎 Safe

📈 Multiplicateur :
x${session.multiplier.toFixed(1)}
`,

renderBoard(session)

  )

}

/*
|--------------------------------------------------------------------------
| CASHOUT
|--------------------------------------------------------------------------
*/

const minesCashout =
async (ctx) => {

  const session =

    global.minesSessions[
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

    'Mines cashout'

  )

  delete global.minesSessions[
    ctx.from.id
  ]

  await ctx.reply(
`
✅ CASHOUT

💰 Gagné :
${winnings}$

📈 x${session.multiplier.toFixed(1)}
`
  )

}

module.exports = {

  openMines,

  handleMinesInput,

  pickMineTile,

  minesCashout

}