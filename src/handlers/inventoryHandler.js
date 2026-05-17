const {

  getInventory,

  addItem

} = require(
  '../services/inventoryService'
)

const ui =
require(
  '../messages/ui'
)

/*
|--------------------------------------------------------------------------
| SHOW INVENTORY
|--------------------------------------------------------------------------
*/

const showInventory =
async (ctx) => {

  const user =
    getInventory(
      ctx.from.id
    )

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (
    user.items.length === 0
  ) {

    return ctx.reply(
`
🎒 INVENTAIRE VIDE
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT
  |--------------------------------------------------------------------------
  */

  let items = ''

  user.items.forEach((item) => {

    items += `• ${item}\n`

  })

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
${ui.inventoryTitle}

${items}
`
  )

}

module.exports = {

  addItem,

  showInventory

}