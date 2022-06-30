const tableName = 'FeePresets'
const columnName = 'mdrs'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.JSONB,
      defaultValue: {},
      allowNull: false,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
