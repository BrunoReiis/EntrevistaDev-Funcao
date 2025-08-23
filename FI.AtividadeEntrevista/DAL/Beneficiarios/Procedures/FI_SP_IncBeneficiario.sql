IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_IncBeneficiario')
    DROP PROCEDURE FI_SP_IncBeneficiario;
GO
CREATE PROC FI_SP_IncBeneficiario
    @IdCliente BIGINT,
    @CPF       VARCHAR(14),
    @Nome      NVARCHAR(200)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Beneficiarios (IdCliente, CPF, Nome)
    VALUES (@IdCliente, @CPF, @Nome);

    SELECT SCOPE_IDENTITY() AS Id;
END