module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_Transfers_type"
      ADD VALUE 'pix';
    `)
  },
  down () {
    return Promise.resolve()
  },
}
