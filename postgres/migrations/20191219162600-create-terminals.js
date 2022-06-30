const tableName = 'Terminals'

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(tableName, {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    terminal_id: {
      type: Sequelize.STRING(8),
      allowNull: false,
    },
    capabilities: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
    additional_capabilities: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    type: {
      type: Sequelize.SMALLINT,
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
  }),

  down: queryInterface => queryInterface.dropTable(tableName),
}
