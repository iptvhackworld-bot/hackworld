const unlockAchievement =
(

  user,

  achievement

) => {

  if (

    !user.achievements.includes(

      achievement

    )

  ) {

    user.achievements.push(

      achievement

    )

  }

}

module.exports = {

  unlockAchievement

}