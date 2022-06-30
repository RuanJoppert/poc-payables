const tableName = 'BulkAnticipations'
const columnName = 'anticipation_tax_type'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.ENUM,
      values: ['fixed', 'di'],
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
      .then(() => {
        queryInterface.sequelize
          .query(`DROP TYPE "enum_${tableName}_${columnName}";`)
      })
  },
}
