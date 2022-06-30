module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE public."enum_FidcFiles_type"
      ADD VALUE 'acl';
    `)
  },

  down () {},
}
