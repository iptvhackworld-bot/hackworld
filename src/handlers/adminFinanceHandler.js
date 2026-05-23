const { Markup } =
require('telegraf')

const Transaction =
require(
  '../models/Transaction'
)

const Wallet =
require(
  '../models/Wallet'
)

const {

  lockWallet,

  unlockWallet

} = require(
  '../services/walletService'
)

/*
|--------------------------------------------------------------------------
| FINANCE PANEL
|--------------------------------------------------------------------------
*/

const openFinancePanel =
async (ctx) => {

  await ctx.reply(

`
💰 FINANCE PANEL

━━━━━━━━━━━━━━━━━━

Gestion financière

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '📜 Transactions',
          'finance_logs'
        )

      ],
	  
	  [
        Markup.button.callback(
          '🧊 Freeze',
          'freeze_wallet'
        ),

        Markup.button.callback(
          '🔓 Unfreeze',
          'unfreeze_wallet'
        )
      ],

      [

        Markup.button.callback(
          '🏦 Wallets',
          'finance_wallets'
        )

      ],

      [

        Markup.button.callback(
          '📊 Stats Finance',
          'finance_stats'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| TRANSACTION LOGS
|--------------------------------------------------------------------------
*/

const showFinanceLogs =
async (ctx) => {

  const transactions =
    await Transaction.find()

    .sort({

      createdAt: -1

    })

    .limit(20)

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
📜 TRANSACTION LOGS

━━━━━━━━━━━━━━━━━━
`

  transactions.forEach((tx) => {

    text +=
`
👤 ${tx.userId}

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
| WALLET STATS
|--------------------------------------------------------------------------
*/

const showWalletStats =
async (ctx) => {

  const wallets =
    await Wallet.find()

  let total =
    0

  wallets.forEach((wallet) => {

    total +=
      wallet.balance

  })

  await ctx.reply(
`
🏦 WALLET STATS

━━━━━━━━━━━━━━━━━━

👛 Wallets :
${wallets.length}

💰 Argent total :
${total}$

━━━━━━━━━━━━━━━━━━
`
  )

}

/*
|--------------------------------------------------------------------------
| FREEZE PANEL
|--------------------------------------------------------------------------
*/

if (!global.financeSessions) {

  global.financeSessions = {}

}

const freezeWalletPanel =
async (ctx) => {

  global.financeSessions[
    ctx.from.id
  ] = {

    action:
    'freeze_wallet'

  }

  await ctx.reply(
`
🧊 Envoyez ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| UNFREEZE PANEL
|--------------------------------------------------------------------------
*/

const unfreezeWalletPanel =
async (ctx) => {

  global.financeSessions[
    ctx.from.id
  ] = {

    action:
    'unfreeze_wallet'

  }

  await ctx.reply(
`
🔓 Envoyez ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE FINANCE INPUT
|--------------------------------------------------------------------------
*/

const handleFinanceInput =
async (ctx) => {

  const session =

    global.financeSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  const userId =
    Number(
      ctx.message.text
    )

  /*
  |--------------------------------------------------------------------------
  | FREEZE
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'freeze_wallet'

  ) {

    await lockWallet(
      userId
    )

    delete global.financeSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
🧊 Wallet bloqué.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | UNFREEZE
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'unfreeze_wallet'

  ) {

    await unlockWallet(
      userId
    )

    delete global.financeSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
🔓 Wallet débloqué.
`
    )

  }

}

module.exports = {

  openFinancePanel,

  showFinanceLogs,

  showWalletStats,

  freezeWalletPanel,

  unfreezeWalletPanel,

  handleFinanceInput

}