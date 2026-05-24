const Ticket =
require(
  '../models/Ticket'
)

/*
|--------------------------------------------------------------------------
| CREATE TICKET
|--------------------------------------------------------------------------
*/

const createTicket =
async (data) => {

  try {

    return await Ticket.create(
      data
    )

  } catch (error) {

    console.log(error)

    return null

  }

}

/*
|--------------------------------------------------------------------------
| GET TICKETS
|--------------------------------------------------------------------------
*/

const getTickets =
async () => {

  try {

    return await Ticket.find()

    .sort({

      createdAt: -1

    })

  } catch (error) {

    console.log(error)

    return []

  }

}

/*
|--------------------------------------------------------------------------
| CLOSE TICKET
|--------------------------------------------------------------------------
*/

const closeTicketById =
async (id) => {

  try {

    return await Ticket.findByIdAndUpdate(

      id,

      {

        status: 'closed'

      }

    )

  } catch (error) {

    console.log(error)

    return false

  }

}

/*
|--------------------------------------------------------------------------
| ADD REPLY
|--------------------------------------------------------------------------
*/

const addReply =
async (

  ticketId,

  replyData

) => {

  try {

    const ticket =
      await Ticket.findById(
        ticketId
      )

    if (!ticket) {

      return false

    }

    ticket.replies.push(
      replyData
    )

    await ticket.save()

    return ticket

  } catch (error) {

    console.log(error)

    return false

  }

}

module.exports = {

  createTicket,

  getTickets,

  closeTicketById,
  
  addReply

}