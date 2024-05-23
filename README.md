# energy-invoice-manager
EnergyInvoiceManager is a project focused on automating the processing of electric utility bills. The system extracts relevant data from the invoices, structures this data in a PostgreSQL database, and presents it through a web application using an API.

# DATA BASE - PRISMA - POSTGRE
required to have a database create with name 'lumi'
will need to run this command to initialize database
npx prisma migrate dev --name init


# Instalação
- npm i

# Configuração
- necessário o postgres instalado e rodando com uma database chamada 'lumi'
- iniciará as tabelas da database com:
- npx prisma migrate dev --name init
