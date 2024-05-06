// Importamos los objetos necesarios
import StreamManager from "./streamManager.js";
import StreamManagerView from "./streamManagerView.js";
import StreamManagerController from "./streamManangerController.js";

// Creamops el objeto al cual le pasaremos las instacias de nuestro modelo vista controlador
const streamManagerApp = new StreamManagerController(
    StreamManager.getInstance(),// Modelo
    new StreamManagerView()// Vista
);

// Exportamos el objeto
export { streamManagerApp };