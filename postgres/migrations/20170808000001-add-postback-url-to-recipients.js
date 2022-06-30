module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'postback_url', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Recipients', 'postback_url')
  }
}