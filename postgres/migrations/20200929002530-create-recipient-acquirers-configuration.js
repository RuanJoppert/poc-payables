// TODO comentado o helper
// const modelsHelper = require('../lib/helper')

const tableName = 'RecipientAcquirersConfiguration'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      // defaultValue: modelsHelper.cuidDefaultValue('rac_'),
    },
    company_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    card_brands: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    payment_methods: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    capture_methods: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    recipient_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    acquirers: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
  }).then(() => queryInterface.addIndex(tableName, ['recipient_id'])),
  down: queryInterface => queryInterface.removeIndex(
    tableName,
    ['recipient_id']
  ).then(() => queryInterface.dropTable(tableName)),
}
