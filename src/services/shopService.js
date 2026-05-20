const ShopItem =
require(
  '../models/ShopItem'
)

const User =
require(
  '../models/User'
)

const Inventory =
require(
  '../models/Inventory'
)

/*
|--------------------------------------------------------------------------
| GET SHOP ITEMS
|--------------------------------------------------------------------------
*/

const getShopItems =
async () => {

  return await ShopItem.find()

}

/*
|--------------------------------------------------------------------------
| BUY ITEM
|--------------------------------------------------------------------------
*/

const buyItem =
async (

  userId,

  itemId

) => {

  const user =
    await User.findOne({

      id: userId

    })

  const item =
    await ShopItem.findById(
      itemId
    )

  if (!user || !item) {

    return {

      error:
      'Erreur item/user'

    }

  }

  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  if (
    user.money < item.price
  ) {

    return {

      error:
      'Argent insuffisant'

    }

  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE MONEY
  |--------------------------------------------------------------------------
  */

  user.money -= item.price

  await user.save()

  /*
  |--------------------------------------------------------------------------
  | INVENTORY
  |--------------------------------------------------------------------------
  */

  let inventory =
    await Inventory.findOne({

      userId

    })

  if (!inventory) {

    inventory =
      await Inventory.create({

        userId,

        items: []

      })

  }

  /*
  |--------------------------------------------------------------------------
  | EXISTS
  |--------------------------------------------------------------------------
  */

  const existing =
    inventory.items.find(

      (i) =>

        i.itemId ===
        item.id

    )

  if (existing) {

    existing.quantity += 1

  }

  else {

    inventory.items.push({

      itemId:
        item.id,

      name:
        item.name,

      emoji:
        item.emoji,

      rarity:
        item.rarity,

      quantity: 1

    })

  }

  await inventory.save()

  /*
  |--------------------------------------------------------------------------
  | SUCCESS
  |--------------------------------------------------------------------------
  */

  return {

    success: true,

    item,

    money:
      user.money

  }

}

module.exports = {

  getShopItems,

  buyItem

}