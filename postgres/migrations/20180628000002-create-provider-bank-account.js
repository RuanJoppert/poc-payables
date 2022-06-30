const tableName = 'ProviderBankAccounts'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      legal_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bank_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agencia_dv: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      conta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conta_dv: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      document_type: {
        type: Sequelize.ENUM,
        values: ['cpf', 'cnpj'],
        allowNull: false,
      },
      document_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['conta_corrente'],
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
      .then(() => queryInterface.addIndex(tableName, ['name'], {
        fields: ['name'],
      })),

  down: queryInterface =>
    queryInterface.dropTable(tableName),
}
