using FI.AtividadeEntrevista.DAL;
using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Linq;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        public long Incluir(Beneficiario beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            return bene.Incluir(beneficiario);
        }

        public void Alterar(Beneficiario beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            bene.Alterar(beneficiario);
        }

        public void Excluir(long beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            bene.Excluir(beneficiario);
        }

        public List<Beneficiario> ListarPorCliente(long beneficiario)
        {
            var bene = new DAL.DaoBeneficiario();
            return bene.ListarPorCliente(beneficiario);
        }

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
