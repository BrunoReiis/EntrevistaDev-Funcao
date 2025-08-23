IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_VerificaCliente_V2')
    DROP PROCEDURE FI_SP_VerificaCliente_V2;
GO

CREATE PROC FI_SP_VerificaCliente_V2  
    @CPF VARCHAR(14),
    @IdAtual BIGINT = 0
AS  
BEGIN  
    SELECT 1 
    FROM CLIENTES 
    WHERE CPF = @CPF
      AND (@IdAtual = 0 OR Id <> @IdAtual)
END
