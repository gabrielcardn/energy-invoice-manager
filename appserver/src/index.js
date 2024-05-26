const pdf = require("pdf-parse");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const path = require("path");
const ExtractData = require("./classes/ExtractData");

const app = require("./app");
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = await fs.readFile(filePath);
  const pdfData = await pdf(dataBuffer);
  if (pdfData && pdfData.text) {
    return pdfData.text;
  } else {
    console.error("Failed to extract text from PDF");
  }
};

const iterateFiles = async (directoryPath) => {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStats = await fs.stat(filePath);

      if (fileStats.isDirectory()) {
        await iterateFiles(filePath);
      } else if (path.extname(file) === ".pdf") {
        try {
          const extractedText = await extractTextFromPDF(filePath);
          const extractData = new ExtractData(extractedText);
          const data = extractData.getData();

          try {
            await prisma.energyInvoice.create({
              data: { ...data, filePath: filePath },
            });
          } catch (e) {
            console.error("Error inserting data: ", data);
          }

          console.log(`Invoice created for file: ${filePath}`);
        } catch (error) {
          console.error(`Error extracting text from PDF (${filePath}):`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory (${directoryPath}):`, error);
  }
};

const startServer = async () => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      resolve(server);
    });
  });
};

const main = async () => {
  try {
    await startServer();

    // Run the function after the server is listening
    // console.log("Deleting all energy invoices from database...");
    await prisma.energyInvoice.deleteMany();
    await iterateFiles("../Faturas");
    const totalInvoices = await prisma.energyInvoice.count();
    console.log("Invoices created: ", totalInvoices);
  } catch (error) {
    console.error(error);
  }
};

main();
