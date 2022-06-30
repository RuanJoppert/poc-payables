module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('CustomCharges', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['pending', 'paid', 'canceled'],
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['boleto', 'credit_card', 'fee_collection'],
      },
      payment_type: {
        type: Sequelize.ENUM,
        allowNull: true,
        values: ['transaction', 'fee_collection'],
      },
      expiration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['terminal', 'setup'],
      },
      metadata: {
        type: Sequelize.JSONB,
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
  },
  down (queryInterface) {
    return queryInterface.dropTable('CustomCharges')
  },
}
