const express = require("express");
const pdf = require("pdf-parse");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const path = require("path");
const ExtractData = require("./classes/ExtractData");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3001", methods: ["GET", "POST"] }));

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = await fs.readFile(filePath);
  const pdfData = await pdf(dataBuffer);
  if (pdfData && pdfData.text) {
    return pdfData.text;
  } else {
    throw new Error("Failed to extract text from PDF");
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
            throw new Error(e);
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

app.use(express.json());

app.get("/energyInvoices", async (req, res) => {
  const { clientNumber } = req.query;
  try {
    let invoices = [];
    if (clientNumber) {
      invoices = await prisma.energyInvoice.findMany({
        where: { clientNumber: clientNumber },
        orderBy: [{ year: "asc" }, { month: "asc" }],
      });
    } else {
      invoices = await prisma.energyInvoice.findMany({
        orderBy: [{ year: "asc" }, { month: "asc" }],
      });
    }
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/clientNumbers", async (req, res) => {
  try {
    const clientNumbers = await prisma.energyInvoice.findMany({
      select: {
        clientNumber: true,
      },
      distinct: ["clientNumber"],
    });
    res.status(200).json(clientNumbers.map((invoice) => invoice.clientNumber));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/get-prisma-tables", async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT table_name FROM information_schema.tables WHERE table_schema='public'
    `;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

const faturasPath = path.join(__dirname, "../..", "Faturas");

app.use("/Faturas", express.static(faturasPath));

app.get("/download", async (req, res) => {
  const { filename } = req.query;
  const filePath = path.join(faturasPath, filename);
  console.log(filePath);
  try {
    await fs.access(filePath);
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Erro ao baixar o arquivo:", err);
        res.status(500).json({ error: "Erro ao baixar o arquivo" });
      }
    });
  } catch (err) {
    console.error("Arquivo não encontrado:", err);
    res.status(404).json({ error: "Arquivo não encontrado" });
  }
});

const startServer = () => {
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
    console.log("Deleting all energy invoices from database...");
    await prisma.energyInvoice.deleteMany();
    await iterateFiles("../Faturas");
    const totalInvoices = await prisma.energyInvoice.count();
    console.log("Invoices created: ", totalInvoices);
  } catch (error) {
    console.error(error);
  }
};

main();
