IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_AltBeneficiario')
    DROP PROCEDURE FI_SP_AltBeneficiario;
GO
CREATE PROC FI_SP_AltBeneficiario
    @Id BIGINT,
    @CPF VARCHAR(14),
    @Nome NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Beneficiarios
    SET CPF = @CPF,
        Nome = @Nome
    WHERE Id = @Id;
END