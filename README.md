# Energy Invoice Manager

EnergyInvoiceManager is a project focused on automating the processing of electric utility bills. The system extracts relevant data from the invoices, structures this data in a PostgreSQL database, and presents it through a web application using an API.

## Database Setup

The project relies on a PostgreSQL database managed with Prisma. Before running the application, ensure that you have PostgreSQL installed and running. Create a database named 'lumi'. To initialize the database tables, run the following command:

npx prisma migrate dev --name init

## Installation

To install the project dependencies:

1. Navigate to the project root directory and run:

npm install

2. Navigate to the /app directory and run:

npm install

3. Navigate to the /appserver directory and run:

npm install

## Configuration

Before running the application, ensure that PostgreSQL is installed and running with a database named 'lumi'. Initialize the database tables by executing the following command:

npx prisma migrate dev --name init

## Testing

To run the tests, execute the following command from the project root directory:

npm run test

These instructions should help you set up and run the Energy Invoice Manager project successfully. If you encounter any issues during setup or execution, feel free to reach out for assistance.
