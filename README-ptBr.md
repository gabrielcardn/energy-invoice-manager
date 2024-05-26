# Gerenciador de Faturas de Energia

EnergyInvoiceManager é um projeto focado em automatizar o processamento de contas de serviços de energia elétrica. O sistema extrai dados relevantes das faturas, estrutura esses dados em um banco de dados PostgreSQL e os apresenta por meio de uma aplicação web usando uma API.

## Configuração do Banco de Dados

O projeto depende de um banco de dados PostgreSQL gerenciado com Prisma. Antes de executar a aplicação, certifique-se de ter o PostgreSQL instalado e em execução. Crie um banco de dados chamado 'lumi'. Para inicializar as tabelas do banco de dados, execute o seguinte comando:

npx prisma migrate dev --name init

## Instalação

Para instalar as dependências do projeto:

1. Navegue até o diretório /app e execute:

npm install

2. Navegue até o diretório /appserver e execute:

npm install

## Configuração

Antes de executar a aplicação, certifique-se de que o PostgreSQL está instalado e em execução com um banco de dados chamado 'lumi'. A configuração do PostgreSQL é:
- usuário = postgres
- senha = root
- host = localhost:5432
- banco de dados = lumi
Inicialize as tabelas do banco de dados executando o seguinte comando:

npx prisma migrate dev --name init

## Testes

Para executar os testes, execute o seguinte comando do diretório raiz do projeto:

npm run test

Estas instruções devem ajudá-lo a configurar e executar o projeto Gerenciador de Faturas de Energia com sucesso. Se você encontrar algum problema durante a instalação ou execução, não hesite em nos contatar para obter assistência.

# Uso

## Construção e Inicialização da Aplicação

1. Primeiro, navegue até o diretório /appserver e execute o seguinte comando para iniciar o servidor:

npm start

Este comando limpará a tabela de faturas, as obterá da pasta "Faturas", formatará os dados e criará registros no banco de dados PostgreSQL chamado 'lumi' na tabela 'energyInvoice'.

2. Em seguida, navegue até o diretório /app e execute o seguinte comando para construir e iniciar a aplicação Next.js:

npm run build-start

Este comando irá construir e iniciar a aplicação Next.js em http://localhost:3001.

## Página do Painel

- A página do painel exibe vários gráficos representando dados de consumo de energia.
- Para visualizar os gráficos, selecione um número de cliente no menu suspenso. Os gráficos então exibirão os dados de consumo de energia específicos do cliente selecionado ao longo do tempo.

## Página de Faturas

- A página de faturas exibe uma tabela contendo faturas de energia para um cliente selecionado.
- Para visualizar as faturas, selecione um número de cliente no menu suspenso. A tabela então será preenchida com faturas de energia específicas do cliente selecionado.
- Na tabela, você pode baixar uma fatura clicando no link na última coluna.

## Recursos Adicionais

- Qualquer navegação em página que não seja o painel redirecionará automaticamente o usuário para a página /dashboard.

Estas instruções devem ajudá-lo a navegar e utilizar efetivamente o aplicativo Gerenciador de Faturas de Energia.
