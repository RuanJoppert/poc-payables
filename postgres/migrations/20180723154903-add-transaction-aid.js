const tableName = 'Transactions'
const aid = 'aid'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    aid,
    {
      type: Sequelize.STRING,
      allowNull: true,
    }
  ),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, aid),
}
