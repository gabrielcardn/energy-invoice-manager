class ExtractData {
  #lines = [];
  constructor(text) {
    this.#lines = text.split("\n");
    this.splitStringRegex = /\s+/; // /\w+|:\d+/g;
  }

  #parseNumber = (value) => {
    // Replace the comma with a period and remove any whitespace
    const str = value.toString();
    let numberStr = str.replace(".", "").replace(",", ".");

    // Parse the number and return it
    return parseFloat(numberStr);
  };

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
      quantity: this.#parseNumber(result[2]),
      value: this.#parseNumber(result[4]),
    };

    return ret;
  };

  #getExemptEnergyConsumption = () => {
    const lineIndex = this.#lines.findIndex(
      (line) =>
        line.includes("Energia SCEE ISENTA") ||
        line.includes("Energia SCEE s/ ICMS") ||
        line.includes("En comp. s/ ICMS")
    );
    const line = this.#lines[lineIndex];

    if (!line)
      return {
        quantity: 0,
        value: 0,
      };

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");
    let ret = {
      quantity: this.#parseNumber(result[3]),
      value: this.#parseNumber(result[5]),
    };
    if (line.includes("Energia SCEE s/ ICMS") || line.includes("En comp. s/ ICMS")) {
      ret = {
        quantity: this.#parseNumber(result[4]),
        value: this.#parseNumber(result[6]),
      };
    }

    return ret;
  };

  #getCompensatedEnergyConsumption = () => {
    const lineIndex = this.#lines.findIndex(
      (line) => line.includes("Energia compensada GD I") || line.includes("Energia injetada HFP")
    );
    const line = this.#lines[lineIndex];

    //
    if (!line)
      return {
        quantity: 0,
        value: 0,
      };

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    let ret = {
      quantity: this.#parseNumber(result[4]),
      value: this.#parseNumber(result[6]),
    };
    if (line.includes("Energia injetada HFP")) {
      ret = {
        quantity: this.#parseNumber(result[3]),
        value: this.#parseNumber(result[5]),
      };
    }

    return ret;
  };

  #getMunicipalContribution = () => {
    const lineIndex = this.#lines.findIndex((line) =>
      line.includes("Contrib Ilum Publica Municipal")
    );
    const line = this.#lines[lineIndex];

    if (!line) return 0;

    const result = line.split(this.splitStringRegex).filter((s) => s !== "");

    return this.#parseNumber(result[4]);
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
      clientNumber: clientNumber,
      refMonth: refMonth,
      month: month,
      year: year,
      energyConsumptionQuantity: energyConsumptionQuantity,
      energyConsumptionValue: energyConsumptionValue,
      exemptEnergyConsumptionQuantity: exemptEnergyConsumptionQuantity,
      exemptEnergyConsumptionValue: exemptEnergyConsumptionValue,
      compensatedEnergyConsumptionQuantity: compensatedEnergyConsumptionQuantity,
      compensatedEnergyConsumptionValue: compensatedEnergyConsumptionValue,
      municipalContribution: municipalContribution,
    };
  };
}

module.exports = ExtractData;
