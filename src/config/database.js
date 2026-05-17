const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    logger(...)
logInfo(...)
logError(...) MongoDB connecté')
  } catch (error) {
    logger(...)
logInfo(...)
logError(...)ror)
  }
}

module.exports = connectDB