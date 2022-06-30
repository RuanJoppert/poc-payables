module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('RiskAnalyses', 'status', {
      type: Sequelize.ENUM,
      values: [
        'processing',
        'success',
        'failed',
      ],
      defaultValue: 'processing',
      allowNull: false,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('RiskAnalyses', 'status')
  },
}
