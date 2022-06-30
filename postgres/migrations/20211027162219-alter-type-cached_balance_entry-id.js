module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "cached_balance_entry" ALTER ATTRIBUTE id TYPE bigint;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "cached_balance_entry" ALTER ATTRIBUTE id TYPE integer;
    `)
  },
}
