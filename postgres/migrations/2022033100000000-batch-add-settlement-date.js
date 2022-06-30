const tableName = 'Batches'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, 'settlement_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(tableName, 'settlement_date')
  },
}
