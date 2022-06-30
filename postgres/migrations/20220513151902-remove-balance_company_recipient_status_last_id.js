module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP INDEX CONCURRENTLY IF EXISTS balance_company_recipient_status_last_id;
    `)
  },
  down () {
    return true
  },
}
