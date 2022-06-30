module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query('ALTER TABLE "Recipients" ALTER COLUMN automatic_anticipation_1025_delay SET DEFAULT 365')
  },

  down (queryInterface) {
    return queryInterface.sequelize.query('ALTER TABLE "Recipients" ALTER COLUMN automatic_anticipation_1025_delay SET DEFAULT 15')
  },
}
