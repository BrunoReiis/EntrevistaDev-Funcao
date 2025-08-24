# Função Sistemas - Entrevista DEV ASP.NET MVC

Este projeto foi desenvolvido como parte do **processo seletivo para desenvolvedor** na empresa **Função Sistemas**.  
O objetivo é implementar novas funcionalidades na aplicação ASP.NET MVC (.NET Framework 4.8), envolvendo cadastro de clientes e beneficiários, conforme as especificações fornecidas.

---

## 📌 Funcionalidades Implementadas

### 1. Implementação do CPF do Cliente
- Inclusão de um novo campo denominado **CPF** na tela de cadastro/alteração de clientes.
- Regras:
  - O campo segue o mesmo padrão visual dos demais campos da tela.
  - O cadastro do CPF é **obrigatório**.
  - O CPF possui a formatação padrão `999.999.999-99`.
  - O CPF é validado pelo cálculo do dígito verificador.
  - Não é permitido cadastrar CPFs duplicados no banco de dados.
- Banco de Dados:
  - Adicionado o campo **CPF** na tabela `CLIENTES`.

---

### 2. Implementação do botão **Beneficiários**
- Adição de um botão denominado **Beneficiários** na tela de cadastro/alteração de clientes.
- O botão abre um **pop-up** para inclusão de:
  - **CPF do beneficiário**
  - **Nome do beneficiário**
- Funcionalidades adicionais:
  - Grid exibindo os beneficiários já cadastrados.
  - Possibilidade de incluir, alterar e excluir beneficiários.
- Regras:
  - Campos seguem o mesmo padrão visual da tela.
  - O CPF do beneficiário segue a formatação `999.999.999-99`.
  - O CPF é validado pelo cálculo do dígito verificador.
  - Não é permitido cadastrar dois beneficiários com o mesmo CPF para o mesmo cliente.
  - Os beneficiários são gravados no banco de dados somente ao clicar em **Salvar Cliente**.
- Banco de Dados:
  - Criada a tabela `BENEFICIARIOS` com os campos:
    - `ID`
    - `CPF`
    - `NOME`
    - `IDCLIENTE` (chave estrangeira referenciando `CLIENTES`)

---

## ⚙️ Tecnologias Utilizadas
- **ASP.NET MVC 5 (Framework 4.8)**
- **C#**
- **Entity Framework / ADO.NET**
- **SQL Server (LocalDB / App_Data)**
- **jQuery**
- **JavaScript**
- **Bootstrap**
