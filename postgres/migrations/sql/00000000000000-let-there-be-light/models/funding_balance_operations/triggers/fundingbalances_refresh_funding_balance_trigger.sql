CREATE TRIGGER fundingbalances_refresh_funding_balance_trigger
  AFTER DELETE OR UPDATE OR TRUNCATE ON "FundingBalanceOperations"
  FOR EACH STATEMENT
  EXECUTE PROCEDURE fundingbalances_refresh_funding_balance();
