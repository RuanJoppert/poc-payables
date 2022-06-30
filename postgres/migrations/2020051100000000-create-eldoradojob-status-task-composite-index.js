const tableName = 'EldoradoJobs'
const columnName1 = 'status'
const columnName2 = 'task'
const indexName = `ix_composite_${columnName1}_${columnName2}_${tableName}`

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY
      ${indexName} ON "${tableName}"
      USING btree (${columnName1}, ${columnName2})
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ${indexName}
    `)
  },
}
