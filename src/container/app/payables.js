const { asFunction } = require('awilix')

const {
  payablesSchema,
  payablesService,
} = require('../../app/payables')

function register (container) {
  container.register({
    payablesSchema: asFunction(payablesSchema),
    payablesService: asFunction(payablesService),
  })
}

module.exports = register
