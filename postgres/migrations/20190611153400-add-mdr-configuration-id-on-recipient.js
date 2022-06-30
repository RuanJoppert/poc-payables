module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'mdr_configuration_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Recipients', 'mdr_configuration_id')
  },
}
