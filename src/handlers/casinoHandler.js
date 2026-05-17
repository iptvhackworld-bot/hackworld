const {

  getUser,

  addMoney,

  removeMoney

} = require(
  '../services/userService'
)

const {

  addItem

} = require(
  './inventoryHandler'
)

const rewards =
require(
  '../config/casinoRewards'
)

const economy =
require(
  '../config/economy'
)

const randomReward =
require(
  '../utils/randomReward'
)

const formatMoney =
require(
  '../utils/formatMoney'
)

/*
|--------------------------------------------------------------------------
| OPEN LOOTBOX
|--------------------------------------------------------------------------
*/

const openLootbox =
async (ctx) => {

  const user =
    getUser(
      ctx.from.id
    )

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  if (!user) {

    return ctx.reply(
      '❌ Utilisateur introuvable'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE MONEY
  |--------------------------------------------------------------------------
  */

  const removed =
    removeMoney(

      ctx.from.id,

      economy.LOOTBOX_PRICE

    )

  if (!removed) {

    return ctx.reply(
`
❌ Coins insuffisants.

💰 Prix :
${economy.LOOTBOX_PRICE} coins
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | RANDOM REWARD
  |--------------------------------------------------------------------------
  */

  const reward =
    randomReward(
      rewards
    )

  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  if (
    reward.type ===
    'money'
  ) {

    addMoney(

      ctx.from.id,

      reward.value

    )

    return ctx.reply(
`
🎁 LOOTBOX OUVERTE

━━━━━━━━━━━━━━━━━━

💰 Récompense :

+${formatMoney(
  reward.value
)} coins
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | ITEM
  |--------------------------------------------------------------------------
  */

  addItem(

    ctx.from.id,

    reward.value

  )

  return ctx.reply(
`
🎁 LOOTBOX OUVERTE

━━━━━━━━━━━━━━━━━━

💎 Objet obtenu :

${reward.value}
`
  )

}

/*
|--------------------------------------------------------------------------
| ROULETTE
|--------------------------------------------------------------------------
*/

const playRoulette =
async (ctx) => {

  const user =
    getUser(
      ctx.from.id
    )

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  if (!user) {

    return ctx.reply(
      '❌ Utilisateur introuvable'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE BET
  |--------------------------------------------------------------------------
  */

  const removed =
    removeMoney(

      ctx.from.id,

      economy.ROULETTE_BET

    )

  if (!removed) {

    return ctx.reply(
`
❌ Coins insuffisants.

🎰 Mise :
${economy.ROULETTE_BET} coins
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | WIN
  |--------------------------------------------------------------------------
  */

  const win =
    Math.random() < 0.45

  /*
  |--------------------------------------------------------------------------
  | WIN MONEY
  |--------------------------------------------------------------------------
  */

  if (win) {

    const reward =
      Math.floor(
        Math.random() *
        1500
      ) + 500

    addMoney(

      ctx.from.id,

      reward

    )

    return ctx.reply(
`
🎰 ROULETTE

━━━━━━━━━━━━━━━━━━

✅ GAGNÉ

💰 +${formatMoney(
  reward
)} coins
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | LOSE
  |--------------------------------------------------------------------------
  */

  return ctx.reply(
`
🎰 ROULETTE

━━━━━━━━━━━━━━━━━━

❌ PERDU

💸 -${economy.ROULETTE_BET} coins
`
  )

}

module.exports = {

  openLootbox,

  playRoulette

}