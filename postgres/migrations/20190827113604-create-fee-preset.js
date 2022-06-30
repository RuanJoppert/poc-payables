module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('FeePresets', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      anticipation_rate: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      anticipation_delay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('FeePresets')
  },
}
