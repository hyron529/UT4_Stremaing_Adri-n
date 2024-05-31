import { FailedEmptyException, FailedObjTypeException } from "./exception.js";

class User {

    #username;
    #preferences;

    constructor(username) {

        if (!new.target) throw new FailedObjTypeException();

        if (!username) throw new FailedEmptyException("username");

        this.#username = username;

        // Definimos los getters y setters
        Object.defineProperty(this, "username", {
            enumerable: true,
            get() {
                return this.#username;
            },
        });

        Object.defineProperty(this, "preferences", {
            enumerable: true,
            get() {
                return this.#preferences;
            },
            set(value) {
                if (!value) throw new EmptyValueException("preferences");
                this.#preferences = value;
            },
        });
    }
}

export {User};
