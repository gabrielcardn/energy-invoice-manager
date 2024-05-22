const express = require("express");
const pdf = require("pdf-parse");
const fs = require("fs");
const ExtractData = require("./classes/ExtractData");
const path = require("path");
const { error } = require("console");
const app = express();
const port = 3000;

extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);

  const pdfData = await pdf(dataBuffer);
  if (pdfData && pdfData.text) {
    return pdfData.text;
  } else {
    throw new Error("Failed to extract text from PDF");
  }
};

// .\Faturas\Instalação_ 3000055479
// app.get("/extract-text", async (req, res) => {
//   try {
//     const filePath = "./Faturas/Instalação_ 3000055479/3000055479-01-2023.pdf";
//     const extractedText = await extractTextFromPDF(filePath);
//     const lines = extractedText.split("\n");
//     // console.log("lines: ", lines);
//     const clientNumber = getClientNumber(lines);
//     const refMonth = getRefMonth(lines);
//     const energyConsumption = getEnergyConsumption(lines)

//     res.send({ text: extractedText });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

const iterateFiles = async (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      console.log(file);
      const filePath = path.join(directoryPath, file);
      console.log("filePath:", filePath);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          throw new Error("err");
          return;
        }

        if (stats.isDirectory()) {
          iterateFiles(filePath);
        } else if (path.extname(file) === ".pdf") {
          extractTextFromPDF(filePath)
            .then((extractedText) => {
              console.log("filePath: ", filePath);
              const extractData = new ExtractData(extractedText);
              const data = extractData.getData();
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
              throw new Error(error);
            });
        }
      });
    });
  });
};

(async () => {
  try {
    // const filePath = "./Faturas/Instalação_ 3000055479/3000055479-01-2023.pdf";
    // const extractedText = await extractTextFromPDF(filePath);
    // const extractData = new ExtractData(extractedText);
    // const data = extractData.getData();
    // console.log("data: ", data);
    iterateFiles("./Faturas");
    // res.send({ text: extractedText });
  } catch (error) {
    // res.status(500).send({ error: error.message });
  }
})();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
