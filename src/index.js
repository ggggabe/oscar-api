/*
 * PATH: src/index.js */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const jwt = require('express-jwt')
const { expressJwtSecret } = require('jwks-rsa')

const registerAccountingApi = require('./api/accounting')
const registerUserApi = require('./api/users')

require('dotenv').config()

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(cors())

app.use(jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-acwvtaph.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://oscar-api',
  issuer: 'https://dev-acwvtaph.us.auth0.com/',
  algorithms: ['RS256']
}))

registerAccountingApi(app)
registerUserApi(app)

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
 *
 * * * * * * * * * * * * * * * */
