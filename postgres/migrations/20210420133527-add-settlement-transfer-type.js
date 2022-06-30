const tableName = 'Settlements'
const columnName = 'transfer_type'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.ENUM,
      values: ['ted', 'doc', 'credito_em_conta', 'inter_recipient', 'pix'],
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn(tableName, columnName)
  },
}
