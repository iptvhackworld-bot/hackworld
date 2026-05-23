const { Markup } =
require('telegraf')

const ShopItem =
require(
  '../models/ShopItem'
)

if (!global.shopAdminSessions) {

  global.shopAdminSessions = {}

}

const {

  createDigitalProduct

} = require(
  '../services/deliveryService'
)

if (!global.digitalSessions) {

  global.digitalSessions = {}

}

/*
|--------------------------------------------------------------------------
| DIGITAL PRODUCT PANEL
|--------------------------------------------------------------------------
*/

const addDigitalProductPanel =
async (ctx) => {

  global.digitalSessions[
    ctx.from.id
  ] = {

    action:
    'add_digital'

  }

  await ctx.reply(
`
📦 Envoyez :

listingId | contenu

Exemple :

685abc123 | netflix@mail.com:password
`
  )

}

/*
|--------------------------------------------------------------------------
| SHOP ADMIN PANEL
|--------------------------------------------------------------------------
*/

const openShopAdmin =
async (ctx) => {

  await ctx.reply(

`
🛒 SHOP ADMIN

━━━━━━━━━━━━━━━━━━

Gestion boutique

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '➕ Ajouter',
          'add_shop_item'
        ),

        Markup.button.callback(
          '❌ Supprimer',
          'delete_shop_item'
        ),
		
		Markup.button.callback(
          '🤖 Produit Digital',
          'add_digital_product'
        )

      ],

      [

        Markup.button.callback(
          '💰 Modifier Prix',
          'edit_shop_price'
        ),

        Markup.button.callback(
          '📦 Modifier Stock',
          'edit_shop_stock'
        )

      ],

      [

        Markup.button.callback(
          '⭐ Modifier Rareté',
          'edit_shop_rarity'
        )

      ],

      [

        Markup.button.callback(
          '📜 Voir Items',
          'view_shop_items'
        )

      ]

    ])

  )

}

/*
|--------------------------------------------------------------------------
| ADD ITEM PANEL
|--------------------------------------------------------------------------
*/

const addItemPanel =
async (ctx) => {

  global.shopAdminSessions[
    ctx.from.id
  ] = {

    action:
    'add_item'

  }

  await ctx.reply(
`
➕ Envoyez :

nom | prix | catégorie
`
  )

}

/*
|--------------------------------------------------------------------------
| HANDLE SHOP INPUT
|--------------------------------------------------------------------------
*/

const handleShopAdminInput =
async (ctx) => {

  const session =

    global.shopAdminSessions[
      ctx.from.id
    ]

  if (!session) {

    return false

  }
  
  /*
|--------------------------------------------------------------------------
| DIGITAL PRODUCT
|--------------------------------------------------------------------------
*/

const digitalSession =

  global.digitalSessions[
    ctx.from.id
  ]

if (digitalSession) {

  const args =
    ctx.message.text.split('|')

  if (

    args.length < 2

  ) {

    return ctx.reply(
`
❌ Format invalide.
`
    )

  }

  const listingId =
    args[0].trim()

  const content =
    args[1].trim()

  await createDigitalProduct(

    listingId,

    content

  )

  delete global.digitalSessions[
    ctx.from.id
  ]

  return ctx.reply(
`
✅ Produit digital ajouté.
`
  )

}

  /*
  |--------------------------------------------------------------------------
  | ADD ITEM
  |--------------------------------------------------------------------------
  */

  if (

    session.action ===
    'add_item'

  ) {

    const args =
      ctx.message.text.split('|')

    if (

      args.length < 3

    ) {

      return ctx.reply(
`
❌ Format invalide.
`
      )

    }

    const name =
      args[0].trim()

    const price =
      Number(
        args[1]
      )

    const category =
      args[2].trim()

    await ShopItem.create({

      name,

      price,

      category,

      description:
      'Aucune description',

      emoji: '🎁'

    })

    delete global.shopAdminSessions[
      ctx.from.id
    ]

    return ctx.reply(
`
✅ Item ajouté.

📦 ${name}

💰 ${price}
`
    )

  }

  return false

}

/*
|--------------------------------------------------------------------------
| VIEW ITEMS
|--------------------------------------------------------------------------
*/

const viewShopItems =
async (ctx) => {

  const items =
    await ShopItem.find()

  if (!items.length) {

    return ctx.reply(
`
❌ Aucun item.
`
    )

  }

  let text =
`
🛒 ITEMS SHOP

━━━━━━━━━━━━━━━━━━
`

  items.forEach((item) => {

    text +=
`
${item.emoji} ${item.name}

💰 ${item.price}
📦 Stock :
${item.stock}

⭐ ${item.rarity}

━━━━━━━━━━━━━━━━━━
`

  })

  await ctx.reply(text)

}

module.exports = {

  openShopAdmin,

  addItemPanel,

  handleShopAdminInput,

  viewShopItems,
  
  addDigitalProductPanel

}