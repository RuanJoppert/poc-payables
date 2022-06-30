const tableName = 'Transactions'
const cardMagstripeFallback = 'card_magstripe_fallback'
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    tableName,
    cardMagstripeFallback,
    {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }
  ),
  down: queryInterface =>
    queryInterface.removeColumn(tableName, cardMagstripeFallback),
}
