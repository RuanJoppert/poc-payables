module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('PaymentLinks', 'short_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
      .then(() => queryInterface.sequelize.query(`
          CREATE UNIQUE INDEX CONCURRENTLY
          ui_payment_link_short_id ON "PaymentLinks"
          USING btree (short_id)
        `))
  },

  down (queryInterface) {
    return queryInterface.removeColumn('PaymentLinks', 'short_id')
  },
}

