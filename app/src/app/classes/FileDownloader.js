import { saveAs } from "file-saver";

class FileDownloader {
  constructor(filename) {
    this.filename = filename;
  }

  download = async () => {
    const filePath = `http://localhost:3000/download?filename=${this.filename}`;
    return fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        // Usando o file-saver para salvar o arquivo
        saveAs(blob, this.filename);
      })
      .catch((error) => console.error("Erro ao baixar o arquivo:", error));
  };
}

export default FileDownloader;
