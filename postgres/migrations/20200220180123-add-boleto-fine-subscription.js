const tableName = 'Subscriptions'
const fieldName = 'fine'

module.exports = {
  up (queryInterface, Sequelize) {
    const fieldOptions = {
      type: Sequelize.JSONB,
      allowNull: true,
    }

    return queryInterface.addColumn(tableName, fieldName, fieldOptions)
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, fieldName)
  },
}
