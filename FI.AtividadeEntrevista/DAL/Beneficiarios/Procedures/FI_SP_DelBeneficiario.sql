IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_DelBeneficiario')
    DROP PROCEDURE FI_SP_DelBeneficiario;
GO
CREATE PROC FI_SP_DelBeneficiario
    @Id BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Beneficiarios
    WHERE Id = @Id;
END