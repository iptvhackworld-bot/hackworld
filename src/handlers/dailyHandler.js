const {

  addMoney

} = require(
  '../services/walletService'
)

const User =
require(
  '../models/User'
)

const {

  isPremium

} = require(
  '../services/premiumService'
)

/*
|--------------------------------------------------------------------------
| DAILY REWARD
|--------------------------------------------------------------------------
*/

const claimDaily =
async (ctx) => {

  try {

    const user =
      await User.findOne({

        id: ctx.from.id

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
    | CHECK TIME
    |--------------------------------------------------------------------------
    */

    if (user.lastDaily) {

      const diff =

        Date.now()

        -

        new Date(
          user.lastDaily
        ).getTime()

      const hours =
        diff / 1000 / 60 / 60

      if (hours < 24) {

        return ctx.reply(
`
⏳ Daily déjà récupéré.

🕒 Revenez plus tard.
`
        )

      }

    }

    /*
    |--------------------------------------------------------------------------
    | STREAK
    |--------------------------------------------------------------------------
    */

    user.dailyStreak += 1

    /*
    |--------------------------------------------------------------------------
    | BASE REWARD
    |--------------------------------------------------------------------------
    */

    let reward =

      user.dailyStreak * 100

    /*
    |--------------------------------------------------------------------------
    | PREMIUM BONUS
    |--------------------------------------------------------------------------
    */

    const premium =
      await isPremium(

        ctx.from.id

      )

    if (premium) {

      reward *= 2

    }

    /*
    |--------------------------------------------------------------------------
    | ADD MONEY
    |--------------------------------------------------------------------------
    */

    await addMoney(

      ctx.from.id,

      reward

    )

    /*
    |--------------------------------------------------------------------------
    | SAVE
    |--------------------------------------------------------------------------
    */

    user.lastDaily =
      new Date()

    await user.save()

    /*
    |--------------------------------------------------------------------------
    | MESSAGE
    |--------------------------------------------------------------------------
    */

    await ctx.reply(
`
🎁 DAILY REWARD

━━━━━━━━━━━━━━━━━━

🔥 Streak :
${user.dailyStreak}

💰 Récompense :
${reward}$

${premium
? '👑 Bonus Premium x2'
: ''}

━━━━━━━━━━━━━━━━━━

✅ Daily récupéré.
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  claimDaily

}