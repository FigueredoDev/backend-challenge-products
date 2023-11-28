# Desafio SCS - API de Cadastro de Produtos

## Visão Geral
Esta API foi desenvolvida como teste tecnico para vaga backend na SCS, seu objetivo é gerenciar o cadastro, atualização, visualização e exclusão de produtos em uma plataforma. Utiliza TypeScript, o runtime Bun, princípios de Clean Architecture, Clean Code, e segue os princípios SOLID com injeção e inversão de dependências.

## Desafio de origem
Este projeto foi desenvolvido como parte de um desafio técnico. As instruções detalhadas e objetivos do desafio podem ser encontradas no seguinte repositório: [scs-desafio-backend](https://github.com/GeovaneCavalcante/scs-desafio-backend).

## Recursos-chave:
  - CRUD (Criar, Ler, Atualizar, Excluir) de contatos.
  - Associação de contatos a categorias.
  - Padrões Repository e Singleton para gerenciar o acesso ao banco de dados.

## Pré-requisitos
  Antes de começar, certifique-se de ter os seguintes requisitos instalados:

  - Bun (v1.0 ou superior)
  - PostgreSQL (v10 ou superior)

## Aqui estão alguns dos principais recursos e tecnologias deste projeto:

- Typescript e Express para criar a API.
- Clean Architecture
- Princípios SOLID
- PostgreSQL para armazenamento de dados.
- uuidv4 para geração de identificadores exclusivos.
- Padrões de design Repository e Singleton para organização e manutenção do código.

## Funcionalidades

A API oferece as seguintes funcionalidades:

- Cadastro de Produtos: Permite aos usuários adicionar novos produtos.
- Atualização de Produtos: Os usuários podem atualizar qualquer campo do produto.
- Visualização de Produtos: Os usuários podem visualizar um produto específico ou uma lista de todos os produtos.
- Exclusão de Produtos: Permite a remoção de produtos do sistema.

## Configuração

### Pré-requisitos

Antes de começar, certifique-se de ter instalado o seguinte:

- Bun runtime: [Download Bun](https://bun.sh/)

## Requisitos de Negócio

- O nome do produto é obrigatório e único.
- A descrição do produto é opcional, com um limite de 500 caracteres.
- O preço deve ser um valor positivo.
- A quantidade em estoque deve ser um número inteiro positivo.

### Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1. Clone o repositório:

 ```bash
 git clone https://github.com/FigueredoDev/backend-challenge-products
 cd backend-challenge-products
 ```

2. Instalar dependencias:
  ```bash
  bun install
  ```

3. Iniciar servidor

  ```bash
  bun start
  ```

## Testes unitários
Para garantir a qualidade e a confiabilidade do software, foram implementados testes unitários abrangentes. Estes testes asseguram que cada componente da aplicação funcione corretamente de forma isolada, e contribuem significativamente para a manutenção e escalabilidade do projeto.

### Para executar os testes unitários, utilize o seguinte comando:

  ```bash
  bun test
  ```

## Padrões de Código

Este projeto segue padrões de código definidos pelo ESLint para manter a consistência e qualidade do código-fonte. O arquivo de configuração do ESLint pode ser encontrado em [.eslintrc.js](.eslintrc.js). Certifique-se de executar o linting do código antes de enviar pull requests para manter a conformidade com os padrões do projeto.

This project was created using `bun init` in bun v1.0.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
