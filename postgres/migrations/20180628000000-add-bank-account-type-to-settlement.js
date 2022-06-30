const tableName = 'Settlements'
const columnName = 'bank_account_type'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.ENUM,
      values: ['bank_account', 'provider_bank_account'],
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
