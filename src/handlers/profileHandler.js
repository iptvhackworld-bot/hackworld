const User =
require(
  '../models/User'
)

const { Markup } =
require(
  'telegraf'
)

const {

  logInfo,

  logError

} = require(
  '../utils/logger'
)

const {

  getTitle

} = require(
  '../utils/titleSystem'
)

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

const openProfile =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id:
        ctx.from.id

      })
	  
	  const title =

       getTitle(
         user
       )
	  
	  const users =
  await User.find()

const rank =

  users

  .sort(

    (a, b) =>

      (b.money || 0)

      -

      (a.money || 0)

  )

  .findIndex(

    u =>

      u.id ===
      ctx.from.id

  )

  + 1

    if (!user) {

      return ctx.reply(
`
❌ Utilisateur introuvable.
`
      )

    }

    await ctx.reply(

`
👤 HACKWORLD PROFILE

━━━━━━━━━━━━━━━━━━

👤 Username :

@${user.username || 'unknown'}

🆔 ID :

${user.id}

━━━━━━━━━━━━━━━━━━

💰 Argent :

${user.money || 0}$

⭐ Niveau :

${user.level || 1}

📈 XP :

${user.xp || 0}

🔥 Daily Streak :

${user.dailyStreak || 0}

🏆 Rang global :

#${rank}

💬 Messages :

${user.messages || 0}

🎰 Casino joué :

${user.casinoPlayed || 0}

🏆 Gains Casino :

${user.casinoWon || 0}$

━━━━━━━━━━━━━━━━━━

🛒 Achats :

${user.purchaseCount || 0}

⏳ Achats en attente :

${user.pendingPurchases || 0}

✅ Achats terminés :

${user.completedPurchases || 0}

━━━━━━━━━━━━━━━━━━

📦 Ventes :

${user.salesCount || 0}

⭐ Réputation :

${user.reputation || 0}

🔥 Daily Streak :

${user.dailyStreak || 0}

━━━━━━━━━━━━━━━━━━
`,

      Markup.inlineKeyboard([

        [

          Markup.button.callback(
            '📊 Stats',
            'profile_stats'
          ),

          Markup.button.callback(
            '🏆 Badges',
            'profile_badges'
          )

        ],

        [

          Markup.button.callback(
            '📜 Historique',
            'profile_history'
          ),

          Markup.button.callback(
            '🏠 Menu',
            'back_main_menu'
          )

        ]

      ])

    )

    logInfo(
      `PROFILE ${ctx.from.id}`
    )

  }

  catch (error) {

    logError(
      'PROFILE',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| STATS
|--------------------------------------------------------------------------
*/

const openProfileStats =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id:
        ctx.from.id

      })

    await ctx.reply(
`
📊 STATISTIQUES

━━━━━━━━━━━━━━━━━━

💰 Argent actuel :
${user.money || 0}$

💵 Total gagné :
${user.totalEarned || 0}$

💸 Total dépensé :
${user.totalSpent || 0}$

━━━━━━━━━━━━━━━━━━

🎰 Parties jouées :
${user.casinoPlayed || 0}

🏆 Gains casino :
${user.casinoWon || 0}$

📈 Plus gros gain :
${user.biggestWin || 0}$

📉 Plus grosse perte :
${user.biggestLoss || 0}$

━━━━━━━━━━━━━━━━━━

💬 Messages :
${user.messages || 0}

🔥 Daily streak :
${user.dailyStreak || 0}

⭐ Réputation :
${user.reputation || 0}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'PROFILE_STATS',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| BADGES
|--------------------------------------------------------------------------
*/

const openProfileBadges =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id:
        ctx.from.id

      })

    let badges = ''

    if (

      user.role === 'admin'

    ) {

      badges +=
      '👑 Administrator\n'

    }

    if (

      user.trustedSeller

    ) {

      badges +=
      '⭐ Trusted Seller\n'

    }

    if (

      user.money >= 1000000

    ) {

      badges +=
      '💎 Millionnaire\n'

    }

    if (

      user.casinoPlayed >= 100

    ) {

      badges +=
      '🎰 Gambler\n'

    }

    if (

      user.messages >= 1000

    ) {

      badges +=
      '💬 Active Member\n'

    }

    if (

      !badges

    ) {

      badges =
      'Aucun badge'
    }

    await ctx.reply(
`
🏆 BADGES

━━━━━━━━━━━━━━━━━━

${badges}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'PROFILE_BADGES',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| HISTORY
|--------------------------------------------------------------------------
*/

const openProfileHistory =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id:
        ctx.from.id

      })

    await ctx.reply(
`
📜 HISTORIQUE

━━━━━━━━━━━━━━━━━━

⚠️ Warnings :
${user.warningCount || 0}

🔇 Mutes :
${user.muteCount || 0}

🚫 Bans :
${user.banCount || 0}

━━━━━━━━━━━━━━━━━━

💵 Total gagné :
${user.totalEarned || 0}$

💸 Total dépensé :
${user.totalSpent || 0}$

━━━━━━━━━━━━━━━━━━

🛒 Achats :
${user.purchaseCount || 0}

📦 Ventes :
${user.salesCount || 0}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'PROFILE_HISTORY',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| INVENTORY
|--------------------------------------------------------------------------
*/

const openInventory =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id:
        ctx.from.id

      })

    const inventory =

      user.inventory.length

      ?

      user.inventory.join(
        '\n'
      )

      :

      'Vide'

    await ctx.reply(
`
🎁 INVENTAIRE

━━━━━━━━━━━━━━━━━━

${inventory}

━━━━━━━━━━━━━━━━━━

🎖 Badges :

${user.badges.length}

🏅 Succès :

${user.achievements.length}

💎 VIP :

${user.vip ? 'Oui' : 'Non'}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'INVENTORY',
      error
    )

  }

}

/*
|--------------------------------------------------------------------------
| ACHIEVEMENTS
|--------------------------------------------------------------------------
*/

const openAchievements =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id:
        ctx.from.id

      })

    const achievements =

      user.achievements.length

      ?

      user.achievements.join(
        '\n'
      )

      :

      'Aucun succès'

    await ctx.reply(
`
🏅 ACHIEVEMENTS

━━━━━━━━━━━━━━━━━━

${achievements}

━━━━━━━━━━━━━━━━━━

Total :

${user.achievements.length}

━━━━━━━━━━━━━━━━━━
`
    )

  }

  catch (error) {

    logError(
      'ACHIEVEMENTS',
      error
    )

  }

}



module.exports = {

  openProfile,

  openProfileStats,

  openProfileBadges,

  openProfileHistory,

  openInventory,

  openAchievements

}