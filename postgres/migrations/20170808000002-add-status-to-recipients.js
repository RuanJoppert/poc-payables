module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Recipients', 'status', {
      type: Sequelize.ENUM,
      values: ['registration', 'affiliation', 'active', 'refused', 'suspended', 'blocked', 'inactive'],
      allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Recipients', 'status')
  }
}