const tableName = 'FeeCollections'
const columnName = 'idempotency_key'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING(64),
      allowNull: true,
      unique: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
