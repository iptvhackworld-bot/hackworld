const {

  getTotalUsers,

  getTotalUses,

  getAverageRating

} = require(
  '../services/statsService'
)

/*
|--------------------------------------------------------------------------
| SHOW STATS
|--------------------------------------------------------------------------
*/

const showStats =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const totalUsers =
    await getTotalUsers()

  const totalUses =
    getTotalUses()

  const averageRating =
    await getAverageRating()

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
📊 STATISTIQUES

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

🚀 Utilisations :
${totalUses}

⭐ Note moyenne :
${averageRating}/5

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  showStats

}