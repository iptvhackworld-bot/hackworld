const {

  loadUsers

} = require(
  '../data/userData'
)

const {

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

  const users =
    loadUsers()

  const totalUsers =
    users.length

  const totalUses =
    getTotalUses()

  const rating =
    getAverageRating()

  await ctx.reply(
`
📊 STATISTIQUES

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

🚀 Utilisations :
${totalUses}

⭐ Note moyenne :
${rating}/5

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  showStats

}