const spamMap = new Map()

const antiSpam = async (
  ctx,
  next
) => {

  if (!ctx.from) {

    return next()

  }

  const userId =
    ctx.from.id

  const now =
    Date.now()

  const lastMessage =
    spamMap.get(userId) || 0

  if (
    now - lastMessage < 800
  ) {

    return

  }

  spamMap.set(
    userId,
    now
  )

  return next()
}

module.exports = antiSpam