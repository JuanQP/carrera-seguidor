import { Carrera } from "./carrera";

/**
 * Wrapper para poder utilizar el FileDialog del navegador.
 */
export class Archivos {
    /**
     * Exporta a disco una carrera con el formato JSON.
     * @param carrera La carrera a exportar
     */
    public exportar(carrera: Carrera): void {
        const textToSave = JSON.stringify(carrera);
        const textToSaveAsBlob = new Blob([textToSave], {type: "text/plain"});
        const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        const fileNameToSaveAs = carrera.nombre.replace(/ /gi, "-").toLowerCase() + ".json";

        const downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = () => document.body.removeChild(downloadLink);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
    }

    /**
     * Lee un archivo seleccionado por el usuario como string.
     * @param archivoSeleccionado El archivo seleccionado con un Input por el usuario
     * @param handler La función que va a manipular el archivo leído
     */
    public importar(archivoSeleccionado: Blob, handler: ((resultado: string) => void) ): void {
        const fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            const textFromFileLoaded = fileLoadedEvent.target!.result;
            handler(textFromFileLoaded);
        };
        fileReader.readAsText(archivoSeleccionado, "UTF-8");
    }
}
