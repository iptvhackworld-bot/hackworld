const env = require(
  '../config/env'
)

const { Markup } =
require('telegraf')

const {

  loadUsers,

  saveUsers

} = require(
  '../data/userData'
)

/*
|--------------------------------------------------------------------------
| OPEN USERS PANEL
|--------------------------------------------------------------------------
*/

const openUsersPanel =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (

    ctx.from.id.toString() !==
    env.ownerId.toString()

  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  const users =
    loadUsers()

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
  | BUTTONS
  |--------------------------------------------------------------------------
  */

  const buttons = []

  users.slice(0, 20).forEach(

    (user) => {

      buttons.push([

        Markup.button.callback(

          `👤 @${user.username || user.id}`,

          `user_${user.id}`

        )

      ])

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
👥 GESTION UTILISATEURS

━━━━━━━━━━━━━━━━━━

📋 Liste utilisateurs
`,
    Markup.inlineKeyboard(
      buttons
    )
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
    parseInt(ctx.match[1])

  const users =
    loadUsers()

  const user =
    users.find(

      (u) =>
        u.id === userId

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
  | SESSION
  |--------------------------------------------------------------------------
  */

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.targetUser =
    user.id

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  const status =
    user.banned
      ? '🚫 BANNI'
      : '✅ ACTIF'

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
👤 USER PANEL

━━━━━━━━━━━━━━━━━━

👤 @${user.username || 'Unknown'}

🆔 ${user.id}

🏅 ${user.rank || 'MEMBER'}

⭐ XP :
${user.xp || 0}

💰 Money :
${user.money || 0}$

📌 Status :
${status}
`,
    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '🚫 Bannir',
          'ban_user'
        ),

        Markup.button.callback(
          '🔓 Débannir',
          'unban_user'
        )

      ],

      [

        Markup.button.callback(
          '💰 Reset Money',
          'reset_money'
        )

      ],

      [

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

  const users =
    loadUsers()

  const user =
    users.find(

      (u) =>

        u.id ===
        ctx.session.targetUser

    )

  if (!user) return

  user.banned = true

  saveUsers(users)

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

  const users =
    loadUsers()

  const user =
    users.find(

      (u) =>

        u.id ===
        ctx.session.targetUser

    )

  if (!user) return

  user.banned = false

  saveUsers(users)

  await ctx.reply(
`
🔓 Utilisateur débanni.
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

  const users =
    loadUsers()

  const user =
    users.find(

      (u) =>

        u.id ===
        ctx.session.targetUser

    )

  if (!user) return

  user.money = 0

  saveUsers(users)

  await ctx.reply(
`
💰 Argent réinitialisé.
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

  const users =
    loadUsers()

  const user =
    users.find(

      (u) =>

        u.id ===
        ctx.session.targetUser

    )

  if (!user) return

  user.xp = 0

  user.level = 1

  user.rank = '👤 MEMBER'

  saveUsers(users)

  await ctx.reply(
`
⭐ XP réinitialisé.
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