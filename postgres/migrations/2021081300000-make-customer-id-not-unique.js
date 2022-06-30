const tableName = 'CompanyAccounts'
const customerColumnName = 'customer_id'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" DROP CONSTRAINT "${tableName}_${customerColumnName}_key";
    `).then(() => {
      queryInterface.changeColumn(tableName, customerColumnName, {
        type: Sequelize.STRING,
        unique: false,
      })
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, customerColumnName, {
      type: Sequelize.STRING,
      unique: true,
    })
  },
}
