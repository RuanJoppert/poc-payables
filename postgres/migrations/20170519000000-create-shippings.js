'use strict';

const tableName = 'Shippings'

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING
      },
      fee: {
        type: Sequelize.INTEGER
      },
      delivery_date: {
        type: Sequelize.STRING
      },
      expedited: {
        type: Sequelize.BOOLEAN
      },
      method: {
        type: Sequelize.STRING
      },
      address_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName)
  }
}
