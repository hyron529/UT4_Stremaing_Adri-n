// Importamos los objetos necesarios
import StreamManager from "./streamManager.js";
import StreamManagerView from "./streamManagerView.js";
import StreamManagerController from "./streamManangerController.js";

import Authentication from "./authentication.js";

// Creamops el objeto al cual le pasaremos las instacias de nuestro modelo vista controlador
const streamManagerApp = new StreamManagerController(
    StreamManager.getInstance(),// Modelo
    new StreamManagerView(), // Vista
    //obtenemos la instancia de la autenticacion
    Authentication.getInstance()
);

// Exportamos el objeto
export { streamManagerApp };