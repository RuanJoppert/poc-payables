function payablesPostgresRepository ({
  postgresDatabase,
  payablesSchema,
}) {
  const { Payables } = postgresDatabase.sequelize.models

  async function create (data) {
    const payable = await Payables
      .create(payablesSchema.serializeToPostgres(data))

    return payablesSchema.serializeFromPostgres(payable)
  }

  return {
    create,
  }
}

module.exports = payablesPostgresRepository
