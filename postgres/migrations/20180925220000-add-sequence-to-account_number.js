module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE SEQUENCE
        "Recipients_account_number_seq"
      START 669000;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      DROP SEQUENCE IF EXISTS "Recipients_account_number_seq"
    `)
  },
}
