module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "cached_balance_entry" ALTER ATTRIBUTE last_id TYPE bigint;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "cached_balance_entry" ALTER ATTRIBUTE last_id TYPE integer;
    `)
  },
}
