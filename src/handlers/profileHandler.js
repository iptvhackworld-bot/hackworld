const User =
require(
  '../models/User'
)

const MarketListing =
require(
  '../models/MarketListing'
)

/*
|--------------------------------------------------------------------------
| OPEN SELLER PROFILE
|--------------------------------------------------------------------------
*/

const openSellerProfile =
async (

  ctx,

  sellerId

) => {

  try {

    const seller =
      await User.findOne({

        id: Number(sellerId)

      })

    if (!seller) {

      return ctx.reply(
`
❌ Vendeur introuvable.
`
      )

    }

    const listings =
      await MarketListing.find({

        sellerId:
        seller.id,

        sold: false

      })

    await ctx.reply(
`
👤 PROFIL VENDEUR

━━━━━━━━━━━━━━━━━━

🪪 Username :
@${seller.username || 'unknown'}

💰 Ventes :
${seller.sellerSales || 0}

⭐ Note :
${seller.sellerRating || 0}/5

📝 Avis :
${seller.sellerReviews || 0}

${seller.verifiedSeller
? '✅ Vérifié'
: '❌ Non vérifié'}

${seller.trustedSeller
? '🛡 Trusted Seller'
: ''}

📦 Listings actifs :
${listings.length}

━━━━━━━━━━━━━━━━━━
`
    )

  } catch (error) {

    console.log(error)

  }

}

module.exports = {

  openSellerProfile

}