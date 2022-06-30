// TODO comentado o helper
// const modelsHelper = require('../lib/helper')

const tableName = 'RecipientAcquirer'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      // defaultValue: modelsHelper.cuidDefaultValue('ra_'),
    },
    company_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    retries: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    capture_retries: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ec_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
    card_brands: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    payment_methods: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    capture_methods: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
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
  }).then(() => queryInterface.addIndex(tableName, ['recipient_id'])),
  down: queryInterface => queryInterface.removeIndex(
    tableName,
    ['recipient_id']
  ).then(() => queryInterface.dropTable(tableName)),
}
