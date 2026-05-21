const { Markup } =
require('telegraf')

const User =
require(
  '../models/User'
)

if (!global.adminSessions) {

  global.adminSessions = {}

}

/*
|--------------------------------------------------------------------------
| MODERATION PANEL
|--------------------------------------------------------------------------
*/

const openModerationPanel =
async (ctx) => {

  await ctx.reply(

`
🛡 PANEL MODÉRATION

━━━━━━━━━━━━━━━━━━

Gestion sécurité utilisateurs

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '⚠️ Avertir',
          'warn_user'
        ),

        Markup.button.callback(
          '✅ Retirer Warn',
          'removewarn_user'
        )

      ],

      [

        Markup.button.callback(
          '🔇 Rendre Muet',
          'mute_user'
        ),

        Markup.button.callback(
          '🔊 Retirer Muet',
          'unmute_user'
        )

      ],

      [

        Markup.button.callback(
          '⛔ Liste Noire',
          'blacklist_user'
        ),

        Markup.button.callback(
          '✅ Retirer Blacklist',
          'unblacklist_user'
        )

      ],

      [

        Markup.button.callback(
          '📜 Logs Utilisateur',
          'user_logs'
        )

      ],

      [

        Markup.button.callback(
          '🛡 Anti-Spam',
          'antispam_panel'
        )

      ],

      [

        Markup.button.callback(
          '⬅️ Retour',
          'admin_panel'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| WARN PANEL
|--------------------------------------------------------------------------
*/

const warnUserPanel =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'warn_user'

  }

  await ctx.reply(
`
⚠️ Envoyez l'ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| REMOVE WARN
|--------------------------------------------------------------------------
*/

const removeWarnPanel =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'remove_warn'

  }

  await ctx.reply(
`
✅ Envoyez l'ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| MUTE PANEL
|--------------------------------------------------------------------------
*/

const muteUserPanel =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'mute_user'

  }

  await ctx.reply(
`
🔇 Envoyez l'ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| UNMUTE PANEL
|--------------------------------------------------------------------------
*/

const unmuteUserPanel =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'unmute_user'

  }

  await ctx.reply(
`
🔊 Envoyez l'ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| BLACKLIST PANEL
|--------------------------------------------------------------------------
*/

const blacklistUserPanel =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'blacklist_user'

  }

  await ctx.reply(
`
⛔ Envoyez l'ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| UNBLACKLIST PANEL
|--------------------------------------------------------------------------
*/

const unblacklistUserPanel =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'unblacklist_user'

  }

  await ctx.reply(
`
✅ Envoyez l'ID utilisateur.
`
  )

}

/*
|--------------------------------------------------------------------------
| USER LOGS
|--------------------------------------------------------------------------
*/

const openUserLogs =
async (ctx) => {

  await ctx.reply(
`
📜 Logs bientôt disponibles.
`
  )

}

/*
|--------------------------------------------------------------------------
| ANTISPAM PANEL
|--------------------------------------------------------------------------
*/

const openAntiSpamPanel =
async (ctx) => {

  await ctx.reply(
`
🛡 Anti-Spam bientôt disponible.
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE INPUT
|--------------------------------------------------------------------------
*/

const handleModerationInput =
async (ctx) => {

  const session =

    global.adminSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }

  const userId =
    Number(
      ctx.message.text
    )

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | WARN
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'warn_user'

  ) {

    user.warns += 1

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
⚠️ Warn ajouté.

👤 ${user.username}
📛 Warns :
${user.warns}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE WARN
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'remove_warn'

  ) {

    if (user.warns > 0) {

      user.warns -= 1

    }

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Warn retiré.

👤 ${user.username}
📛 Warns :
${user.warns}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | MUTE
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'mute_user'

  ) {

    user.muted = true

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
🔇 Utilisateur mute.

👤 ${user.username}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | UNMUTE
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'unmute_user'

  ) {

    user.muted = false

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
🔊 Utilisateur unmute.

👤 ${user.username}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | BLACKLIST
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'blacklist_user'

  ) {

    user.blacklisted = true

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
⛔ Utilisateur blacklist.

👤 ${user.username}
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | UNBLACKLIST
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'unblacklist_user'

  ) {

    user.blacklisted = false

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Blacklist retirée.

👤 ${user.username}
`
    )

  }

}

module.exports = {

  openModerationPanel,

  warnUserPanel,

  removeWarnPanel,

  muteUserPanel,

  unmuteUserPanel,

  blacklistUserPanel,

  unblacklistUserPanel,

  openUserLogs,

  openAntiSpamPanel,

  handleModerationInput

}