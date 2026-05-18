const {
  const users =
    await searchUser(query)

  if (
    users.length === 0
  ) {

    return ctx.reply(
`
❌ Aucun utilisateur trouvé.
`
    )

  }

  const user = users[0]

  ctx.match = [
    null,
    user.id
  ]

  await openUserProfile(ctx)

}

/*
|--------------------------------------------------------------------------
| RESET INVENTORY
|--------------------------------------------------------------------------
*/

const resetInventory =
async (

  ctx,

  userId

) => {

  await Inventory.findOneAndUpdate(

    {
      userId
    },

    {
      items: []
    }

  )

  await ctx.reply(
`
🎒 Inventaire reset.
`
  )

}

module.exports = {

  openUsersPanel,

  openUserProfile,

  openSearchUser,

  handleSearchUser,

  resetInventory

}