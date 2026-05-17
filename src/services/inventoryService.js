const path = require('path')

const {

  read,

  write

} = require(
  '../database/jsonDatabase'
)

/*
|--------------------------------------------------------------------------
| FILE PATH
|--------------------------------------------------------------------------
*/

const filePath = path.join(

  __dirname,

  '../data/inventory.json'

)

/*
|--------------------------------------------------------------------------
| LOAD INVENTORY
|--------------------------------------------------------------------------
*/

const loadInventory = () => {

  return read(filePath)

}

/*
|--------------------------------------------------------------------------
| SAVE INVENTORY
|--------------------------------------------------------------------------
*/

const saveInventory = (
  inventory
) => {

  write(
    filePath,
    inventory
  )

}

/*
|--------------------------------------------------------------------------
| GET INVENTORY
|--------------------------------------------------------------------------
*/

const getInventory = (
  userId
) => {

  const inventory =
    loadInventory()

  let user =
    inventory.find(
      u => u.id === userId
    )

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  if (!user) {

    user = {

      id: userId,

      items: []

    }

    inventory.push(user)

    saveInventory(inventory)

  }

  return user

}

/*
|--------------------------------------------------------------------------
| ADD ITEM
|--------------------------------------------------------------------------
*/

const addItem = (
  userId,
  item
) => {

  const inventory =
    loadInventory()

  let user =
    inventory.find(
      u => u.id === userId
    )

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  if (!user) {

    user = {

      id: userId,

      items: []

    }

    inventory.push(user)

  }

  /*
  |--------------------------------------------------------------------------
  | ADD
  |--------------------------------------------------------------------------
  */

  user.items.push(item)

  saveInventory(inventory)

  return user

}

module.exports = {

  getInventory,

  addItem

}