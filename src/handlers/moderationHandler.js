const { Markup } =
require('telegraf')

const User =
require(
  '../models/User'
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

Gestion modération utilisateurs

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
⚠️ Envoyez l'ID utilisateur à avertir.
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

  /*
  |--------------------------------------------------------------------------
  | WARN USER
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'warn_user'

  ) {

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

    user.warns += 1

    await user.save()

    delete global.adminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
⚠️ Warn ajouté.

👤 ${user.username}
📛 Total warns :
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
📛 Total warns :
${user.warns}
`
    )

  }

  return false

}

module.exports = {

  openModerationPanel,

  warnUserPanel,

  removeWarnPanel,

  handleModerationInput

}