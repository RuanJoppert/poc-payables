module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('SecurityRules', 'active', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('SecurityRules', 'active')
  },
}
