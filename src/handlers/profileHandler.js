const {

  getUser

} = require(
  '../services/userService'
)

const formatMoney =
require(
  '../utils/formatMoney'
)

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

const showProfile =
async (ctx) => {

  const user =
    getUser(
      ctx.from.id
    )

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  if (!user) {

    return ctx.reply(
      '❌ Utilisateur introuvable'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
👤 PROFIL

━━━━━━━━━━━━━━━━━━

🆔 ID :
${user.id}

👤 Username :
@${user.username || 'Aucun'}

💰 Coins :
${formatMoney(
  user.money
)}

⭐ XP :
${user.xp}

🏆 Niveau :
${user.level}
`
  )

}

module.exports = {

  showProfile

}