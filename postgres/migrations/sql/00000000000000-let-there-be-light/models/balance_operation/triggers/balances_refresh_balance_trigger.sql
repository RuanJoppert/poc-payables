CREATE TRIGGER balances_refresh_balance_trigger
  AFTER DELETE OR UPDATE OR TRUNCATE ON "BalanceOperations"
  FOR EACH STATEMENT
  EXECUTE PROCEDURE balances_refresh_balance();
