module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('SecurityRules', 'batch_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('SecurityRules', 'batch_id')
  },
}
