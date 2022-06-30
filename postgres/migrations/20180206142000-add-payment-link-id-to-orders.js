module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'payment_link_id', {
      type: Sequelize.STRING,
      allowNull: true,
    })
      .then(() => queryInterface.sequelize.query(`
          CREATE UNIQUE INDEX CONCURRENTLY
          ui_payment_link_id ON "Orders"
          USING btree (payment_link_id)
        `))
  },

  down (queryInterface) {
    return queryInterface.removeColumn('Orders', 'payment_link_id')
  },
}

