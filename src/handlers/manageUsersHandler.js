const {

  getUsers,

  getUser,

  banUser,

  unbanUser,

  resetMoney,

  resetXP,

  searchUser

} = require(
  '../services/userService'
)

const Inventory =
require(
  '../models/Inventory'
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
👥 USERS PANEL

━━━━━━━━━━━━━━━━━━

`

  users.slice(0, 20)
  .forEach(

    (user) => {

      message +=
`
👤 ${user.username}

🆔 ${user.id}

💰 ${user.money}

⭐ ${user.xp}

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
  | BUTTONS
  |--------------------------------------------------------------------------
  */

  await ctx.reply(

    message,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '🔍 Rechercher',
          'search_user'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| SEARCH USER PANEL
|--------------------------------------------------------------------------
*/

const openSearchUser =
async (ctx) => {

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.step =
    'search_user'

  await ctx.reply(
`
🔍 RECHERCHE USER

━━━━━━━━━━━━━━━━━━

📝 Envoyez :

• ID
• Username
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE SEARCH
|--------------------------------------------------------------------------
*/

const handleSearchUser =
async (ctx) => {

  if (

    ctx.session.step
    !==
    'search_user'

  ) {

    return

  }

  ctx.session.step =
    null

  const query =
    ctx.message.text

  const users =
    await searchUser(
      query
    )

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
❌ Aucun utilisateur trouvé.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  const user =
    users[0]

  /*
  |--------------------------------------------------------------------------
  | PANEL
  |--------------------------------------------------------------------------
  */

  await ctx.reply(

`
👤 USER PROFILE

━━━━━━━━━━━━━━━━━━

👤 Username :
${user.username}

🆔 ID :
${user.id}

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
          `ban_${user.id}`
        ),

        Markup.button.callback(
          '✅ Unban',
          `unban_${user.id}`
        )

      ],

      [

        Markup.button.callback(
          '💰 Reset Money',
          `resetmoney_${user.id}`
        )

      ],

      [

        Markup.button.callback(
          '⭐ Reset XP',
          `resetxp_${user.id}`
        )

      ],

      [

        Markup.button.callback(
          '🎒 Reset Inventory',
          `resetinv_${user.id}`
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| RESET INVENTORY
|--------------------------------------------------------------------------
*/

const resetInventory =
async (

  ctx,

  userId

) => {

  await Inventory.findOneAndUpdate(

    {

      userId

    },

    {

      items: []

    }

  )

  await ctx.reply(
`
🎒 Inventaire reset.
`
  )

}

module.exports = {

  openUsersPanel,

  openSearchUser,

  handleSearchUser,

  banUser,

  unbanUser,

  resetMoney,

  resetXP,

  resetInventory

}