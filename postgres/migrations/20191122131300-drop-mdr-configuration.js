module.exports = {
  up (queryInterface) {
    return queryInterface.dropTable('MdrConfiguration')
  },
  down () {
    return null
  },
}
