const tableName = 'AntifraudAnalyses'

function createIndexSQL (columnName) {
  return `
    CREATE INDEX CONCURRENTLY IF NOT EXISTS ix_${columnName}
        ON "${tableName}"
        USING btree (${columnName});
  `
}

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(createIndexSQL('created_at'))
  },
  down (queryInterface) {
    return queryInterface.removeIndex(tableName, 'ix_created_at')
  },
}
