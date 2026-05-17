/*
|--------------------------------------------------------------------------
| VIEW CATEGORIES
|--------------------------------------------------------------------------
*/

const viewCategories = async (ctx) => {

  await ctx.reply(
`
📂 CATÉGORIES

━━━━━━━━━━━━━━━━━━

🛠 Tool
📤 Partage
🎓 Formation
🎁 Gratuit
🤝 Partenaire
📢 Pub
👥 Nos Groupes
`
  )
}

/*
|--------------------------------------------------------------------------
| MANAGE USERS
|--------------------------------------------------------------------------
*/

const manageUsers = async (ctx) => {

  await ctx.reply(
`
👥 GESTION UTILISATEURS

━━━━━━━━━━━━━━━━━━

✅ Système bientôt disponible.
`
  )
}

/*
|--------------------------------------------------------------------------
| BROADCAST
|--------------------------------------------------------------------------
*/

const {

  startBroadcast

} = require('./broadcastHandler')

const broadcastPanel =
  startBroadcast
  
  

/*
|--------------------------------------------------------------------------
| SETTINGS
|--------------------------------------------------------------------------
*/

const settingsPanel = async (ctx) => {

  await ctx.reply(
`
⚙️ PARAMÈTRES

━━━━━━━━━━━━━━━━━━

✅ Configuration bientôt disponible.
`
  )
}

module.exports = {

  viewCategories,

  manageUsers,

  broadcastPanel,

  settingsPanel

}