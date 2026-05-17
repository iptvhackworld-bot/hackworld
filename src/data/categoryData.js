const fs = require('fs')

const path = require('path')

const filePath = path.join(
  __dirname,
  'categories.json'
)

/*
|--------------------------------------------------------------------------
| CREATE FILE
|--------------------------------------------------------------------------
*/

if (!fs.existsSync(filePath)) {

  fs.writeFileSync(
    filePath,
    JSON.stringify([], null, 2)
  )

}

/*
|--------------------------------------------------------------------------
| LOAD
|--------------------------------------------------------------------------
*/

const loadCategories = () => {

  const data = fs.readFileSync(
    filePath,
    'utf8'
  )

  return JSON.parse(data)
}

/*
|--------------------------------------------------------------------------
| SAVE
|--------------------------------------------------------------------------
*/

const saveCategories = (
  categories
) => {

  fs.writeFileSync(
    filePath,
    JSON.stringify(
      categories,
      null,
      2
    )
  )
}

module.exports = {

  loadCategories,

  saveCategories

}