const { Markup } =
require('telegraf')

const {

  getWallet,

  getTransactions

} = require(
  '../services/walletService'
)

const {

  addMoney,

  removeMoney

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| WALLET PANEL
|--------------------------------------------------------------------------
*/

const openWallet =
async (ctx) => {

  const wallet =
    await getWallet(
      ctx.from.id
    )

  await ctx.reply(

`
🏦 WALLET HACKWORLD

━━━━━━━━━━━━━━━━━━

💰 Balance :
${wallet.balance}$

━━━━━━━━━━━━━━━━━━

📥 Dépôts :
${wallet.totalDeposits}$

📤 Retraits :
${wallet.totalWithdraws}$

💸 Envoyé :
${wallet.totalSent}$

📨 Reçu :
${wallet.totalReceived}$

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '📜 Historique',
          'wallet_history'
        )

      ],

      [

        Markup.button.callback(
          '💸 Transfer',
          'wallet_transfer'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| HISTORY
|--------------------------------------------------------------------------
*/

const walletHistory =
async (ctx) => {

  const transactions =
    await getTransactions(
      ctx.from.id
    )

  if (

    !transactions.length

  ) {

    return ctx.reply(
`
❌ Aucune transaction.
`
    )

  }

  let text =
`
📜 HISTORIQUE WALLET

━━━━━━━━━━━━━━━━━━
`

  transactions.forEach((tx) => {

    text +=
`
💰 ${tx.amount}$

📌 ${tx.type}

📝 ${tx.description}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

/*
|--------------------------------------------------------------------------
| TRANSFER PANEL
|--------------------------------------------------------------------------
*/

if (!global.walletSessions) {

  global.walletSessions = {}

}

const transferPanel =
async (ctx) => {

  global.walletSessions[
    ctx.from.id
  ] = {

    action:
    'transfer'

  }

  await ctx.reply(
`
💸 Envoyez :

@user | montant

Exemple :

@hackworld | 50
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE TRANSFER
|--------------------------------------------------------------------------
*/

const handleWalletInput =
async (ctx) => {

  const session =

    global.walletSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  /*
  |--------------------------------------------------------------------------
  | TRANSFER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'transfer'

  ) {

    const args =
      ctx.message.text.split('|')

    if (

      args.length < 2

    ) {

      return ctx.reply(
`
❌ Format invalide.
`
      )

    }

    const username =
      args[0]
      .replace('@', '')
      .trim()

    const amount =
      Number(
        args[1]
      )

    if (

      isNaN(amount) ||

      amount <= 0

    ) {

      return ctx.reply(
`
❌ Montant invalide.
`
      )

    }

    const User =
    require(
      '../models/User'
    )

    const target =
      await User.findOne({

        username

      })

    if (!target) {

      return ctx.reply(
`
❌ Utilisateur introuvable.
`
      )

    }

    const removed =
      await removeMoney(

        ctx.from.id,

        amount,

        `Transfert vers @${username}`

      )

    if (!removed) {

      return ctx.reply(
`
❌ Solde insuffisant.
`
      )

    }

    await addMoney(

      target.id,

      amount,

      `Transfert reçu de @${ctx.from.username}`

    )

    delete global.walletSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Transfert effectué.

👤 @${username}

💰 ${amount}$
`
    )

  }

  return false

}

module.exports = {

  openWallet,

  walletHistory,

  transferPanel,

  handleWalletInput

}