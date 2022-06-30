const tableName = 'BulkAnticipations'
const columnName = 'contract_id'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_BulkAnticipations_status"
      ADD VALUE 'pre_approved';
    `)
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
