const fs =
require('fs')

const path =
require('path')

const filePath =
path.join(

  __dirname,

  'inventory.json'

)

/*
|--------------------------------------------------------------------------
| CREATE FILE
|--------------------------------------------------------------------------
*/

if (

  !fs.existsSync(filePath)

) {

  fs.writeFileSync(

    filePath,

    JSON.stringify([], null, 2)

  )

}

/*
|--------------------------------------------------------------------------
| LOAD INVENTORY
|--------------------------------------------------------------------------
*/

const loadInventory =
() => {

  const data =
    fs.readFileSync(

      filePath,

      'utf8'

    )

  return JSON.parse(data)

}

/*
|--------------------------------------------------------------------------
| SAVE INVENTORY
|--------------------------------------------------------------------------
*/

const saveInventory =
(inventory) => {

  fs.writeFileSync(

    filePath,

    JSON.stringify(

      inventory,

      null,

      2

    )

  )

}

module.exports = {

  loadInventory,

  saveInventory

}