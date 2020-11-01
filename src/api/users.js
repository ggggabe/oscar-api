/* * * * * * * * * * * * * * * * * *
 * PATH: src/api/users.js
 *
 * Only ones authorized to use this:
 * Authentication Server,
 * Oscar
 *
 * * * * * * * * * * * * * * * * * */

const { UserDb } = require('../database/users')
const router = require('express').Router()

router.route('/')
  .get( async ( req, res ) => {
    const users = await UserDb.listUsers()

    res.send(users)
  })
  .post( async ( { body: user }, res ) => {
    if (!Object.keys(user).length) {
      res.send('Bad request, no body')

      return
    }

    const result = await UserDb.insert(user)

    res.send(result)
  })
  .delete( async ( { body: user }, res ) => {
    if (!Object.keys(user).length) {
      res.send('Bad request, no body')

      return
    }

    const result = await UserDb.insert(user)

    res.send(result)
  })

router.route('/:userId')
  .patch( async ({ params, body }, res) => {
    const result = await UserDb.update({
      params,
      body
    })

    res.send(result)
  })

module.exports = ( app ) => {
  if (process.env.USERS_API) {
    app.use('/users', router)

    return
  }

  app.use('/users', ( req, res ) => {
    res.send('feature turned off')
  })
}

/* * * * * * * * * * * * * * TODO
 *
 * 10/31/20
 * Tests
 * Block unauthorized
 *
 * * * * * * * * * * * * * * * */
