const tableName = 'Transactions'
const columnName = 'discount'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },
  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
