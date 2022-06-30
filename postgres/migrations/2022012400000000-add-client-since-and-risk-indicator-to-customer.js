const tableName = 'Customers'
const columnClientSince = 'client_since'
const columnRiskIndicator = 'risk_indicator'


module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(tableName, columnClientSince, {
        type: Sequelize.DATEONLY,
        allowNull: true,
      }),
      queryInterface.addColumn(tableName, columnRiskIndicator, {
        type: Sequelize.DECIMAL,
        allowNull: true,
      }),
    ])
  },

  down (queryInterface) {
    return Promise.all([
      queryInterface.removeColumn(tableName, columnClientSince),
      queryInterface.removeColumn(tableName, columnRiskIndicator),
    ])
  },
}
