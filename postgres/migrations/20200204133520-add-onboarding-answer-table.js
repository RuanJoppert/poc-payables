module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('OnboardingAnswers', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'OnboardingQuestions',
          key: 'id',
        },
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      others: {
        type: Sequelize.JSON,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down (queryInterface) {
    return queryInterface.dropTable('OnboardingAnswers')
  },
}
