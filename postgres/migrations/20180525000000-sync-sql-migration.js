const fs = require('fs')
const Promise = require('bluebird')
const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(loadSQLFile('int_to_varchar.sql'))

    function query (rawQuery) {
      return function () { return queryInterface.sequelize.query(rawQuery) }
    }

    function loadSQLFile (fileName) {
      return readFile(`/code/postgres/migrations/sql/20180525000000-sync-sql-migration/util/functions/${fileName}`)
        .then((buffer) => {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }
  },

  down (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
