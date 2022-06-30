const tableName = 'RiskLevels'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thresholds: {
        type: Sequelize.JSON,
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
        tableName,
        ['company_id'],
        {
          fields: ['company_id'],
        }
      ))
      .then(() => queryInterface.addIndex(
        tableName,
        ['company_id', 'provider'],
        {
          fields: ['company_id', 'provider'],
        }
      ))
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
