//import { Papa } from "./papaparse.min.js"

class CsvToJson {
    constructor() {

        const open = document.getElementById("open-file-button");
        open.addEventListener("click", e => this.OpenFile());

    }

    async OpenFile() {
        const [fileHandle] = await window.showOpenFilePicker();
    }
}

export { CsvToJson };