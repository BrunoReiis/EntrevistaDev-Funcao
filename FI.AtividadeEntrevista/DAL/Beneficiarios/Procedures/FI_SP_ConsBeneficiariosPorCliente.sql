IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'FI_SP_ConsBeneficiariosPorCliente')
    DROP PROCEDURE FI_SP_ConsBeneficiariosPorCliente;
GO
CREATE PROC FI_SP_ConsBeneficiariosPorCliente
    @IdCliente BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Id, CPF, Nome, IdCliente
    FROM Beneficiarios
    WHERE IdCliente = @IdCliente;
END