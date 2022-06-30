module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "OnboardingAnswers"
      ALTER COLUMN user_id
      DROP NOT NULL;
    `)
  },
  down (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TABLE "OnboardingAnswers"
      ALTER COLUMN user_id
      SET NOT NULL;
    `)
  },
}
