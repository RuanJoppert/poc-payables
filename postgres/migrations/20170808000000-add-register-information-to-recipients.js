module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'register_information', {
      type: Sequelize.JSON,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Recipients', 'register_information')
  },
}
