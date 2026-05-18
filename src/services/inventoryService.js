const Inventory =
require(
  '../models/Inventory'
)

/*
|--------------------------------------------------------------------------
| GET INVENTORY
|--------------------------------------------------------------------------
*/

const getInventory =
async (userId) => {

  let inventory =

    await Inventory.findOne({

      userId

    })

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  if (!inventory) {

    inventory =
      await Inventory.create({

        userId,

        items: []

      })

  }

  return inventory

}

/*
|--------------------------------------------------------------------------
| ADD ITEM
|--------------------------------------------------------------------------
*/

const addItem =
async (

  userId,

  itemName,

  quantity = 1

) => {

  const inventory =
    await getInventory(
      userId
    )

  const existing =
    inventory.items.find(

      item =>
      item.name === itemName

    )

  /*
  |--------------------------------------------------------------------------
  | EXISTS
  |--------------------------------------------------------------------------
  */

  if (existing) {

    existing.quantity +=
      quantity

  }

  /*
  |--------------------------------------------------------------------------
  | NEW
  |--------------------------------------------------------------------------
  */

  else {

    inventory.items.push({

      name: itemName,

      quantity

    })

  }

  await inventory.save()

  return inventory

}

module.exports = {

  getInventory,

  addItem

}