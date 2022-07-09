function payablesService ({ payablesRepository }) {
  async function createPayable (data) {
    return payablesRepository.create(data)
  }

  return {
    createPayable,
  }
}

module.exports = payablesService
