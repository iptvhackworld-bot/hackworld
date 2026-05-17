const { Markup } = require('telegraf')

const {

  userService,

  userService

} = require('../data/userData')

/*
|--------------------------------------------------------------------------
| OPEN USERS PANEL
|--------------------------------------------------------------------------
*/

const openUsersPanel = async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (
    ctx.from.id.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  const users = userService()

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

  users.slice(0, 20).forEach((user) => {

    buttons.push([

      Markup.button.callback(
        `👤 @${user.username}`,
        `user_${user.id}`
      )

    ])

  })

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
    Markup.inlineKeyboard(buttons)
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

  const users = userService()

  const user = users.find(
    u => u.id === userId
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
  | SAVE TARGET
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

👤 @${user.username}

🆔 ${user.id}

🏅 ${user.rank}

⭐ XP :
${user.xp}

💰 Money :
${user.money}$

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

const banUser = async (ctx) => {

  const users = userService()

  const user = users.find(
    u =>
      u.id ===
      ctx.session.targetUser
  )

  if (!user) return

  user.banned = true

  userService(users)

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

const unbanUser = async (ctx) => {

  const users = userService()

  const user = users.find(
    u =>
      u.id ===
      ctx.session.targetUser
  )

  if (!user) return

  user.banned = false

  userService(users)

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

const resetMoney = async (ctx) => {

  const users = userService()

  const user = users.find(
    u =>
      u.id ===
      ctx.session.targetUser
  )

  if (!user) return

  user.money = 0

  userService(users)

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

const resetXP = async (ctx) => {

  const users = userService()

  const user = users.find(
    u =>
      u.id ===
      ctx.session.targetUser
  )

  if (!user) return

  user.xp = 0

  user.level = 1

  user.rank = '👤 MEMBER'

  userService(users)

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