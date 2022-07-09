function payablesSchema ({ validator }) {
  const dataSchema = {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        maxLength: 256,
      },
      company_id: {
        type: 'string',
        maxLength: 256,
      },
    },
    required: [
      'status',
      'company_id',
    ],
    additionalProperties: true,
  }

  function validate ({ data, schema }) {
    const { valid, errors } = validator({
      content: data,
      schema,
    })

    if (valid) {
      return data
    }

    throw new Error(`Invalid parameters: ${errors}`)
  }

  function serializeFromPostgres (data) {
    return data
  }

  function serializeToPostgres (data) {
    validate({
      data,
      schema: dataSchema,
    })

    return data
  }

  return {
    serializeFromPostgres,
    serializeToPostgres,
    validate,
  }
}

module.exports = payablesSchema
