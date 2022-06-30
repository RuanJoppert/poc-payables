const table = 'Batches'
const field = 'type'
const value = 'scd'

module.exports = {
  up (queryInterface) {
    return queryInterface.sequelize.query(`
      ALTER TYPE "enum_${table}_${field}"
      ADD VALUE '${value}';
    `)
  },

  down () {
    return Promise.resolve()
  },
}
