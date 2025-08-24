using FI.AtividadeEntrevista.DAL;
using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Linq;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Incluir um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(Beneficiario beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            return bene.Incluir(beneficiario);
        }

        /// <summary>
        /// Alterar um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(Beneficiario beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            bene.Alterar(beneficiario);
        }

        /// <summary>
        /// Excluir um beneficiario
        /// </summary>
        /// <param name="beneficiario">Id de beneficiario</param>
        public void Excluir(long beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            bene.Excluir(beneficiario);
        }

        /// <summary>
        /// Listar beneficiarios por cliente
        /// </summary>
        /// <param name="idCliente">Id do cliente vinculado ao beneficiario</param>
        public List<Beneficiario> ListarPorCliente(long idCliente)
        {
            var bene = new DAL.DaoBeneficiario();
            return bene.ListarPorCliente(idCliente);
        }

        /// <summary>
        /// Atualiza a lista de beneficiarios do cliente
        /// </summary>
        /// <param name="idCliente">Id do cliente vinculado ao beneficiario</param>
        /// <param name="lista">Lista de beneficiarios</param>
        public void AtualizarLista(long idCliente, List<Beneficiario> lista)
        {
            var existentes = this.ListarPorCliente(idCliente);

            foreach (var e in existentes)
            {
                if (!lista.Any(b => b.Id == e.Id))
                    this.Excluir(e.Id);
            }

            foreach (var b in lista)
            {
                if (b.Id == 0)
                {
                    b.IdCliente = idCliente;
                    this.Incluir(b);
                }
                else
                {
                    this.Alterar(b);
                }
            }
        }
    }
}
