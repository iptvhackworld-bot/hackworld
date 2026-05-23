const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| LEADERBOARD PANEL
|--------------------------------------------------------------------------
*/

const openLeaderboardPanel =
async (ctx) => {

  await ctx.reply(

`
🏆 LEADERBOARDS

━━━━━━━━━━━━━━━━━━
`,

Markup.inlineKeyboard([

  [

    Markup.button.callback(
      '💰 Rich',
      'top_money'
    )

  ],

  [

    Markup.button.callback(
      '📈 Sellers',
      'top_sellers'
    )

  ],

  [

    Markup.button.callback(
      '⭐ XP',
      'top_xp'
    )

  ],

  [

    Markup.button.callback(
      '💳 Crypto',
      'top_crypto'
    )

  ]

])

  )

}

module.exports = {

  openLeaderboardPanel

}