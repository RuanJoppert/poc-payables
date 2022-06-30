const table = 'BulkAnticipations'
const column = 'automatic_anticipation_fee_reimbursement'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(table, column, {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(table, column)
  },
}
