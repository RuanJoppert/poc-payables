const tableName = 'FeePresets'
const columnName = 'anticipation_rate'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, columnName, {
      type: Sequelize.FLOAT,
      allowNull: false,
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, columnName, {
      type: Sequelize.FLOAT,
      allowNull: true,
    })
  },
}
