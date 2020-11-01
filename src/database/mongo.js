/*
 * PATH: src/database/mongo.js
 *
 *
 *
 * */

const { MongoMemoryServer } = require('mongodb-memory-server')
const { MongoClient } = require('mongodb')

let database = null

const startDatabase = async () => {
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  let connection
  const mongoMemoryServer = new MongoMemoryServer()

  switch (process.env.NODE_ENV) {
    case 'dev':

      try {
        connection = await MongoClient.connect(process.env.MONGO_URI, mongoOptions)
      } catch {
        connection = await MongoClient.connect(await mongoMemoryServer.getUri(), mongoOptions)
      }

      break
    case 'prod':
      let retries = 3

      while (!connection && retries) {
        try {
          connection = await MongoClient.connect(process.env.MONGO_URI, mongoOptions)
        } catch {
          console.log('retrying...')
        }

        retries--
      }
      break
    default:
      connection = await MongoClient.connect(await mongoMemoryServer.getUri(), mongoOptions)
  }

  database = connection.db()
}

const getDatabase = async () => {
  while (!database) await startDatabase()

  return database
}

module.exports = {
  getDatabase,
}

/* * * * * * * * * * * * * * TODO
 *
 * Real database conditional on NODE_ENV
 * Tests
 *
 *
 * * * * * * * * * * * * * * * */
