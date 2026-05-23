const Wallet =
require(
  '../models/Wallet'
)

const Transaction =
require(
  '../models/Transaction'
)

/*
|--------------------------------------------------------------------------
| GET WALLET
|--------------------------------------------------------------------------
*/

const getWallet =
async (userId) => {

  let wallet =
    await Wallet.findOne({

      userId

    })

  if (!wallet) {

    wallet =
      await Wallet.create({

        userId

      })

  }

  return wallet

}

/*
|--------------------------------------------------------------------------
| ADD MONEY
|--------------------------------------------------------------------------
*/

const addMoney =
async (

  userId,

  amount,

  description =
  'Ajout'

) => {

  const wallet =
    await getWallet(
      userId
    )

  wallet.balance +=
    amount

  wallet.totalReceived +=
    amount

  await wallet.save()

  await Transaction.create({

    userId,

    type: 'add',

    amount,

    description

  })

  return wallet

}

/*
|--------------------------------------------------------------------------
| REMOVE MONEY
|--------------------------------------------------------------------------
*/

const removeMoney =
async (

  userId,

  amount,

  description =
  'Retrait'

) => {

  const wallet =
    await getWallet(
      userId
    )
	
	if (

  wallet.locked

) {

  return false

}

  if (

    wallet.balance < amount

  ) {

    return false

  }

  wallet.balance -=
    amount

  wallet.totalSent +=
    amount

  await wallet.save()

  await Transaction.create({

    userId,

    type: 'remove',

    amount,

    description

  })

  return true

}

/*
|--------------------------------------------------------------------------
| GET TRANSACTIONS
|--------------------------------------------------------------------------
*/

const getTransactions =
async (userId) => {

  return await Transaction.find({

    userId

  })

  .sort({

    createdAt: -1

  })

  .limit(10)

}

/*
|--------------------------------------------------------------------------
| LOCK WALLET
|--------------------------------------------------------------------------
*/

const lockWallet =
async (userId) => {

  return await Wallet.findOneAndUpdate(

    {

      userId

    },

    {

      locked: true

    }

  )

}

/*
|--------------------------------------------------------------------------
| UNLOCK WALLET
|--------------------------------------------------------------------------
*/

const unlockWallet =
async (userId) => {

  return await Wallet.findOneAndUpdate(

    {

      userId

    },

    {

      locked: false

    }

  )

}
module.exports = {

  getWallet,

  addMoney,

  removeMoney,

  getTransactions,

  lockWallet,

  unlockWallet

}

