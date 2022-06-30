const tableName = 'Payables'
const fieldName = 'anticipation_fee_base'

module.exports = {
  up (queryInterface, Sequelize) {
    const fieldOptions = {
      type: Sequelize.INTEGER,
    }

    return queryInterface.addColumn(tableName, fieldName, fieldOptions)
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, fieldName)
  },
}
