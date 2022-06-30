const tableName = 'Batches'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, 'document_number', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(tableName, 'document_number')
  },
}
