const tableName = 'Batches'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, 'internal_contract_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(tableName, 'internal_contract_id')
  },
}
