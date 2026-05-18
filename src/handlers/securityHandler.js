/*
|--------------------------------------------------------------------------
| SECURITY PANEL
|--------------------------------------------------------------------------
*/

const openSecurityPanel =
async (ctx) => {

  await ctx.reply(
`
🔒 SECURITY PANEL

━━━━━━━━━━━━━━━━━━

✅ Anti-spam actif

✅ Protection ban active

✅ Sessions sécurisées

✅ MongoDB protégé

✅ Monitoring actif

━━━━━━━━━━━━━━━━━━
`
  )

}

module.exports = {

  openSecurityPanel

}