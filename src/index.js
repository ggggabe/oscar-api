/*
 * PATH: src/index.js */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())



require('./api/accounting')(app)
require('./api/users')(app)
require('./api/jobbies')(app)

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`)
})

/* * * * * * * * * * * * * * TODO
 *
 * 10/31/20
 * FEATURE FLAGS
 *
 * So. Right now, features can only be toggled with a restart of the
 * Awhole service, because they're loaded into environment variables.
 * A tentative final solution to this is to stick the features as flags
 * on users and block it with code
 *
 * 10/31/20
 * API USERS
 *
 * Right now, anyone can hit this API. Next, we design, implementA
 * and build an Authentication service (OAuth 2.0)[1]
 * The users will interact with the Authentication Service,
 * and the Authentication Service will
 * make User requests against this API Server.
 *
 * References:
 * [1] https://tools.ietf.org/html/rfc6749#section-1.2
 *
 * 11/06/20
 * REAL WORLD API USE & TEST WRITING
 * As of a couple days ago we have an api server 80% of the
 * way to operational, NGINX reverse-proxy, certbot,
 * RECORDS, and path ready. Connections are closed and all
 * that's left is to write tests before we deploy.
 *
 * 11/06/20
 * Skeleton for jobbies API
 *
 * * * * * * * * * * * * * * * */
