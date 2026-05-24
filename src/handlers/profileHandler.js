const User =
require(
  '../models/User'
)

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

const openProfile =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id: ctx.from.id

      })

    if (!user) {

      return ctx.reply(
`
❌ Profil introuvable.
`
      )

    }

    await ctx.reply(
`
👤 PROFIL

━━━━━━━━━━━━━━━━━━

🆔 ID :
${user.id}

👤 Username :
@${user.username || 'unknown'}

💰 Argent :
${user.money || 0}$

⭐ XP :
${user.xp || 0}

🏆 Niveau :
${user.level || 1}

🔥 Prestige :
${user.prestige || 0}

💬 Messages :
${user.messages || 0}

━━━━━━━━━━━━━━━━━━
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openProfile

}