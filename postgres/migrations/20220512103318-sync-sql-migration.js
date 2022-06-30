const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20220512103318-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('util/functions/find_text_id.sql'))
      .then(() => loadSQLFile('util/functions/number_to_base.sql'))
  },

  down: () => Promise.resolve(),
}
