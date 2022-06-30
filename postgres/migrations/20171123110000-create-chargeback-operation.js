module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('ChargebackOperations', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chargeback_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      fee: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.FLOAT,
      },
      installment: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['chargeback', 'chargeback_refund'],
        allowNull: false,
      },
      accrual_date: Sequelize.DATE,
      cycle: {
        type: Sequelize.INTEGER,
        values: [1, 2],
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
      .then(() => queryInterface.addIndex(
        'ChargebackOperations',
        ['company_id'],
        { fields: ['company_id'] }
      ))
      .then(() => queryInterface.addIndex(
        'ChargebackOperations',
        ['transaction_id'],
        { fields: ['transaction_id'] }
      ))
      .then(() => queryInterface.addIndex(
        'ChargebackOperations',
        ['chargeback_id'],
        { fields: ['chargeback_id'] }
      ))
  },

  down (queryInterface) {
    return queryInterface.dropTable('ChargebackOperations')
  },
}

