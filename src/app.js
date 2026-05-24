const {

  cleanExpiredPremiums

} = require(
  './services/premiumService'
)

setInterval(

  async () => {

    await cleanExpiredPremiums()

  },

  60 * 60 * 1000

)

