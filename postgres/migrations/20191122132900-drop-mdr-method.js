module.exports = {
  up (queryInterface) {
    return queryInterface.dropTable('MdrMethod')
  },
  down () {
    return null
  },
}
