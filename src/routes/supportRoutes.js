module.exports = (bot) => {

  const {

    openTicketPanel,

    closeTicket

  } = require(
    '../handlers/ticketHandler'
  )
  
  const {

  openAdminTickets,

  closeTicketAdmin

} = require(
  '../handlers/ticketHandler'
)

const {

  replyTicket

} = require(
  '../handlers/ticketHandler'
)

  /*
  |--------------------------------------------------------------------------
  | OPEN SUPPORT
  |--------------------------------------------------------------------------
  */

  bot.action(

    'support_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openTicketPanel(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )
  
  /*
|--------------------------------------------------------------------------
| REPLY COMMAND
|--------------------------------------------------------------------------
*/

bot.command(

  'reply',

  async (ctx) => {

    try {

      const args =
        ctx.message.text.split(' ')

      const ticketId =
        args[1]

      const message =
        args.slice(2).join(' ')

      if (

        !ticketId ||

        !message

      ) {

        return ctx.reply(
`
❌ Utilisation :

/reply TICKET_ID message
`
        )

      }

      await replyTicket(

        ctx,

        ticketId,

        message

      )

    } catch (error) {

      console.log(error)

    }

  }

)
  
  /*
|--------------------------------------------------------------------------
| ADMIN TICKETS
|--------------------------------------------------------------------------
*/

bot.action(

  'admin_tickets',

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      await openAdminTickets(ctx)

    } catch (error) {

      console.log(error)

    }

  }

)

/*
|--------------------------------------------------------------------------
| CLOSE TICKET DB
|--------------------------------------------------------------------------
*/

bot.action(

  /^close_ticket_(.+)$/,

  async (ctx) => {

    try {

      await ctx.answerCbQuery()

      const id =
        ctx.match[1]

      await closeTicketAdmin(

        ctx,

        id

      )

    } catch (error) {

      console.log(error)

    }

  }

)

  /*
  |--------------------------------------------------------------------------
  | CLOSE TICKET
  |--------------------------------------------------------------------------
  */

  bot.action(

    'close_ticket',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await closeTicket(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

}

module.exports = (bot) => {

  const {

    openSupportPanel

  } = require(
    '../handlers/supportHandler'
  )

  bot.action(

    'support_panel',

    async (ctx) => {

      try {

        await ctx.answerCbQuery()

        await openSupportPanel(ctx)

      } catch (error) {

        console.log(error)

      }

    }

  )

}