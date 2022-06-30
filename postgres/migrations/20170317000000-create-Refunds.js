'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Refunds', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      charge_fee_recipient_id: {
        type: Sequelize.STRING
      },
      processing_fee: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fee: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.INTEGER
      },
      bank_account_id: {
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['boleto','credit_card', 'debit_card']
      },
      settlement_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['refunded', 'canceled', 'failed', 'processing', 'pending_refund']
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
    .then(function() {
      return queryInterface.addIndex('Refunds', ['company_id'], {'fields':['company_id']})
    })
    .then(function() {
      return queryInterface.addIndex('Refunds', ['bank_account_id'], {'fields':['bank_account_id']})
    })
    .then(function() {
      return queryInterface.addIndex('Refunds', ['transaction_id'], {'fields':['transaction_id']})
    })
    .then(function() {
      return queryInterface.addIndex('Refunds', ['type'], {'fields':['type']})
    })
    .then(function() {
      return queryInterface.addIndex('Refunds', ['status'], {'fields':['status']})
    })
    .then(function() {
      return queryInterface.addIndex('Refunds', ['settlement_id'], {'fields':['settlement_id']})
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Refunds')
  }
}

