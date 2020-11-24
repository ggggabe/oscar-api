/* * * * * * * * * * * * * * * * * *
 * PATH: src/models/user.js
 *
 * * * * * * * * * * * * * * * * * */


class User {
  static getUserId (user) {
    return user.id || -1
  }

  static getUserUpdates (user) {
    const updates = {...user}
    delete updates._id

    return updates
  }

  static newUser (user) {
    return {
      name: user.name
    }
  }

  static existingUser (user) {
    return {
      name: user.name,
      _id: user._id
    }
  }
}

module.exports = User
