module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('OnboardingQuestions', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.TEXT,
      },
      options: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
      },
      others: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
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
    return queryInterface.dropTable('OnboardingQuestions')
  },
}
