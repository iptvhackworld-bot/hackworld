const { Markup } = require('telegraf')

const {

  contentService

} = require('../data/contentData')

/*
|--------------------------------------------------------------------------
| START SEARCH
|--------------------------------------------------------------------------
*/

const startSearch = async (ctx) => {

  if (
    ctx.from.id.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
      '❌ Accès refusé'
    )

  }

  /*
  |--------------------------------------------------------------------------
  | SESSION
  |--------------------------------------------------------------------------
  */

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.step =
    'search_content'

  /*
  |--------------------------------------------------------------------------
  | ASK KEYWORD
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🔎 RECHERCHE CONTENU

━━━━━━━━━━━━━━━━━━

📝 Envoyez un mot-clé.
`
  )
}

/*
|--------------------------------------------------------------------------
| HANDLE SEARCH
|--------------------------------------------------------------------------
*/

const handleSearch = async (ctx) => {

  if (
    ctx.session.step !==
    'search_content'
  ) return

  const keyword =
    ctx.message.text.toLowerCase()

  const contentData = contentService()

  /*
  |--------------------------------------------------------------------------
  | FILTER
  |--------------------------------------------------------------------------
  */

  const results = contentData.filter(
    item =>

      item.title
        .toLowerCase()
        .includes(keyword)

      ||

      item.description
        .toLowerCase()
        .includes(keyword)
  )

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  ctx.session.step = null

  /*
  |--------------------------------------------------------------------------
  | EMPTY
  |--------------------------------------------------------------------------
  */

  if (results.length === 0) {

    return ctx.reply(
`
❌ Aucun résultat trouvé.
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | BUTTONS
  |--------------------------------------------------------------------------
  */

  const buttons = []

  results.forEach((item) => {

    buttons.push([

      Markup.button.callback(
        `📄 ${item.title}`,
        `edit_${item.id}`
      )

    ])

  })

  /*
  |--------------------------------------------------------------------------
  | SEND
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
🔎 RÉSULTATS RECHERCHE

━━━━━━━━━━━━━━━━━━

✅ ${results.length} résultat(s)
`,
    Markup.inlineKeyboard(buttons)
  )
}

module.exports = {

  startSearch,

  handleSearch

}