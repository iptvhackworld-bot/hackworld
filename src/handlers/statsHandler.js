const env =
require('../config/env')

const {

  userService

} = require('../data/userData')

const {

  contentService

} = require('../data/contentData')

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
  | LOAD DATA
  |--------------------------------------------------------------------------
  */

  const users =

    userService
      ? userService()
      : []

  const contents =

    contentService
      ? contentService()
      : []

  /*
  |--------------------------------------------------------------------------
  | CALCULS
  |--------------------------------------------------------------------------
  */

  const totalUsers =
    users.length

  const totalContents =
    contents.length

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

    users.length

      ? users.sort(
          (a, b) =>
            (b.xp || 0)
            -
            (a.xp || 0)
        )[0]

      : null

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

${
  topUser
    ? `@${topUser.username || 'unknown'}`
    : 'Aucun'
}

━━━━━━━━━━━━━━━━━━

🚀 Bot opérationnel
`
  )

}

module.exports = {

  showStats

}