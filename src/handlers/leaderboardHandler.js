const User =
require(
  '../models/User'
)

const CryptoWallet =
require(
  '../models/CryptoWallet'
)

/*
|--------------------------------------------------------------------------
| TOP MONEY
|--------------------------------------------------------------------------
*/

const openMoneyLeaderboard =
async (ctx) => {

  const users =
    await User.find()

    .sort({

      money: -1

    })

    .limit(10)

  let text =
`
💰 TOP RICH USERS

━━━━━━━━━━━━━━━━━━

`

  users.forEach(

    (user, index) => {

      text +=
`
#${index + 1}

👤 @${user.username}

💰 ${user.money}$

━━━━━━━━━━━━━━━━━━
`

    }

  )

  await ctx.reply(text)

}

/*
|--------------------------------------------------------------------------
| TOP SELLERS
|--------------------------------------------------------------------------
*/

const openSellerLeaderboard =
async (ctx) => {

  const users =
    await User.find()

    .sort({

      sellerSales: -1

    })

    .limit(10)

  let text =
`
📈 TOP SELLERS

━━━━━━━━━━━━━━━━━━

`

  users.forEach(

    (user, index) => {

      text +=
`
#${index + 1}

👤 @${user.username}

📦 ${user.sellerSales}

━━━━━━━━━━━━━━━━━━
`

    }

  )

  await ctx.reply(text)

}

/*
|--------------------------------------------------------------------------
| TOP XP
|--------------------------------------------------------------------------
*/

const openXpLeaderboard =
async (ctx) => {

  const users =
    await User.find()

    .sort({

      xp: -1

    })

    .limit(10)

  let text =
`
⭐ TOP XP

━━━━━━━━━━━━━━━━━━

`

  users.forEach(

    (user, index) => {

      text +=
`
#${index + 1}

👤 @${user.username}

⭐ ${user.xp}

━━━━━━━━━━━━━━━━━━
`

    }

  )

  await ctx.reply(text)

}

/*
|--------------------------------------------------------------------------
| TOP CRYPTO
|--------------------------------------------------------------------------
*/

const openCryptoLeaderboard =
async (ctx) => {

  const wallets =
    await CryptoWallet.find()

    .limit(10)

  wallets.sort((a, b) => {

    const totalA =

      a.btc +

      a.eth +

      a.usdt +

      a.ltc

    const totalB =

      b.btc +

      b.eth +

      b.usdt +

      b.ltc

    return totalB - totalA

  })

  let text =
`
💳 TOP CRYPTO

━━━━━━━━━━━━━━━━━━

`

  wallets.forEach(

    (wallet, index) => {

      const total =

        wallet.btc +

        wallet.eth +

        wallet.usdt +

        wallet.ltc

      text +=
`
#${index + 1}

👤 ${wallet.userId}

💰 ${total}

━━━━━━━━━━━━━━━━━━
`

    }

  )

  await ctx.reply(text)

}

module.exports = {

  openMoneyLeaderboard,

  openSellerLeaderboard,

  openXpLeaderboard,

  openCryptoLeaderboard

}