module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'document_number', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Recipients', 'document_number')
  },
}
