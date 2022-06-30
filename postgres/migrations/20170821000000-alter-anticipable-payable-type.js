const Promise = require('bluebird')

module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE amount SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE net_amount SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE fee SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE anticipation_fee SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE total_net_amount SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE total_gross_amount SET DATA TYPE BIGINT;'))

    function query (rawQuery) {
      return function () { return queryInterface.sequelize.query(rawQuery) }
    }
  },

  down (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE amount SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE net_amount SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE fee SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE anticipation_fee SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE total_net_amount SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_payable ALTER ATTRIBUTE total_gross_amount SET DATA TYPE INTEGER;'))

    function query (rawQuery) {
      return function () { return queryInterface.sequelize.query(rawQuery) }
    }
  }
}
