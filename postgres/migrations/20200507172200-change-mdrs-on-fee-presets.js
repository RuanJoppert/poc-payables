const tableName = 'FeePresets'
const columnName = 'mdrs'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, columnName, {
      type: Sequelize.JSONB,
      allowNull: false,
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, columnName, {
      type: Sequelize.JSONB,
      defaultValue: {},
      allowNull: false,
    })
  },
}
