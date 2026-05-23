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

  const user =
    await User.findOne({

      id: ctx.from.id

    })

  if (!user) {

    return

  }

  await ctx.reply(
`
👤 PROFILE

━━━━━━━━━━━━━━━━━━

🆔 @${user.username}

⭐ Level :
${user.level}

📈 XP :
${user.xp}

👑 Prestige :
${user.prestige}

💰 Money :
${user.money}$

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  openProfile

}