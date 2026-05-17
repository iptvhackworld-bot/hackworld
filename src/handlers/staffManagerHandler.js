const { Markup } = require('telegraf')

const {

  loadStaff

} = require('../data/staffData')

const {

  isOwner,

  addAdmin,

  removeAdmin,

  addMod,

  removeMod

} = require('./permissionHandler')

/*
|--------------------------------------------------------------------------
| OPEN STAFF PANEL
|--------------------------------------------------------------------------
*/

const openStaffManager =
async (ctx) => {

  /*
  |--------------------------------------------------------------------------
  | OWNER ONLY
  |--------------------------------------------------------------------------
  */

  if (
    !isOwner(ctx.from.id)
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  const staff = loadStaff()

  /*
  |--------------------------------------------------------------------------
  | FORMAT
  |--------------------------------------------------------------------------
  */

  let admins =
    staff.admins.length
      ? staff.admins.join('\n')
      : 'Aucun'

  let mods =
    staff.mods.length
      ? staff.mods.join('\n')
      : 'Aucun'

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
👑 STAFF MANAGER

━━━━━━━━━━━━━━━━━━

🛡 ADMINS :

${admins}

━━━━━━━━━━━━━━━━━━

⚔️ MODS :

${mods}
`,
    Markup.inlineKeyboard([

      [
        Markup.button.callback(
          '➕ Ajouter Admin',
          'add_admin'
        )
      ],

      [
        Markup.button.callback(
          '➖ Retirer Admin',
          'remove_admin'
        )
      ],

      [
        Markup.button.callback(
          '➕ Ajouter Mod',
          'add_mod'
        )
      ],

      [
        Markup.button.callback(
          '➖ Retirer Mod',
          'remove_mod'
        )
      ]

    ])
  )
}

/*
|--------------------------------------------------------------------------
| ASK ADMIN ID
|--------------------------------------------------------------------------
*/

const askAddAdmin =
async (ctx) => {

  ctx.session.step =
    'add_admin'

  await ctx.reply(
`
➕ ENVOYEZ L'ID
DU NOUVEL ADMIN
`
  )
}

const handleAddAdmin =
async (ctx) => {

  if (
    ctx.session.step !==
    'add_admin'
  ) return

  const userId =
    parseInt(ctx.message.text)

  addAdmin(userId)

  ctx.session.step = null

  await ctx.reply(
`
✅ Admin ajouté :

🆔 ${userId}
`
  )
}

/*
|--------------------------------------------------------------------------
| REMOVE ADMIN
|--------------------------------------------------------------------------
*/

const askRemoveAdmin =
async (ctx) => {

  ctx.session.step =
    'remove_admin'

  await ctx.reply(
`
➖ ENVOYEZ L'ID
DE L'ADMIN
`
  )
}

const handleRemoveAdmin =
async (ctx) => {

  if (
    ctx.session.step !==
    'remove_admin'
  ) return

  const userId =
    parseInt(ctx.message.text)

  removeAdmin(userId)

  ctx.session.step = null

  await ctx.reply(
`
✅ Admin supprimé :

🆔 ${userId}
`
  )
}

/*
|--------------------------------------------------------------------------
| ADD MOD
|--------------------------------------------------------------------------
*/

const askAddMod =
async (ctx) => {

  ctx.session.step =
    'add_mod'

  await ctx.reply(
`
➕ ENVOYEZ L'ID
DU MODÉRATEUR
`
  )
}

const handleAddMod =
async (ctx) => {

  if (
    ctx.session.step !==
    'add_mod'
  ) return

  const userId =
    parseInt(ctx.message.text)

  addMod(userId)

  ctx.session.step = null

  await ctx.reply(
`
✅ Modérateur ajouté :

🆔 ${userId}
`
  )
}

/*
|--------------------------------------------------------------------------
| REMOVE MOD
|--------------------------------------------------------------------------
*/

const askRemoveMod =
async (ctx) => {

  ctx.session.step =
    'remove_mod'

  await ctx.reply(
`
➖ ENVOYEZ L'ID
DU MODÉRATEUR
`
  )
}

const handleRemoveMod =
async (ctx) => {

  if (
    ctx.session.step !==
    'remove_mod'
  ) return

  const userId =
    parseInt(ctx.message.text)

  removeMod(userId)

  ctx.session.step = null

  await ctx.reply(
`
✅ Modérateur supprimé :

🆔 ${userId}
`
  )
}

module.exports = {

  openStaffManager,

  askAddAdmin,

  handleAddAdmin,

  askRemoveAdmin,

  handleRemoveAdmin,

  askAddMod,

  handleAddMod,

  askRemoveMod,

  handleRemoveMod

}