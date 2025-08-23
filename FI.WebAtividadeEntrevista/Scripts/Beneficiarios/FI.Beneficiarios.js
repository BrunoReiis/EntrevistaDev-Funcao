$(document).ready(function () {
    $('#formBeneficiario #itemBeneficiarioCPF').mask('000.000.000-00');

    $('#formBeneficiario').submit(function (e) {
        e.preventDefault();

        const cpf = $('#itemBeneficiarioCPF').val();
        const nome = $('#itemBeneficiarioNome').val();

        let cpfExistente = false;
        $('#gridBeneficiarios tbody tr').each(function () {
            const cpfTabela = $(this).find('td:eq(0)').text();
            if (cpfTabela === cpf) {
                cpfExistente = true;
                return false; 
            }
        });

        if (cpfExistente) {
            alert("Este CPF já foi adicionado!");
            return;
        }

        $('#gridBeneficiarios tbody').append(`
            <tr>
                <td>${cpf}</td>
                <td>${nome}</td>
                <td>
                    <button type="button" class="btn btn-primary btn-sm btnAltera">Alterar</button>
                    <button type="button" class="btn btn-primary btn-sm btnExclui">Excluir</button>
                </td>
            </tr>
        `);

        this.reset();
    });

    $('#gridBeneficiarios tbody').on('click', '.btnExclui', function () {
        $(this).closest('tr').remove();
    });

    $('#gridBeneficiarios tbody').on('click', '.btnAltera', function () {
        const tr = $(this).closest('tr');
        const cpf = tr.find('td:eq(0)').text();
        const nome = tr.find('td:eq(1)').text();

        $('#itemBeneficiarioCPF').val(cpf);
        $('#itemBeneficiarioNome').val(nome);

        tr.remove();
    });
});
