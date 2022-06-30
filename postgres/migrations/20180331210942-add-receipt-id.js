const tableName = 'Transactions'
const receiptId = 'receipt_id'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    receiptId,
    {
      type: Sequelize.STRING,
      allowNull: true,
    }
  ),

  down: queryInterface =>
    queryInterface.removeColumn(tableName, receiptId),
}
