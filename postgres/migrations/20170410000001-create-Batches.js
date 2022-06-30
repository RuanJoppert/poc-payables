'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Batches', {
    	id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        unique: 'multiple_constraint'
      },
      card_brand: {
        type: Sequelize.STRING,
        unique: 'multiple_constraint' 
      },
      status: {
        type: Sequelize.ENUM,
        values: ['waiting_payment','paid'],
        defaultValue: 'waiting_payment'
      },
      amount: {
        type: Sequelize.INTEGER,
      	defaultValue: 0
      },
      fee: {
        type: Sequelize.INTEGER,
      	defaultValue: 0
      },
      anticipation_fee: {
        type: Sequelize.INTEGER,
      	defaultValue: 0
      },
      batch_group_id: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM,
        values: ['fidc'],
        defaultValue: 'fidc',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      uniqueKeys: {
        multiple_constraint: {
          fields: ['payment_date', 'card_brand']
        }
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Batches')
  }
}
