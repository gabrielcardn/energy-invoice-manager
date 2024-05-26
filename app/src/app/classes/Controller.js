import FileDownloader from "./FileDownloader";

class Controller {
  constructor() {}

  getClientNumbers = async () => {
    return fetch("http://localhost:3000/clientNumbers", {
      cache: "no-store",
      method: "GET",
    }).then((response) => {
      return response.json();
    });
  };

  getInvoices = async (clientNumber) => {
    return fetch("http://localhost:3000/energyInvoices?clientNumber=" + clientNumber, {
      cache: "no-store",
      method: "GET",
    }).then((response) => {
      return response.json();
    });
  };

  downloadInvoice = (filename) => {
    const fileDownloader = new FileDownloader(filename);
    console.log(filename, fileDownloader);
    return fileDownloader.download();
  };
}

export default Controller;
