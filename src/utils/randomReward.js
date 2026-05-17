const randomReward = (
  rewards
) => {

  return rewards[
    Math.floor(
      Math.random() *
      rewards.length
    )
  ]

}

module.exports =
  randomReward