const Pet =
require(
  '../models/Pet'
)

/*
|--------------------------------------------------------------------------
| CREATE PET
|--------------------------------------------------------------------------
*/

const createPet =
async (data) => {

  return await Pet.create(data)

}

/*
|--------------------------------------------------------------------------
| GET USER PETS
|--------------------------------------------------------------------------
*/

const getUserPets =
async (userId) => {

  return await Pet.find({

    userId

  })

}

/*
|--------------------------------------------------------------------------
| GET ACTIVE PET
|--------------------------------------------------------------------------
*/

const getActivePet =
async (userId) => {

  return await Pet.findOne({

    userId,

    active: true

  })

}

/*
|--------------------------------------------------------------------------
| ACTIVATE PET
|--------------------------------------------------------------------------
*/

const activatePet =
async (

  userId,

  petId

) => {

  await Pet.updateMany(

    {

      userId

    },

    {

      active: false

    }

  )

  return await Pet.findByIdAndUpdate(

    petId,

    {

      active: true

    }

  )

}

module.exports = {

  createPet,

  getUserPets,

  getActivePet,

  activatePet

}