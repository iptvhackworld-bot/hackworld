const {

  createUser,

  getUser

} = require(
  '../services/userService'
)

const {

  getUserId

} = require(
  '../utils/context'
)

const {

  replyError

} = require(
  '../utils/responses'
)

/*
|--------------------------------------------------------------------------
| REGISTER USER
|--------------------------------------------------------------------------
*/

const registerUser =
async (ctx) => {

  const userId =
    getUserId(ctx)

  /*
  |--------------------------------------------------------------------------
  | EXISTS
  |--------------------------------------------------------------------------
  */

  let user =
    getUser(userId)

  if (user) {

    return user

  }

  /*
  |--------------------------------------------------------------------------
  | CREATE
  |--------------------------------------------------------------------------
  */

  user = createUser(
    ctx.from
  )

  return user

}

/*
|--------------------------------------------------------------------------
| CHECK USER
|--------------------------------------------------------------------------
*/

const checkUser =
async (

  ctx,

  next

) => {

  const userId =
    getUserId(ctx)

  if (!userId) {

    return replyError(

      ctx,

      'Utilisateur invalide'

    )

  }

  /*
  |--------------------------------------------------------------------------
  | REGISTER
  |--------------------------------------------------------------------------
  */

  await registerUser(ctx)

  return next()

}

module.exports = {

  registerUser,

  checkUser

}