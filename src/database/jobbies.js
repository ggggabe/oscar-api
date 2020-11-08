/* * * * * * * * * * * * * * * * * *
 * PATH: src/database/jobbies.js
 *
 * A simple, testable, easy to
 * replicate, wrapper for managing
 * the collection of users of
 * whatever database we're using.
 *
 * * * * * * * * * * * * * * * * * */

const { MongoDb, MongoDbCollection } = require('../models/database')
const Jobbies = require('../models/jobbies')


const COLLECTION_JOBBIES = 'jobbies'

class JobbiesDb {

  /* * * * * * * * * * *
   *
   *            PAYLOADS
   *
   * * * * * * * * * * */

  static getCreatePayload({
    company,
    role,
    listed,
    location,
    applicationLocation,
  }) {
    return {
      company,
      role,
      listed,
      location,
      applicationLocation,
    }
  }

  static getUpdatePayload({
    company,
    role,
    listed,
    location,
    applicationLocation,
  }) {
    const data = {
      company,
      role,
      listed,
      location,
      applicationLocation,
    }

    const copy = {}

    Object.keys(data).forEach( field => {
      if (data[field] !== undefined) {
        copy[field] = data[field]
      }
    })

    return copy
  }

  static getIdPayload({
    id: _id
  }) {
    return {
      _id
    }
  }

  /* * * * * * * * * * *
   *
   *         DB REQUESTS
   *
   * * * * * * * * * * */

  static async list() {
    const result = await MongoDbCollection.findAll(COLLECTION_JOBBIES)

    return result.map( data => Jobbies.makeModel(data))
  }

  static async create(data) {
    const payload = JobbiesDb.getCreatePayload(data)
    const id = await MongoDbCollection.insertOne(
      COLLECTION_JOBBIES,
      payload
    )

    return {
      id
    }
  }

  static async read(data) {
    const foundData = await MongoDbCollection.findOne(
      COLLECTION_JOBBIES,
      Jobbies.getId(data)
    )

    return Jobbies.makeModel(foundData)
  }

  static async update(data) {
    const payload = JobbiesDb.getUpdatePayload(data)
    const result = await MongoDbCollection.updateOne(
      COLLECTION_JOBBIES,
      Jobbies.getId(data),
      payload
    )

    const foundData = await MongoDbCollection.findOne(
      COLLECTION_JOBBIES,
      Jobbies.getId(data)
    )

    return Jobbies.makeModel(foundData)
  }

}

module.exports = {
  JobbiesDb
}
