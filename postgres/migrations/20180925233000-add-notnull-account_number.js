module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "Recipients"
      ALTER COLUMN account_number
      SET NOT NULL;
    `)
  },
  down () {
  },
}
