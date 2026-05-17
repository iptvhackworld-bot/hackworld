const {

  loadContent,

  saveContent

} = require(
  '../data/contentData'
)

/*
|--------------------------------------------------------------------------
| GET CONTENT
|--------------------------------------------------------------------------
*/

const getContent = () => {

  return loadContent()

}

/*
|--------------------------------------------------------------------------
| ADD CONTENT
|--------------------------------------------------------------------------
*/

const addContent = (
  content
) => {

  const contents =
    loadContent()

  contents.unshift(content)

  saveContent(contents)

  return content

}

/*
|--------------------------------------------------------------------------
| DELETE CONTENT
|--------------------------------------------------------------------------
*/

const deleteContent = (
  index
) => {

  const contents =
    loadContent()

  if (

    index < 0 ||

    index >= contents.length

  ) {

    return false

  }

  contents.splice(
    index,
    1
  )

  saveContent(contents)

  return true

}

module.exports = {

  getContent,

  addContent,

  deleteContent

}