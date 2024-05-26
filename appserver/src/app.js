const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs").promises;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: "http://localhost:3001", methods: ["GET", "POST"] }));

app.use(express.json());

const faturasPath = path.join(__dirname, "../..", "Faturas");

app.use("/Faturas", express.static(faturasPath));

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

app.get("/download", async (req, res) => {
  const { filename } = req.query;
  const filePath = path.join(faturasPath, filename);
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

module.exports = app;
