const User =
require(
  '../models/User'
)

const {

  addMoney

} = require(
  './walletService'
)

const {

  unlockAchievement

} = require(
  './achievementService'
)



/*
|--------------------------------------------------------------------------
| REQUIRED XP
|--------------------------------------------------------------------------
*/

const requiredXp =
(level) => {

  return level * 100

}

/*
|--------------------------------------------------------------------------
| TITLE SYSTEM
|--------------------------------------------------------------------------
*/

const getTitle =
(user) => {

  if (

    user.role ===
    'admin'

  ) {

    return '👑 Administrator'

  }

  if (

    user.vip

  ) {

    return '💎 VIP'

  }

  if (

    user.trustedSeller

  ) {

    return '⭐ Trusted Seller'

  }

  if (

    user.money >=
    1000000

  ) {

    return '💰 Millionaire'

  }

  if (

    user.level >=
    100

  ) {

    return '👑 Legend'

  }

  if (

    user.level >=
    50

  ) {

    return '🏆 Champion'

  }

  if (

    user.level >=
    20

  ) {

    return '🔥 Veteran'

  }

  return '⭐ Member'

}

/*
|--------------------------------------------------------------------------
| ADD XP
|--------------------------------------------------------------------------
*/

const addXp =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id:
      userId

    })

  if (

    !user

  ) {

    return null

  }

  user.xp +=
    amount

  /*
  |--------------------------------------------------------------------------
  | LEVEL UP
  |--------------------------------------------------------------------------
  */

while (

  user.xp >=

  requiredXp(
    user.level
  )

) {

  user.xp -=

    requiredXp(
      user.level
    )

  user.level +=
    1

  /*
  |--------------------------------------------------------------------------
  | LEVEL REWARD
  |--------------------------------------------------------------------------
  */

  const reward =

    user.level * 500

  await addMoney(

    user.id,

    reward,

    'Level reward'

  )

  /*
  |--------------------------------------------------------------------------
  | SPECIAL BADGES
  |--------------------------------------------------------------------------
  */

  if (

    user.level >= 20 &&

    !user.badges.includes(
      '🔥 Veteran'
    )

  ) {

    user.badges.push(
      '🔥 Veteran'
    )

  }

  if (

    user.level >= 50 &&

    !user.badges.includes(
      '🏆 Champion'
    )

  ) {

    user.badges.push(
      '🏆 Champion'
    )

  }

  if (

    user.level >= 100 &&

    !user.badges.includes(
      '👑 Legend'
    )

  ) {

    user.badges.push(
      '👑 Legend'
    )

  }

  if (

    user.level >= 200 &&

    !user.badges.includes(
      '💎 Master'
    )

  ) {

    user.badges.push(
      '💎 Master'
    )

  }

}

/*
|--------------------------------------------------------------------------
| UPDATE TITLE
|--------------------------------------------------------------------------
*/

user.title =

  getTitle(
    user
  )

/*
|--------------------------------------------------------------------------
| MILLIONAIRE BADGE
|--------------------------------------------------------------------------
*/

if (

  user.money >= 1000000 &&

  !user.badges.includes(
    '💰 Millionaire'
  )

) {

  user.badges.push(
    '💰 Millionaire'
  )

}


/*
|--------------------------------------------------------------------------
| ACHIEVEMENTS
|--------------------------------------------------------------------------
*/

if (

  user.messages >= 100

) {

  unlockAchievement(

    user,

    '💬 Beginner'

  )

}

if (

  user.messages >= 1000

) {

  unlockAchievement(

    user,

    '💬 Active Member'

  )

}

if (

  user.casinoPlayed >= 50

) {

  unlockAchievement(

    user,

    '🎰 Gambler'

  )

}

if (

  user.casinoPlayed >= 500

) {

  unlockAchievement(

    user,

    '🎰 High Roller'

  )

}

if (

  user.purchaseCount >= 1

) {

  unlockAchievement(

    user,

    '🛒 First Buyer'

  )

}

if (

  user.purchaseCount >= 100

) {

  unlockAchievement(

    user,

    '🛒 Big Buyer'

  )

}

if (

  user.salesCount >= 10

) {

  unlockAchievement(

    user,

    '📦 Seller'

  )

}

if (

  user.salesCount >= 100

) {

  unlockAchievement(

    user,

    '📦 Top Seller'

  )

}

if (

  user.money >= 1000000

) {

  unlockAchievement(

    user,

    '💰 Millionaire'

  )

}

if (

  user.level >= 50

) {

  unlockAchievement(

    user,

    '⭐ Level 50'

  )

}

if (

  user.level >= 100

) {

  unlockAchievement(

    user,

    '👑 Legend'

  )

}

if (

  user.vip

) {

  unlockAchievement(

    user,

    '💎 VIP'

  )

}


/*
|--------------------------------------------------------------------------
| SAVE
|--------------------------------------------------------------------------
*/

await user.save()

return user

}

module.exports = {

  addXp,

  requiredXp,

  getTitle

}
