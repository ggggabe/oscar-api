const router = require('express').Router()
const db = require('../database/mongo').getDatabase()

router.route('/')
  .get( ( req, res ) => {
    res.send('accounting API')
  })


module.exports = ( app ) => {
  if (process.env.ACCOUNTING_API) {
    app.use('/accounting', router)

    return
  }

  app.use('/accounting', ( req, res ) => {
    res.send('Sorry. Under construction.')
  })
}
