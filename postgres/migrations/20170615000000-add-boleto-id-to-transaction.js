'use strict'

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Transactions', 'boleto_id', {
      type: Sequelize.STRING
    })
      .then(() => queryInterface.sequelize.query(`
        CREATE INDEX CONCURRENTLY transactions_boleto_id
        ON "Transactions"
        USING btree (boleto_id);
      `))
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transactions', 'boleto_id')
  }
}
