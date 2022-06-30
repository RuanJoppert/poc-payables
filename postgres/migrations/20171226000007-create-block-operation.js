const tableName = 'BlockOperations'

module.exports = {
  up (queryInterface, Sequelize) {
    const createCompanyIdIndex = () => queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY ix_block_operation_company_id
      ON "${tableName}"
      USING btree (company_id);
    `)

    const createBlockIdIndex = () => queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY ix_block_operation_block_id
      ON "${tableName}"
      USING btree (block_id);
    `)

    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      block_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['block', 'unblock', 'future-block'],
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
      .then(createCompanyIdIndex)
      .then(createBlockIdIndex)
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}

