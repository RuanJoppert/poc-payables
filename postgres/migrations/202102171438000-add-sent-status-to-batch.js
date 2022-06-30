const table = 'Batches'
const field = 'status'
const value = 'sent'

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
