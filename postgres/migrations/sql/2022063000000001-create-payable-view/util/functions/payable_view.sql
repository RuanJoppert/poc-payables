CREATE OR REPLACE VIEW payable_view AS
  SELECT
    id::varchar,
    status::varchar,
    fee_status::varchar,
    anticipation_fee_status::varchar,
    amount,
    fee,
    anticipation_fee,
    installment,
    company_id,
    payment_date::varchar,
    fee_payment_date::varchar,
    anticipation_fee_payment_date::varchar,
    original_payment_date::varchar,
    fee_original_payment_date::varchar,
    anticipation_fee_original_payment_date::varchar,
    type::varchar,
    payment_method::varchar,
    recipient_id,
    split_rule_id,
    created_at::varchar,
    updated_at::varchar,
    transaction_id,
    bulk_anticipation_id,
    funding_request_id,
    fee_funding_request_id,
    anticipation_fee_funding_request_id,
    receivable_id,
    fee_revenue_anticipation_id,
    anticipation_fee_revenue_anticipation_id,
    accrual_date::varchar,
    batch_id,
    block_id,
    fraud_coverage_fee,
    anticipation_id,
    liquidation_arrangement_key,
    anticipation_fee_base,
    anticipation_spread_amount::varchar,
    tax_fee,
    is_anticipatable::varchar,
    liquidation_type::varchar,
    originator_model,
    originator_model_id,
    card_brand,
    document_type,
    document_number,
    funding_type,
    private_label,
    liquidation_engine::varchar,
    receivable_schedule_id
  FROM "PayablesNew";

--- Create function for moving from payable_view to payable_new
CREATE OR REPLACE FUNCTION moving_payable_view_to_payable_new ()
RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO "PayablesNew" (
    id,
    status,
    fee_status,
    anticipation_fee_status,
    amount,
    fee,
    anticipation_fee,
    installment,
    company_id,
    payment_date,
    fee_payment_date,
    anticipation_fee_payment_date,
    original_payment_date,
    fee_original_payment_date,
    anticipation_fee_original_payment_date,
    type,
    payment_method,
    recipient_id,
    split_rule_id,
    created_at,
    updated_at,
    transaction_id,
    bulk_anticipation_id,
    funding_request_id,
    fee_funding_request_id,
    anticipation_fee_funding_request_id,
    receivable_id,
    fee_revenue_anticipation_id,
    anticipation_fee_revenue_anticipation_id,
    accrual_date,
    batch_id,
    block_id,
    fraud_coverage_fee,
    anticipation_id,
    liquidation_arrangement_key,
    anticipation_fee_base,
    anticipation_spread_amount,
    tax_fee,
    is_anticipatable,
    liquidation_type,
    originator_model,
    originator_model_id,
    card_brand,
    document_type,
    document_number,
    funding_type,
    private_label,
    liquidation_engine,
    receivable_schedule_id
  ) VALUES (
    NEW.id::bigint,
    NEW.status::"enum_Payables_status",
    NEW.fee_status::"enum_Payables_fee_status",
    NEW.anticipation_fee_status::"enum_Payables_anticipation_fee_status",
    NEW.amount,
    NEW.fee,
    NEW.anticipation_fee,
    NEW.installment,
    NEW.company_id,
    NEW.payment_date::timestamptz,
    NEW.fee_payment_date::timestamptz,
    NEW.anticipation_fee_payment_date::timestamptz,
    NEW.original_payment_date::timestamptz,
    NEW.fee_original_payment_date::timestamptz,
    NEW.anticipation_fee_original_payment_date::timestamptz,
    NEW.type::"enum_Payables_type",
    NEW.payment_method::"enum_Payables_payment_method",
    NEW.recipient_id,
    NEW.split_rule_id,
    NEW.created_at::timestamptz,
    NEW.updated_at::timestamptz,
    NEW.transaction_id,
    NEW.bulk_anticipation_id,
    NEW.funding_request_id,
    NEW.fee_funding_request_id,
    NEW.anticipation_fee_funding_request_id,
    NEW.receivable_id,
    NEW.fee_revenue_anticipation_id,
    NEW.anticipation_fee_revenue_anticipation_id,
    NEW.accrual_date::timestamptz,
    NEW.batch_id,
    NEW.block_id,
    NEW.fraud_coverage_fee,
    NEW.anticipation_id,
    NEW.liquidation_arrangement_key,
    NEW.anticipation_fee_base,
    NEW.anticipation_spread_amount::numeric,
    NEW.tax_fee,
    NEW.is_anticipatable::boolean,
    NEW.liquidation_type::"enum_Payables_liquidation_type",
    NEW.originator_model,
    NEW.originator_model_id,
    NEW.card_brand,
    NEW.document_type,
    NEW.document_number,
    NEW.funding_type,
    NEW.private_label,
    NEW.liquidation_engine::"enum_Payables_liquidation_engine",
    NEW.receivable_schedule_id
  ) ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;


--- Create Trigger for the payable_view
DROP TRIGGER IF EXISTS moving_payable_view_to_payable_new ON payable_view;

CREATE TRIGGER moving_payable_view_to_payable_new
  INSTEAD OF INSERT OR UPDATE ON payable_view
    FOR EACH ROW EXECUTE PROCEDURE moving_payable_view_to_payable_new();
