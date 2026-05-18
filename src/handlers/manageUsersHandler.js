const {

  getUsers,

  banUser: banUserService,

  unbanUser: unbanUserService,

  getUser

} = require(
  '../services/userService'
)

const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| USERS PANEL
|--------------------------------------------------------------------------
*/

const openUsersPanel =
async (ctx) => {

  const users =
    await getUsers()

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    users.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun utilisateur.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  let message =
`
👥 UTILISATEURS

━━━━━━━━━━━━━━━━━━

`

  users
  .slice(0, 20)
  .forEach(

    (user) => {

      message +=
`
🆔 ${user.id}

👤 ${user.username}

🚫 ${
  user.banned
  ? 'Banni'
  : 'Actif'
}

━━━━━━━━━━━━━━━━━━
`
    }

  )

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
    message
  )

}

/*
|--------------------------------------------------------------------------
| USER PANEL
|--------------------------------------------------------------------------
*/

const openUserPanel =
async (ctx) => {

  const userId =
    Number(
      ctx.match[1]
    )

  const user =
    await getUser(
      userId
    )

  /*
  |--------------------------------------------------------------------------
  | NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | PANEL
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
👤 USER PANEL

━━━━━━━━━━━━━━━━━━

🆔 ${user.id}

👤 ${user.username}

💰 Money :
${user.money}

⭐ XP :
${user.xp}

🚫 Status :
${
  user.banned
  ? 'Banni'
  : 'Actif'
}

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '🚫 Ban',
          'ban_user'
        ),

        Markup.button.callback(
          '✅ Unban',
          'unban_user'
        )

      ],

      [

        Markup.button.callback(
          '💰 Reset Money',
          'reset_money'
        ),

        Markup.button.callback(
          '⭐ Reset XP',
          'reset_xp'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| BAN USER
|--------------------------------------------------------------------------
*/

const banUser =
async (ctx) => {

  const userId =
    Number(
      ctx.match[1]
    )

  await banUserService(
    userId
  )

  await ctx.reply(
`
🚫 Utilisateur banni.
`
  )

}

/*
|--------------------------------------------------------------------------
| UNBAN USER
|--------------------------------------------------------------------------
*/

const unbanUser =
async (ctx) => {

  const userId =
    Number(
      ctx.match[1]
    )

  await unbanUserService(
    userId
  )

  await ctx.reply(
`
✅ Utilisateur débanni.
`
  )

}

/*
|--------------------------------------------------------------------------
| RESET MONEY
|--------------------------------------------------------------------------
*/

const resetMoney =
async (ctx) => {

  await ctx.reply(
`
💰 Reset money bientôt disponible.
`
  )

}

/*
|--------------------------------------------------------------------------
| RESET XP
|--------------------------------------------------------------------------
*/

const resetXP =
async (ctx) => {

  await ctx.reply(
`
⭐ Reset XP bientôt disponible.
`
  )

}

module.exports = {

  openUsersPanel,

  openUserPanel,

  banUser,

  unbanUser,

  resetMoney,

  resetXP

}