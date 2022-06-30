module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('ReprocessedTransactions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      original_transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      analyzed: {
        type: Sequelize.BOOLEAN,
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
    })
  },
  down (queryInterface) {
    return queryInterface.dropTable('ReprocessedTransactions')
  },
}
