const fs =
require('fs')

const { Markup } =
require('telegraf')

const User =
require(
  '../models/User'
)

const Ticket =
require(
  '../models/Ticket'
)

const MarketListing =
require(
  '../models/MarketListing'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

/*
|--------------------------------------------------------------------------
| START
|--------------------------------------------------------------------------
*/

const startRestore =
async (ctx) => {

  try {

    await ctx.reply(

`
⚠️ ATTENTION

La restauration supprimera :

👥 Users
🎫 Tickets
📦 Listings

Confirmer ?
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '✅ Oui',
            'restore_confirm'
          )

        ],

        [

          Markup.button.callback(
            '❌ Annuler',
            'restore_cancel'
          )

        ]

      ])

    )

  }

  catch (error) {

    logError(
      'START_RESTORE',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| CONFIRM
|--------------------------------------------------------------------------
*/

const confirmRestore =
async (ctx) => {

  global.restoreMode =
    true

  global.restoreAdmin =
    ctx.from.id

  logInfo(
    `RESTORE_CONFIRM ${ctx.from.id}`
  )

  await ctx.reply(
`
📥 MODE RESTORE

Envoie maintenant le fichier backup .json
`
  )

}

/*
|--------------------------------------------------------------------------
| CANCEL
|--------------------------------------------------------------------------
*/

const cancelRestore =
async (ctx) => {

  global.restoreMode =
    false

  global.restoreAdmin =
    null

  logInfo(
    `RESTORE_CANCEL ${ctx.from.id}`
  )

  await ctx.reply(
`
❌ Restauration annulée.
`
  )

}

/*
|--------------------------------------------------------------------------
| RESTORE BACKUP
|--------------------------------------------------------------------------
*/

const restoreBackup =
async (

  ctx,

  filePath

) => {

  try {

    const backup =
      JSON.parse(

        fs.readFileSync(

          filePath,

          'utf8'

        )

      )

    await User.deleteMany()

    await Ticket.deleteMany()

    await MarketListing.deleteMany()

    if (

      backup.users?.length

    ) {

      await User.insertMany(
        backup.users
      )

    }

    if (

      backup.tickets?.length

    ) {

      await Ticket.insertMany(
        backup.tickets
      )

    }

    if (

      backup.listings?.length

    ) {

      await MarketListing.insertMany(
        backup.listings
      )

    }

    logInfo(
      'RESTORE_SUCCESS'
    )

    await ctx.reply(
`
✅ Backup restauré

👥 Users :
${backup.users?.length || 0}

🎫 Tickets :
${backup.tickets?.length || 0}

📦 Listings :
${backup.listings?.length || 0}
`
    )

  }

  catch (error) {

    logError(
      'RESTORE_BACKUP',
      error
    )

  }

}

module.exports = {

  startRestore,

  confirmRestore,

  cancelRestore,

  restoreBackup

}