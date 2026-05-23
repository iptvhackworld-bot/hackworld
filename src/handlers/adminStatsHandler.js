const env =
require(
  '../config/env'
)

const User =
require(
  '../models/User'
)

const Content =
require(
  '../models/Content'
)

/*
|--------------------------------------------------------------------------
| ADMIN STATS
|--------------------------------------------------------------------------
*/

const showStats =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (

    ctx.from.id.toString()

    !==

    env.ownerId.toString()

  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | LOAD
  |--------------------------------------------------------------------------
  */

  const users =
    await User.find()

  const totalUsers =
    users.length

  const totalContents =
    await Content.countDocuments()

  /*
  |--------------------------------------------------------------------------
  | CALCULS
  |--------------------------------------------------------------------------
  */

  let totalXP = 0

  let totalMoney = 0

  let totalMessages = 0

  users.forEach((user) => {

    totalXP +=
      user.xp || 0

    totalMoney +=
      user.money || 0

    totalMessages +=
      user.messages || 0

  })

  /*
  |--------------------------------------------------------------------------
  | TOP USER
  |--------------------------------------------------------------------------
  */

  const topUser =
    users.sort(

      (a, b) =>

        b.xp - a.xp

    )[0]

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
╔══════════════════╗
  HACKWORLD STATS
╚══════════════════╝

📊 Statistiques globales

━━━━━━━━━━━━━━━━━━

👥 Utilisateurs :
${totalUsers}

📂 Contenus :
${totalContents}

⭐ XP Total :
${totalXP}

💰 Argent Total :
${totalMoney}$

💬 Messages Total :
${totalMessages}

━━━━━━━━━━━━━━━━━━

🏆 Top utilisateur :

${topUser
  ? `@${topUser.username}`
  : 'Aucun'}

━━━━━━━━━━━━━━━━━━

🚀 Bot opérationnel
`
  )

}

module.exports = {

  showStats

}