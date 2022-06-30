const tableName = 'LiquidationAccounts'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
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
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['active', 'inactive'],
    },
    ispb: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_type: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['checking_account', 'savings_account', 'payment_account', 'deposit_account'],
    },
    account_number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_digit: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    branch: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    branch_digit: {
      type: Sequelize.STRING,
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
  }),
  down: queryInterface => queryInterface.dropTable(tableName),
}
