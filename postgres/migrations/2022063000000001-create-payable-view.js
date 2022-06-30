'use strict'

const fs = require('fs')
const Promise = require('bluebird')
const readfile = Promise.promisify(fs.readFile)

const path = require('path')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.resolve().then(() => loadSQLFile('util/functions/payable_view.sql'))
    // postgres/migrations/sql/2022063000000001-create-payable-view/util/functions/payable_view.sql
    function loadSQLFile (filePath) {
      return readfile(`/code/postgres/migrations/sql/2022063000000001-create-payable-view/${filePath}`)
        .then(function (buffer) {
          return queryInterface.sequelize.query(buffer.toString())
        })
    }
  },

  down: function (queryInterface, Sequelize) {
    return Promise.resolve()
  }
}
