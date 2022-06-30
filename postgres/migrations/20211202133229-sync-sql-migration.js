const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20211202133229-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    const runSQL = query => queryInterface.sequelize.query(query)

    return Promise.resolve()
      .then(() => runSQL('DROP FUNCTION IF EXISTS find_numeric_id(regclass, timestamp with time zone)'))
      .then(() => loadSQLFile('util/functions/find_numeric_id.sql'))
  },

  down: () => Promise.resolve(),
}
