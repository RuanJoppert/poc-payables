const tableName = 'EmvTables'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    active: {
      type: Sequelize.BOOLEAN,
    },
    stone_hash: {
      type: Sequelize.STRING,
    },
    tables_json: {
      type: Sequelize.JSONB,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable(tableName),
}
