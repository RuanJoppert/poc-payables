module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY ui_payment_link_id
    `)
  },

  down () { },
}

