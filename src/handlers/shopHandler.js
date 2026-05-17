const {

  getUser,

  removeMoney

} = require(
  '../services/userService'
)

const {

  addItem

} = require(
  '../services/inventoryService'
)

const {

  shopItems

} = require(
  '../config'
)

const formatMoney =
require(
  '../utils/formatMoney'
)

const {

  replyError,

  replySuccess

} = require(
  '../utils/responses'
)

/*
|--------------------------------------------------------------------------
| SHOW SHOP
|--------------------------------------------------------------------------
*/

const showShop =
async (ctx) => {

  let message =
`
🛒 SHOP

━━━━━━━━━━━━━━━━━━

`

  shopItems.forEach(
    (item, index) => {

      message +=
`
${index + 1}. ${item.name}

💰 ${formatMoney(item.price)}

📌 ${item.description}

`
    }
  )

  await ctx.reply(message)

}

/*
|--------------------------------------------------------------------------
| BUY ITEM
|--------------------------------------------------------------------------
*/

const buyItem =
async (

  ctx,

  itemIndex

) => {

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

    return replyError(
      ctx,
      'Utilisateur introuvable'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | ITEM
  |--------------------------------------------------------------------------
  */

  const item =
    shopItems[itemIndex]

  if (!item) {

    return replyError(
      ctx,
      'Objet introuvable'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  const removed =
    removeMoney(

      ctx.from.id,

      item.price

    )

  if (!removed) {

    return replyError(
      ctx,
      'Coins insuffisants'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | ADD ITEM
  |--------------------------------------------------------------------------
  */

  addItem(

    ctx.from.id,

    item.name

  )

  /*
  |--------------------------------------------------------------------------
  | SUCCESS
  |--------------------------------------------------------------------------
  */

  return replySuccess(

    ctx,

    `${item.name} acheté avec succès`

  )

}

module.exports = {

  showShop,

  buyItem

}