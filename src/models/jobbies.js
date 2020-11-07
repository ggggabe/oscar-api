/* * * * * * * * * * * * * * * * * *
 * PATH: src/models/jobbies.js
 *
 * * * * * * * * * * * * * * * * * */

class Jobbies {
  static makeModel(data) {
    const copy = {
      id: data.id || data._id || data.insertedId || undefined,
      company: data.company,
      role: data.role,
      listed: data.listed || undefined,
      location: data.location || undefined,
      applicationLocation: data.applicationLocation || undefined,
    }


    const model = {}

    Object.key(copy).forEach( field => {
      if (copy[field] !== undefined) {
        model[field] = copy[field]
      }
    })

    return model
  }

  static getId(data) {

    return Jobbbies.makeModel(data).id || -1
  }
}

module.export = Jobbies
