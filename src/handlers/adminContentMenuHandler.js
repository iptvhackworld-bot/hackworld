const { Markup } =
require('telegraf')

/*
|--------------------------------------------------------------------------
| CONTENT MENU
|--------------------------------------------------------------------------
*/

const openContentMenu =
async (ctx) => {

  await ctx.reply(

`
📦 CONTENT PANEL

━━━━━━━━━━━━━━━━━━

📝 Gestion des contenus

━━━━━━━━━━━━━━━━━━
`,

    Markup.inlineKeyboard([

      [

        Markup.button.callback(
          '➕ Ajouter',
          'admin_add_content'
        )

      ],

      [

        Markup.button.callback(
          '📝 Modifier',
          'admin_edit_content'
        )

      ],

      [

        Markup.button.callback(
          '⬅️ Retour',
          'admin_panel'
        )

      ]

    ])

  )

}

module.exports = {

  openContentMenu

}