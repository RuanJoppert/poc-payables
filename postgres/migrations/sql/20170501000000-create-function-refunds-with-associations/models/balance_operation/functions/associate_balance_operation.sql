CREATE OR REPLACE FUNCTION associate_balance_operation(
  bo_row "BalanceOperations"
)
RETURNS balance_operation_with_associations
LANGUAGE plpgsql AS $$
DECLARE
  balance_operation balance_operation_with_associations;
BEGIN
  balance_operation.id                 = bo_row.id;
  balance_operation.status             = bo_row.status;
  balance_operation.balance_amount     = bo_row.balance_amount;
  balance_operation.balance_old_amount = bo_row.balance_old_amount;
  balance_operation.type               = bo_row.type;
  balance_operation.amount             = bo_row.amount;
  balance_operation.fee                = bo_row.fee;
  balance_operation.created_at         = bo_row.created_at;
  balance_operation.object_type        = bo_row.object_type;
  balance_operation.object_id          = bo_row.object_id;

  CASE balance_operation.object_type
  WHEN 'payable' THEN
    balance_operation.movement_data = payables_with_associations( varchar_to_int(balance_operation.object_id) );
  WHEN 'fee_collection' THEN
    balance_operation.movement_data = fee_collections_with_associations( balance_operation.object_id );
  WHEN 'transfer' THEN
    balance_operation.movement_data = transfers_with_associations( varchar_to_int(balance_operation.object_id) );
  WHEN 'refund' THEN
    balance_operation.movement_data = refunds_with_associations( balance_operation.object_id );
  ELSE
    balance_operation.movement_data = NULL;
  END CASE;

  RETURN balance_operation;
END
$$;
