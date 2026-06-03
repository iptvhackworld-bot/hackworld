const Settings =
require(
  '../models/Settings'
)

const { Markup } =
require('telegraf')

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const openSettings =
async (ctx) => {

  try {

    let settings =
      await Settings.findOne()

    if (!settings) {

      settings =
        await Settings.create({})
    }

    logInfo(
      `ADMIN_SETTINGS ${ctx.from.id}`
    )

    await ctx.reply(

`
⚙️ SETTINGS

━━━━━━━━━━━━━━━━━━

🛒 Marketplace :
${settings.marketplace ? '🟢 ON' : '🔴 OFF'}

🎰 Casino :
${settings.casino ? '🟢 ON' : '🔴 OFF'}

🎫 Support :
${settings.support ? '🟢 ON' : '🔴 OFF'}

🎁 Daily :
${settings.daily ? '🟢 ON' : '🔴 OFF'}

🔔 Notifications :
${settings.notifications ? '🟢 ON' : '🔴 OFF'}

🚧 Maintenance :
${settings.maintenance ? '🟢 ON' : '🔴 OFF'}

━━━━━━━━━━━━━━━━━━
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '🛒 Marketplace',
            'toggle_marketplace'
          )

        ],

        [

          Markup.button.callback(
            '🎰 Casino',
            'toggle_casino'
          )

        ],

        [

          Markup.button.callback(
            '🎫 Support',
            'toggle_support'
          )

        ],

        [

          Markup.button.callback(
            '🚧 Maintenance',
            'toggle_maintenance'
          )

        ],

        [

          Markup.button.callback(
            '⬅️ Admin',
            'admin_panel'
          ),

          Markup.button.callback(
            '🏠 Menu',
            'back_main_menu'
          )

        ]

      ])

    )

  }

  catch (error) {

    logError(
      'ADMIN_SETTINGS',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| TOGGLE SETTING
|--------------------------------------------------------------------------
*/

const toggleSetting =
async (

  ctx,

  field

) => {

  try {

    let settings =
      await Settings.findOne()

    if (!settings) {

      settings =
        await Settings.create({})
    }

    settings[field] =
      !settings[field]

    await settings.save()

    logInfo(
      `SETTING_${field.toUpperCase()} ${ctx.from.id}`
    )

    await openSettings(ctx)

  }

  catch (error) {

    logError(
      'TOGGLE_SETTING',
      error
    )

  }

}


module.exports = {

  openSettings,

  toggleSetting

}