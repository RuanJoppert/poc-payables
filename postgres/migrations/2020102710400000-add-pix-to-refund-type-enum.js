module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_Refunds_type"
      ADD VALUE 'pix';
    `)
  },

  down () {
    return Promise.resolve()
  },
}
