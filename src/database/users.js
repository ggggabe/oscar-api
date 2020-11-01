/* * * * * * * * * * * * * * * * * *
 * PATH: src/database/users.js
 *
 * A simple, testable, easy to
 * replicate, wrapper for managing
 * the collection of users of
 * whatever database we're using.
 *
 * * * * * * * * * * * * * * * * * */

const { MongoDb, MongoDbCollection } = require('../models/database')
const User = require('../models/user')

const COLLECTION_USERS = 'users'

class UserDb {
  static async listUsers() {
    const result = await MongoDbCollection.findAll(COLLECTION_USERS)

    return result.map(user => User.existingUser(user))
  }

  static async find(user) {
    const id = User.getUserId(user)
    const result = await MongoDbCollection.findOne(COLLECTION_USERS, id)

    return result
  }

  static async insert(user) {
    const doc = User.newUser(user)
    const id = await MongoDbCollection.insertOne(COLLECTION_USERS, doc)

    return id
  }

  static async delete(user) {
    const id = User.getUserId(user)
    const result = await MongoDbCollection.deleteOne(id)

    return result
  }

  static async update(user) {
    const id = User.getUserId(user)
    const updates = User.getUpdates(user)
    const result = await MongoDbCollection.updateOne(COLLECTION_USERS, id, updates)

    return result
  }
}

module.exports = {
  UserDb
}

/* * * * * * * * * * * * * * * TODO
 *
 * 10/31/20
 * Support bulk CRUD
 * Tests
 *
 * * * * * * * * * * * * * * * */
