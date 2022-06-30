const tableName = 'Batches'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, 'document_type', {
      type: Sequelize.ENUM,
      values: ['cpf', 'cnpj'],
      allowNull: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(tableName, 'document_type')
  },
}
