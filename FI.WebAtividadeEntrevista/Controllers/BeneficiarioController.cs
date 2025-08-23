using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using FI.WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Controllers;

namespace FI.WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(List<BeneficiarioModel> beneficiarios)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!ModelState.IsValid)
            {
                var erros = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList();
                Response.StatusCode = 400;
                return Json(string.Join("\n", erros));
            }

            if(beneficiarios == null)
            {
                return Json("Cliente cadastrado sem beneficiarios");
            }

            foreach (var model in beneficiarios)
            {
                if (!ClienteController.ValidarCPF(model.CPF))
                {
                    Response.StatusCode = 400;
                    return Json("CPF do beneficiario inválido!");
                }

                var id = bo.Incluir(new Beneficiario
                {
                    CPF = model.CPF,
                    Nome = model.Nome,
                    IdCliente = model.IdCliente
                });
            }
            return Json(new {Mensagem = "Beneficiário cadastrado com sucesso" });
        }

        [HttpGet]
        public JsonResult ListarPorCliente(long idCliente)
        {
            BoBeneficiario bo = new BoBeneficiario();
            var lista = bo.ListarPorCliente(idCliente);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AtualizarLista(long idCliente, List<BeneficiarioModel> lista)
        {
            BoBeneficiario bo = new BoBeneficiario();

            foreach (var b in lista)
            {
                if (!ClienteController.ValidarCPF(b.CPF))
                {
                    Response.StatusCode = 400;
                    return Json($"CPF inválido: {b.CPF}");
                }
            }

            bo.AtualizarLista(idCliente, lista.Select(b => new Beneficiario
            {
                Id = b.Id,
                Nome = b.Nome,
                CPF = b.CPF,
                IdCliente = idCliente
            }).ToList());

            return Json("Beneficiários atualizados com sucesso!");
        }

    }
}