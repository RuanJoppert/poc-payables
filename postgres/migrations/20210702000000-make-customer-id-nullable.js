const tableName = 'CompanyAccounts'
const columnName = 'customer_id'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },
}
