module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE transfer_with_associations ADD ATTRIBUTE metadata json;
    `)
  },

  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE transfer_with_associations DROP ATTRIBUTE metadata json;
    `)
  },
}
