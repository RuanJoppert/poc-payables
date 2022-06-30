const validAffiliationStatuses = require('./helpers/affiliation-statuses')
const validAffiliationProducts = require('./helpers/affiliation-products')

const tableName = 'AcquirerAffiliations'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'waiting_vouchers',
        validate: {
          isIn: [validAffiliationStatuses],
        },
      },
      company_id: Sequelize.STRING,
      acquirer_id: Sequelize.STRING,
      key: Sequelize.STRING,
      bank_account_id: {
        type: Sequelize.INTEGER,
      },
      address_id: {
        type: Sequelize.INTEGER,
      },
      postback_url: Sequelize.STRING,
      document_type: Sequelize.STRING,
      document_number: Sequelize.STRING,
      legal_name: Sequelize.STRING,
      name: Sequelize.STRING,
      mcc: Sequelize.STRING,
      requested_products: {
        type: Sequelize.ARRAY({
          type: Sequelize.STRING,
          validate: {
            isIn: [validAffiliationProducts],
          },
        }),
        allowNull: false,
      },
      affiliated_products: {
        type: Sequelize.ARRAY({
          type: Sequelize.STRING,
          validate: {
            isIn: [validAffiliationProducts],
          },
        }),
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
    })
    .then(() => queryInterface.addIndex(
      tableName,
      ['company_id'],
      { fields: ['company_id'] }
    ))
    .then(() => queryInterface.addIndex(
      tableName,
      ['acquirer_id'],
      { fields: ['acquirer_id'] }
    ))
    .then(() => queryInterface.addIndex(
      tableName,
      ['document_number'],
      { fields: ['document_number'] }
    ))
    .then(() => queryInterface.addIndex(
      tableName,
      ['status'],
      { fields: ['status'] }
    ))
  },
  down: function (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}
