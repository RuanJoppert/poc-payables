CREATE CONSTRAINT TRIGGER balance_create_from_recipient
  AFTER INSERT ON "Recipients"
  NOT DEFERRABLE INITIALLY IMMEDIATE
  FOR EACH ROW
  EXECUTE PROCEDURE balance_create_from_recipient();
