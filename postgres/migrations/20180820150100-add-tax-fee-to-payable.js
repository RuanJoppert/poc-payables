const tableName = 'Payables'
const fieldName = 'tax_fee'

module.exports = {
  up (queryInterface, Sequelize) {
    const fieldOptions = {
      type: Sequelize.INTEGER,
      allowNull: true,
    }

    return queryInterface.addColumn(tableName, fieldName, fieldOptions)
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, fieldName)
  },
}
