module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('BlockOperations', 'originator_model', {
      type: Sequelize.STRING,
      allowNull: true,
    })
      .then(() =>
        queryInterface.addColumn('BlockOperations', 'originator_model_id', {
          type: Sequelize.STRING,
          allowNull: true,
        }))
  },

  down (queryInterface) {
    return queryInterface.removeColumn('BlockOperations', 'originator_model')
      .then(() => queryInterface.removeColumn('BlockOperations', 'originator_model_id'))
  },
}

