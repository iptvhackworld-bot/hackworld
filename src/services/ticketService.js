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
async (

  userId,

  message

) => {

  return await Ticket.create({

    userId,

    message

  })

}

/*
|--------------------------------------------------------------------------
| GET TICKETS
|--------------------------------------------------------------------------
*/

const getTickets =
async () => {

  return await Ticket.find()
  .sort({

    createdAt: -1

  })

}

/*
|--------------------------------------------------------------------------
| CLOSE TICKET
|--------------------------------------------------------------------------
*/

const closeTicket =
async (id) => {

  return await Ticket.findByIdAndUpdate(

    id,

    {

      status: 'closed'

    }

  )

}

module.exports = {

  createTicket,

  getTickets,

  closeTicket

}