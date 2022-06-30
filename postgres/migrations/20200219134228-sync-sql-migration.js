const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    function loadSQLFile (filePath) {
      readFile(`/code/postgres/migrations/sql/20200219134228-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))
    }

    function runSql (query) {
      return queryInterface.sequelize.query(query)
    }

    return Promise.resolve()
      .then(() => runSql('ALTER TYPE fee_collection_with_associations ADD ATTRIBUTE reason character varying'))
      .then(() => loadSQLFile('models/fee_collection/functions/fee_collections_with_associations.sql'))
  },

  down: () => Promise.resolve(),
}
