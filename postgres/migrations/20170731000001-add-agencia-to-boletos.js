module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Boletos', 'agencia', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Boletos', 'agencia')
  }
}
