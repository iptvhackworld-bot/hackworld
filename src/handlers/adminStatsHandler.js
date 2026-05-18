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

  const totalUsers =
    await getTotalUsers()

  const totalUses =
    getTotalUses()

  const averageRating =
    await getAverageRating()

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