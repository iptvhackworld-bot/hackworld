const {

  getInventory

} = require(
  '../services/inventoryService'
)

/*
|--------------------------------------------------------------------------
| OPEN INVENTORY
|--------------------------------------------------------------------------
*/

const openInventory =
async (ctx) => {

  const userId =
    ctx.from.id

  /*
  |--------------------------------------------------------------------------
  | GET
  |--------------------------------------------------------------------------
  */

  const inventory =
    await getInventory(
      userId
    )

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    inventory.items.length === 0
  ) {

    return ctx.reply(
`
🎒 INVENTAIRE

━━━━━━━━━━━━━━━━━━

❌ Inventaire vide.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | MESSAGE
  |--------------------------------------------------------------------------
  */

  let message =
`
🎒 INVENTAIRE

━━━━━━━━━━━━━━━━━━

`

  inventory.items.forEach(

    (item) => {

      message +=
`
📦 ${item.name}

🔢 Quantité :
${item.quantity}

━━━━━━━━━━━━━━━━━━
`
    }

  )

  await ctx.reply(
    message
  )

}

module.exports = {

  openInventory

}