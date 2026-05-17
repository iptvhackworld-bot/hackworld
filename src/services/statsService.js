const {

  loadStats,

  saveStats

} = require(
  '../data/statsData'
)

const {

  loadUsers

} = require(
  '../data/userData'
)

/*
|--------------------------------------------------------------------------
| GET TOTAL USERS
|--------------------------------------------------------------------------
*/

const getTotalUsers =
() => {

  const users =
    loadUsers()

  return users.length

}

/*
|--------------------------------------------------------------------------
| GET TOTAL USES
|--------------------------------------------------------------------------
*/

const getTotalUses =
() => {

  const stats =
    loadStats()

  return stats.uses || 0

}

/*
|--------------------------------------------------------------------------
| INCREMENT USES
|--------------------------------------------------------------------------
*/

const incrementUses =
() => {

  const stats =
    loadStats()

  stats.uses += 1

  saveStats(stats)

}

/*
|--------------------------------------------------------------------------
| ADD RATING
|--------------------------------------------------------------------------
*/

const addRating = (
  rating
) => {

  const stats =
    loadStats()

  stats.ratings.push(rating)

  saveStats(stats)

}

/*
|--------------------------------------------------------------------------
| GET AVERAGE RATING
|--------------------------------------------------------------------------
*/

const getAverageRating =
() => {

  const stats =
    loadStats()

  if (
    stats.ratings.length === 0
  ) {

    return '0.0'

  }

  const total =
    stats.ratings.reduce(

      (sum, rating) =>

        sum + rating,

      0

    )

  return (
    total /
    stats.ratings.length
  ).toFixed(1)

}

module.exports = {

  getTotalUsers,

  getTotalUses,

  incrementUses,

  addRating,

  getAverageRating

}