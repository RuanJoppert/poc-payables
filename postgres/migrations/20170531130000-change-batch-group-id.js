'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Batches', 'batch_group_id')
      .then(() => {
        return queryInterface.addColumn('Batches', 'batch_group_id', {
          type: Sequelize.INTEGER,
          allwNull: true
        })
      })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Batches', 'batch_group_id', {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
}
