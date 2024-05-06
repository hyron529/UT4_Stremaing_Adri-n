"use strict";
import {FailedEmptyException, FailedObjTypeException} from "../exception.js";

class Category{

    #name;
    #description;

    constructor(name){

        if (name === "" || name === undefined) throw new FailedEmptyException("name");
        if (!(new.target === Category)) throw new FailedObjTypeException("Category");

        this.#name = name;
        this.#description = null;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    set name(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("name");
        this.#name = value;
    }

    set description(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("description");
        this.#description = value;
    }

    /*
        Creación de toString, que nos va a servir para poder visualizar
        posteriormente el contenido de los objetos de tipo categoría
    */
    toString() {
        return `Nombre de la categoría: ${this.#name}, Descripción: ${this.#description}`;
    }
}

export {Category};
