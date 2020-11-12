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

const FIELDS = [
  'company',
  'role',
  'introduction',
  'contactList',
  'interviewProcess',
  'listedData',
  'geographicalLocation',
  'applicationLocation',
]


class JobbiesDb {

  /* * * * * * * * * * *
   *
   *            PAYLOADS
   *
   * * * * * * * * * * */

  static getCreatePayload(data) {
    return FIELDS.reduce( (payload, field) => {
      if (typeof data[field] !== undefined) return payload
      return {
        ...payload,
        [field]: data[field]
      }
    }, {})
  }

  static getUpdatePayload(data) {
    return FIELDS.reduce( (payload, field) => {
      if (typeof data[field] !== undefined) return payload
      return {
        ...payload,
        [field]: data[field]
      }
    }, {})
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
