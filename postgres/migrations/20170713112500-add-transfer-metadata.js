module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Transfers', 'metadata', {
      type: Sequelize.JSONB,
      allowNull: true
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transfers', 'metadata')
  }
}
