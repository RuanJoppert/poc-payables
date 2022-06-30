const fs = require('fs')
const Promise = require('bluebird')

const readFile = Promise.promisify(fs.readFile)

module.exports = {
  up: (queryInterface) => {
    const loadSQLFile = filePath =>
      readFile(`/code/postgres/migrations/sql/20200312162717-sync-sql-migration/${filePath}`)
        .then(buffer => queryInterface.sequelize.query(buffer.toString()))

    return Promise.resolve()
      .then(() => loadSQLFile('models/fee_collection/functions/fee_collections_with_associations.sql'))
      .then(() => queryInterface.sequelize.query('ALTER TYPE fee_collection_with_associations DROP ATTRIBUTE reason'))
  },

  down: () => Promise.resolve(),
}
