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

  'content.json'

)

/*
|--------------------------------------------------------------------------
| LOAD CONTENT
|--------------------------------------------------------------------------
*/

const loadContent = () => {

  return read(filePath)

}

/*
|--------------------------------------------------------------------------
| SAVE CONTENT
|--------------------------------------------------------------------------
*/

const saveContent = (
  content
) => {

  write(
    filePath,
    content
  )

}

module.exports = {

  loadContent,

  saveContent

}