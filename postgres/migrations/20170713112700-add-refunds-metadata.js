module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Refunds', 'metadata', {
      type: Sequelize.JSONB,
      allowNull: true
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Refunds', 'metadata')
  }
}
