const tableName = 'Transactions'
const columnName = 'pix_expiration_date'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
