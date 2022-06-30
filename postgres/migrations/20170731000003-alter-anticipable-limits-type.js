const Promise = require('bluebird')

module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE maximum_amount SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE maximum_anticipation_fee SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE maximum_fee SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE minimum_amount SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE minimum_anticipation_fee SET DATA TYPE BIGINT;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE minimum_fee SET DATA TYPE BIGINT;'))

    function query (rawQuery) {
      return function () { return queryInterface.sequelize.query(rawQuery) }
    }
  },

  down (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE maximum_amount SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE maximum_anticipation_fee SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE maximum_fee SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE minimum_amount SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE minimum_anticipation_fee SET DATA TYPE INTEGER;'))
      .then(query('ALTER TYPE anticipable_limit ALTER ATTRIBUTE minimum_fee SET DATA TYPE INTEGER;'))

    function query (rawQuery) {
      return function () { return queryInterface.sequelize.query(rawQuery) }
    }
  }
}
