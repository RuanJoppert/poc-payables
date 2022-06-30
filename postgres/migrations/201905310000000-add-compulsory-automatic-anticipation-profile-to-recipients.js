module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_Recipients_automatic_anticipation_type"
      ADD VALUE 'compulsory';
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_Recipients_automatic_anticipation_type"
      DROP VALUE 'compulsory';
    `)
  },
}
