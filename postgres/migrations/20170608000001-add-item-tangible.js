'use strict'

const tableName = 'Shippings'
const columnName = 'tangible'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.BOOLEAN
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(tableName, columnName)
  }
}
