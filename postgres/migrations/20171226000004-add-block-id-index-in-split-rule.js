const table = 'SplitRules'
const column = 'block_id'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE INDEX CONCURRENTLY ix_split_rules_block_id
      ON "${table}"
      USING btree (${column});
    `)
  },

  down () {},
}

