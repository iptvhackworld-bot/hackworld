const CryptoWallet =
require(
  '../models/CryptoWallet'
)

const CryptoTransaction =
require(
  '../models/CryptoTransaction'
)

/*
|--------------------------------------------------------------------------
| GET WALLET
|--------------------------------------------------------------------------
*/

const getCryptoWallet =
async (userId) => {

  let wallet =
    await CryptoWallet.findOne({

      userId

    })

  if (!wallet) {

    wallet =
      await CryptoWallet.create({

        userId

      })

  }

  return wallet

}

/*
|--------------------------------------------------------------------------
| ADD CRYPTO
|--------------------------------------------------------------------------
*/

const addCrypto =
async (

  userId,

  coin,

  amount

) => {

  const wallet =
    await getCryptoWallet(
      userId
    )

  wallet[coin] +=
    amount

  await wallet.save()

  return wallet

}

/*
|--------------------------------------------------------------------------
| REMOVE CRYPTO
|--------------------------------------------------------------------------
*/

const removeCrypto =
async (

  userId,

  coin,

  amount

) => {

  const wallet =
    await getCryptoWallet(
      userId
    )

  if (

    wallet[coin] < amount

  ) {

    return false

  }

  wallet[coin] -=
    amount

  await wallet.save()

  return true

}

/*
|--------------------------------------------------------------------------
| CREATE TX
|--------------------------------------------------------------------------
*/

const createCryptoTransaction =
async (

  userId,

  type,

  coin,

  amount

) => {

  const hash =

    Math.random()

    .toString(36)

    .substring(2, 15)

  return await CryptoTransaction.create({

    userId,

    type,

    coin,

    amount,

    txHash: hash

  })

}

/*
|--------------------------------------------------------------------------
| GET TXS
|--------------------------------------------------------------------------
*/

const getCryptoTransactions =
async (userId) => {

  return await CryptoTransaction.find({

    userId

  })

  .sort({

    createdAt: -1

  })

  .limit(10)

}

module.exports = {

  getCryptoWallet,

  addCrypto,

  removeCrypto,

  createCryptoTransaction,

  getCryptoTransactions

}