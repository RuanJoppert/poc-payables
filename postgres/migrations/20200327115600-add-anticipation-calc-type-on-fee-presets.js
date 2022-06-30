const tableName = 'FeePresets'
const columnName = 'anticipation_calc_type'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.ENUM,
      values: ['installments', 'duration'],
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
