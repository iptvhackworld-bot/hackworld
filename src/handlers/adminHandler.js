const { Markup } = require('telegraf')

const openAdminPanel = async (ctx) => {

  const userId = ctx.from.id

  /*
  |--------------------------------------------------------------------------
  | CHECK OWNER
  |--------------------------------------------------------------------------
  */

  if (
    userId.toString() !==
    env.ownerId
  ) {

    return ctx.reply(
`
❌ ACCÈS REFUSÉ
`
    )

  }

  /*
  |--------------------------------------------------------------------------
  | ADMIN PANEL
  |--------------------------------------------------------------------------
  */

  await ctx.reply(
`
╔══════════════════╗
      ADMIN PANEL
╚══════════════════╝

⚙️ Gestion avancée
━━━━━━━━━━━━━━━━━━

👑 Owner détecté
🛡 Accès autorisé
🚀 Système sécurisé
`,
    Markup.inlineKeyboard([

      [
        Markup.button.callback(
          '➕ Ajouter contenu',
          'add_content'
        )
      ],

      [
        Markup.button.callback(
          '📝 Modifier contenu',
          'edit_content'
        )
      ],

      [
        Markup.button.callback(
          '🔎 Recherche contenu',
          'search_content'
        )
      ],

      [
        Markup.button.callback(
          '📂 Catégories',
          'view_categories'
        )
      ],

      [
        Markup.button.callback(
          '👥 Gérer utilisateurs',
          'manage_users'
        )
      ],

      [
        Markup.button.callback(
          '📢 Broadcast',
          'broadcast'
        )
      ],

      [
        Markup.button.callback(
          '⚙️ Paramètres',
          'settings'
        )
      ],

      [
        Markup.button.callback(
          '👑 Staff & Top',
          'cat_staff'
        )
      ],
	  [
	    Markup.button.callback(
          '📊 Dashboard',
          'admin_stats'
        )
      ],
	  [
        Markup.button.callback(
           '👑 Staff Manager',
           'staff_manager'
		)
	  ],
	  [
        Markup.button.callback(
            '🎫 Support',
            'support_panel'
	    )
	  ],
	  [
        Markup.button.callback(
             '📦 Export Data',
             'export_data'
        )
	  ],
	  [
        Markup.button.callback(
             '♻️ Restore Backup',
             'restore_backup'
        )
	  ],
	  [
        Markup.button.callback(
              '📡 Monitoring',
              'analytics_panel'
        )
	  ],
      [
        Markup.button.callback(
          '🔙 Retour',
          'back_menu'
        )
      ]

    ])
  )
}

module.exports = {
  openAdminPanel
}