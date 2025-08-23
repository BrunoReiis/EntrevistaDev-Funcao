
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $('#formCadastro #CPF').mask('000.000.000-00');
    $('#formCadastro #CEP').mask('00000-000');
    $('#formCadastro #Telefone').mask('(00) 00000-0000');

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        var cpfSemMask = $('#formCadastro #CPF').val().replace(/\D/g, '');
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": cpfSemMask
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
                function (r) {
                    let beneficiarios = [];
                    $('#gridBeneficiarios tbody tr').each(function () {
                        const cpf = $(this).find('td:eq(0)').text().replace(/\D/g, '');
                        const nome = $(this).find('td:eq(1)').text();
                        const ClienteID = r;
                        beneficiarios.push({ CPF: cpf, Nome: nome, IdCliente: ClienteID });
                    });

                    $.ajax({
                        url: urlBeneAlt,
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                            idCliente: r,          
                            lista: beneficiarios      
                        }),
                        success: function () {
                            ModalDialog("Sucesso", "Cliente e beneficiários salvos com sucesso!");
                            $("#formCadastro")[0].reset();
                            $('#gridBeneficiarios tbody').empty();
                            window.location.href = urlRetorno;
                        },
                        error: function (msg) {
                            ModalDialog("Erro", msg.responseText);
                        }
                    });                              
            }
        });
    })
    
})

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
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
