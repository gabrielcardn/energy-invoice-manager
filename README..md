# Energy Invoice Manager

EnergyInvoiceManager is a project focused on automating the processing of electric utility bills. The system extracts relevant data from the invoices, structures this data in a PostgreSQL database, and presents it through a web application using an API.

## Database Setup

The project relies on a PostgreSQL database managed with Prisma. Before running the application, ensure that you have PostgreSQL installed and running. Create a database named 'lumi'. To initialize the database tables, run the following command:

npx prisma migrate dev --name init

## Installation

To install the project dependencies:

1. Navigate to the /app directory and run:

npm install

2. Navigate to the /appserver directory and run:

npm install

## Configuration

Before running the application, ensure that PostgreSQL is installed and running with a database named 'lumi'. The PostgreSQL configuration is:

- user = postgres
- password = root
- host = localhost:5432
- database = lumi
  Initialize the database tables by executing the following command:

npx prisma migrate dev --name init

## Testing

To run the tests, execute the following command from the project root directory:

npm run test

These instructions should help you set up and run the Energy Invoice Manager project successfully. If you encounter any issues during setup or execution, feel free to reach out for assistance.

# Usage

## Building and Starting the Application

1. First, navigate to the /appserver directory and run the following command to start the server:

npm start

This command will clean the table of invoices, get them from the "Faturas" folder, format the data, and create records in the PostgreSQL database named 'lumi' in the 'energyInvoice' table.

2. Next, navigate to the /app directory and run the following command to build and start the Next.js application:

npm run build-start

This command will build and start the Next.js application on http://localhost:3001.

## Dashboard

- The dashboard page displays various charts representing energy consumption data.
- To view the charts, select a client number from the dropdown menu. The charts will then display energy consumption data specific to the selected client over time.

## Invoices Page

- The invoices page displays a table containing energy invoices for a selected client.
- To view the invoices, select a client number from the dropdown menu. The table will then populate with energy invoices specific to the selected client.
- In the table, you can download an invoice by clicking on the link in the last column.

## Additional Features

- Any page navigation other than the dashboard will automatically redirect the user to the /dashboard page.

These instructions should help you navigate and utilize the Energy Invoice Manager application effectively.
