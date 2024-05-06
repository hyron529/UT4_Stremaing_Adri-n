"use strict";

import { FailedEmptyException } from "../exception.js";

//creacion de la calse production
class Production {
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    //constructor de production, comprobamos que se introducen los atributos
    //correctamente y definimos sus caracteríaticas
    constructor(title, nationality, publication, synopsis, image) {
        if (title === "" || title === undefined) throw new FailedEmptyException("title");
        //if (publication === "" || publication === undefined) throw new FailedEmptyException("publication");

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }

    //getters y setters
    get title() {
        return this.#title;
    }

    get nationality() {
        return this.#nationality;
    }

    get publication() {
        return this.#publication;
    }

    get synopsis() {
        return this.#synopsis;
    }

    get image() {
        return this.#image;
    }

    set title(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("title");
        this.#title = value;
    }

    set nationality(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("nationality");
        this.#nationality = value;
    }

    set publication(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("publication");
        this.#publication = value;
    }

    set synopsis(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("synopsis");
        this.#synopsis = value;
    }

    set image(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("image");
        this.#image = value;
    }

    //tostring para mostrar por consola los valores del objeto
    toString() {
        return `Titulo: ${this.#title}, Nacionalidad: ${this.#nationality}, Publicación: ${this.#publication}, Sinópsis: ${this.#synopsis}, Imagen: ${this.#image}`;
    }
}

export { Production };
