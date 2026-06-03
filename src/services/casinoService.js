const User =
require(
  '../models/User'
)

const CasinoHistory =
require(
  '../models/CasinoHistory'
)

/*
|--------------------------------------------------------------------------
| PLAY ROULETTE
|--------------------------------------------------------------------------
*/

const playRoulette =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  /*
  |--------------------------------------------------------------------------
  | USER
  |--------------------------------------------------------------------------
  */

  if (!user) {

    return {

      error:
      'Utilisateur introuvable'

    }

  }

  /*
  |--------------------------------------------------------------------------
  | ADMIN
  |--------------------------------------------------------------------------
  */

  const isAdmin =

    user.role === 'admin'

  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  if (

    !isAdmin

    &&

    user.money < amount

  ) {

    return {

      error:
      'Argent insuffisant'

    }

  }

  /*
  |--------------------------------------------------------------------------
  | GAME
  |--------------------------------------------------------------------------
  */

  const win =
    Math.random() < 0.5

  let profit = 0

  if (win) {

    profit = amount

    if (!isAdmin) {

      user.money += amount

      user.casinoWon += amount

    }

  }

  else {

    profit = -amount

    if (!isAdmin) {

      user.money -= amount

    }

  }

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  user.casinoPlayed += 1

  /*
  |--------------------------------------------------------------------------
  | SAVE USER
  |--------------------------------------------------------------------------
  */

  await user.save()

  /*
  |--------------------------------------------------------------------------
  | HISTORY
  |--------------------------------------------------------------------------
  */

  await CasinoHistory.create({

    userId,

    game: 'roulette',

    amount,

    result:
      win
      ?
      'win'
      :
      'lose',

    profit

  })

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {

    win,

    profit,

    money:
      user.money

  }

}

/*
  |--------------------------------------------------------------------------
  | PLAY SLOTS
  |--------------------------------------------------------------------------
  */


const playSlots =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return {

      error:
      'Utilisateur introuvable'

    }

  }

  const isAdmin =

    user.role === 'admin'

  if (

    !isAdmin

    &&

    user.money < amount

  ) {

    return {

      error:
      'Argent insuffisant'

    }

  }

  const win =
    Math.random() < 0.25

  let profit = 0

  if (win) {

    profit =
      amount * 5

    if (!isAdmin) {

      user.money += profit

      user.casinoWon += profit

    }

  }

  else {

    profit = -amount

    if (!isAdmin) {

      user.money -= amount

    }

  }

  user.casinoPlayed += 1

  await user.save()

  await CasinoHistory.create({

    userId,

    game: 'slots',

    amount,

    result:
      win
      ?
      'win'
      :
      'lose',

    profit

  })

  return {

    win,

    profit,

    money:
      user.money

  }

}

/*
  |--------------------------------------------------------------------------
  | PLAY BLACKJACK
  |--------------------------------------------------------------------------
  */
  
  const playBlackjack =
async (

  userId,

  amount

) => {

  const user =
    await User.findOne({

      id: userId

    })

  if (!user) {

    return {

      error:
      'Utilisateur introuvable'

    }

  }

  const isAdmin =

    user.role === 'admin'

  if (

    !isAdmin

    &&

    user.money < amount

  ) {

    return {

      error:
      'Argent insuffisant'

    }

  }

  const player =

    Math.floor(
      Math.random() * 11
    ) + 11

  const dealer =

    Math.floor(
      Math.random() * 11
    ) + 11

  const win =
    player > dealer

  let profit = 0

  if (win) {

    profit =
      amount * 2

    if (!isAdmin) {

      user.money += profit

      user.casinoWon += profit

    }

  }

  else {

    profit = -amount

    if (!isAdmin) {

      user.money -= amount

    }

  }

  user.casinoPlayed += 1

  await user.save()

  await CasinoHistory.create({

    userId,

    game: 'blackjack',

    amount,

    result:
      win
      ?
      'win'
      :
      'lose',

    profit

  })

  return {

    win,

    profit,

    money:
      user.money,

    player,

    dealer

  }

}


module.exports = {

  playRoulette,

  playSlots,

  playBlackjack

}