const tableName = 'Payables'
const fieldName = 'originator_model'

module.exports = {
  up (queryInterface, Sequelize) {
    const fieldOptions = {
      type: Sequelize.STRING,
      allowNull: true,
    }

    return queryInterface.addColumn(tableName, fieldName, fieldOptions)
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, fieldName)
  },
}
