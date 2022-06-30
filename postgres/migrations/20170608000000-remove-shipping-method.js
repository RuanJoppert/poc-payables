'use strict'

const tableName = 'Shippings'
const columnName = 'method'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.removeColumn(tableName, columnName)
  },
  down (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.STRING
    })
  }
}
