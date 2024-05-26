const request = require("supertest");
const app = require("../src/app");

/*
"/clientNumbers"
"/download"
*/

describe("GET /get-prisma-tables", () => {
  it("", async () => {
    const response = await request(app).get("/get-prisma-tables");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /energyInvoices", () => {
  it("", async () => {
    const response = await request(app).get("/energyInvoices");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /energyInvoices?clientNumber=7005400387", () => {
  it("", async () => {
    const response = await request(app).get("/energyInvoices?clientNumber=7005400387");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /clientNumbers", () => {
  it("", async () => {
    const response = await request(app).get("/clientNumbers");
    expect(response.statusCode).toBe(200);
  });
});

describe("GET /download?filename=..\\Faturas\\Instalação_ 3000055479\\3000055479-10-2023.pdf", () => {
  it("", async () => {
    const response = await request(app).get(
      "/download?filename=..\\Faturas\\Instalação_ 3000055479\\3000055479-10-2023.pdf"
    );
    expect(response.statusCode).toBe(200);
  });
});
