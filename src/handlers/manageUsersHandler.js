const {

  getUsers,

  getUser,

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

  if (
    users.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun utilisateur.
`
    )

  }

  const buttons =

    users

    .slice(0, 20)

    .map((user) => {

      return [

        Markup.button.callback(

          `👤 @${user.username || 'Unknown'} | ${user.id}`,

          `user_${user.id}`

        )

      ]

    })

  buttons.push([

    Markup.button.callback(

      '🔍 Rechercher',

      'search_user'

    )

  ])

  await ctx.reply(

`
👥 USERS PANEL

━━━━━━━━━━━━━━━━━━

📋 Liste utilisateurs

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard(
      buttons
    )

  )

}

/*
|--------------------------------------------------------------------------
| USER PROFILE
|--------------------------------------------------------------------------
*/

const openUserProfile =
async (ctx) => {

  const userId =
    Number(
      ctx.match[1]
    )

  const user =
    await getUser(userId)

  if (!user) {

    return ctx.reply(
`
❌ Utilisateur introuvable.
`
    )

  }

  const inventory =
    await Inventory.findOne({

      userId

    })

  const inventoryCount =

    inventory

    ?

    inventory.items.length

    :

    0

  await ctx.reply(

`
👤 USER PROFILE

━━━━━━━━━━━━━━━━━━

👤 Username :
@${user.username}

🆔 ID :
${user.id}

💰 Argent :
${user.money || 0}

⭐ XP :
${user.xp || 0}

🎒 Inventory :
${inventoryCount} items

📅 Arrivé le :
${new Date(user.createdAt).toLocaleDateString()}

📨 Utilisations :
${user.messages || 0}

⚠️ Warns :
${user.warns || 0}

🚫 Status :
${user.banned ? 'Banni' : 'Actif'}

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

      ],

      [

        Markup.button.callback(
          '⬅️ Retour',
          'admin_users'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| SEARCH PANEL
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

Envoyez :

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

    !ctx.session

    ||

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
    await searchUser(query)

  if (
    users.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun utilisateur trouvé.
`
    )

  }

  const user =
    users[0]

  ctx.match = [

    null,

    user.id

  ]

  await openUserProfile(ctx)

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

  openUserProfile,

  openSearchUser,

  handleSearchUser,

  resetInventory

}