const tableName = 'CompanyAccounts'
const companyIdColumnName = 'company_id'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "${tableName}" DROP CONSTRAINT "${tableName}_${companyIdColumnName}_key";
    `).then(() => {
      queryInterface.changeColumn(tableName, companyIdColumnName, {
        type: Sequelize.STRING,
        unique: false,
      })
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.changeColumn(tableName, companyIdColumnName, {
      type: Sequelize.STRING,
      unique: true,
    })
  },
}
