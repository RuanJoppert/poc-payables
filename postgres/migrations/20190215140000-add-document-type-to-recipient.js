module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'document_type', {
      type: Sequelize.ENUM,
      values: ['cpf', 'cnpj'],
      allowNull: true,
      defaultValue: null,
    })
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Recipients', 'document_type')
  },
}
