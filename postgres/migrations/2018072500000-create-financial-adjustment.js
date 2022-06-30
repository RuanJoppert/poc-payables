const tableName = 'FinancialAdjustments'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      model: Sequelize.STRING,
      model_id: Sequelize.STRING,
      company_id: Sequelize.STRING,
      amount: Sequelize.INTEGER,
      fee: Sequelize.INTEGER,
      metadata: {
        type: Sequelize.JSONB,
        defaultValue: {},
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
      .then(() => queryInterface.addIndex(tableName, ['model', 'model_id'], {
        fields: ['model', 'model_id'],
      }))
      .then(() => queryInterface.addIndex(tableName, ['company_id'], {
        fields: ['company_id'],
      })),

  down: queryInterface =>
    queryInterface.dropTable(tableName),
}
