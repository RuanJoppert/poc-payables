const tableName = 'PaymentLinks'
const columnName = 'postback_config'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: null,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
