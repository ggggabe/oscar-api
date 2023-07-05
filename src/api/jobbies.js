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
      res.send({ code: 500 })

      return
    }

    res.send({
      job
    })
  })

router.route('/list')
  .get( async (req, res) => {
    const jobs = await JobbiesDb.list()
    res.send(jobs)
  })

router.route('/:id')
  .get( async ({ params }, res) => {
    const job = await JobbiesDb.read(params)

    if (!job) {

      res.send({ code: 404 })

      return
    }

    res.send(job)

  })
  .patch( async ({ params, body}, res) => {
    const job = await JobbiesDb.update({
      ...id,
      ...body,
    })

    if (!job) {

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
