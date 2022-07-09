const { asFunction } = require('awilix')

const {
  usersPostgresRepository,
  todosPostgresRepository,
  payablesPostgresRepository,
} = require('../repositories/postgres')

function register (container) {
  container.register({
    usersRepository: asFunction(usersPostgresRepository).singleton(),
    todosRepository: asFunction(todosPostgresRepository).singleton(),
    payablesRepository: asFunction(payablesPostgresRepository).singleton(),
  })
}

module.exports = register
