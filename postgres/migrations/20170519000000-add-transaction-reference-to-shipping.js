'use strict';

const tableName = 'Transactions'
const columnName = 'shipping_id'

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.INTEGER,
      allowNull: true
    }).then(() =>
      queryInterface.addIndex(tableName, [columnName], {
        fields: [columnName]
      })
    )
  },
  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(tableName, columnName)
  }
}
