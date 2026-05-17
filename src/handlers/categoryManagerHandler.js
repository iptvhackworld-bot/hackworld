const { Markup } = require('telegraf')

const {

  loadCategories,

  saveCategories

} = require('../data/categoryData')

/*
|--------------------------------------------------------------------------
| OPEN PANEL
|--------------------------------------------------------------------------
*/

const openCategoryPanel =
async (ctx) => {

  const categories =
    loadCategories()

  let message =
`
📂 CATÉGORIES

━━━━━━━━━━━━━━━━━━

`

  categories.forEach((cat) => {

    message += `• ${cat}\n`

  })

  await ctx.reply(
    message,
    Markup.inlineKeyboard([

      [
        Markup.button.callback(
          '➕ Ajouter',
          'add_category'
        )
      ],

      [
        Markup.button.callback(
          '🗑 Supprimer',
          'delete_category'
        )
      ]

    ])
  )
}

/*
|--------------------------------------------------------------------------
| ADD CATEGORY
|--------------------------------------------------------------------------
*/

const startAddCategory =
async (ctx) => {

  if (!ctx.session) {

    ctx.session = {}

  }

  ctx.session.step =
    'adding_category'

  await ctx.reply(
`
➕ ENVOYEZ LE NOM
DE LA CATÉGORIE
`
  )
}

const handleAddCategory =
async (ctx) => {

  if (
    ctx.session.step !==
    'adding_category'
  ) return

  const categories =
    loadCategories()

  const category =
    ctx.message.text.toLowerCase()

  /*
  |--------------------------------------------------------------------------
  | EXISTS
  |--------------------------------------------------------------------------
  */

  if (
    categories.includes(category)
  ) {

    return ctx.reply(
`
❌ Catégorie déjà existante.
`
    )

  }

  categories.push(category)

  saveCategories(categories)

  ctx.session.step = null

  await ctx.reply(
`
✅ Catégorie ajoutée :

📂 ${category}
`
  )
}

/*
|--------------------------------------------------------------------------
| DELETE PANEL
|--------------------------------------------------------------------------
*/

const openDeleteCategory =
async (ctx) => {

  const categories =
    loadCategories()

  const buttons = []

  categories.forEach((cat) => {

    buttons.push([

      Markup.button.callback(
        `🗑 ${cat}`,
        `deletecat_${cat}`
      )

    ])

  })

  await ctx.reply(
`
🗑 SUPPRIMER CATÉGORIE
`,
    Markup.inlineKeyboard(buttons)
  )
}

/*
|--------------------------------------------------------------------------
| DELETE CATEGORY
|--------------------------------------------------------------------------
*/

const deleteCategory =
async (ctx) => {

  const category =
    ctx.match[1]

  let categories =
    loadCategories()

  categories =
    categories.filter(
      c => c !== category
    )

  saveCategories(categories)

  await ctx.reply(
`
✅ Catégorie supprimée :

📂 ${category}
`
  )
}

module.exports = {

  openCategoryPanel,

  startAddCategory,

  handleAddCategory,

  openDeleteCategory,

  deleteCategory

}