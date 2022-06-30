const tableName = 'CardTransfers'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(tableName, {
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
        values: ['success', 'failed', 'processing'],
        defaultValue: null,
      },
      status_reason: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      status_code: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      target: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      target_type: {
        type: Sequelize.ENUM,
        values: ['prepaid'],
        defaultValue: 'prepaid',
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
      .then(() => queryInterface.addIndex(tableName, ['company_id'], {
        fields: ['company_id'],
      })),

  down: queryInterface =>
    queryInterface.dropTable(tableName),
}
