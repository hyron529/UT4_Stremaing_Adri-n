import { FailedObjTypeException} from "./exception.js";
// Importamos la entindad usuario
import { User } from "../user.js";

// Creamos la funcion anonima que en este caso nos servira para simular
// el servicio de autenticación de nuestra aplicación
const Authentication = (function () {
  let instance;

  function init() {
    // Inicialización del Singleton
    class Authentication {
      // constructor de autenticacion y lanzamos excepción si no se crea correctamente
      constructor() {
        if (!new.target) throw new FailedObjTypeException();
      }

      // Comprobamos que la contraseña y el usuario sean validos
      validateUser(username, password) {
        return !!(username === "admin" && password === "admin");
      }

      getUser(username) {
        let user = null;
        if (username === "admin") user = new User("admin");
        return user;
      }
    }
    const auth = new Authentication();
    Object.freeze(auth);
    return auth;
  }

  // Retornamos el get que nos obtiene la instancia
  return {
    getInstance() {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export default Authentication;