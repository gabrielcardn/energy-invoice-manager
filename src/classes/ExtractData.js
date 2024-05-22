class ExtractData {
  #lines = [];
  constructor(text) {
    this.#lines = text.split("\n");
    this.splitStringRegex = /\s+/; // /\w+|:\d+/g;
  }

  #getClientNumber = () => {
    const lineIndex = this.#lines.findIndex((line) => line.includes("Nº DO CLIENTE"));
    const line = this.#lines[lineIndex + 1];

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    return result[0];
  };

  #getRefMonth = () => {
    const lineIndex = this.#lines.findIndex((line) => line.includes("Referente a"));
    const line = this.#lines[lineIndex + 1];

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    const dateString = result[0];
    const [monthName, year] = dateString.split("/");
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    const monthNumber = months.findIndex((m) => m.toUpperCase() === monthName.toUpperCase()) + 1;

    return { refMonth: result[0], month: monthNumber, year: parseInt(year) };
  };

  #getEnergyConsumption = () => {
    const lineIndex = this.#lines.findIndex((line) => line.includes("Energia Elétrica"));
    const line = this.#lines[lineIndex];

    if (!line)
      return {
        quantity: 0,
        value: 0,
      };

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    let ret = {
      quantity: parseFloat(result[2].replace(",", ".")),
      value: parseFloat(result[4].replace(",", ".")),
    };

    return ret;
  };

  #getExemptEnergyConsumption = () => {
    const lineIndex = this.#lines.findIndex((line) => line.includes("Energia SCEE ISENTA"));
    const line = this.#lines[lineIndex];

    if (!line)
      return {
        quantity: 0,
        value: 0,
      };

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    let ret = {
      quantity: parseFloat(result[3].replace(",", ".")),
      value: parseFloat(result[5].replace(",", ".")),
    };

    return ret;
  };

  #getCompensatedEnergyConsumption = () => {
    const lineIndex = this.#lines.findIndex((line) => line.includes("Energia compensada GD I"));
    const line = this.#lines[lineIndex];

    if (!line)
      return {
        quantity: 0,
        value: 0,
      };

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    let ret = {
      quantity: parseFloat(result[4].replace(",", ".")),
      value: parseFloat(result[6].replace(",", ".")),
    };

    return ret;
  };

  #getMunicipalContribution = () => {
    const lineIndex = this.#lines.findIndex((line) =>
      line.includes("Contrib Ilum Publica Municipal")
    );
    const line = this.#lines[lineIndex];

    if (!line) return 0;

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    return parseFloat(result[4].replace(",", "."));
  };

  getData = () => {
    const clientNumber = this.#getClientNumber();
    const { refMonth, month, year } = this.#getRefMonth();
    const energyConsumption = this.#getEnergyConsumption();
    const exemptEnergyConsumption = this.#getExemptEnergyConsumption();
    const compensatedEnergyConsumption = this.#getCompensatedEnergyConsumption();
    const municipalContribution = this.#getMunicipalContribution();

    const energyConsumptionQuantity = energyConsumption.quantity;
    const energyConsumptionValue = energyConsumption.value;
    const exemptEnergyConsumptionQuantity = exemptEnergyConsumption.quantity;
    const exemptEnergyConsumptionValue = exemptEnergyConsumption.value;
    const compensatedEnergyConsumptionQuantity = compensatedEnergyConsumption.quantity;
    const compensatedEnergyConsumptionValue = compensatedEnergyConsumption.value;
    return {
      clientNumber,
      refMonth,
      month,
      year,
      energyConsumptionQuantity,
      energyConsumptionValue,
      exemptEnergyConsumptionQuantity,
      exemptEnergyConsumptionValue,
      compensatedEnergyConsumptionQuantity,
      compensatedEnergyConsumptionValue,
      municipalContribution,
    };
  };
}

module.exports = ExtractData;
