/* PATH: ./src/api/events.js */

const router = require('express').Router()
const db = require('../database/mongo').getDatabase()

router.route('/create')

module.exports = ( app ) => {
  if (process.env.events_API) {
    app.use('/events', router)

    return
  }

  app.use('/events', ( req, res ) => {
    res.send('Sorry. Under consstruction.')
  })
}
