module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_Recipients_status"
      ADD VALUE 'affiliation_adjustment';
    `)
  },

  down () {
    return Promise.resolve()
  },
}
