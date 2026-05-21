const { Markup } =
require('telegraf')

const User =
require(
  '../models/User'
)

const {

  createLog,

  getUserLogs

} = require(
  '../services/logService'
)

/*
|--------------------------------------------------------------------------
| ADMIN SESSIONS
|--------------------------------------------------------------------------
*/

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
| REMOVE WARN PANEL
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
| USER LOGS PANEL
|--------------------------------------------------------------------------
*/

const openUserLogs =
async (ctx) => {

  global.adminSessions[
    ctx.from.id
  ] = {

    action:
    'user_logs'

  }

  await ctx.reply(
`
📜 Envoyez l'ID utilisateur.
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
| HANDLE MODERATION INPUT
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

  if (isNaN(userId)) {

    return ctx.reply(
`
❌ ID invalide.
`
    )

  }

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
  | USER LOGS
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'user_logs'

  ) {

    const logs =
      await getUserLogs(
        user.id
      )

    delete global.adminSessions[
      ctx.from.id
    ]

    if (!logs.length) {

      return ctx.reply(
`
📜 Aucun log trouvé.
`
      )

    }

    let text =
`
📜 LOGS UTILISATEUR

👤 ${user.username}

━━━━━━━━━━━━━━━━━━
`

    logs.forEach((log) => {

      text +=

`
🛡 Type :
${log.type}

👮 Admin :
@${log.adminUsername}

📝 Raison :
${log.reason}

📅 Date :
${new Date(
  log.createdAt
).toLocaleString()}

━━━━━━━━━━━━━━━━━━
`

    })

    return ctx.reply(text)

  }

  /*
  |--------------------------------------------------------------------------
  | WARN USER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'warn_user'

  ) {

    user.warns += 1

    await user.save()

    await createLog(

      'WARN',

      ctx.from,

      user,

      'Warn administrateur'

    )

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

    await createLog(

      'REMOVE_WARN',

      ctx.from,

      user,

      'Retrait warn'

    )

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
  | MUTE USER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'mute_user'

  ) {

    user.muted = true

    await user.save()

    await createLog(

      'MUTE',

      ctx.from,

      user,

      'Mute administrateur'

    )

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
  | UNMUTE USER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'unmute_user'

  ) {

    user.muted = false

    await user.save()

    await createLog(

      'UNMUTE',

      ctx.from,

      user,

      'Unmute administrateur'

    )

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
  | BLACKLIST USER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'blacklist_user'

  ) {

    user.blacklisted = true

    await user.save()

    await createLog(

      'BLACKLIST',

      ctx.from,

      user,

      'Blacklist administrateur'

    )

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
  | UNBLACKLIST USER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'unblacklist_user'

  ) {

    user.blacklisted = false

    await user.save()

    await createLog(

      'UNBLACKLIST',

      ctx.from,

      user,

      'Retrait blacklist'

    )

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

  return false

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