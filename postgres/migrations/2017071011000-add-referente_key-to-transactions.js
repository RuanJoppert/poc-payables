const tableName = 'Transactions'
const columnName = 'reference_key'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  }
}
