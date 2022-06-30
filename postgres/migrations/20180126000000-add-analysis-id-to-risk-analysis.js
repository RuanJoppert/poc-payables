module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('RiskAnalyses', 'analysis_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('RiskAnalyses', 'analysis_id')
  },
}
