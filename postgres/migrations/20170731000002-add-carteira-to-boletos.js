module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Boletos', 'carteira', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Boletos', 'carteira')
  }
}
