const {

  getCategoryContent

} = require(
  '../services/contentService'
)

const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| CATEGORY HANDLER
|--------------------------------------------------------------------------
*/

const categoryHandler =
async (ctx) => {

  const category =
    ctx.match[1]

  /*
  |--------------------------------------------------------------------------
  | GET CONTENT
  |--------------------------------------------------------------------------
  */

  const content =
    await getCategoryContent(
      category
    )

  if (
    !content
    ||
    content.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun contenu disponible.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT
  |--------------------------------------------------------------------------
  */

  let message =
`
📂 ${category.toUpperCase()}

━━━━━━━━━━━━━━━━━━

`

  content.forEach(

    (item, index) => {

      message +=
`
${index + 1}. ${item.title}

🔗 ${item.link}

`

    }

  )

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(

    message,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '⬅️ Retour',
          'back_menu'
        )

      ]

    ])

  )

}

module.exports = {

  categoryHandler

}