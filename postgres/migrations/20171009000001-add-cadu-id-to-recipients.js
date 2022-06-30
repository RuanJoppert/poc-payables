module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'cadu_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Recipients', 'cadu_id')
  },
}
