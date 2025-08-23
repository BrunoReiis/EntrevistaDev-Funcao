IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_VerificaBeneficiarioV2')
    DROP PROCEDURE FI_SP_VerificaBeneficiarioV2;
GO
CREATE PROC FI_SP_VerificaBeneficiarioV2
    @CPF VARCHAR(11),
    @IdCliente BIGINT,
    @IdBeneficiario BIGINT = 0 
AS
BEGIN
    SELECT 1 
    FROM BENEFICIARIOS 
    WHERE CPF = @CPF 
      AND IdCliente = @IdCliente
      AND Id <> @IdBeneficiario
END