'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Cards', 'persistence_type', {
      type: Sequelize.ENUM,
      values: ['encrypted_data', 'tokenization']
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Cards', 'persistence_type')
  }
};
