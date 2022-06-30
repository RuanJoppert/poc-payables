module.exports = {
  up (queryInterface) {
    return queryInterface.removeColumn('Recipients', 'metadata')
  },

  down (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'metadata', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },
}
