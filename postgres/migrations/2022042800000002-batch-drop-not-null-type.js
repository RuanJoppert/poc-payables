const tableName = 'Batches'
const columnName = 'type'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`ALTER TABLE "${tableName}" ALTER COLUMN "${columnName}" DROP NOT NULL`)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`ALTER TABLE "${tableName}" ALTER COLUMN "${columnName}" SET NOT NULL`)
  },
}
