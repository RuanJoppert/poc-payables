const tableName = 'Transactions'
const applicationCryptogram = 'application_cryptogram'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    applicationCryptogram,
    {
      type: Sequelize.STRING,
      allowNull: true,
    }
  ),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, applicationCryptogram),
}
