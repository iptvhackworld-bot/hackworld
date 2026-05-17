const sendContent = require('../utils/sendContent')

const {
  contentService
} = require('../data/contentData')

const categoryHandler = async (ctx) => {

  const category = ctx.match[1]

  const contentData = contentService()

  const firstItem = contentData.find(
    item => item.category === category
  )

  if (!firstItem) {

    return ctx.reply(
`
❌ Aucun contenu trouvé.
`
    )

  }

  await sendContent(ctx, firstItem)
}

module.exports = {
  categoryHandler
}