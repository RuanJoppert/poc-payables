module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_Receivables_origin"
      ADD VALUE 'caixa';
    `)
  },
  down () {
    return Promise.resolve()
  },
}
