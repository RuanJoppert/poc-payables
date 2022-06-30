const tableName = 'ProviderDebits'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['waiting_payment', 'paid', 'failed'],
        defaultValue: 'waiting_payment',
      },
      recipient_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_type: {
        type: Sequelize.ENUM,
        values: ['provider'],
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      settlement_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    })
      .then(() => queryInterface.addIndex(tableName, ['target', 'target_type'], {
        fields: ['target', 'target_type'],
      }))
      .then(() => queryInterface.addIndex(tableName, ['created_at'], {
        fields: ['created_at'],
      })),

  down: queryInterface =>
    queryInterface.dropTable(tableName),
}
