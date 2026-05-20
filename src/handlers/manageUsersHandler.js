const User =
require(
  '../models/User'
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
    await User.find()

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

  await ctx.reply(

`
👥 USERS PANEL

━━━━━━━━━━━━━━━━━━

Gestion utilisateurs

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      ...buttons,

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
${user.money}

⭐ XP :
${user.xp}

🎒 Inventory :
${inventoryCount} items

🛡 Role :
${user.role || 'user'}

🚫 Banni :
${user.banned ? 'Oui' : 'Non'}

📅 Arrivé :
${new Date(user.createdAt).toLocaleDateString()}

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '💰 Give Money',
          `givemoney_${user.id}`
        ),

        Markup.button.callback(
          '⭐ Give XP',
          `givexp_${user.id}`
        )

      ],

      [

        Markup.button.callback(
          '🎁 Give Item',
          `giveitem_${user.id}`
        )

      ],

      [

        Markup.button.callback(
          '👑 Set Admin',
          `setadmin_${user.id}`
        ),

        Markup.button.callback(
          '🛡 Set Mod',
          `setmod_${user.id}`
        )

      ],

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
          '🎒 Reset Inventory',
          `resetinv_${user.id}`
        )

      ],

      [

        Markup.button.callback(
          '💀 Reset User',
          `resetuser_${user.id}`
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
| SEARCH USER
|--------------------------------------------------------------------------
*/

const openSearchUser =
async (ctx) => {

  ctx.session.adminAction =
    'search_user'

  await ctx.reply(

`
🔍 Envoyez :

• ID
• Username
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE ADMIN INPUT
|--------------------------------------------------------------------------
*/

const handleAdminInput =
async (ctx) => {

  if (
    !ctx.session.adminAction
  ) {

    return

  }

  /*
  |--------------------------------------------------------------------------
  | SEARCH USER
  |--------------------------------------------------------------------------
  */

  if (

    ctx.session.adminAction ===
    'search_user'

  ) {

    const query =
      ctx.message.text

    const user =
      await User.findOne({

        $or: [

          {

            username: query

          },

          {

            id: Number(query)

          }

        ]

      })

    if (!user) {

      return ctx.reply(
`
❌ Introuvable.
`
      )

    }

    ctx.match = [

      null,

      user.id

    ]

    ctx.session.adminAction =
      null

    return openUserProfile(ctx)

  }

  /*
  |--------------------------------------------------------------------------
  | GIVE MONEY
  |--------------------------------------------------------------------------
  */

  if (

    ctx.session.adminAction ===
    'give_money'

  ) {

    const amount =
      Number(
        ctx.message.text
      )

    const user =
      await User.findOne({

        id:
        ctx.session.targetUser

      })

    user.money += amount

    await user.save()

    ctx.session.adminAction =
      null

    return ctx.reply(
`
💰 ${amount}$ ajouté.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | GIVE XP
  |--------------------------------------------------------------------------
  */

  if (

    ctx.session.adminAction ===
    'give_xp'

  ) {

    const amount =
      Number(
        ctx.message.text
      )

    const user =
      await User.findOne({

        id:
        ctx.session.targetUser

      })

    user.xp += amount

    await user.save()

    ctx.session.adminAction =
      null

    return ctx.reply(
`
⭐ ${amount} XP ajouté.
`
    )

  }

}

/*
|--------------------------------------------------------------------------
| GIVE MONEY PANEL
|--------------------------------------------------------------------------
*/

const giveMoneyPanel =
async (ctx) => {

  ctx.session.adminAction =
    'give_money'

  ctx.session.targetUser =
    Number(
      ctx.match[1]
    )

  await ctx.reply(

`
💰 Envoyez le montant à ajouter.
`
  )

}

/*
|--------------------------------------------------------------------------
| GIVE XP PANEL
|--------------------------------------------------------------------------
*/

const giveXPPanel =
async (ctx) => {

  ctx.session.adminAction =
    'give_xp'

  ctx.session.targetUser =
    Number(
      ctx.match[1]
    )

  await ctx.reply(

`
⭐ Envoyez le XP à ajouter.
`
  )

}

/*
|--------------------------------------------------------------------------
| SET ADMIN
|--------------------------------------------------------------------------
*/

const setAdmin =
async (

  ctx,

  userId

) => {

  await User.updateOne(

    {

      id: userId

    },

    {

      role: 'admin'

    }

  )

  await ctx.reply(
`
👑 Admin ajouté.
`
  )

}

/*
|--------------------------------------------------------------------------
| SET MOD
|--------------------------------------------------------------------------
*/

const setMod =
async (

  ctx,

  userId

) => {

  await User.updateOne(

    {

      id: userId

    },

    {

      role: 'mod'

    }

  )

  await ctx.reply(
`
🛡 Modérateur ajouté.
`
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

/*
|--------------------------------------------------------------------------
| RESET USER
|--------------------------------------------------------------------------
*/

const resetUser =
async (

  ctx,

  userId

) => {

  await User.updateOne(

    {

      id: userId

    },

    {

      money: 0,

      xp: 0,

      warns: 0,

      banned: false

    }

  )

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
💀 Utilisateur reset.
`
  )

}

module.exports = {

  openUsersPanel,

  openUserProfile,

  openSearchUser,

  handleAdminInput,

  giveMoneyPanel,

  giveXPPanel,

  setAdmin,

  setMod,

  resetInventory,

  resetUser

}