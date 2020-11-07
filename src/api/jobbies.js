/* * * * * * * * * * * * * * * * * *
 * PATH: src/api/jobs.js
 *
 * Only ones authorized to use this:
 * Jobbies,
 * Oscar
 *
 * * * * * * * * * * * * * * * * * */

const { JobbiesDb } = require('../database/jobbies')
const router = require('express').Router()

router.route('/')
  .post( async ({ body} , res) => {
    const job = await JobbiesDb.create(body)

    if (!job) {
      console.table({
        ...body
      })

      res.send({ code: 500 })

      return
    }

    res.send(job)
  })

router.route('/:id')
  .patch( async ({ params, body}, res) => {
    const job = await JobbiesDb.update({
      ...id,
      ...body,
    })

    if (!job) {
      console.table({
        ...params
      })
      console.table({
        ...body
      })

      res.send({ code: 500 })

      return
    }

    res.send(job)
  })

module.exports = ( app ) => {
  if (process.env.JOBBIES_API) {
    app.use('/jobbies', router)

    return
  }

  app.use('/jobbies', ( req, res ) => {
    res.send('feature turned off')
  })
}
