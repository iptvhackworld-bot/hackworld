const Casino =
require(
  '../models/Casino'
)

/*
|--------------------------------------------------------------------------
| GET CASINO
|--------------------------------------------------------------------------
*/

const getCasinoStats =
async (userId) => {

  let stats =

    await Casino.findOne({

      userId

    })

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  if (!stats) {

    stats =
      await Casino.create({

        userId

      })

  }

  return stats

}

/*
|--------------------------------------------------------------------------
| ADD WIN
|--------------------------------------------------------------------------
*/

const addWin =
async (

  userId,

  amount

) => {

  const stats =
    await getCasinoStats(
      userId
    )

  stats.wins += 1

  stats.totalBet +=
    amount

  await stats.save()

}

/*
|--------------------------------------------------------------------------
| ADD LOSS
|--------------------------------------------------------------------------
*/

const addLoss =
async (

  userId,

  amount

) => {

  const stats =
    await getCasinoStats(
      userId
    )

  stats.losses += 1

  stats.totalBet +=
    amount

  await stats.save()

}

module.exports = {

  getCasinoStats,

  addWin,

  addLoss

}