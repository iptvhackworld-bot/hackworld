const User =
require(
  '../models/User'
)

const {

  Markup

} = require(
  'telegraf'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
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

    logInfo(
      `PROFILE_OPEN ${ctx.from.id}`
    )

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

👑 Rôle :
${user.role || 'user'}

━━━━━━━━━━━━━━━━━━
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '🏠 Menu',
            'back_main_menu'
          )

        ]

      ])

    )

  }

  catch (error) {

    logError(
      'PROFILE_HANDLER',
      error
    )

  }

}

module.exports = {

  openProfile

}