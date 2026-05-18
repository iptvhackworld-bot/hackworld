const Content =
require(
  '../models/Content'
)

/*
|--------------------------------------------------------------------------
| ADD CONTENT
|--------------------------------------------------------------------------
*/

const addContent =
async (data) => {

  return await Content.create(
    data
  )

}

/*
|--------------------------------------------------------------------------
| GET CONTENT
|--------------------------------------------------------------------------
*/

const getContent =
async () => {

  return await Content.find()
  .sort({

    createdAt: -1

  })

}

/*
|--------------------------------------------------------------------------
| DELETE CONTENT
|--------------------------------------------------------------------------
*/

const deleteContent =
async (id) => {

  return await Content.findByIdAndDelete(
    id
  )

}

module.exports = {

  addContent,

  getContent,

  deleteContent

}