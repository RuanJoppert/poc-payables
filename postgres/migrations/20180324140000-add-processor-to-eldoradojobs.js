module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('EldoradoJobs', 'processor', {
      type: Sequelize.TEXT,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('EldoradoJobs', 'processor')
  },
}
