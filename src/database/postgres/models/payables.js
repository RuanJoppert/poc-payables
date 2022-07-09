const { DataTypes } = require('sequelize')

const tableName = 'Payables'

const attributes = {
  status: {
    type: DataTypes.ENUM,
    values: [
      'waiting_funds',
      'confirmed',
      'prepaid',
      'paid',
      'suspended',
      'cancelled',
    ],
    defaultValue: 'waiting_funds',
    allowNull: false,
  },
  fee_status: {
    type: DataTypes.ENUM,
    values: [
      'waiting_funds',
      'confirmed',
      'prepaid',
      'paid',
      'suspended',
    ],
    defaultValue: 'waiting_funds',
    allowNull: false,
  },
  anticipation_fee_status: {
    type: DataTypes.ENUM,
    values: [
      'waiting_funds',
      'confirmed',
      'prepaid',
      'paid',
      'suspended',
    ],
  },
  amount: DataTypes.INTEGER,
  fee: DataTypes.INTEGER,
  anticipation_fee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fraud_coverage_fee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  installment: DataTypes.INTEGER,
  company_id: DataTypes.STRING,
  payment_date: DataTypes.DATE,
  fee_payment_date: DataTypes.DATE,
  anticipation_fee_payment_date: DataTypes.DATE,
  original_payment_date: DataTypes.DATE,
  fee_original_payment_date: DataTypes.DATE,
  anticipation_fee_original_payment_date: DataTypes.DATE,
  type: {
    type: DataTypes.ENUM,
    values: [
      'credit',
      'refund',
      'refund_reversal',
      'chargeback',
      'chargeback_refund',
      'block',
      'unblock',
    ],
  },
  payment_method: {
    type: DataTypes.ENUM,
    values: ['credit_card', 'boleto', 'debit_card', 'pix'],
  },
  recipient_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  split_rule_id: DataTypes.STRING,
  block_id: DataTypes.STRING,
  liquidation_type: {
    type: DataTypes.ENUM,
    values: ['external', 'cross_balance'],
    allowNull: true,
  },
  liquidation_engine: {
    type: DataTypes.ENUM,
    values: ['internal_settlement'],
    allowNull: true,
    defaultValue: null,
  },
  originator: { // Pass originator to BalanceOperations
    type: DataTypes.VIRTUAL,
  },
  accrual_date: {
    type: DataTypes.DATE,
  },
  batch_id: {
    type: DataTypes.STRING,
  },
  anticipation_fee_base: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tax_fee: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  anticipation_spread_amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  liquidation_arrangement_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_anticipatable: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  originator_model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  originator_model_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  anticipation_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bulk_anticipation_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  card_brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  original_anticipation_fee: {
    type: DataTypes.VIRTUAL,
    allowNull: true,
    defaultValue: 0,
  },
  document_type: {
    type: DataTypes.ENUM,
    values: ['cpf', 'cnpj'],
    allowNull: true,
  },
  document_number: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isNumeric: true,
    },
  },
  funding_type: {
    type: DataTypes.ENUM,
    values: ['fidc', 'scd'],
    allowNull: true,
  },
  private_label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  receivable_schedule_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}

const options = {
  tableName,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
}

function define (database) {
  const model = database.define(
    tableName,
    attributes,
    options,
  )

  return model
}

module.exports = {
  define,
}
