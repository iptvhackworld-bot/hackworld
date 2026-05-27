module.exports = (bot) => {

  const {

    isAdmin

  } = require(
    '../utils/permissions'
  )

  const {

    promoteAdmin,

    banMember,

    muteMember,

    unbanMember,

    unmuteMember,

    demoteAdmin

  } = require(
    '../handlers/staffHandler'
  )

  /*
  |--------------------------------------------------------------------------
  | BAN
  |--------------------------------------------------------------------------
  */

  bot.command(

    'ban',

    async (ctx) => {

      try {

        const allowed =
          await isAdmin(
            ctx.from.id
          )

        if (!allowed) {

          return ctx.reply(
`
❌ Permission refusée.
`
          )

        }

        const args =
          ctx.message.text.split(' ')

        const userId =
          Number(args[1])

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/ban ID
`
          )

        }

        await banMember(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | MUTE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'mute',

    async (ctx) => {

      try {

        const allowed =
          await isAdmin(
            ctx.from.id
          )

        if (!allowed) {

          return ctx.reply(
`
❌ Permission refusée.
`
          )

        }

        const args =
          ctx.message.text.split(' ')

        const userId =
          Number(args[1])

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/mute ID
`
          )

        }

        await muteMember(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | UNBAN
  |--------------------------------------------------------------------------
  */

  bot.command(

    'unban',

    async (ctx) => {

      try {

        const allowed =
          await isAdmin(
            ctx.from.id
          )

        if (!allowed) {

          return ctx.reply(
`
❌ Permission refusée.
`
          )

        }

        const args =
          ctx.message.text.split(' ')

        const userId =
          Number(args[1])

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/unban ID
`
          )

        }

        await unbanMember(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | UNMUTE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'unmute',

    async (ctx) => {

      try {

        const allowed =
          await isAdmin(
            ctx.from.id
          )

        if (!allowed) {

          return ctx.reply(
`
❌ Permission refusée.
`
          )

        }

        const args =
          ctx.message.text.split(' ')

        const userId =
          Number(args[1])

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/unmute ID
`
          )

        }

        await unmuteMember(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

  /*
  |--------------------------------------------------------------------------
  | DEMOTE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'demote',

    async (ctx) => {

      try {

        const allowed =
          await isAdmin(
            ctx.from.id
          )

        if (!allowed) {

          return ctx.reply(
`
❌ Permission refusée.
`
          )

        }

        const args =
          ctx.message.text.split(' ')

        const userId =
          Number(args[1])

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/demote ID
`
          )

        }

        await demoteAdmin(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )
  
  
  /*
|--------------------------------------------------------------------------
| OWNER
|--------------------------------------------------------------------------
*/

bot.command(

  'owner',

  async (ctx) => {

    try {

      const User =
      require('../models/User')

      let user =
      await User.findOne({

        id: ctx.from.id

      })

      if (!user) {

        user = new User({

          id: ctx.from.id

        })

      }

      user.role = 'owner'

      await user.save()

      await ctx.reply(
`
✅ OWNER ACTIVÉ
`
      )

    } catch (error) {

      console.log(error)

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | PROMOTE
  |--------------------------------------------------------------------------
  */

  bot.command(

    'promote',

    async (ctx) => {

      try {

        const allowed =
          await isAdmin(
            ctx.from.id
          )

        if (!allowed) {

          return ctx.reply(
`
❌ Permission refusée.
`
          )

        }

        const args =
          ctx.message.text.split(' ')

        const userId =
          Number(args[1])

        if (!userId) {

          return ctx.reply(
`
❌ Utilisation :

/promote ID
`
          )

        }

        await promoteAdmin(

          ctx,

          userId

        )

      } catch (error) {

        console.log(error)

      }

    }

  )

}