const tableName = 'FinancialMovements'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    model_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    company_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    recipient_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amount: Sequelize.INTEGER,
    status: {
      type: Sequelize.ENUM,
      values: ['waiting_funds', 'canceled', 'paid'],
      defaultValue: 'waiting_funds',
      allowNull: false,
    },
    payment_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    original_payment_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: queryInterface =>
    queryInterface.dropTable(tableName),
}
