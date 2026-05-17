const { Markup } = require('telegraf')

const {

  getTopUsers

} = require('./userHandler')

/*
|--------------------------------------------------------------------------
| OPEN STAFF MENU
|--------------------------------------------------------------------------
*/

const openStaffMenu = async (ctx) => {

  await ctx.reply(
`
╔══════════════════╗
       STAFF PANEL
╚══════════════════╝

🛡 Gestion équipe
`,
    Markup.inlineKeyboard([

      [
        Markup.button.callback(
          '👑 Liste Admins',
          'show_admins'
        )
      ],

      [
        Markup.button.callback(
          '🛡 Liste Modérateurs',
          'show_mods'
        )
      ],

      [
        Markup.button.callback(
          '🏆 Top Utilisateurs',
          'show_top_users'
        )
      ],

      [
        Markup.button.callback(
          '🔙 Retour',
          'back_menu'
        )
      ]

    ])
  )
}

/*
|--------------------------------------------------------------------------
| ADMINS
|--------------------------------------------------------------------------
*/

const showAdmins = async (ctx) => {

  await ctx.reply(
`
👑 LISTE ADMINS

━━━━━━━━━━━━━━━━━━

👤 HackWorld
🆔 ${env.ownerId}
`
  )
}

/*
|--------------------------------------------------------------------------
| MODS
|--------------------------------------------------------------------------
*/

const showModerators = async (ctx) => {

  await ctx.reply(
`
🛡 LISTE MODÉRATEURS

━━━━━━━━━━━━━━━━━━

⚠️ Aucun modérateur.
`
  )
}

/*
|--------------------------------------------------------------------------
| TOP USERS
|--------------------------------------------------------------------------
*/

const showTopUsers = async (ctx) => {

  const users = getTopUsers()

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (users.length === 0) {

    return ctx.reply(
`
❌ Aucun utilisateur.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | BUILD MESSAGE
  |--------------------------------------------------------------------------
  */

  let message =
`
🏆 TOP 30 UTILISATEURS

━━━━━━━━━━━━━━━━━━
`

  users.forEach((user, index) => {

    message +=
`
${index + 1}. @${user.username}

⭐ XP : ${user.xp}
🏆 Niveau : ${user.level}
💬 Messages : ${user.messages}

`
  })

  await ctx.reply(message)
}

module.exports = {

  openStaffMenu,

  showAdmins,

  showModerators,

  showTopUsers

}