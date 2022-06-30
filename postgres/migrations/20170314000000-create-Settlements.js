'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Settlements', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending","settled","failed","processing","canceled"],
        defaultValue: "pending",
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: ['transfer', 'refund'],
        allowNull: false
      },
      amount: {
        type: Sequelize.BIGINT,
        validate: { min: 0 },
        allowNull: false
      },
      cost: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bank_account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bank_response_code: {
        type: Sequelize.STRING,
      },
      edi_file_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
    .then(function() {
      return queryInterface.addIndex('Settlements', ["status"], {"fields":["status"]})
    })
    .then(function() {
      return queryInterface.addIndex('Settlements', ["bank_account_id"], {"fields":["bank_account_id"]})
    })
    .then(function() {
      return queryInterface.addIndex('Settlements', ["edi_file_id"], {"fields":["edi_file_id"]})
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Settlements')
  }
}
