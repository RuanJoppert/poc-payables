module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "Recipients"
      ALTER COLUMN account_number
      SET DEFAULT nextval('"Recipients_account_number_seq"'::regclass);
    `)
  },
  down () {
  },
}
