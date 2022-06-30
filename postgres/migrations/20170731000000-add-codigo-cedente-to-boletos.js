module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Boletos', 'codigo_cedente', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },
  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Boletos', 'codigo_cedente')
  }
}
