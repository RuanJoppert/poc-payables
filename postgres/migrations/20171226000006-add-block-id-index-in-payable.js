const table = 'Payables'
const column = 'block_id'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY ix_payables_block_id
      ON "${table}"
      USING btree (${column});
    `)
  },

  down () {},
}

