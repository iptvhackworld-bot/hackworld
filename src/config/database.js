const mongoose =
require('mongoose')

const connectDB =
async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    )

    console.log(
      '[HACKWORLD]'
    )

    console.log(
      '✅ MongoDB connecté'
    )

  } catch (error) {

    console.log(
      '❌ MongoDB erreur'
    )

    console.log(error)

  }

}

module.exports =
connectDB