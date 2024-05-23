const express = require("express");
const pdf = require("pdf-parse");
const { PrismaClient } = require("@prisma/client");

const fs = require("fs");
const ExtractData = require("./classes/ExtractData");

const path = require("path");
const { promisify } = require("util");
const app = express();
const prisma = new PrismaClient();

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const port = process.env.PORT || 3000;

extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const pdfData = await pdf(dataBuffer);
  if (pdfData && pdfData.text) {
    return pdfData.text;
  } else {
    throw new Error("Failed to extract text from PDF");
  }
};

const iterateFiles = async (directoryPath) => {
  try {
    const files = await readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStats = await stat(filePath);

      if (fileStats.isDirectory()) {
        await iterateFiles(filePath);
      } else if (path.extname(file) === ".pdf") {
        try {
          const extractedText = await extractTextFromPDF(filePath);
          const extractData = new ExtractData(extractedText);
          const data = extractData.getData();

          // Cria um registro na tabela EnergyInvoice
          await prisma.energyInvoice.create({
            data: data,
          });

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

(async () => {
  try {
    // delete all EnergyInvoice registers before script
    console.log("Deleting all energy invoices from database...")
    await prisma.energyInvoice.deleteMany();
    await iterateFiles("../Faturas");
    const totalInvoices = await prisma.energyInvoice.count();
    console.log("Invoices created: ", totalInvoices);
  } catch (error) {
    console.error(error);
  }
})();

app.use(express.json());

app.get("/energyInvoices", async (req, res) => {
  const { clientNumber } = req.query;
  try {
    let invoices = [];
    // get by client nummber
    if (clientNumber) {
      invoices = await prisma.energyInvoice.findMany({
        where: { clientNumber: clientNumber },
      });
    } else {
      // get all
      invoices = await prisma.energyInvoice.findMany();
    }
    console.log("invoices.length: ", invoices.length);

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/get-prisma-tables", async (req, res) => {
  try {
    // const invoices = await prisma.
    const result =
      await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;

    console.log("prisma: ", result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
