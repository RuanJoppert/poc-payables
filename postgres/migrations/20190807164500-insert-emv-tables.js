const tableName = 'EmvTables'

const data = require('./data/20190807164500-insert-emv-tables-data.json')

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(tableName, [{
    id: 'et_cjz1rcpgk000007qwyheeoi3r',
    active: true,
    stone_hash: '9a1859ad45',
    tables_json: JSON.stringify(data),
    created_at: new Date(),
    updated_at: new Date(),
  }]),
  down: queryInterface => queryInterface.bulkDelete(tableName, { stone_hash: '9a1859ad45' }),
}
