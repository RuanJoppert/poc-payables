const stoneBrandStatuses = require('./helpers/stone-brand-statuses')
const validAffiliationProducts = require('./helpers/affiliation-products')

const tableName = 'AffiliationOperations'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      acquirer_affiliation_id: Sequelize.INTEGER,
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pendente Bandeira',
        validate: {
          isIn: [stoneBrandStatuses],
        },
      },
      product: {
        type: Sequelize.STRING,
        validate: {
          isIn: [validAffiliationProducts],
        },
      },
      last_update: Sequelize.DATE,
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
        ['product'],
        { fields: ['product'] }
      ))
      .then(() => queryInterface.addIndex(
        tableName,
        ['acquirer_affiliation_id'],
        { fields: ['acquirer_affiliation_id'] }
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
