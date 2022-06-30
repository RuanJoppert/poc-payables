const tableName = 'Blocks'

module.exports = {
  up (queryInterface, Sequelize) {
    const createCompanyIdIndex = () => queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY ix_blocks_company_id
      ON "${tableName}"
      USING btree (company_id);
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
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['full'],
        defaultValue: 'full',
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
    })
      .then(createCompanyIdIndex)
  },

  down (queryInterface) {
    return queryInterface.dropTable(tableName)
  },
}

