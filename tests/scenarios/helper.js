// export const connectionString = 'postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable'
export const connectionString = 'postgres://ruan.felipe:__Ru@nF3l1p3__@live-db-prd-aws-2607-sanitized.cqhzzsnl0ged.us-east-1.rds.amazonaws.com:5432/pagarme?sslmode=disable'

export const makePayable = ({ updatedAt }) => `insert into "Payables" (
  "id", "accrual_date", "amount", "anticipation_fee",
  "anticipation_fee_base", "anticipation_fee_funding_request_id",
  "anticipation_fee_original_payment_date",
  "anticipation_fee_payment_date",
  "anticipation_fee_revenue_anticipation_id",
  "anticipation_fee_status", "anticipation_id",
  "anticipation_spread_amount", "batch_id",
  "block_id", "bulk_anticipation_id",
  "card_brand", "company_id", "created_at",
  "document_number", "document_type",
  "fee", "fee_funding_request_id",
  "fee_original_payment_date", "fee_payment_date",
  "fee_revenue_anticipation_id",
  "fee_status", "fraud_coverage_fee",
  "funding_request_id", "funding_type",
  "installment", "is_anticipatable",
  "liquidation_arrangement_key",
  "liquidation_engine", "liquidation_type",
  "original_payment_date", "originator_model",
  "originator_model_id", "payment_date",
  "payment_method", "private_label",
  "receivable_id", "receivable_schedule_id",
  "recipient_id", "split_rule_id",
  "status", "tax_fee", "transaction_id",
  "type", "updated_at"
)
values
  (
    DEFAULT, '2022-07-13 23:25:54.78+00', 10000,
    NULL, 0, NULL, NULL, '2022-07-13 23:25:54.78+00',
    NULL, NULL, NULL, 0, NULL, NULL, NULL,
    NULL, 'haley_and_sons', '2022-07-13 23:25:54.78+00',
    '29681736938', 'cpf', 143, NULL, NULL,
    '2022-07-13 23:25:54.78+00', NULL,
    'prepaid', 0, NULL, NULL, 1, true,
    NULL, NULL, NULL, NULL, NULL, NULL,
    '2022-07-13 23:25:54.78+00', 'credit_card',
    NULL, NULL, NULL, 'herman_heidenreich_and_jast',
    NULL, 'paid', 0, 1, 'credit', '${updatedAt}'
  );
`

export const updateRandomPayable = `WITH cte AS (
  SELECT id
  FROM   "Payables"
  WHERE fee_status != 'paid'
  LIMIT  1
)
UPDATE "Payables" p
SET    fee_status = 'paid'
FROM   cte
WHERE  p.id = cte.id`

export default { makePayable, connectionString, updateRandomPayable }
