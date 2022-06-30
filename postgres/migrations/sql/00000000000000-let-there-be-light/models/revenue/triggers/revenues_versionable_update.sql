CREATE TRIGGER revenues_versionable_update
  BEFORE UPDATE ON "Revenues"
  FOR EACH ROW
  EXECUTE PROCEDURE versionable_update();
