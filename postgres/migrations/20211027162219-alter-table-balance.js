module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "Balances" ALTER COLUMN last_id TYPE bigint;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "Balances" ALTER COLUMN last_id TYPE integer;
    `)
  },
}
