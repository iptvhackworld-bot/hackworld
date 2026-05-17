const sendContent = require('../utils/sendContent')

const {
  contentService
} = require('../data/contentData')

const navigationHandler = async (ctx, action) => {

  const category = ctx.match[1]

  const currentId = parseInt(ctx.match[2])

  const contentData = contentService()

  const categoryItems = contentData.filter(
    item => item.category === category
  )

  const currentIndex = categoryItems.findIndex(
    item => item.id === currentId
  )

  let nextItem

  /*
  |--------------------------------------------------------------------------
  | NEXT
  |--------------------------------------------------------------------------
  */

  if (action === 'next') {

    nextItem = categoryItems[currentIndex + 1]

  }

  /*
  |--------------------------------------------------------------------------
  | PREV
  |--------------------------------------------------------------------------
  */

  else {

    nextItem = categoryItems[currentIndex - 1]

  }

  if (!nextItem) {

    return ctx.answerCbQuery(
      '❌ Aucun autre contenu'
    )

  }

  await ctx.deleteMessage()

  await sendContent(ctx, nextItem)
}

module.exports = navigationHandler