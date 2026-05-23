const { Markup } =
require('telegraf')

const {

  getCryptoWallet

} = require(
  '../services/cryptoService'
)

const {

  addCrypto,

  removeCrypto,

  createCryptoTransaction,

  getCryptoTransactions

} = require(
  '../services/cryptoService'
)

if (!global.cryptoSessions) {

  global.cryptoSessions = {}

}

const {

  autoFlagUser

} = require(
  '../services/fraudService'
)



/*
|--------------------------------------------------------------------------
| CRYPTO PANEL
|--------------------------------------------------------------------------
*/

const openCryptoPanel =
async (ctx) => {

  const wallet =
    await getCryptoWallet(

      ctx.from.id

    )

  await ctx.reply(

`
💳 CRYPTO WALLET

━━━━━━━━━━━━━━━━━━

₿ BTC :
${wallet.btc}

◆ ETH :
${wallet.eth}

💲 USDT :
${wallet.usdt}

Ł LTC :
${wallet.ltc}

━━━━━━━━━━━━━━━━━━
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '💰 Dépôt',
      'crypto_deposit'
    ),

    Markup.button.callback(
      '💸 Retrait',
      'crypto_withdraw'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| DEPOSIT PANEL
|--------------------------------------------------------------------------
*/

const openDepositPanel =
async (ctx) => {

  await ctx.reply(

`
💰 CHOISISSEZ COIN
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '₿ BTC',
      'deposit_btc'
    ),

    Markup.button.callback(
      '◆ ETH',
      'deposit_eth'
    )

  ],

  [

    Markup.button.callback(
      '💲 USDT',
      'deposit_usdt'
    ),

    Markup.button.callback(
      'Ł LTC',
      'deposit_ltc'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| ASK DEPOSIT
|--------------------------------------------------------------------------
*/

const askDepositAmount =
async (

  ctx,

  coin

) => {

  global.cryptoSessions[
    ctx.from.id
  ] = {

    action:
    'deposit',

    coin

  }

  await ctx.reply(
`
💰 Montant ${coin} :
`
  )

}

/*
|--------------------------------------------------------------------------
| WITHDRAW PANEL
|--------------------------------------------------------------------------
*/

const openWithdrawPanel =
async (ctx) => {

  await ctx.reply(

`
💸 CHOISISSEZ COIN
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '₿ BTC',
      'withdraw_btc'
    ),

    Markup.button.callback(
      '◆ ETH',
      'withdraw_eth'
    )

  ],
  
  [
    Markup.button.callback(
      '🧾 Historique',
      'crypto_history'
    )
  ],

  [

    Markup.button.callback(
      '💲 USDT',
      'withdraw_usdt'
    ),

    Markup.button.callback(
      'Ł LTC',
      'withdraw_ltc'
    )

  ]

])

  )

}

/*
|--------------------------------------------------------------------------
| ASK WITHDRAW
|--------------------------------------------------------------------------
*/

const askWithdrawAmount =
async (

  ctx,

  coin

) => {

  global.cryptoSessions[
    ctx.from.id
  ] = {

    action:
    'withdraw',

    coin

  }

  await ctx.reply(
`
💸 Montant ${coin} :
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE CRYPTO INPUT
|--------------------------------------------------------------------------
*/

const handleCryptoInput =
async (ctx) => {

  const session =

    global.cryptoSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

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
❌ Montant invalide.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | DEPOSIT
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'deposit'

  ) {

    await addCrypto(

      ctx.from.id,

      session.coin,

      amount

    )
	
	await createCryptoTransaction(

  ctx.from.id,

  'deposit',

  session.coin,

  amount

)

    delete global.cryptoSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Dépôt effectué.

💰 +${amount}
${session.coin}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | WITHDRAW
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'withdraw'

  ) {
	  
	  /*
|--------------------------------------------------------------------------
| LARGE WITHDRAW
|--------------------------------------------------------------------------
*/

if (

  amount >= 1000

) {

  await autoFlagUser(

    ctx.from.id,

    'Large crypto withdraw',

    15

  )

}

    const removed =
      await removeCrypto(

        ctx.from.id,

        session.coin,

        amount

      )
	  
	  await createCryptoTransaction(

  ctx.from.id,

  'withdraw',

  session.coin,

  amount

)

    if (!removed) {

      return ctx.reply(
`
❌ Solde insuffisant.
`
      )

    }

    delete global.cryptoSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Retrait effectué.

💸 -${amount}
${session.coin}
`
    )

  }

}

/*
|--------------------------------------------------------------------------
| CRYPTO HISTORY
|--------------------------------------------------------------------------
*/

const openCryptoHistory =
async (ctx) => {

  const txs =
    await getCryptoTransactions(

      ctx.from.id

    )

  if (!txs.length) {

    return ctx.reply(
`
❌ Aucun historique.
`
    )

  }

  let text =
`
🧾 CRYPTO HISTORY

━━━━━━━━━━━━━━━━━━

`

  txs.forEach((tx) => {

    text +=
`
${tx.type === 'deposit'
? '💰'
: '💸'}

${tx.coin.toUpperCase()}

${tx.amount}

🆔 ${tx.txHash}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

module.exports = {

  openCryptoPanel,

  openDepositPanel,

  askDepositAmount,

  openWithdrawPanel,

  askWithdrawAmount,

  handleCryptoInput,
  
  openCryptoHistory

}