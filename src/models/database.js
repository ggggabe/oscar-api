/* * * * * * * * * * * * * * * * * *
 * PATH: src/models/database.js
 *
 * * * * * * * * * * * * * * * * * */

const { getDatabase } = require('../database/mongo')
const { ObjectId } = require('mongodb')

class MongoDb {
  static async getCollection (name) {
    const db = await getDatabase()
    const collection = await db.collection(name)

    return collection
  }
}

class MongoDbCollection {
  static async insertOne ( collectionName, doc ) {
    const collection = await MongoDb.getCollection(collectionName)
    const result = await collection.insertOne(doc)
    if (!result.insertedId) return -1

    const { result: updateResult } = await collection.updateOne( {
      _id: result.insertedId
    }, {
      $set: {
        id: result.insertedId.toString()
      }
    })

    if ( Object.values(updateResult).reduce( (a, b) => a + b) < 3) {
      await collection.deleteOne({ _id: result.insertedId })

      console.warn('Unable to update new record w/ id')

      return -1
    }

    return result.insertedId.toString()
  }

  static async findOne ( collectionName, id ) {
    const collection = await MongoDb.getCollection(collectionName)

    const result = await collection.findOne({ id })

    return result
  }

  static async findAll ( collectionName, args = {}) {
    const collection = await MongoDb.getCollection(collectionName)
    const result = await collection.find({}).toArray()

    return result
  }

  static async deleteOne ( collectionName, id ) {
    const collection = await MongoDb.getCollection(collectionName)
    const result = await collection.deleteOne({ id })

    return result
  }

  static async updateOne ( collectionName, id, updates) {
    const collection = await MongoDb.getCollection(collecitonName)
    const result = await collection.updateOne({ id }, {
      $set: updates
    })

    return result
  }
}

module.exports = {
  MongoDb,
  MongoDbCollection
}

/* * * * * * * * * * * * * * TODO
 *
 * 10/31/20
 * Support bulk CRUD
 * Tests
 *
 * * * * * * * * * * * * * * * */
