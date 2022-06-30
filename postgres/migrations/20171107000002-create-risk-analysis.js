module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('RiskAnalyses', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      model: {
        type: Sequelize.ENUM,
        values: ['company', 'recipient'],
        allowNull: false,
      },
      model_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      decision_maker: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      decision: {
        type: Sequelize.ENUM,
        values: [
          'approved',
          'refused',
          'in_progress',
          'pending',
        ],
        defaultValue: 'in_progress',
        allowNull: false,
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: [
          'register',
          'site_url',
        ],
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
    return queryInterface.dropTable('RiskAnalyses')
  },
}

