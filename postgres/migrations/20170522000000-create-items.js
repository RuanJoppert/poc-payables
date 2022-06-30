'use strict';

const tableName = 'Items'

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      external_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      unit_price: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      venue: {
        type: Sequelize.STRING,
        allowNull: true
      },
      date: {
        type: Sequelize.STRING,
        allowNull: true
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
