$(document).ready(function () {
    let beneficiarios = [];

    $('#itemBeneficiarioCPF').mask('000.000.000-00');

    // Carrega lista inicial do cliente, se existir
    if (obj) {
        $.ajax({
            url: urlBeneList,
            method: "GET",
            data: { idCliente: obj.Id },
            dataType: "json",
            success: function (r) {
                beneficiarios.push(...r);
                atualizaLista();
            },
            error: function (r) {
                let msg = "Ocorreu um erro interno no servidor.";
                if (r.status === 400 && r.responseJSON) {
                    msg = r.responseJSON.Message;
                }
                ModalDialog("Ocorreu um erro", msg);
            }
        });
    }

    function atualizaLista() {
        $("#gridBeneficiarios tbody").html("");
        $(beneficiarios).each(function (_, data) {
            if (data.CPF !== "XXX.XXX.XXX-XX") {
                $("#gridBeneficiarios tbody").append(`
                    <tr data-id="${data.Id}">
                        <td>${formataCPF(data.CPF)}</td>
                        <td>${data.Nome}</td>
                        <td>
                            <button class='btn btn-primary btn-sm btnAltera'>Alterar</button>
                            <button class='btn btn-primary btn-sm btnExclui'>Excluir</button>
                        </td>
                    </tr>
                `);
            }
        });
    }

    $('#gridBeneficiarios tbody').on('click', '.btnExclui', function () {
        const tr = $(this).closest('tr');
        const id = tr.data('id');
        const index = beneficiarios.findIndex(b => b.Id == id);
        if (index !== -1) beneficiarios.splice(index, 1);
        tr.remove();
    });

    $('#gridBeneficiarios tbody').on('click', '.btnAltera', function () {
        const tr = $(this).closest('tr');
        const id = tr.data('id');
        let beneficiario = beneficiarios.find(b => b.Id == id);

        $("#BeneIndex").val(id);
        $("#BeneId").val(beneficiario ? beneficiario.Id : null);
        $("#BeneCPF").val(beneficiario ? beneficiario.CPF : tr.find('td:eq(0)').text());
        $("#BeneNome").val(beneficiario ? beneficiario.Nome : tr.find('td:eq(1)').text());

        $("#btnModal").html("Alterar");
        $("#modalBeneficiario").modal('show');
        tr.remove();
    });


    function formataCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
});

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                </div>                                                                                             ' +
        '            </div>                                                                                                 ' +
        '  </div>                                                                                                           ' +
        '</div>                                                                                                           ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
