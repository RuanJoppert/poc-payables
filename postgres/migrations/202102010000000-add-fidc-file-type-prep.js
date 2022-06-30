module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FidcFiles_type"
      ADD VALUE 'prep';
    `)
  },
  down () {},
}
