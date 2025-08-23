IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_VerificaDuplicidadeBeneficiarioV2')
    DROP PROCEDURE FI_SP_VerificaDuplicidadeBeneficiarioV2;
GO
CREATE PROC FI_SP_VerificaDuplicidadeBeneficiarioV2
    @CPF VARCHAR(11),
    @IdCliente BIGINT,
    @IdAtual BIGINT
AS  
BEGIN  
    IF @IdAtual = 0
    BEGIN
        SELECT 1
        FROM Beneficiarios 
        WHERE CPF = @CPF AND IdCliente = @IdCliente;
    END
    ELSE
    BEGIN
        SELECT 1
        FROM Beneficiarios 
        WHERE CPF = @CPF AND IdCliente = @IdCliente
          AND Id <> @IdAtual; 
    END
END
